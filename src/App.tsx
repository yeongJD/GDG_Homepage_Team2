import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import { ROUTES } from '@/constants/routes';

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Layout />}>
            <Route index element={<Home />} />
            {/* Add more routes here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
