import { Menubar } from 'primereact/menubar';
import { ReactSVG } from 'react-svg';
import clock from './../../icons/clock.svg';
import quit from './../../icons/quit.svg';
import history from './../../icons/history.svg';

type NavbarType = {
  isAuthenticated: boolean;
};

const Navbar = ({ isAuthenticated }: NavbarType) => {
  const items = [
    {
      template: () => (
        <span>
          Trackers{' '}
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add('svg-icon');
            }}
            src={clock}
          />
        </span>
      ),
    },
    {
      template: () => (
        <span>
          History{' '}
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add('svg-icon');
            }}
            src={history}
          />
        </span>
      ),
    },
    {
      template: () => (
        <span>
          Logout{' '}
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add('svg-icon');
            }}
            src={quit}
          />
        </span>
      ),
    },
  ];

  return <Menubar model={items} />;
};

export default Navbar;
