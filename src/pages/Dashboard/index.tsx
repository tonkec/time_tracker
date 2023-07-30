import { useAuth } from '../../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import Timer from '../../components/Timer';

const Dashboard = () => {
  const { logout } = useAuth();

  const onClick = () => {
    signOut(auth)
      .then(() => {
        logout();
        console.log('Signed out successfully');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={onClick}>Log out</button>
      <Timer />
    </>
  );
};

export default Dashboard;
