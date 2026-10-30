import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CommentSection from '../components/CommentSection';
import { useSEO } from '../hooks/useSEO';
import {
  fetchSfsCategories,
  fetchSfsBlueprints,
  toggleSfsFavorite,
  type SfsCategory,
  type SfsBlueprint,
} from '../api/sfsApi';
import { getSfsImageUrl } from '../utils/cdn';
import { getBlueprintSeoUrl } from '../utils/sfsSlug';
import { appendUtmToUrl } from '../utils/utmTracker';

export default function SFSBlueprints() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeCategory = searchParams.get('category_id') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const [categories, setCategories] = useState<SfsCategory[]>([]);
  const [blueprints, setBlueprints] = useState<SfsBlueprint[]>([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: 'Blueprints || Ashok SFS',
    description:
      'Explore, download, and share community-crafted spacecraft, rockets, space stations, and satellites for Spaceflight Simulator.',
    keywords:
      'SFS blueprints, Spaceflight Simulator rockets, SFS downloads, spacecraft designs, Artemis 2, Crew Dragon',
  });

  // Load categories
  useEffect(() => {
    fetchSfsCategories().then((cats) => {
      setCategories(cats);
    });
  }, []);

  // Load blueprints whenever category or search query changes
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchSfsBlueprints({
      categoryId: activeCategory,
      searchQuery: searchQuery,
    }).then((bps) => {
      if (mounted) {
        setBlueprints(bps);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [activeCategory, searchQuery]);

  const handleCategorySelect = (catId: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      nextParams.delete('category_id');
    } else {
      nextParams.set('category_id', catId);
    }
    setSearchParams(nextParams);
  };

  const handleSearchChange = (query: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (query.trim()) {
      nextParams.set('search', query.trim());
    } else {
      nextParams.delete('search');
    }
    setSearchParams(nextParams);
  };

  const handleToggleFavorite = async (bpId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowFav = await toggleSfsFavorite(bpId);
    setBlueprints((prev) =>
      prev.map((bp) =>
        bp.bp_id === bpId
          ? {
              ...bp,
              is_favourite: isNowFav,
              flikes: isNowFav ? bp.flikes + 1 : Math.max(0, bp.flikes - 1),
            }
          : bp
      )
    );
  };

  // Category pills matching Screenshot 2 / blueprints.html
  const categoryPills = useMemo(() => {
    if (categories.length > 0) {
      return [
        { id: 'all', label: 'All' },
        ...categories.map((c) => ({
          id: String(c.category_id),
          label: c.bp_name,
        })),
      ];
    }
    return [
      { id: 'all', label: 'All' },
      { id: 'international', label: 'International' },
      { id: 'rovers', label: 'Rovers' },
      { id: 'satellite', label: 'Satellite' },
      { id: 'capsules', label: 'Capsules' },
      { id: 'rockets', label: 'Rockets' },
      { id: 'aircraft_carrier', label: 'Aircraft' },
      { id: 'tank', label: 'Tank' },
      { id: 'others', label: 'Others' },
      { id: 'ufo', label: 'UFO' },
    ];
  }, [categories]);

  return (
    <Sidebar
      breadcrumbs={[{ label: 'Blueprints' }]}
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
    >
      <h1 className="sr-only">Spaceflight Simulator (SFS) Blueprints &amp; Spacecraft Downloads</h1>

      {/* ── Top Category Pills (from blueprints.html & sidebar.css) ── */}
      <div className="top_blueprints" role="toolbar" aria-label="Category filters">
        {categoryPills.map((pill) => {
          const isSelected =
            (pill.id === 'all' && (activeCategory === 'all' || !activeCategory)) ||
            activeCategory.toLowerCase() === pill.id.toLowerCase() ||
            activeCategory.toLowerCase() === pill.label.toLowerCase();

          return (
            <button
              type="button"
              key={pill.id}
              className={`top_name ${isSelected ? 'active' : ''}`}
              onClick={() => handleCategorySelect(pill.id)}
              aria-label={`Filter by ${pill.label}`}
              aria-pressed={isSelected}
            >
              <span title={pill.label}>{pill.label}</span>
            </button>
          );
        })}
      </div>

      <br />

      {/* ── Blueprints Cards Grid (matching #blueprint from blueprints.html) ── */}
      {loading ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', gap: '20px' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '260px',
                height: '320px',
                borderRadius: '1rem',
                background: '#120822',
                border: '1px solid #26133f',
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      ) : blueprints.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>No blueprints found</h2>
          <p style={{ color: 'var(--gray-400)', fontSize: '14px', marginTop: '0.5rem' }}>
            Try adjusting your category filter or search query.
          </p>
          <button
            onClick={() => handleCategorySelect('all')}
            className="download_btn_h"
            style={{ maxWidth: '200px', margin: '1rem auto' }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div id="blueprint">
          {blueprints.map((bp, idx) => (
            <div key={bp.bp_id} className="blueprint">
              <img
                src={getSfsImageUrl(bp.image)}
                alt={`${bp.name} Spaceflight Simulator Blueprint Preview`}
                className="blueprint_img"
                width="250"
                height="141"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(appendUtmToUrl(getBlueprintSeoUrl(bp)))}
                loading={idx === 0 ? "eager" : "lazy"}
                fetchPriority={idx === 0 ? "high" : "auto"}
                decoding="async"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/placeholder-bp.webp";
                }}
              />
              <br />

              {/* Heart Favorite Icon */}
              <button
                type="button"
                onClick={(e) => handleToggleFavorite(bp.bp_id, e)}
                aria-label={bp.is_favourite ? `Remove ${bp.name} from favorites` : `Add ${bp.name} to favorites`}
                style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', display: 'inline' }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="as as-heart"
                  viewBox="0 0 16 16"
                  style={{ color: bp.is_favourite ? 'red' : 'inherit' }}
                  aria-hidden="true"
                >
                  {bp.is_favourite ? (
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                  ) : (
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                  )}
                </svg>
              </button>

              <div className="bb">
                <h2>{bp.name}</h2>

                <div className="categories">
                  {bp.categories.map((c, i) => (
                    <div key={i} className="category">
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategorySelect(String(c.cat_id || 'all'));
                        }}
                      >
                        {c.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="blue_down">
                  <span>{bp.user_name}</span>
                  <div className="blue_down_icon">
                    <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                    </svg>
                    &nbsp;{bp.fdownloads}
                  </div>
                </div>

                <button
                  className="download_btn_h"
                  aria-label={`Download ${bp.name} blueprint`}
                  onClick={() => navigate(appendUtmToUrl(getBlueprintSeoUrl(bp)))}
                >
                  <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                  </svg>
                  &nbsp;Download Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Community Comments Section for Blueprints */}
      <CommentSection bpId="blueprints-community" type="blueprint" />
    </Sidebar>
  );
}
