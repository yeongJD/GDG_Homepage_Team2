import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Intro from '@/pages/Intro';
import Activity from '@/pages/Activity';
import Member from '@/pages/Member';
import Login from '@/pages/Login';
import { ROUTES } from '@/constants/routes';

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={ROUTES.INTRO} element={<Intro />} />
            <Route path={ROUTES.ACTIVITY} element={<Activity />} />
            <Route path={ROUTES.MEMBER} element={<Member />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
