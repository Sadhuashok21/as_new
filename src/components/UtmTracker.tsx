import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackCurrentPageVisit } from '../utils/utmTracker';

/**
 * UtmTracker component that mounts inside <BrowserRouter>
 * Automatically listens to location changes, detects ?utm_source= across all pages,
 * persists the UTM data in session/local storage, and logs the visit into database logs.
 */
export function UtmTracker() {
  const location = useLocation();

  useEffect(() => {
    trackCurrentPageVisit(location.pathname, location.search);
  }, [location.pathname, location.search]);

  return null;
}

