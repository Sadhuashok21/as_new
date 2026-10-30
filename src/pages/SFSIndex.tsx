import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { fetchSfsCategories, fetchSfsBlueprints, type SfsCategory, type SfsBlueprint } from '../api/sfsApi';
import { getSfsImageUrl } from '../utils/cdn';
import '../assets/css/SFSIndex.css';

export default function SFSIndex() {
    useSEO({
        title: "ASHOK SFS || Spaceflight Simulator",
        description: "Discover, download, and share spacecraft blueprints for Spaceflight Simulator. Join 310,000+ builders pushing the limits of what's possible.",
        keywords: "SFS Blueprints, Spaceflight Simulator, SFS rockets, spacecraft, rovers, space stations, blueprint sharing",
    });

    const [cats, setCats] = useState<SfsCategory[]>([
        {
            category_id: 'iss',
            bp_name: 'International Space Station',
            bp_img: 'https://cdn.ascentracoresolutions.com/sfs/images/iss.webp',
            blueprint_count: 1
        },
        {
            category_id: 'rockets',
            bp_name: 'Rockets',
            bp_img: 'https://cdn.ascentracoresolutions.com/sfs/images/rockets.webp',
            blueprint_count: 3
        },
        {
            category_id: 'satellite',
            bp_name: 'Satellite',
            bp_img: 'https://cdn.ascentracoresolutions.com/sfs/images/satellite.webp',
            blueprint_count: 1
        },
        {
            category_id: 'capsules',
            bp_name: 'Capsules',
            bp_img: 'https://cdn.ascentracoresolutions.com/sfs/images/capsules.webp',
            blueprint_count: 1
        },
        {
            category_id: 'rovers',
            bp_name: 'Rovers',
            bp_img: 'https://cdn.ascentracoresolutions.com/sfs/images/rovers.webp',
            blueprint_count: 0
        },
        {
            category_id: 'aircraft_carrier',
            bp_name: 'Aircraft Carrier',
            bp_img: 'https://cdn.ascentracoresolutions.com/sfs/images/aircraft_carrier.webp',
            blueprint_count: 1
        },
    ]);

    const [bp, setBp] = useState<SfsBlueprint[]>([
        {
            bp_id: 'ARTEMIS_2_892',
            name: 'Artemis 2',
            image: 'https://cdn.ascentracoresolutions.com/sfs/images/artemis2.webp',
            fdownloads: 892,
            flikes: 745,
            fviews: 3100,
            user_name: 'SADHU ASHOK KUMAR',
            categories: [{ cat_id: 'rockets', name: 'Rockets' }]
        },
        {
            bp_id: 'FIRST_SPACE_STATION_385',
            name: 'First Space Station',
            image: 'https://cdn.ascentracoresolutions.com/sfs/images/first_space_station.webp',
            fdownloads: 385,
            flikes: 420,
            fviews: 1250,
            user_name: 'SADHU ASHOK KUMAR',
            categories: [{ cat_id: 'iss', name: 'International Space Station' }]
        },
        {
            bp_id: 'CREW_DRAGON_6254',
            name: 'Crew Dragon',
            image: 'https://cdn.ascentracoresolutions.com/sfs/images/crew_dragon.webp',
            fdownloads: 625,
            flikes: 512,
            fviews: 2400,
            user_name: 'SADHU ASHOK KUMAR',
            categories: [{ cat_id: 'capsules', name: 'Capsules' }]
        },
    ]);

    useEffect(() => {
        let mounted = true;
        fetchSfsCategories().then((res) => {
            if (mounted && res && res.length > 0) {
                setCats(res.slice(0, 10));
            }
        });
        fetchSfsBlueprints().then((res) => {
            if (mounted && res && res.length > 0) {
                setBp(res.slice(0, 6));
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="sfs-index-page">
            <div className="total-interface"></div>

            {/* ── Navbar ───────────────────────────────────────────────────── */}
            <div className="navbar" style={{ padding: '0.75rem 2rem' }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="https://cdn.ascentracoresolutions.com/sfs/images/ashoksfs.webp" alt="SFS Blueprints Logo" className="navbar-logo" style={{ objectFit: 'contain', width: '40px', height: '40px', borderRadius: '50%' }} />
                    <b style={{ fontSize: '1.25rem', color: '#fff' }}>SFS Blueprints</b>
                </div>
                <ul className="nav-links">
                    <li>
                        <a href="#ready">Explore</a>
                    </li>
                    <li>
                        <a href="#categories">Categories</a>
                    </li>
                    <li>
                        <a href="#trending">Trending</a>
                    </li>
                    <li>
                        <a href="#mobile-app">Mobile App</a>
                    </li>
                    <li>
                        <Link to="/sfs/home">Dashboard</Link>
                    </li>
                </ul>

                <div className="sign-in">
                    <Link to="/login">
                        <button style={{ cursor: 'pointer' }}>Sign in</button>
                    </Link>
                    <Link to="/sfs/home">
                        <button style={{ cursor: 'pointer' }}>Get Started</button>
                    </Link>
                </div>
            </div>

            {/* ── Hero Interface Section ───────────────────────────────────── */}
            <div className="interface">
                <div className="tag-chip">
                    <svg width="16" height="16" fill="currentColor" className="as as-stars" viewBox="0 0 16 16">
                        <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                    </svg>
                    THE #1 BLUEPRINT COMMUNITY FOR SFS
                </div>

                <h1 className="head">Build the Universe <br />One <span className="high">Blueprint</span> at a Time</h1>
                <p className="para">Discover, download, and share spacecraft blueprints for Spaceflight Simulator. Join 310,000+ builders pushing the limits of what's possible.</p>

                <div className="btns">
                    <Link to="/blueprints">
                        <button>
                            <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                            </svg>
                            EXPLORE BLUEPRINTS
                        </button>
                    </Link>
                    <button onClick={() => window.open('https://www.youtube.com/shorts/DRHggrCNQt8', '_blank')} >
                        <svg width="16" height="16" fill="currentColor" className="as as-youtube" viewBox="0 0 16 16">
                            <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                        </svg>
                        WATCH DEMO
                        <svg width="16" height="16" fill="currentColor" className="as as-box-arrow-up-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                            <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                        </svg>
                    </button>
                </div>

                <div className="interface-boxes">
                    <div className="interface-box">
                        <div className="icon">
                            <svg width="16" height="16" fill="currentColor" className="as as-share" viewBox="0 0 16 16">
                                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                            </svg>
                        </div>
                        <h1>900K+</h1>
                        <p>Blueprints Shared</p>
                    </div>
                    <div className="interface-box">
                        <div className="icon">
                            <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                            </svg>
                        </div>
                        <h1>50K+</h1>
                        <p>Downloads</p>
                    </div>
                    <div className="interface-box">
                        <div className="icon">
                            <svg width="16" height="16" fill="currentColor" className="as as-person-check-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                        </div>
                        <h1>100+</h1>
                        <p>Active Builders</p>
                    </div>
                    <div className="interface-box">
                        <div className="icon">
                            <svg width="16" height="16" fill="currentColor" className="as as-star" viewBox="0 0 16 16">
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                            </svg>
                        </div>
                        <h1>4.8</h1>
                        <p>App Rating</p>
                    </div>
                </div>
            </div>

            {/* ── Categories Section ───────────────────────────────────────── */}
            <div id="categories">
                <h2>BROWSE BY TYPE</h2>
                <p>Every Category. Every Mission.</p>

                <div className="categories-boxes">
                    {cats.map((cat) => (
                        <Link key={cat.category_id} to={`/blueprints?category_id=${cat.category_id}`} title={cat.bp_name}>
                            <div className="cat-box">
                                <img
                                    src={getSfsImageUrl(cat.bp_img)}
                                    alt={cat.bp_name}
                                    className="cat_img"
                                    style={{ borderRadius: '0.5rem' }}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = "https://cdn.ascentracoresolutions.com/sfs/images/ashoksfs.webp";
                                    }}
                                />
                                <div className="icon">
                                    <h2>{cat.bp_name}</h2>
                                    <p>{cat.blueprint_count} Blueprints</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <br /><br />

            {/* ── Trending Section ────────────────────────────────────────── */}
            <div id="trending">
                <p>TRENDING NOW</p>
                <div className="bp_head">
                    <h1>Top Blueprints This Week</h1>
                </div>

                <div id="blueprint">
                    {bp.map((blueprint) => (
                        <div key={blueprint.bp_id} className="blueprint">
                            <img
                                src={getSfsImageUrl(blueprint.image)}
                                alt={blueprint.name}
                                className="blueprint_img"
                                fetchPriority="high"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = "https://cdn.ascentracoresolutions.com/sfs/images/ashoksfs.webp";
                                }}
                            />
                            <br />

                            <div className="bb">
                                <h2>{blueprint.name}</h2>

                                <div className="categories">
                                    {blueprint.categories.map((c, cIdx) => {
                                        const catId = c.cat_id || (c as unknown as { category_id?: string | number }).category_id || cIdx;
                                        return (
                                            <div key={catId} className="category">
                                                <Link to={`/blueprints?category_id=${catId}`}>{c.name}</Link>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="blue_down">
                                    <span>{blueprint.user_name}</span>
                                    <div className="blue_down_icon">
                                        <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                        </svg>{blueprint.fdownloads}
                                    </div>
                                </div>

                                <Link to={`/blueprints?bp_id=${blueprint.bp_id}`} style={{ width: '100%' }}>
                                    <button className="download_btn_h">
                                        <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                        </svg>Download Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Link to="/blueprints">
                        <button className="all_bp">
                            View All Blueprints
                            <svg width="16" height="16" fill="currentColor" className="as as-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>

            {/* ── Features Section ────────────────────────────────────────── */}
            <div className="builders" id="builders">
                <h1>Everything You Need to Launch</h1>
                <p>Powerful tools for discovering, sharing, and organizing spacecraft blueprints. Built by the SFS community, for the SFS community.</p>

                <div className="boxes">
                    <div className="box">
                        <div className="icon">
                            <svg width="16" height="16" fill="currentColor" className="as as-download" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                            </svg>
                        </div>
                        <h2>One - Click Import</h2>
                        <p>Download blueprints directly into Spaceflight Simulator. No manual file transfers, no confusion.</p>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <svg width="16" height="16" fill="currentColor" className="as as-graph-up-arrow" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </div>
                        <h2>Trending Feed</h2>
                        <p>Discover what the community is building right now. Fresh blueprints surface every hour.</p>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <svg width="16" height="16" fill="currentColor" className="as as-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </div>
                        <h2>Smart Search</h2>
                        <p>Filter by category, tag, creator, or complexity. Find the exact blueprint you need instantly.</p>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <svg width="16" height="16" fill="currentColor" className="as as-patch-check" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                            </svg>
                        </div>
                        <h2>Verified Quality</h2>
                        <p>Every blueprint is tested and rated by the community. Premium builds are editor-curated.</p>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <svg width="16" height="16" fill="currentColor" className="as as-share" viewBox="0 0 16 16">
                                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                            </svg>
                        </div>
                        <h2>Share Your Work</h2>
                        <p>Upload your own designs and gain followers. Build your reputation in the SFS community.</p>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <svg width="16" height="16" fill="currentColor" className="as as-clock-history" viewBox="0 0 16 16">
                                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </div>
                        <h2>Version History</h2>
                        <p>Track blueprint revisions and updates. Always access the latest or roll back to a previous version.</p>
                    </div>
                </div>
            </div>

            {/* ── Mobile App Section (from sfs_index.html) ────────────────── */}
            <div className="mobile-app" id="mobile-app">
                <h1>Browse on the Go.</h1>
                <h2>Always Inspired.</h2>

                <div className="app_cont">
                    <p>The SFS Blueprints Android app puts 48,000+ designs in your pocket. Save favorites, get notified when your favorite creators post, and import blueprints directly into the game.</p>

                    <div className="previews">
                        <img src="https://cdn.ascentracoresolutions.com/sfs/images/app_pre.webp" className="app_pre" alt="Preview" />
                        <img src="https://cdn.ascentracoresolutions.com/sfs/images/app_pre2.webp" className="app_pre" alt="Preview 2" />
                    </div>
                </div>

                <br /><br />
                <div className="btns">
                    <a href="https://play.google.com/store/apps/details?id=in.ashokworld.sfsblueprints" title="Google Play App" target="_blank" rel="noreferrer">
                        <svg width="122" height="36" viewBox="0 0 122 36" className="as as-google-play" style={{ cursor: 'pointer' }}>
                            <defs>
                                <linearGradient x1="91.407%" y1="4.961%" x2="-38.353%" y2="71.942%" id="ga">
                                    <stop stopColor="#00A0FF" offset="0%" />
                                    <stop stopColor="#00A1FF" offset=".657%" />
                                    <stop stopColor="#00BEFF" offset="26.01%" />
                                    <stop stopColor="#00D2FF" offset="51.22%" />
                                    <stop stopColor="#00DFFF" offset="76.04%" />
                                    <stop stopColor="#00E3FF" offset="100%" />
                                </linearGradient>
                                <linearGradient x1="107.61%" y1="50.017%" x2="-130.522%" y2="50.017%" id="gb">
                                    <stop stopColor="#FFE000" offset="0%" />
                                    <stop stopColor="#FFBD00" offset="40.87%" />
                                    <stop stopColor="#FFA500" offset="77.54%" />
                                    <stop stopColor="#FF9C00" offset="100%" />
                                </linearGradient>
                                <linearGradient x1="86.247%" y1="17.849%" x2="-50.121%" y2="194.763%" id="gc">
                                    <stop stopColor="#FF3A44" offset="0%" />
                                    <stop stopColor="#C31162" offset="100%" />
                                </linearGradient>
                                <linearGradient x1="-18.79%" y1="-54.184%" x2="42.103%" y2="24.858%" id="gd">
                                    <stop stopColor="#32A071" offset="0%" />
                                    <stop stopColor="#2DA771" offset="6.85%" />
                                    <stop stopColor="#15CF74" offset="47.62%" />
                                    <stop stopColor="#06E775" offset="80.09%" />
                                    <stop stopColor="#00F076" offset="100%" />
                                </linearGradient>
                            </defs>
                            <g fill="none" fillRule="evenodd">
                                <path d="M117.48 36H4.52C2.03 36 0 33.97 0 31.5v-27C0 2.02 2.03 0 4.52 0h112.96c2.49 0 4.52 2.02 4.52 4.5v27c0 2.47-2.03 4.5-4.52 4.5z" fill="#000" />
                                <path d="M117.48.72c2.09 0 3.8 1.7 3.8 3.78v27c0 2.08-1.7 3.78-3.8 3.78H4.52c-2.09 0-3.8-1.7-3.8-3.78v-27c0-2.08 1.7-3.78 3.8-3.78h112.96zm0-.72H4.52C2.03 0 0 2.03 0 4.5v27C0 33.98 2.03 36 4.52 36h112.96c2.49 0 4.52-2.02 4.52-4.5v-27c0-2.47-2.03-4.5-4.52-4.5z" fill="#A6A6A6" />
                                <path d="M42.68 9.22c0 .75-.22 1.35-.67 1.8-.51.53-1.17.8-1.98.8-.78 0-1.44-.27-1.99-.81S37.22 9.8 37.22 9c0-.8.27-1.47.82-2.01.54-.54 1.21-.81 1.99-.81.39 0 .76.08 1.11.23.35.15.63.35.84.6l-.48.47c-.36-.43-.85-.64-1.48-.64-.57 0-1.06.2-1.47.6-.41.4-.62.92-.62 1.56s.21 1.16.62 1.56c.41.4.91.6 1.47.6.6 0 1.11-.2 1.51-.6.26-.26.41-.63.45-1.09h-1.96v-.66h2.62c.02.14.04.28.04.41zm4.14-2.26h-2.46v1.71h2.22v.65h-2.22v1.71h2.46v.66h-3.15V6.3h3.15zm2.93 4.74h-.69V6.96h-1.51V6.3h3.71v.66h-1.51v4.74zm4.19 0V6.3h.69v5.4zm3.78 0h-.69V6.96h-1.51V6.3h3.71v.66h-1.51v4.74zm8.53-.7c-.53.55-1.19.82-1.98.82s-1.45-.27-1.98-.82a2.77 2.77 0 0 1-.8-2c0-.79.26-1.46.8-2 .53-.55 1.19-.82 1.98-.82.78 0 1.44.27 1.98.82.53.55.8 1.21.8 2-.01.79-.27 1.46-.8 2zm-3.45-.45c.4.4.89.61 1.47.61s1.07-.2 1.47-.61c.4-.4.6-.92.6-1.55s-.2-1.15-.6-1.55c-.4-.4-.89-.61-1.47-.61s-1.07.2-1.47.61c-.4.4-.6.92-.6 1.55s.2 1.15.6 1.55zm5.22 1.15V6.3h.84l2.62 4.2h.03l-.03-1.04V6.3h.69v5.4h-.72L68.7 7.3h-.03l.03 1.04v3.36z" stroke="#FFF" strokeWidth=".18" fill="#FFF" />
                                <path d="M61.32 19.58c-2.12 0-3.84 1.61-3.84 3.83 0 2.2 1.73 3.83 3.84 3.83 2.12 0 3.84-1.62 3.84-3.83 0-2.22-1.72-3.83-3.84-3.83zm0 6.14c-1.16 0-2.16-.96-2.16-2.32 0-1.38 1-2.32 2.16-2.32 1.16 0 2.16.94 2.16 2.32 0 1.37-1 2.32-2.16 2.32zm-8.38-6.14c-2.12 0-3.84 1.61-3.84 3.83 0 2.2 1.73 3.83 3.84 3.83 2.12 0 3.84-1.62 3.84-3.83 0-2.22-1.72-3.83-3.84-3.83zm0 6.14c-1.16 0-2.16-.96-2.16-2.32 0-1.38 1-2.32 2.16-2.32 1.16 0 2.16.94 2.16 2.32 0 1.37-1 2.32-2.16 2.32zm-9.97-4.97v1.62h3.89c-.12.91-.42 1.58-.88 2.04-.57.57-1.45 1.19-3 1.19-2.39 0-4.26-1.93-4.26-4.32 0-2.39 1.87-4.32 4.26-4.32 1.29 0 2.23.51 2.93 1.16l1.15-1.15c-.97-.93-2.26-1.64-4.07-1.64-3.28 0-6.03 2.67-6.03 5.94 0 3.28 2.75 5.94 6.03 5.94 1.77 0 3.1-.58 4.15-1.67 1.07-1.07 1.41-2.58 1.41-3.8 0-.38-.03-.72-.09-1.01h-5.49v.02zm40.78 1.26c-.32-.86-1.29-2.44-3.28-2.44-1.97 0-3.61 1.55-3.61 3.83 0 2.15 1.62 3.83 3.8 3.83 1.75 0 2.77-1.07 3.19-1.7l-1.3-.87c-.43.64-1.03 1.06-1.88 1.06-.86 0-1.46-.39-1.86-1.16l5.12-2.12-.18-.43zm-5.22 1.28c-.04-1.48 1.15-2.23 2-2.23.67 0 1.23.33 1.42.81l-3.42 1.42zM74.37 27h1.68V15.75h-1.68V27zm-2.76-6.57h-.06c-.38-.45-1.1-.86-2.02-.86-1.91 0-3.67 1.68-3.67 3.84 0 2.15 1.75 3.81 3.67 3.81.91 0 1.64-.41 2.02-.87h.06v.55c0 1.46-.78 2.25-2.04 2.25-1.03 0-1.67-.74-1.93-1.36l-1.46.61c.42 1.01 1.54 2.26 3.39 2.26 1.97 0 3.64-1.16 3.64-3.99V19.8h-1.59v.63h-.01zm-1.93 5.29c-1.16 0-2.13-.97-2.13-2.31 0-1.35.97-2.33 2.13-2.33 1.15 0 2.04.99 2.04 2.33.01 1.34-.89 2.31-2.04 2.31zm21.94-9.97H87.6V27h1.68v-4.26h2.34c1.86 0 3.69-1.35 3.69-3.49s-1.82-3.5-3.69-3.5zm.05 5.42h-2.39v-3.86h2.39c1.26 0 1.97 1.04 1.97 1.93 0 .88-.72 1.93-1.97 1.93zm10.38-1.61c-1.22 0-2.48.54-3 1.72l1.49.62c.32-.62.91-.83 1.53-.83.87 0 1.75.52 1.77 1.45v.12c-.3-.17-.96-.43-1.75-.43-1.61 0-3.24.88-3.24 2.53 0 1.51 1.32 2.48 2.79 2.48 1.13 0 1.75-.51 2.14-1.1h.06v.87h1.62v-4.31c0-2.01-1.49-3.12-3.41-3.12zm-.21 6.16c-.55 0-1.32-.27-1.32-.96 0-.87.96-1.2 1.78-1.2.74 0 1.09.16 1.53.38a2.022 2.022 0 0 1-1.99 1.78zm9.53-5.92l-1.93 4.88h-.06l-2-4.88h-1.81l3 6.82-1.71 3.79h1.75l4.62-10.61h-1.86zM96.24 27h1.68V15.75h-1.68V27z" fill="#FFF" />
                                <path d="M1.39.78c-.26.28-.41.71-.41 1.27v19.9c0 .56.15.99.42 1.26l.07.06 11.15-11.15v-.25L1.46.72l-.07.06z" fill="url(#ga)" transform="translate(8 6)" />
                                <path d="M16.33 15.85l-3.72-3.72v-.26l3.72-3.72.08.05 4.4 2.5c1.26.71 1.26 1.88 0 2.6l-4.4 2.5-.08.05z" fill="url(#gb)" transform="translate(8 6)" />
                                <path d="M16.41 15.8l-3.8-3.8L1.39 23.22c.41.44 1.1.49 1.87.06l13.15-7.48" fill="url(#gc)" transform="translate(8 6)" />
                                <path d="M16.41 8.2L3.26.73C2.49.29 1.8.35 1.39.79L12.61 12l3.8-3.8z" fill="url(#gd)" transform="translate(8 6)" />
                                <path d="M24.33 21.72l-13.06 7.42c-.73.42-1.38.39-1.8.01l-.07.07.07.06c.42.38 1.07.41 1.8-.01l13.15-7.47-.09-.08z" opacity=".2" fill="#000" />
                                <path d="M28.81 19.17l-4.49 2.55.08.08 4.4-2.5c.63-.36.94-.83.94-1.3-.04.43-.36.84-.93 1.17z" fill="#000" opacity=".12" />
                                <path d="M11.26 6.86l17.55 9.97c.57.32.89.74.94 1.17 0-.47-.31-.94-.94-1.3L11.26 6.73C10 6.01 8.98 6.61 8.98 8.05v.13c0-1.44 1.02-2.03 2.28-1.32z" fill="#FFF" opacity=".25" />
                            </g>
                        </svg>
                    </a>
                    <Link to="/blueprints">
                        <button>
                            <svg width="16" height="16" fill="currentColor" className="as as-globe" viewBox="0 0 16 16">
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                            </svg>
                            USE ON WEB
                        </button>
                    </Link>
                </div>
            </div>
            <div className="ready" id="ready">
                <svg width="16" height="16" fill="currentColor" className="as as-rocket-takeoff" viewBox="0 0 16 16">
                    <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362s.96-1.932.362-2.531c-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532" />
                    <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9 9 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a10 10 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093q.1.026.16.045c.184.06.279.13.351.295l.029.073a3.5 3.5 0 0 1 .157.721c.055.485.051 1.178-.159 2.065m-4.828 7.475.04-.04-.107 1.081a1.54 1.54 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a9 9 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006M5.205 5c-.625.626-.94 1.351-1.004 2.09a9 9 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a3 3 0 0 0-.045-.283 3 3 0 0 0-.3-.041Z" />
                    <path style={{ color: 'yellow' }} d="M7.009 12.139a7.6 7.6 0 0 1-1.804-1.352A7.6 7.6 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z" />
                </svg>
                <h1>Ready for Liftoff?</h1>
                <p>Join 310,000 engineers, dreamers, and space obsessives who are already building the future — one blueprint at a time.</p>

                <div className="btns">
                    <Link to="/blueprints">
                        <button>
                            <svg width="16" height="16" fill="currentColor" className="as as-lightning-charge" viewBox="0 0 16 16">
                                <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z" />
                            </svg>
                            START FOR FREE
                            <svg width="16" height="16" fill="currentColor" className="as as-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                        </button>
                    </Link>
                    <Link to="/blueprints">
                        <button>
                            <svg width="16" height="16" fill="currentColor" className="as as-globe" viewBox="0 0 16 16">
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                            </svg>
                            BROWSE FIRST
                        </button>
                    </Link>
                </div>
            </div>

            {/* ── Footer ─────────────────────────────────────────────────── */}
            <div className="footer">
                <footer>
                    <div className="footer-con">
                        <div className="footer-logo-con">
                            <img src="https://cdn.ascentracoresolutions.com/ascentra.webp" alt="Ascentracore Solutions Logo" className="footer-logo" style={{ objectFit: 'contain', width: '50px', height: '50px' }} />
                            <div className="footer-head">
                                <h1>SFS Blueprints</h1>
                                <p>The universe of spacecraft blueprints for Spaceflight Simulator builders.</p>
                                <ul className="social_media">
                                    <li>
                                        <a href="https://www.instagram.com/ascentracoresolutions" title="Instagram" target="_blank" rel="noreferrer">
                                            <svg width="16" height="16" fill="currentColor" className="as as-instagram" viewBox="0 0 16 16">
                                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/@AscentracoreSolutions" title="Youtube" target="_blank" rel="noreferrer">
                                            <svg width="16" height="16" fill="currentColor" className="as as-youtube" viewBox="0 0 16 16">
                                                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <ul>
                            <li><b>Discover</b></li>
                            <li><a href="#trending">Trending</a></li>
                            <li><Link to="/blueprints">New Releases</Link></li>
                            <li><a href="#categories">Categories</a></li>
                        </ul>

                        <ul>
                            <li><b>Community</b></li>
                            <li><a href="https://www.youtube.com/@AshokWorld." target="_blank" rel="noreferrer">Youtube</a></li>
                            <li><a href="https://telegram.me/s/ashokspaceflightsimulator" target="_blank" rel="noreferrer">Telegram</a></li>
                            <li><a href="https://policies.ascentracoresolutions.com/privacy" target="_blank" rel="noreferrer">Terms and policy</a></li>
                        </ul>

                        <ul>
                            <li><b>Platform</b></li>
                            <li><Link to="/upload">Upload</Link></li>
                            <li><Link to="/blueprints">Blueprints</Link></li>
                            <li><a href="https://play.google.com/store/apps/details?id=in.ashokworld.sfsblueprints" target="_blank" rel="noreferrer">Android App</a></li>
                        </ul>
                    </div>
                </footer>

                <div className="footer_as" style={{ padding: '1rem', borderTop: '1px solid #333' }}>
                    <div>
                        © Ascentracore Solutions 2026 || All rights reserved.
                    </div>
                    <div>
                        Powered by Ascentracore Solutions
                    </div>
                </div>
            </div>
        </div>
    );
}