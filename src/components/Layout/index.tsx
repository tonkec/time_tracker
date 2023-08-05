import { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../Navbar';
import { Main } from './Layout.styles';

const Layout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar isAuthenticated={!!user} />
      <Main>{children}</Main>
    </div>
  );
};

export default Layout;
