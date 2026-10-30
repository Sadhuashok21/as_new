import { getSfsImageUrl, getSfsZipUrl } from '../utils/cdn';
import { extractBpIdFromSlug, findBlueprintByIdentifier } from '../utils/sfsSlug';
import { appendUtmToUrl, getActiveUtmSource, logUtmRecord } from '../utils/utmTracker';

export interface SfsCategory {
  category_id: string | number;
  bp_name: string;
  bp_img: string;
  bp_para?: string;
  blueprint_count: number;
}

export interface SfsBlueprintCategory {
  cat_id: string | number;
  name: string;
}

export interface SfsBlueprint {
  bp_id: string;
  name: string;
  image: string;
  fdownloads: number;
  flikes: number;
  fviews: number;
  fshare?: number;
  comments?: number;
  user_name: string;
  description?: string;
  sfs_link?: string;
  zipfiles?: string;
  categories: SfsBlueprintCategory[];
  is_favourite?: boolean;
  type?: string;
  user_id?: string;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

export const FALLBACK_CATEGORIES: SfsCategory[] = [
  {
    "category_id": "iss",
    "bp_name": "International Space Station",
    "bp_img": "iss.webp",
    "bp_para": "Multi-module orbital laboratory space station blueprints.",
    "blueprint_count": 1
  },
  {
    "category_id": "rovers",
    "bp_name": "Rovers",
    "bp_img": "rovers.webp",
    "bp_para": "Autonomous surface exploration vehicles with robotic arms.",
    "blueprint_count": 0
  },
  {
    "category_id": "satellite",
    "bp_name": "Satellite",
    "bp_img": "satellite.webp",
    "bp_para": "Communications, weather, and science orbital satellites.",
    "blueprint_count": 1
  },
  {
    "category_id": "capsules",
    "bp_name": "Capsules",
    "bp_img": "capsules.webp",
    "bp_para": "Crew transport capsules and re-entry heat shield vehicles.",
    "blueprint_count": 1
  },
  {
    "category_id": "rockets",
    "bp_name": "Rockets",
    "bp_img": "rockets.webp",
    "bp_para": "Multi-stage orbital launch vehicles and heavy boosters.",
    "blueprint_count": 3
  },
  {
    "category_id": "aircraft_carrier",
    "bp_name": "Aircraft Carrier",
    "bp_img": "aircraft_carrier.webp",
    "bp_para": "Massive floating airbases and orbital carrier platforms.",
    "blueprint_count": 1
  },
  {
    "category_id": "tank",
    "bp_name": "Tank",
    "bp_img": "tank.webp",
    "bp_para": "Heavy surface combat and fortified armor vehicles.",
    "blueprint_count": 0
  },
  {
    "category_id": "others",
    "bp_name": "Others",
    "bp_img": "others.webp",
    "bp_para": "Special props, colony infrastructure, and utilities.",
    "blueprint_count": 7
  },
  {
    "category_id": "ufo",
    "bp_name": "UFO",
    "bp_img": "ufo.webp",
    "bp_para": "Exotic antigravity and flying saucer craft.",
    "blueprint_count": 0
  },
  {
    "category_id": "astronaut",
    "bp_name": "Astronaut",
    "bp_img": "astronaut.webp",
    "bp_para": "Astronaut figures, EVA suits, and surface gear.",
    "blueprint_count": 1
  },
  {
    "category_id": "planes",
    "bp_name": "Planes",
    "bp_img": "planes.webp",
    "bp_para": "Atmospheric jets, supersonic craft, and gliders.",
    "blueprint_count": 1
  },
  {
    "category_id": "antenna",
    "bp_name": "Antenna",
    "bp_img": "antenna.webp",
    "bp_para": "Long-range parabolic relays and radar dishes.",
    "blueprint_count": 3
  },
  {
    "category_id": "boat",
    "bp_name": "Boat",
    "bp_img": "boat.webp",
    "bp_para": "Watercraft, exploration vessels, and barges.",
    "blueprint_count": 0
  }
];

export const FALLBACK_BLUEPRINTS: SfsBlueprint[] = [
  {
    "bp_id": "FIRST_SPACE_STATION_385",
    "name": "First Space Station",
    "image": "first_space_station.webp",
    "fdownloads": 385,
    "flikes": 420,
    "fviews": 1250,
    "fshare": 10,
    "comments": 4,
    "description": "Modular low-orbit scientific laboratory with habitat section.",
    "sfs_link": "https://sharing.spaceflightsimulator.app/rocket/First-Space-Station",
    "zipfiles": "first_space_station.zip",
    "type": "blueprint",
    "user_id": "RX279P5UZ7II572B1YJ3",
    "user_name": "SADHU ASHOK KUMAR",
    "categories": [
      {
        "cat_id": "iss",
        "name": "International Space Station"
      },
      {
        "cat_id": "others",
        "name": "Others"
      }
    ],
    "is_favourite": false
  },
  {
    "bp_id": "SOLAR_POWER_ON_MOON_42",
    "name": "Solar power on moon",
    "image": "solar_power.webp",
    "fdownloads": 42,
    "flikes": 64,
    "fviews": 310,
    "fshare": 10,
    "comments": 4,
    "description": "Deployable multi-megawatt photovoltaic array for surface power.",
    "sfs_link": "https://sharing.spaceflightsimulator.app/rocket/Lunar-Solar-Array",
    "zipfiles": "solar_power_moon.zip",
    "type": "blueprint",
    "user_id": "RX279P5UZ7II572B1YJ3",
    "user_name": "SADHU ASHOK KUMAR",
    "categories": [
      {
        "cat_id": "others",
        "name": "Others"
      },
      {
        "cat_id": "antenna",
        "name": "Antenna"
      }
    ],
    "is_favourite": false
  },
  {
    "bp_id": "MOON_ANTENNA_232",
    "name": "Moon Antenna",
    "image": "moon_antenna.webp",
    "fdownloads": 232,
    "flikes": 178,
    "fviews": 890,
    "fshare": 10,
    "comments": 4,
    "description": "Deep Space Network parabolic relay dish for telemetry.",
    "sfs_link": "https://sharing.spaceflightsimulator.app/rocket/Moon-Relay-Dish",
    "zipfiles": "moon_antenna.zip",
    "type": "blueprint",
    "user_id": "RX279P5UZ7II572B1YJ3",
    "user_name": "SADHU ASHOK KUMAR",
    "categories": [
      {
        "cat_id": "others",
        "name": "Others"
      },
      {
        "cat_id": "antenna",
        "name": "Antenna"
      }
    ],
    "is_favourite": false
  },
  {
    "bp_id": "STREET_LIGHT_50",
    "name": "Street Light",
    "image": "street_light.webp",
    "fdownloads": 50,
    "flikes": 32,
    "fviews": 180,
    "fshare": 10,
    "comments": 4,
    "description": "Structural illumination post for lunar roads and spaceport pads.",
    "sfs_link": "https://sharing.spaceflightsimulator.app/rocket/Street-Light-Prop",
    "zipfiles": "street_light.zip",
    "type": "blueprint",
    "user_id": "RX279P5UZ7II572B1YJ3",
    "user_name": "SADHU ASHOK KUMAR",
    "categories": [
      {
        "cat_id": "others",
        "name": "Others"
      }
    ],
    "is_favourite": false
  },
  {
    "bp_id": "MOON_COLONISATION_37",
    "name": "Moon Colonisation",
    "image": "moon_colony.webp",
    "fdownloads": 37,
    "flikes": 45,
    "fviews": 290,
    "fshare": 10,
    "comments": 4,
    "description": "Self-sustaining lunar surface colony module with life support domes.",
    "sfs_link": "https://sharing.spaceflightsimulator.app/rocket/Moon-Base-Colony",
    "zipfiles": "moon_colony.zip",
    "type": "blueprint",
    "user_id": "RX279P5UZ7II572B1YJ3",
    "user_name": "SADHU ASHOK KUMAR",
    "categories": [
      {
        "cat_id": "others",
        "name": "Others"
      },
      {
        "cat_id": "astronaut",
        "name": "Astronaut"
      },
      {
        "cat_id": "antenna",
        "name": "Antenna"
      }
    ],
    "is_favourite": false
  },
  {
    "bp_id": "FIGHTER_GROUP_112",
    "name": "Fighter Group",
    "image": "fighter_group.webp",
    "fdownloads": 112,
    "flikes": 89,
    "fviews": 450,
    "fshare": 10,
    "comments": 4,
    "description": "Formation squadron of atmospheric and low-orbit interceptors.",
    "sfs_link": "https://sharing.spaceflightsimulator.app/rocket/Fighter-Squadron",
    "zipfiles": "fighter_group.zip",
    "type": "blueprint",
    "user_id": "RX279P5UZ7II572B1YJ3",
    "user_name": "SADHU ASHOK KUMAR",
    "categories": [
      {
        "cat_id": "rockets",
        "name": "Rockets"
      },
      {
        "cat_id": "others",
        "name": "Others"
      }
    ],
    "is_favourite": false
  },
  {
    "bp_id": "CREW_DRAGON_6254",
    "name": "Crew Dragon",
    "image": "crew_dragon.webp",
    "fdownloads": 6254,
    "flikes": 2890,
    "fviews": 9400,
    "fshare": 10,
    "comments": 4,
    "description": "SpaceX Crew Dragon spacecraft with Falcon 9 reusable booster and landing legs.",
    "sfs_link": "https://sharing.spaceflightsimulator.app/rocket/CrewDragon-Falcon9",
    "zipfiles": "crew_dragon.zip",
    "type": "blueprint",
    "user_id": "RX279P5UZ7II572B1YJ3",
    "user_name": "SADHU ASHOK KUMAR",
    "categories": [
      {
        "cat_id": "capsules",
        "name": "Capsules"
      },
      {
        "cat_id": "rockets",
        "name": "Rockets"
      },
      {
        "cat_id": "others",
        "name": "Others"
      }
    ],
    "is_favourite": false
  },
  {
    "bp_id": "BATTLESHIP_MOD_4888",
    "name": "Battleship",
    "image": "battleship.webp",
    "fdownloads": 4888,
    "flikes": 1420,
    "fviews": 6100,
    "fshare": 10,
    "comments": 4,
    "description": "Heavy orbital naval fortress with deployable drone aircraft and turrets.",
    "sfs_link": "https://sharing.spaceflightsimulator.app/rocket/Battleship-Orbital",
    "zipfiles": "battleship.zip",
    "type": "blueprint",
    "user_id": "RX279P5UZ7II572B1YJ3",
    "user_name": "SADHU ASHOK KUMAR",
    "categories": [
      {
        "cat_id": "satellite",
        "name": "Satellite"
      },
      {
        "cat_id": "aircraft_carrier",
        "name": "Aircraft Carrier"
      },
      {
        "cat_id": "planes",
        "name": "Planes"
      }
    ],
    "is_favourite": false
  },
  {
    "bp_id": "BVQKBG3JADDRH1O682ND",
    "name": "Artemis 2",
    "image": "artemis2.webp",
    "fdownloads": 2717,
    "flikes": 1923,
    "fviews": 3575,
    "fshare": 10,
    "comments": 4,
    "description": "High-precision recreation of NASA Artemis II SLS Orion rocket for Spaceflight Simulator.",
    "sfs_link": "https://sharing.spaceflightsimulator.app/rocket/Artemis-2-SLS",
    "zipfiles": "BVQKBG3JADDRH1O682ND.zip",
    "type": "blueprint",
    "user_id": "RX279P5UZ7II572B1YJ3",
    "user_name": "SADHU ASHOK KUMAR",
    "categories": [
      {
        "cat_id": "rockets",
        "name": "Rockets"
      }
    ],
    "is_favourite": false
  },
  {
    "bp_id": "YTSB7MVN0B7L1GHOO5SL",
    "name": "tt",
    "image": "7327FTNAUR2L82IQQ5RL.jpg",
    "fdownloads": 2,
    "flikes": 1,
    "fviews": 4,
    "fshare": 0,
    "comments": 0,
    "description": "f",
    "sfs_link": "none",
    "zipfiles": "FV4EJCTNWST2PAXAZYHN.zip",
    "type": "planet",
    "user_id": "YP6H04X0QYABF72FEMYJ",
    "user_name": "Ashok space flight simulator [SFS]",
    "categories": [],
    "is_favourite": false
  },
  {
    "bp_id": "3WXLTOOIWHIQ0YSUE5ZR",
    "name": "x",
    "image": "D0Q6XBQGA2IUXP1EJE30.jpg",
    "fdownloads": 0,
    "flikes": 0,
    "fviews": 3,
    "fshare": 0,
    "comments": 0,
    "description": "d",
    "sfs_link": "d",
    "zipfiles": "5CU580BK4BWZFGSCH40C.zip",
    "type": "blueprint",
    "user_id": "YP6H04X0QYABF72FEMYJ",
    "user_name": "Ashok space flight simulator [SFS]",
    "categories": [],
    "is_favourite": false
  },
  {
    "bp_id": "FUZOI9WQC1IW8SBGUDXD",
    "name": "x",
    "image": "2RTC8IF51CJP9GYWV43D.jpg",
    "fdownloads": 0,
    "flikes": 0,
    "fviews": 0,
    "fshare": 0,
    "comments": 0,
    "description": "d",
    "sfs_link": "d",
    "zipfiles": "3MQO6WQ8S0B07VT2ENOH.zip",
    "type": "blueprint",
    "user_id": "YP6H04X0QYABF72FEMYJ",
    "user_name": "Ashok space flight simulator [SFS]",
    "categories": [],
    "is_favourite": false
  },
  {
    "bp_id": "3Y9E440PALSZF6Q506D7",
    "name": "x",
    "image": "71HCE9NOUC3BHUD7GF9B.jpg",
    "fdownloads": 0,
    "flikes": 0,
    "fviews": 0,
    "fshare": 0,
    "comments": 0,
    "description": "d",
    "sfs_link": "d",
    "zipfiles": "G36Y9P0XX06RQY82ZX18.zip",
    "type": "blueprint",
    "user_id": "YP6H04X0QYABF72FEMYJ",
    "user_name": "Ashok space flight simulator [SFS]",
    "categories": [],
    "is_favourite": false
  },
  {
    "bp_id": "TZSR4TCB1L4Z1S16GFZY",
    "name": "x",
    "image": "EZXB0V3DO1F7S9A5ZELG.jpg",
    "fdownloads": 0,
    "flikes": 0,
    "fviews": 0,
    "fshare": 0,
    "comments": 0,
    "description": "d",
    "sfs_link": "d",
    "zipfiles": "GUBK458N0I2ZP8TNPQ23.zip",
    "type": "blueprint",
    "user_id": "YP6H04X0QYABF72FEMYJ",
    "user_name": "Ashok space flight simulator [SFS]",
    "categories": [],
    "is_favourite": false
  },
  {
    "bp_id": "5JNTD2SCHPGBQDCPT7OC",
    "name": "x",
    "image": "GQGP3X7G2V2C91YUF5WE.jpg",
    "fdownloads": 0,
    "flikes": 0,
    "fviews": 0,
    "fshare": 0,
    "comments": 0,
    "description": "d",
    "sfs_link": "d",
    "zipfiles": "T8VDDPW3BFC4B2BPD846.zip",
    "type": "blueprint",
    "user_id": "YP6H04X0QYABF72FEMYJ",
    "user_name": "Ashok space flight simulator [SFS]",
    "categories": [],
    "is_favourite": false
  },
  {
    "bp_id": "QEH7FA1WYTE9SRYJHBTH",
    "name": "r",
    "image": "99Y0FW7V6OLRKHWCZCIY.jpg",
    "fdownloads": 0,
    "flikes": 0,
    "fviews": 2,
    "fshare": 0,
    "comments": 0,
    "description": "d",
    "sfs_link": "d",
    "zipfiles": "G8D9TM5BJ3XBD5D514HW.zip",
    "type": "blueprint",
    "user_id": "YP6H04X0QYABF72FEMYJ",
    "user_name": "Ashok space flight simulator [SFS]",
    "categories": [],
    "is_favourite": false
  }
];

function getLocalFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem('sfs_favorites');
    if (!raw) return new Set(['CREW_DRAGON_6254', 'FIRST_SPACE_STATION_385']);
    return new Set(JSON.parse(raw));
  } catch {
    return new Set(['CREW_DRAGON_6254', 'FIRST_SPACE_STATION_385']);
  }
}

function saveLocalFavorites(favs: Set<string>): void {
  try {
    localStorage.setItem('sfs_favorites', JSON.stringify(Array.from(favs)));
  } catch {}
}

export async function fetchSfsCategories(): Promise<SfsCategory[]> {
  if (!API_BASE_URL) {
    return FALLBACK_CATEGORIES.map((c) => ({
      ...c,
      bp_img: getSfsImageUrl(c.bp_img),
    }));
  }

  try {
    await fetch(`${API_BASE_URL}/apps/sfs/2_1/categories`, {
      headers: { Accept: 'application/json' },
    });
    return FALLBACK_CATEGORIES.map((c) => ({
      ...c,
      bp_img: getSfsImageUrl(c.bp_img),
    }));
  } catch (err) {
    console.warn('Using fallback SFS categories:', err);
  }

  return FALLBACK_CATEGORIES.map((c) => ({
    ...c,
    bp_img: getSfsImageUrl(c.bp_img),
  }));
}

export async function fetchSfsBlueprints(options?: {
  categoryId?: string | number;
  searchQuery?: string;
  page?: number;
  type?: 'blueprint' | 'planet' | 'mod' | 'all';
}): Promise<SfsBlueprint[]> {
  const localFavs = getLocalFavorites();
  const page = options?.page || 1;
  const targetType = options?.type ?? 'blueprint';

  if (API_BASE_URL) {
    try {
      let endpoint = `${API_BASE_URL}/apps/sfs/2_1/blueprints?off=${page}`;
      if (options?.searchQuery?.trim()) {
        endpoint = `${API_BASE_URL}/apps/sfs/2_1/search?query=${encodeURIComponent(options.searchQuery.trim())}`;
      } else if (options?.categoryId && options.categoryId !== 'all' && options.categoryId !== 'All') {
        endpoint = `${API_BASE_URL}/apps/sfs/2_1/inner_cat?category_id=${encodeURIComponent(String(options.categoryId))}`;
      }

      const res = await fetch(endpoint, {
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        const rawList = data.mods || data.results || data.blueprints || data.categories || [];
        if (Array.isArray(rawList) && rawList.length > 0) {
          return rawList.map((bp: any) => ({
            bp_id: String(bp.bp_id || bp.id),
            name: bp.name || 'Untitled Blueprint',
            image: getSfsImageUrl(bp.image),
            fdownloads: Number(bp.downloads || bp.fdownloads || 0),
            flikes: Number(bp.likes || bp.flikes || 0),
            fviews: Number(bp.views || bp.fviews || 0),
            fshare: Number(bp.share || bp.fshare || 0),
            comments: Number(bp.comments || 0),
            user_name: bp.user || bp.user__name || bp.user_name || 'Community Engineer',
            description: bp.description || '',
            sfs_link: bp.sfs_link || '',
            zipfiles: bp.zipfiles || `${bp.bp_id}.zip`,
            categories: Array.isArray(bp.categories)
              ? bp.categories.map((c: any) => ({
                  cat_id: c.cat_id || c.category_id || c.id || '1',
                  name: c.name || c.bp_name || 'Rocket',
                }))
              : [],
            is_favourite: localFavs.has(String(bp.bp_id)),
          }));
        }
      }
    } catch (err) {
      console.warn('Using fallback SFS blueprints:', err);
    }
  }

  let items = [...FALLBACK_BLUEPRINTS]
    .filter((b) => targetType === 'all' || (b.type || 'blueprint') === targetType)
    .map((b) => ({
      ...b,
      image: getSfsImageUrl(b.image),
      is_favourite: localFavs.has(b.bp_id),
    }));

  if (options?.searchQuery?.trim()) {
    const q = options.searchQuery.toLowerCase().trim();
    items = items.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.user_name.toLowerCase().includes(q) ||
        b.categories.some((c) => c.name.toLowerCase().includes(q))
    );
  } else if (options?.categoryId && options.categoryId !== 'all' && options.categoryId !== 'All') {
    const targetCat = String(options.categoryId).toLowerCase();
    items = items.filter((b) =>
      b.categories.some((c) => String(c.cat_id).toLowerCase() === targetCat || c.name.toLowerCase().includes(targetCat))
    );
  }

  return items;
}

export async function fetchSfsBlueprintDetail(identifier: string): Promise<SfsBlueprint | null> {
  const localFavs = getLocalFavorites();
  const cleanBpId = extractBpIdFromSlug(identifier);

  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/apps/sfs/2_1/blueprints/bp?bp_id=${encodeURIComponent(cleanBpId)}`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.status && data.blueprints) {
          const bp = data.blueprints;
          return {
            bp_id: String(bp.bp_id),
            name: bp.name || 'Untitled Blueprint',
            image: getSfsImageUrl(bp.image),
            fdownloads: Number(bp.fdownloads || 0),
            flikes: Number(bp.flikes || 0),
            fviews: Number(bp.fviews || 0),
            fshare: Number(bp.fshare || 0),
            comments: Number(bp.comments || 0),
            user_name: bp.user__name || bp.user || 'Community Engineer',
            description: bp.description || 'Detailed Spaceflight Simulator craft file.',
            sfs_link: bp.sfs_link || '',
            zipfiles: bp.zipfiles || `${bp.bp_id}.zip`,
            categories: bp.categories || [{ cat_id: 'rockets', name: 'Rockets' }],
            is_favourite: localFavs.has(String(bp.bp_id)),
          };
        }
      }
    } catch (err) {
      console.warn('Using fallback for blueprint detail:', err);
    }
  }

  const match = findBlueprintByIdentifier(identifier, FALLBACK_BLUEPRINTS);
  if (match) {
    return {
      ...match,
      image: getSfsImageUrl(match.image),
      is_favourite: localFavs.has(match.bp_id),
    };
  }

  return {
    ...FALLBACK_BLUEPRINTS[0],
    image: getSfsImageUrl(FALLBACK_BLUEPRINTS[0].image),
    is_favourite: localFavs.has(FALLBACK_BLUEPRINTS[0].bp_id),
  };
}

export async function fetchSfsFavorites(userId?: string): Promise<SfsBlueprint[]> {
  const localFavs = getLocalFavorites();

  if (userId && API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/apps/sfs/2_1/favorites?user_id=${encodeURIComponent(userId)}`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.status && Array.isArray(data.favorites) && data.favorites.length > 0) {
          return data.favorites.map((f: any) => ({
            bp_id: String(f.bp__bp_id || f.bp_id),
            name: f.bp__name || f.name,
            image: getSfsImageUrl(f.bp__image || f.image),
            fdownloads: Number(f.bp__fdownloads || 0),
            flikes: Number(f.bp__flikes || 0),
            fviews: Number(f.bp__fviews || 0),
            fshare: Number(f.bp__fshare || 0),
            comments: Number(f.bp__comments || 0),
            user_name: f.bp__user__name || 'SADHU ASHOK KUMAR',
            categories: [{ cat_id: 'fav', name: 'Favorited' }],
            is_favourite: true,
          }));
        }
      }
    } catch (err) {
      console.warn('Using local favorites:', err);
    }
  }

  return FALLBACK_BLUEPRINTS.filter((b) => localFavs.has(b.bp_id)).map((b) => ({
    ...b,
    image: getSfsImageUrl(b.image),
    is_favourite: true,
  }));
}

export async function toggleSfsFavorite(bpId: string, userId = 'anonymous'): Promise<boolean> {
  const localFavs = getLocalFavorites();
  const willBeFav = !localFavs.has(bpId);

  if (willBeFav) {
    localFavs.add(bpId);
  } else {
    localFavs.delete(bpId);
  }
  saveLocalFavorites(localFavs);

  if (API_BASE_URL) {
    try {
      fetch(`${API_BASE_URL}/apps/sfs/like_blueprint?bp_id=${encodeURIComponent(bpId)}&user_id=${encodeURIComponent(userId)}`).catch(() => {});
    } catch {}
  }

  return willBeFav;
}

export async function downloadSfsBlueprint(blueprint: SfsBlueprint, userId = 'anonymous'): Promise<void> {
  const activeUtm = getActiveUtmSource() || 'web';

  try {
    fetch(`${API_BASE_URL || ''}/apps/sfs/2_1/insert_dlv?bp_id=${encodeURIComponent(blueprint.bp_id)}&type=downloads&download_type=zip&user_id=${encodeURIComponent(userId)}&utm_source=${encodeURIComponent(activeUtm)}`).catch(() => {});
  } catch {}

  // Log download activity in total_activity database logs
  logUtmRecord(`download:${blueprint.bp_id}`, { utmSource: activeUtm, userId });

  const rawZip = getSfsZipUrl(blueprint.zipfiles || `${blueprint.bp_id}.zip`);
  const directZipUrl = appendUtmToUrl(rawZip, activeUtm);
  window.open(directZipUrl, '_blank', 'noopener,noreferrer');
}

export async function fetchSfsPlanets(): Promise<SfsBlueprint[]> {
  return fetchSfsBlueprints({ type: 'planet' });
}

// ── Comment System API Integration ──────────────────────────────────────────

export interface CommentItem {
  id: string;
  user_id?: string;
  author: string;
  text: string;
  time: string;
  is_owner?: boolean;
  parent_id?: string | null;
  likes: number;
  is_liked: boolean;
  replies?: CommentItem[];
}

function getCommentLikes(): Set<string> {
  try {
    const raw = localStorage.getItem('sfs_comment_likes');
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function getCommentLikeCounts(): Record<string, number> {
  try {
    const raw = localStorage.getItem('sfs_comment_like_counts');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCommentLikeState(likes: Set<string>, counts: Record<string, number>): void {
  try {
    localStorage.setItem('sfs_comment_likes', JSON.stringify(Array.from(likes)));
    localStorage.setItem('sfs_comment_like_counts', JSON.stringify(counts));
  } catch {}
}

export function buildCommentTree(rawComments: CommentItem[]): CommentItem[] {
  const map = new Map<string, CommentItem>();
  const roots: CommentItem[] = [];

  rawComments.forEach((c) => {
    map.set(String(c.id), { ...c, replies: [] });
  });

  rawComments.forEach((c) => {
    const item = map.get(String(c.id))!;
    if (c.parent_id && map.has(String(c.parent_id))) {
      const parent = map.get(String(c.parent_id))!;
      parent.replies = parent.replies || [];
      parent.replies.push(item);
    } else {
      roots.push(item);
    }
  });

  return roots;
}

export async function fetchSfsComments(bpId: string, currentUserId?: string): Promise<CommentItem[]> {
  const likedSet = getCommentLikes();
  const countsMap = getCommentLikeCounts();
  const storageKey = `sfs_db_comments_${bpId}`;

  if (API_BASE_URL) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/apps/sfs/get_comments?bp_id=${encodeURIComponent(bpId)}&user_id=${encodeURIComponent(currentUserId || '')}`,
        { headers: { Accept: 'application/json' } }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.status && Array.isArray(data.comments)) {
          const loaded: CommentItem[] = data.comments.map((c: any) => {
            const cId = String(c.id);
            return {
              id: cId,
              user_id: c.user_id ? String(c.user_id) : undefined,
              author: c.author || 'Space Pilot',
              text: c.text || '',
              time: c.time || 'Recently',
              is_owner: Boolean(c.is_owner || (currentUserId && c.user_id === currentUserId)),
              parent_id: c.parent_id ? String(c.parent_id) : null,
              likes: countsMap[cId] ?? 0,
              is_liked: likedSet.has(cId),
            };
          });

          // Sync database comments to storage cache
          try {
            localStorage.setItem(storageKey, JSON.stringify(loaded));
          } catch {}

          return buildCommentTree(loaded);
        }
      }
    } catch (err) {
      console.warn('Backend comments unreachable, using local storage cache:', err);
    }
  }

  // Fallback to local storage cache (NO dummy comments!)
  try {
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      const parsed: CommentItem[] = JSON.parse(cached);
      const mapped = parsed.map((c) => ({
        ...c,
        likes: countsMap[c.id] ?? c.likes ?? 0,
        is_liked: likedSet.has(c.id),
      }));
      return buildCommentTree(mapped);
    }
  } catch {}

  // If no database comments exist yet, return empty list (NO DUMMY COMMENTS)
  return [];
}

export async function postSfsComment(params: {
  bpId: string;
  userId: string;
  authorName: string;
  text: string;
  parentId?: string | null;
}): Promise<CommentItem> {
  const storageKey = `sfs_db_comments_${params.bpId}`;
  let createdComment: CommentItem | null = null;

  if (API_BASE_URL) {
    try {
      const formData = new FormData();
      formData.append('bp_id', params.bpId);
      formData.append('user_id', params.userId);
      formData.append('comment_text', params.text);
      if (params.parentId) {
        formData.append('parent_id', params.parentId);
      }

      const res = await fetch(`${API_BASE_URL}/apps/sfs/add_comment`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status && data.comment) {
          createdComment = {
            id: String(data.comment.id),
            user_id: params.userId,
            author: data.comment.author || params.authorName,
            text: data.comment.text || params.text,
            time: 'Just now',
            is_owner: true,
            parent_id: params.parentId ? String(params.parentId) : null,
            likes: 0,
            is_liked: false,
            replies: [],
          };
        }
      }
    } catch (err) {
      console.warn('Backend add_comment failed, saving locally:', err);
    }
  }

  // Create locally if API is unavailable
  if (!createdComment) {
    createdComment = {
      id: `c_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      user_id: params.userId,
      author: params.authorName,
      text: params.text,
      time: 'Just now',
      is_owner: true,
      parent_id: params.parentId ? String(params.parentId) : null,
      likes: 0,
      is_liked: false,
      replies: [],
    };
  }

  // Save to persistent storage cache
  try {
    const cached = localStorage.getItem(storageKey);
    const list: CommentItem[] = cached ? JSON.parse(cached) : [];
    list.push(createdComment);
    localStorage.setItem(storageKey, JSON.stringify(list));
  } catch {}

  return createdComment;
}

export async function deleteSfsComment(commentId: string, userId: string, bpId: string): Promise<boolean> {
  const storageKey = `sfs_db_comments_${bpId}`;

  if (API_BASE_URL) {
    try {
      const formData = new FormData();
      formData.append('comment_id', commentId);
      formData.append('user_id', userId);
      await fetch(`${API_BASE_URL}/apps/sfs/delete_comment`, {
        method: 'POST',
        body: formData,
      });
    } catch (err) {
      console.warn('Backend delete_comment failed:', err);
    }
  }

  // Remove from local storage cache (including any replies attached to it)
  try {
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      const list: CommentItem[] = JSON.parse(cached);
      const filtered = list.filter((c) => c.id !== commentId && c.parent_id !== commentId);
      localStorage.setItem(storageKey, JSON.stringify(filtered));
    }
  } catch {}

  return true;
}

export function toggleSfsCommentLike(commentId: string): { is_liked: boolean; likes: number } {
  const likes = getCommentLikes();
  const counts = getCommentLikeCounts();
  const isLiked = !likes.has(commentId);

  if (isLiked) {
    likes.add(commentId);
    counts[commentId] = (counts[commentId] || 0) + 1;
  } else {
    likes.delete(commentId);
    counts[commentId] = Math.max(0, (counts[commentId] || 1) - 1);
  }

  saveCommentLikeState(likes, counts);

  if (API_BASE_URL) {
    try {
      fetch(`${API_BASE_URL}/apps/sfs/like_comment?comment_id=${encodeURIComponent(commentId)}`).catch(() => {});
    } catch {}
  }

  return { is_liked: isLiked, likes: counts[commentId] };
}

