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
        <div className="text-center md:w-6 lg:w-4 font-bold block mb-4">
          <div className="bg-gray-500 border-round-md pb-6 pt-3">
            {' '}
            {children}
          </div>

          <Links componentType={componentType} />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
