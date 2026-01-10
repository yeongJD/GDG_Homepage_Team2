import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Intro from '@/pages/Intro';
import Activity from '@/pages/Activity';
import Member from '@/pages/Member';
import Profile from '@/pages/Profile';
import GoogleCallback from '@/pages/GoogleCallback';
import { ROUTES } from '@/constants/routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={ROUTES.GOOGLE_CALLBACK} element={<GoogleCallback />} />
          <Route path={ROUTES.HOME} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={ROUTES.INTRO} element={<Intro />} />
            <Route path={ROUTES.ACTIVITY} element={<Activity />} />
            <Route path={ROUTES.MEMBER} element={<Member />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
