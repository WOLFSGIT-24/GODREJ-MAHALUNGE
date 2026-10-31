import { useEffect } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import StatusPage from '@/components/pages/StatusPage';

// Shown when a page fails to render. Visitors get the branded page; the details go to the console only.
export default function ErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return <StatusPage variant={notFound ? 'not-found' : 'error'} />;
}
