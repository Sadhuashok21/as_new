import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CommentSection from "../components/CommentSection";
import ExploreBlueprints from "../components/ExploreBlueprints";
import { useSEO } from "../hooks/useSEO";
import { fetchSfsPlanets, toggleSfsFavorite, type SfsBlueprint } from "../api/sfsApi";
import { getSfsImageUrl } from "../utils/cdn";
import { getBlueprintSeoUrl } from "../utils/sfsSlug";
import { appendUtmToUrl } from "../utils/utmTracker";

export default function SFSPlanets() {
  const [planets, setPlanets] = useState<SfsBlueprint[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useSEO({
    title: "Planets and worlds || Ashok SFS",
    description: "Download custom planets, solar systems, atmospheres, and custom worlds for Spaceflight Simulator.",
    keywords: "SFS custom solar systems, Spaceflight Simulator planets, custom worlds, SFS Mars texture pack",
  });

  useEffect(() => {
    let mounted = true;
    fetchSfsPlanets().then((res) => {
      if (mounted) {
        setPlanets(res);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleToggleFavorite = async (bpId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowFav = await toggleSfsFavorite(bpId);
    setPlanets((prev) =>
      prev.map((p) =>
        p.bp_id === bpId
          ? {
              ...p,
              is_favourite: isNowFav,
              flikes: isNowFav ? p.flikes + 1 : Math.max(0, p.flikes - 1),
            }
          : p
      )
    );
  };

  return (
    <Sidebar breadcrumbs={[{ label: "Planets and worlds" }]}>
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
      ) : planets.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#fff" }}>
          <h3>No planets or custom worlds found</h3>
        </div>
      ) : (
        <div id="blueprint">
          {planets.map((planet) => {
            return (
              <div key={planet.bp_id} className="blueprint">
                <img
                  src={getSfsImageUrl(planet.image)}
                  alt={planet.name}
                  className="blueprint_img"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(appendUtmToUrl(getBlueprintSeoUrl(planet)))}
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
                  fill={planet.is_favourite ? "#ff4081" : "currentColor"}
                  className="as as-heart"
                  viewBox="0 0 16 16"
                  onClick={(e) => handleToggleFavorite(planet.bp_id, e)}
                  style={{ cursor: "pointer" }}
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
                <div className="bb">
                  <h2>{planet.name}</h2>

                  <div className="blue_down">
                    <span>{planet.user_name}</span>
                    <div className="blue_down_icon">
                      <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                      </svg>
                      {planet.fdownloads}
                    </div>
                  </div>

                  <button
                    className="download_btn_h"
                    onClick={() => navigate(appendUtmToUrl(getBlueprintSeoUrl(planet)))}
                  >
                    <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                    </svg>
                    Download Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Explore Community Blueprints */}
      <ExploreBlueprints
        title="Explore Spacecraft & Rockets"
        subtitle="Discover rockets and space stations to launch into your custom solar systems and worlds."
        limit={4}
      />

      {/* Community Comments Section for Planets & Worlds */}
      <CommentSection bpId="planets-community" type="planet" />
    </Sidebar>
  );
}
