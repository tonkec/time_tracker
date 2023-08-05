import { Menubar } from 'primereact/menubar';
import { ReactSVG } from 'react-svg';
import clock from './../../icons/clock.svg';
import quit from './../../icons/quit.svg';
import history from './../../icons/history.svg';
import logo from './../../icons/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

type NavbarType = {
  isAuthenticated: boolean;
};

const Navbar = ({ isAuthenticated }: NavbarType) => {
  const { logout } = useAuth();

  const onLogout = () => {
    signOut(auth)
      .then(() => {
        logout();
        console.log('Signed out successfully');
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const items = [
    {
      template: () => (
        <NavLink
          className={(props) => (props.isActive ? 'active' : undefined)}
          to="/"
        >
          <span>
            <ReactSVG
              beforeInjection={(svg) => {
                svg.classList.add('svg-icon');
              }}
              src={clock}
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                marginRight: 10,
              }}
            />
            <span style={{ color: '#fff', marginRight: 50 }}>Trackers</span>
          </span>
        </NavLink>
      ),
    },
    {
      template: () => (
        <NavLink
          className={(props) => (props.isActive ? 'active' : undefined)}
          to="/history"
        >
          <span>
            <ReactSVG
              beforeInjection={(svg) => {
                svg.classList.add('svg-icon');
              }}
              src={history}
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                marginRight: 10,
              }}
            />
            <span style={{ color: '#fff', marginRight: 50 }}>History</span>
          </span>
        </NavLink>
      ),
    },
    {
      template: () => {
        return (
          <span onClick={onLogout} style={{ cursor: 'pointer' }}>
            <ReactSVG
              beforeInjection={(svg) => {
                svg.classList.add('svg-icon');
              }}
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                marginRight: 10,
              }}
              src={quit}
            />{' '}
            <span style={{ color: '#fff', marginRight: 50 }}>Logout</span>
          </span>
        );
      },
    },
  ];

  return (
    <Menubar
      style={{
        justifyContent: 'space-between',

        alignItems: 'stretch',
      }}
      start={() => (
        <>
          <ReactSVG
            src={logo}
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          />{' '}
          <span
            style={{
              color: '#fff',
              fontSize: 24,
              marginLeft: 10,
              verticalAlign: 'middle',
            }}
          >
            Tracking tool
          </span>
        </>
      )}
      model={isAuthenticated ? items : []}
    />
  );
};

export default Navbar;
