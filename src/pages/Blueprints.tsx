import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useSEO } from '../hooks/useSEO';
import { getSfsImageUrl, getSfsZipUrl } from '../utils/cdn';

type Category = {
  category_id: number;
  name: string;
};

type Blueprint = {
  bp_id: number;
  name: string;
  image: string;
  is_favourite: boolean;
  fdownloads: number;
};

const categories: Category[] = [
  { category_id: 1, name: 'Spacecraft' },
  { category_id: 2, name: 'Stations' },
  { category_id: 3, name: 'Launch Vehicles' },
];

const blueprints: Blueprint[] = [
  {
    bp_id: 1,
    name: 'Titan V Heavy Rocket',
    image: 'titan_v.webp',
    is_favourite: false,
    fdownloads: 1280,
  },
  {
    bp_id: 2,
    name: 'Orbital Space Station Alpha',
    image: 'orbital_station_alpha.webp',
    is_favourite: true,
    fdownloads: 940,
  },
  {
    bp_id: 3,
    name: 'Falcon Super Heavy Booster',
    image: 'falcon_super_heavy.webp',
    is_favourite: false,
    fdownloads: 2150,
  },
];

const likeBlueprint = (bpId: number) => {
  console.log('favorite', bpId);
};

function Blueprints() {
  useSEO({
    title: 'Blueprints || Ashok SFS',
    description: 'Explore top community-crafted spacecraft, space stations, and rocket launch vehicle blueprints for Spaceflight Simulator.',
    keywords: 'SFS blueprints, Spaceflight Simulator rockets, spacecraft designs, space stations, SFS download',
  });

  return (
    <Sidebar>
      <div className="bread_crumb">
        <p>
          &gt; <Link to="/sfs">Home</Link> &gt; <Link to="/blueprints">Blueprints</Link>
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.5rem 0' }}>
          Explore Spaceflight Simulator Blueprints
        </h1>
        <p style={{ color: 'var(--gray-400)', fontSize: '0.95rem' }}>
          Browse curated spacecraft, rockets, and space stations designed by the community.
        </p>
      </div>

      <div className="top_blueprints">
        <div className="top_name active">
          <Link to="/blueprints" title="All Categories">
            All
          </Link>
        </div>

        {categories.map((category) => (
          <div key={category.category_id} className="top_name">
            <Link to={`/blueprints?category_id=${category.category_id}`}>{category.name}</Link>
          </div>
        ))}
      </div>

      <div id="blueprint">
        {blueprints.map((blueprint) => (
          <div key={blueprint.bp_id} className="blueprint">
            <img
              src={getSfsImageUrl(blueprint.image)}
              alt={`${blueprint.name} Spacecraft Blueprint`}
              className="blueprint_img"
              fetchPriority="high"
            />
            <br />

            {blueprint.is_favourite ? (
              <svg width="16" height="16" fill="currentColor" className="as as-heart" viewBox="0 0 16 16" aria-label="Favorited">
                <path
                  fillRule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="as as-heart"
                viewBox="0 0 16 16"
                onClick={() => likeBlueprint(blueprint.bp_id)}
                aria-label="Add to favorites"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>
            )}

            <div className="bb">
              <h2>{blueprint.name}</h2>

              <div className="blue_down">
                <div className="blue_down_icon">
                  <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                  </svg>
                  {blueprint.fdownloads}
                </div>
              </div>

              <a
                className="download_btn_h flex items-center justify-center gap-1"
                href={getSfsZipUrl(`${blueprint.bp_id}.zip`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                </svg>
                Download Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </Sidebar>
  );
}

export default Blueprints;