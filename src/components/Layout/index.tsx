import { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../Navbar';

const Layout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return (
    <>
      <Navbar isAuthenticated={!!user} />
      {children}
    </>
  );
};

export default Layout;
