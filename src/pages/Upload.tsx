import { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { useSEO } from '../hooks/useSEO';
import { fetchSfsCategories, type SfsCategory } from '../api/sfsApi';
import { useAuth } from '../auth/AuthContext';
import AccessRestricted from '../components/AccessRestricted';
import { logUtmRecord, getActiveUtmSource } from '../utils/utmTracker';
import '../assets/css/Upload.css';

export default function Upload() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  useSEO({
    title: 'Blueprint Upload || Ashok SFS',
    description: 'Share your custom rockets, rovers, and spacecraft blueprints with the Spaceflight Simulator community.',
    keywords: 'upload SFS blueprint, share rocket design, Spaceflight Simulator upload',
  });

  const [categories, setCategories] = useState<SfsCategory[]>([
    { category_id: 1, bp_name: 'Spacecraft', bp_img: '', blueprint_count: 0 },
    { category_id: 2, bp_name: 'Stations', bp_img: '', blueprint_count: 0 },
    { category_id: 3, bp_name: 'Launch Vehicles', bp_img: '', blueprint_count: 0 },
    { category_id: 4, bp_name: 'Rovers', bp_img: '', blueprint_count: 0 },
    { category_id: 5, bp_name: 'Satellites', bp_img: '', blueprint_count: 0 },
  ]);

  const [selectedCats, setSelectedCats] = useState<Set<string | number>>(new Set([1]));
  const [craftType, setCraftType] = useState('blueprint');
  const [sfsLink, setSfsLink] = useState('');
  const [zipFileName, setZipFileName] = useState('');
  const [imgFileName, setImgFileName] = useState('');
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [isZipDragging, setIsZipDragging] = useState(false);
  const [isImgDragging, setIsImgDragging] = useState(false);

  const zipInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mounted = true;
    fetchSfsCategories().then((cats) => {
      if (mounted && cats && cats.length > 0) {
        setCategories(cats);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const toggleCategory = (id: string | number) => {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const processZipFile = (file: File) => {
    if (file && (file.name.toLowerCase().endsWith('.zip') || file.type.includes('zip'))) {
      setZipFileName(file.name);
      if (zipInputRef.current) {
        try {
          const dt = new DataTransfer();
          dt.items.add(file);
          zipInputRef.current.files = dt.files;
        } catch {
          // DataTransfer fallback
        }
      }
    } else {
      alert('Please upload a valid .zip file');
    }
  };

  const processImageFile = (file: File) => {
    if (file && (file.type.startsWith('image/') || /\.(png|jpe?g|webp|avif)$/i.test(file.name))) {
      setImgFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => setImgPreview(reader.result as string);
      reader.readAsDataURL(file);

      if (imgInputRef.current) {
        try {
          const dt = new DataTransfer();
          dt.items.add(file);
          imgInputRef.current.files = dt.files;
        } catch {
          // DataTransfer fallback
        }
      }
    } else {
      alert('Please upload a valid image file (.png, .jpg, .webp)');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processZipFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logUtmRecord('upload_submit', { utmSource: getActiveUtmSource() || 'web' });
    const typeLabel = craftType === 'planet' ? 'Planet & world' : craftType === 'mod' ? 'Mod' : 'Blueprint';
    setMessage({
      text: `${typeLabel} submitted for community review! It will appear once verified.`,
      type: 'success',
    });
  };

  if (authLoading) {
    return (
      <Sidebar
        breadcrumbs={[
          { label: 'Blueprints', to: '/sfs/blueprints' },
          { label: 'Upload' },
        ]}
      >
        <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '32px', height: '32px', border: '3px solid rgba(147,51,234,0.3)', borderTopColor: '#a855f7', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        </div>
      </Sidebar>
    );
  }

  if (!isAuthenticated) {
    return (
      <Sidebar
        breadcrumbs={[
          { label: 'Blueprints', to: '/sfs/blueprints' },
          { label: 'Upload' },
        ]}
      >
        <AccessRestricted redirect={typeof window !== 'undefined' ? window.location.href : undefined} />
      </Sidebar>
    );
  }

  return (
    <Sidebar
      breadcrumbs={[
        { label: 'Blueprints', to: '/sfs/blueprints' },
        { label: 'Upload' },
      ]}
    >
      <div className="upload-page max-w-3xl mx-auto py-4">
        <h1 style={{ textAlign: 'center' }}>
          Upload {craftType === 'planet' ? 'Planet & World' : craftType === 'mod' ? 'Mod' : 'Blueprint'}
        </h1>
        <p className="design" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          Share your {craftType === 'planet' ? 'custom planet or world' : craftType === 'mod' ? 'mod or expansion' : 'blueprint'} with the community
        </p>

        {message && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              textAlign: 'center',
              backgroundColor: message.type === 'success' ? '#14532d' : '#7f1d1d',
              color: '#fff',
              fontSize: '14px',
            }}
          >
            {message.text}
          </div>
        )}

        <form
          id="uploadForm"
          className="upload_form"
          onSubmit={handleSubmit}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
        >
          <div className="bp_details">
            <h2>{craftType === 'planet' ? 'Planet' : craftType === 'mod' ? 'Mod' : 'Blueprint'} Details</h2>

            <label htmlFor="title">
              Title <span>*</span>
            </label>
            <input
              type="text"
              id="title"
              name="name"
              placeholder={
                craftType === 'planet'
                  ? 'e.g., Realistic Solar System'
                  : craftType === 'mod'
                  ? 'e.g., Custom Parts Pack or Texture Mod'
                  : 'e.g., Starship Super Heavy'
              }
              required
            />

            <label htmlFor="description">
              Description <span>*</span>
            </label>
            <textarea
              id="description"
              name="description"
              placeholder={
                craftType === 'planet'
                  ? 'A brief summary about your custom planet or solar system.'
                  : craftType === 'mod'
                  ? 'A brief summary about your mod, features, and installation instructions.'
                  : 'A brief summary about your file.'
              }
              rows={4}
              required
            />

            <label htmlFor="type">
              Type <span>*</span>
            </label>
            <select
              id="type"
              name="type"
              value={craftType}
              onChange={(e) => setCraftType(e.target.value)}
              required
            >
              <option value="blueprint">Blueprint</option>
              <option value="planet">Planet and world</option>
              <option value="mod">Mod</option>
            </select>

            {craftType === 'blueprint' && (
              <>
                <label>
                  Category <span>*</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '8px 0 16px 0' }}>
                  {categories.map((c) => {
                    const isActive = selectedCats.has(c.category_id);
                    return (
                      <span
                        key={c.category_id}
                        onClick={() => toggleCategory(c.category_id)}
                        className={`cat_span ${isActive ? 'active' : ''}`}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        {c.bp_name}
                      </span>
                    );
                  })}
                </div>

                <label htmlFor="bp_sharing" className="bp_sharing">
                  BP sharing <span>*</span>
                </label>
                <input
                  type="text"
                  id="bp_sharing"
                  name="sfs_link"
                  value={sfsLink}
                  onChange={(e) => setSfsLink(e.target.value)}
                  placeholder="https://sharing.spaceflightsimulator.app/rocket/..."
                  required
                />
              </>
            )}

            {craftType === 'mod' && (
              <>
                <label htmlFor="mod_sharing" className="bp_sharing">
                  Mod Source / Web Link <span style={{ color: 'var(--gray-400)', fontSize: '0.85em', fontWeight: 'normal' }}>(Optional)</span>
                </label>
                <input
                  type="text"
                  id="mod_sharing"
                  name="sfs_link"
                  value={sfsLink}
                  onChange={(e) => setSfsLink(e.target.value)}
                  placeholder="https://github.com/... or community forum link"
                />
              </>
            )}

            <div className="bp_file">
              <label htmlFor="file_bp" className="file" style={{ cursor: 'pointer', display: 'block' }}>
                <div className="bp_bp" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                  </svg>
                  <span>File</span> <span>*</span>
                </div>
                <div
                  className={`file_box ${isZipDragging ? 'dragover' : ''}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsZipDragging(true);
                  }}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsZipDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsZipDragging(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsZipDragging(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      processZipFile(file);
                    }
                  }}
                >
                  <svg width="32" height="32" fill="currentColor" className="as-upload" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                  </svg>
                  <h3>{zipFileName ? zipFileName : 'Drag & drop your file here'}</h3>
                  <p>{zipFileName ? 'Click or drop again to change file' : 'or click to browse'}</p>
                  <p className="support">Supported format: .zip</p>
                </div>
                <input
                  ref={zipInputRef}
                  type="file"
                  name="zip_file"
                  accept=".zip"
                  id="file_bp"
                  onChange={handleZipChange}
                  style={{ display: 'none' }}
                  required
                />
              </label>
            </div>

            <div className="img_file">
              <label htmlFor="file_img" className="file" style={{ cursor: 'pointer', display: 'block' }}>
                <div className="img_image" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                  </svg>
                  <span>Image</span> <span>*</span>
                </div>
                <div
                  className={`file_box ${isImgDragging ? 'dragover' : ''}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsImgDragging(true);
                  }}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsImgDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsImgDragging(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsImgDragging(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      processImageFile(file);
                    }
                  }}
                >
                  {imgPreview ? (
                    <img
                      src={imgPreview}
                      alt="Upload Preview"
                      style={{ maxHeight: '160px', margin: '0 auto 10px', borderRadius: '0.5rem' }}
                    />
                  ) : (
                    <svg width="32" height="32" fill="currentColor" className="as-image" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                      <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                    </svg>
                  )}
                  <h3>{imgFileName ? imgFileName : 'Drag & drop your images here'}</h3>
                  <p>{imgFileName ? 'Click or drop again to change image' : 'or click to browse'}</p>
                  <p className="support">Supported format: .png, .jpg, .jpeg, .webp</p>
                </div>
                <input
                  ref={imgInputRef}
                  type="file"
                  name="image"
                  id="file_img"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  required
                />
              </label>
            </div>

            <button className="upload_btn" type="submit">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
              </svg>
              Upload {craftType === 'planet' ? 'Planet / World' : craftType === 'mod' ? 'Mod' : 'Blueprint'}
            </button>
          </div>
        </form>
      </div>
    </Sidebar>
  );
}
