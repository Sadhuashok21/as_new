import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CommentSection from '../components/CommentSection';
import ExploreBlueprints from '../components/ExploreBlueprints';
import { useSEO } from '../hooks/useSEO';
import {
  fetchSfsBlueprintDetail,
  toggleSfsFavorite,
  downloadSfsBlueprint,
  type SfsBlueprint,
} from '../api/sfsApi';
import { getSfsImageUrl } from '../utils/cdn';
import { getBlueprintSeoUrl } from '../utils/sfsSlug';
import { appendUtmToUrl, getActiveUtmSource, logUtmRecord } from '../utils/utmTracker';

export default function SFSBlueprintDetail() {
  const [searchParams] = useSearchParams();
  const params = useParams<{ slug?: string; id?: string }>();
  const navigate = useNavigate();

  // Support both SEO slug (/sfs/blueprints/:slug, /sfs/blueprint/:id) and legacy query params (?bp_id=...)
  const identifier = params.slug || params.id || searchParams.get('bp_id') || searchParams.get('id') || 'BVQKBG3JADDRH1O682ND';

  const [blueprint, setBlueprint] = useState<SfsBlueprint | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchSfsBlueprintDetail(identifier).then((res) => {
      if (!mounted) return;
      setBlueprint(res);
      setLoading(false);

      // Smoothly transition to SEO-friendly slug route if accessed via legacy ?bp_id= query param
      const legacyBpId = searchParams.get('bp_id');
      if (res && legacyBpId) {
        navigate(getBlueprintSeoUrl(res), { replace: true });
      }
    });

    return () => {
      mounted = false;
    };
  }, [identifier]);

  const categoryNames = blueprint?.categories?.map((c) => c.name).join(', ') || 'Rockets';
  const canonicalUrl = blueprint
    ? `https://www.ascentracoresolutions.com${getBlueprintSeoUrl(blueprint)}`
    : undefined;

  const structuredData = useMemo(() => {
    if (!blueprint) return undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${blueprint.name} - SFS Blueprint`,
      description: blueprint.description,
      image: getSfsImageUrl(blueprint.image),
      category: categoryNames,
      brand: {
        '@type': 'Brand',
        name: 'Spaceflight Simulator (SFS)',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: Math.max(1, blueprint.flikes || 10),
      },
    };
  }, [blueprint, categoryNames]);

  useSEO({
    title: blueprint
      ? `${blueprint.name} - Spaceflight Simulator Blueprint (SFS) | Ashok SFS`
      : 'Spaceflight Simulator Blueprint | Ashok SFS',
    description: blueprint
      ? `${blueprint.name} Spaceflight Simulator Blueprint by ${blueprint.user_name}. ${blueprint.description || 'Download high-precision SFS rocket craft file with realistic physics, staging, and custom parts.'}`
      : 'Download free Spaceflight Simulator blueprints, rockets, and spacecraft craft files.',
    keywords: blueprint
      ? `${blueprint.name}, SFS blueprints, Spaceflight Simulator, ${categoryNames}, download SFS rocket, SFS craft file, Ashok SFS`
      : 'SFS blueprints, Spaceflight Simulator, rockets, download craft',
    canonicalUrl,
    image: blueprint ? getSfsImageUrl(blueprint.image) : undefined,
    ogType: 'article',
    structuredData,
  });

  const handleToggleFavorite = async () => {
    if (!blueprint) return;
    const isNowFav = await toggleSfsFavorite(blueprint.bp_id);
    setBlueprint((prev) =>
      prev
        ? {
            ...prev,
            is_favourite: isNowFav,
            flikes: isNowFav ? prev.flikes + 1 : Math.max(0, prev.flikes - 1),
          }
        : null
    );
  };

  const handleDownload = () => {
    if (!blueprint) return;
    downloadSfsBlueprint(blueprint);
    setBlueprint((prev) => (prev ? { ...prev, fdownloads: prev.fdownloads + 1 } : null));
  };

  const handleBpSharing = () => {
    if (!blueprint) return;
    if (blueprint.sfs_link && blueprint.sfs_link !== 'none') {
      const activeUtm = getActiveUtmSource() || 'share';
      logUtmRecord(`bp_share:${blueprint.bp_id}`, { utmSource: activeUtm });
      window.open(appendUtmToUrl(blueprint.sfs_link, activeUtm), '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = async () => {
    if (!blueprint) return;

    try {
      const activeUtm = getActiveUtmSource() || 'share';
      const rawShareUrl = window.location.origin + getBlueprintSeoUrl(blueprint);
      const shareUrl = appendUtmToUrl(rawShareUrl, activeUtm);
      await navigator.clipboard.writeText(shareUrl);
      logUtmRecord(`share:${blueprint.bp_id}`, { utmSource: activeUtm });
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <Sidebar
      breadcrumbs={[
        { label: 'Blueprints', to: '/sfs/blueprints' },
        { label: blueprint?.name || 'Blueprint' },
      ]}
    >
      {loading ? (
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '4rem 1rem' }}>
          <p style={{ color: 'var(--gray-400)' }}>Loading blueprint details...</p>
        </div>
      ) : !blueprint ? (
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '4rem 1rem' }}>
          <h2 style={{ color: '#fff', fontSize: '20px', marginBottom: '1rem' }}>Blueprint not found</h2>
          <button className="download_btn_h" onClick={() => navigate('/sfs/blueprints')} style={{ maxWidth: '200px', margin: '0 auto' }}>
            Back to Blueprints
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Back Header */}
          <div className="back" onClick={() => navigate('/sfs/blueprints')} style={{ cursor: 'pointer' }}>
            <svg width="16" height="16" fill="currentColor" className="as as-arrow-left" viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
            &nbsp;{blueprint.name}
          </div>

          {/* Blueprint Main Info */}
          <div className="bp_one">
            <img
              src={getSfsImageUrl(blueprint.image)}
              alt={blueprint.name}
              className="bp_img"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://cdn.ascentracoresolutions.com/sfs/images/ashoksfs.webp';
              }}
            />

            <h2>{blueprint.name}</h2>
            <span>{blueprint.user_name}</span>

            <div className="bp_bar">
              <div className="bp_icon" title={`${blueprint.fdownloads} downloads`}>
                <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                </svg>
                {blueprint.fdownloads}
              </div>

              <div className="bp_icon" title={`${blueprint.flikes} likes`}>
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="as as-heart"
                  viewBox="0 0 16 16"
                  style={{ color: blueprint.is_favourite ? 'red' : 'inherit' }}
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
                {blueprint.flikes}
              </div>

              <div className="bp_icon" title={`${blueprint.fviews} views`}>
                <svg width="16" height="16" fill="currentColor" className="as as-eye" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
                {blueprint.fviews}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="categories" style={{ margin: '10px 0' }}>
            {blueprint.categories.map((cat, idx) => (
              <div key={idx} className="category">
                {cat.name}
              </div>
            ))}
          </div>

          {/* Download Now Button */}
          <button className="download_btn_h" onClick={handleDownload} aria-label={`Download ${blueprint.name}`}>
            <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
            </svg>
            &nbsp;Download Now
          </button>

          {/* BP Sharing Button */}
          {blueprint.sfs_link && blueprint.sfs_link !== 'none' && (
            <button className="download_btn_h" onClick={handleBpSharing} aria-label="Open Spaceflight Simulator BP sharing">
              <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
              </svg>
              &nbsp;BP Sharing
            </button>
          )}

          {/* Like & Share Action Buttons */}
          <div className="clickable">
            <button className="download_btn_h" onClick={handleToggleFavorite} aria-label="Favorite this blueprint">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="as as-heart"
                viewBox="0 0 16 16"
                style={{ color: blueprint.is_favourite ? 'red' : 'inherit' }}
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>
              &nbsp;Like
            </button>

            <button className="download_btn_h" onClick={handleShare} aria-label="Copy share link">
              <svg width="16" height="16" fill="currentColor" className="as as-share" viewBox="0 0 16 16">
                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
              </svg>
              &nbsp;{copied ? 'Link Copied!' : 'Share'}
            </button>
          </div>

          <br />

          {/* Description */}
          <div className="description">
            <h3>Description</h3>
            <p>{blueprint.description || 'No description provided.'}</p>
          </div>

          <br />

          {/* How to load blueprint Instructions */}
          <div className="instructions_list">
            <h2>How to load blueprint</h2>
            <ol>
              <li>Download desired blueprint zip file. (BP Sharing is directly downloaded to your sfs game)</li>
              <li>Locate the file</li>
              <li>In your android device, extract the zip file and move to the following directory:</li>
              <li>
                <b>Android</b> &gt; <b>media</b> &gt; <b>com.StefMorojna.SpaceflightSimulator</b> &gt; <b>Savings</b> &gt; <b>Blueprints</b> &gt;
              </li>
              <li>Paste the extracted folder here</li>
              <li>Then enjoy the blueprint in your game!</li>
            </ol>
          </div>

          <br />

          {/* Video Tutorial Preview */}
          <div className="preview">
            <h2>How to load blueprint (Video Tutorial)</h2>
            <a href="https://www.youtube.com/watch?v=rbf4jKoozcY" target="_blank" rel="noreferrer">
              <img src="/yt_img.jpg" alt="Preview Image" className="preview_img" />
              <img src="/yt_trans.png" alt="Youtube" className="yt_trans" />
            </a>
          </div>

          {/* Explore More Blueprints Section */}
          <ExploreBlueprints
            currentBpId={blueprint.bp_id}
            category={blueprint.categories?.[0]?.cat_id as string}
            title="Explore More Blueprints"
            subtitle="Discover top rockets, space stations, and custom craft files crafted by the community."
            limit={4}
          />

          {/* Community Comments Section */}
          <CommentSection
            bpId={blueprint.bp_id}
            type={blueprint.type === 'planet' ? 'planet' : 'blueprint'}
          />
        </div>
      )}
    </Sidebar>
  );
}
