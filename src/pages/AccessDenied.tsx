import { useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useSEO } from '../hooks/useSEO';
import AccessRestricted from '../components/AccessRestricted';

export default function AccessDenied() {
  const [searchParams] = useSearchParams();
  const redirectParam = searchParams.get('redirect') || (typeof window !== 'undefined' ? window.location.href : '');

  useSEO({
    title: 'Access Denied || Ashok SFS',
    description: 'Sign in to access blueprints upload, favorites, and exclusive space community features.',
    keywords: 'access restricted, sign in, spaceflight simulator blueprints',
  });

  return (
    <Sidebar
      breadcrumbs={[
        { label: 'Home', to: '/sfs' },
        { label: 'Access Denied' },
      ]}
    >
      <AccessRestricted redirect={redirectParam} />
    </Sidebar>
  );
}

