import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSfsBlueprints, type SfsBlueprint } from '../api/sfsApi';
import { getSfsImageUrl } from '../utils/cdn';
import { getBlueprintSeoUrl } from '../utils/sfsSlug';
import { appendUtmToUrl } from '../utils/utmTracker';
import '../assets/css/ExploreBlueprints.css';

interface ExploreBlueprintsProps {
  currentBpId?: string;
  category?: string;
  title?: string;
  subtitle?: string;
  limit?: number;
}

export default function ExploreBlueprints({
  currentBpId,
  category,
  title = 'Explore More Blueprints',
  subtitle = 'Discover community-crafted rockets, space stations, and custom planetary crafts.',
  limit = 4,
}: ExploreBlueprintsProps) {
  const [blueprints, setBlueprints] = useState<SfsBlueprint[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchSfsBlueprints({
      categoryId: category || 'all',
      type: 'all',
    })
      .then((items) => {
        if (!mounted) return;
        // Filter out the currently viewed blueprint
        const filtered = items.filter((b) => b.bp_id !== currentBpId);

        // Sort by downloads descending to showcase best community blueprints
        filtered.sort((a, b) => (b.fdownloads || 0) - (a.fdownloads || 0));

        setBlueprints(filtered.slice(0, limit));
        setLoading(false);
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [currentBpId, category, limit]);

  if (!loading && blueprints.length === 0) {
    return null;
  }

  return (
    <section className="explore_blueprints_section" aria-label="Explore Blueprints">
      <div className="explore_blueprints_header">
        <div className="explore_blueprints_title_group">
          <h3>
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
              <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
            </svg>
            {title}
          </h3>
          <p>{subtitle}</p>
        </div>

        <Link to={appendUtmToUrl('/sfs/blueprints')} className="explore_view_all_link">
          Browse All
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
          </svg>
        </Link>
      </div>

      <div className="explore_grid">
        {loading
          ? Array.from({ length: limit }).map((_, i) => (
              <div
                key={i}
                className="explore_card"
                style={{ opacity: 0.5, pointerEvents: 'none' }}
              >
                <div className="explore_card_thumb_wrap" />
                <div className="explore_card_body" style={{ minHeight: '90px' }} />
              </div>
            ))
          : blueprints.map((bp) => {
              const primaryCategory = bp.categories?.[0]?.name || (bp.type === 'planet' ? 'Planet' : 'Rocket');
              const targetUrl = appendUtmToUrl(getBlueprintSeoUrl(bp));

              return (
                <div
                  key={bp.bp_id}
                  className="explore_card"
                  onClick={() => {
                    navigate(targetUrl);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate(targetUrl);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  <div className="explore_card_thumb_wrap">
                    <img
                      src={getSfsImageUrl(bp.image)}
                      alt={bp.name}
                      className="explore_card_img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://cdn.ascentracoresolutions.com/sfs/images/ashoksfs.webp';
                      }}
                    />
                    <span className="explore_card_badge">{primaryCategory}</span>
                  </div>

                  <div className="explore_card_body">
                    <h4 className="explore_card_title" title={bp.name}>
                      {bp.name}
                    </h4>

                    <div className="explore_card_meta">
                      <span className="explore_card_author" title={bp.user_name}>
                        {bp.user_name}
                      </span>
                      <span className="explore_card_downloads">
                        <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                        </svg>
                        {bp.fdownloads}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="explore_card_btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(targetUrl);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      View Blueprint
                      <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
}
