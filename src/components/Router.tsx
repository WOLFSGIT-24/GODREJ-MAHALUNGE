import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';
import TermsPage from '@/components/pages/TermsPage';
import ThankYouPage from '@/components/pages/ThankYouPage';
import StatusPage from '@/components/pages/StatusPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "terms-and-conditions",
        element: <TermsPage />,
      },
      {
        path: "thank-you",
        element: <ThankYouPage />,
      },
      {
        path: "*",
        element: <StatusPage variant="not-found" />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
