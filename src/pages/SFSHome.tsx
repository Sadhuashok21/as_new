import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useSEO } from "../hooks/useSEO";
import { fetchSfsCategories, type SfsCategory } from "../api/sfsApi";
import { getSfsImageUrl } from "../utils/cdn";

export default function SFSHome() {
  useSEO({
    title: "Home || Ashok SFS",
    description: "Explore 3D spacecraft, rockets, space stations, rovers, and satellites for Spaceflight Simulator. Browse community categories and download custom blueprints.",
    keywords: "SFS blueprints, Spaceflight Simulator, SFS rockets, spacecraft, rovers, ISS, space stations",
  });

  const [categories, setCategories] = useState<SfsCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchSfsCategories().then((cats) => {
      if (mounted) {
        setCategories(cats);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Sidebar breadcrumbs={[]}>
      {loading ? (
        <div className="categories" style={{ display: "flex", flexWrap: "wrap" }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="blueprint_box"
              style={{ minHeight: "180px", opacity: 0.4 }}
            />
          ))}
        </div>
      ) : (
        <div className="categories" style={{ display: "flex", flexWrap: "wrap" }}>
          {categories
            .filter((c) => (c.blueprint_count ?? 1) > 0)
            .map((category) => (
              <div key={category.category_id} className="blueprint_box">
                <Link
                  to={`/sfs/blueprints?category_id=${encodeURIComponent(String(category.category_id))}`}
                >
                  <img
                    src={getSfsImageUrl(category.bp_img)}
                    loading="lazy"
                    alt={category.bp_name}
                    className="bp_img"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://cdn.ascentracoresolutions.com/sfs/images/ashoksfs.webp";
                    }}
                  />
                  <h2>{category.bp_name}</h2>
                  <p>{category.blueprint_count} Blueprints</p>
                </Link>
              </div>
            ))}
        </div>
      )}
    </Sidebar>
  );
}
