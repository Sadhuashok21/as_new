import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useSEO } from "../hooks/useSEO";
import { useAuth } from "../auth/AuthContext";
import AccessRestricted from "../components/AccessRestricted";
import {
  fetchSfsFavorites,
  toggleSfsFavorite,
  type SfsBlueprint,
} from "../api/sfsApi";
import { getSfsImageUrl } from "../utils/cdn";
import { getBlueprintSeoUrl } from "../utils/sfsSlug";

export default function SFSFavorites() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<SfsBlueprint[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useSEO({
    title: "Favorites || Ashok SFS",
    description: "Access your bookmarked and saved Spaceflight Simulator blueprints, rockets, and spacecraft.",
    keywords: "SFS favorites, saved blueprints, Spaceflight Simulator bookmarks",
  });

  useEffect(() => {
    let mounted = true;
    fetchSfsFavorites().then((favs) => {
      if (mounted) {
        setFavorites(favs);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleRemoveFavorite = async (bpId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleSfsFavorite(bpId);
    setFavorites((prev) => prev.filter((b) => b.bp_id !== bpId));
  };

  if (authLoading) {
    return (
      <Sidebar
        breadcrumbs={[
          { label: "Profile", to: "/profile" },
          { label: "Favorites" },
        ]}
      >
        <div style={{ minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "32px", height: "32px", border: "3px solid rgba(147,51,234,0.3)", borderTopColor: "#a855f7", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        </div>
      </Sidebar>
    );
  }

  if (!isAuthenticated) {
    return (
      <Sidebar
        breadcrumbs={[
          { label: "Profile", to: "/profile" },
          { label: "Favorites" },
        ]}
      >
        <AccessRestricted redirect={typeof window !== "undefined" ? window.location.href : undefined} />
      </Sidebar>
    );
  }

  return (
    <Sidebar
      breadcrumbs={[
        { label: "Profile", to: "/profile" },
        { label: "Favorites" },
      ]}
    >
      {loading ? (
        <div id="blueprint">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="blueprint"
              style={{ minHeight: "260px", opacity: 0.5 }}
            />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="favourites_up">
          <svg width="48" height="48" fill="currentColor" className="as as-heart-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
          </svg>
          <h1>No favourites yet</h1>
          <p>Start exploring blueprints and tap the heart icon to save your favorites here.</p>
        </div>
      ) : (
        <div id="blueprint">
          {favorites.map((bp) => (
            <div key={bp.bp_id} className="blueprint">
              <img
                src={getSfsImageUrl(bp.image)}
                alt={bp.name}
                className="blueprint_img"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://cdn.ascentracoresolutions.com/sfs/images/ashoksfs.webp";
                }}
              />
              <br />
              <svg
                width="16"
                height="16"
                fill="#ff4081"
                className="as as-heart"
                viewBox="0 0 16 16"
                onClick={(e) => handleRemoveFavorite(bp.bp_id, e)}
                style={{ cursor: "pointer" }}
              >
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
              </svg>

              <div className="bb">
                <h2>{bp.name}</h2>

                {bp.categories && bp.categories.length > 0 && (
                  <div className="categories">
                    {bp.categories.map((c) => (
                      <div key={String(c.cat_id)} className="category">
                        <span>{c.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="blue_down">
                  <span>{bp.user_name || "Ashok SFS"}</span>
                  <div className="blue_down_icon">
                    <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                    </svg>
                    {bp.fdownloads}
                  </div>
                </div>

                <button
                  className="download_btn_h"
                  onClick={() => navigate(getBlueprintSeoUrl(bp))}
                >
                  <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                  </svg>
                  Download Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Sidebar>
  );
}
