import { ReactNode } from 'react';
import Links from './Links';
import Navbar from '../../Navbar';
import { useAuth } from '../../../hooks/useAuth';
const AuthLayout = ({
  children,
  componentType,
}: {
  children: ReactNode;
  componentType: string;
}) => {
  const { user } = useAuth();

  return (
    <>
      <Navbar isAuthenticated={!!user} />
      <div className="h-screen flex align-items-center justify-content-center flex-column">
        <div className="text-center w-3 font-bold block mb-4 bg-gray-500 border-round-md">
          {children}
        </div>

        <Links componentType={componentType} />
      </div>
    </>
  );
};

export default AuthLayout;
