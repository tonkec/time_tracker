import user from './../../../../icons/user.svg';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';

const Links = ({ componentType }: { componentType: string }) => {
  return (
    <div className="mt-6 flex align-items-center font-bold block bg-gray-500 border-round-md">
      <ReactSVG src={user} style={{ marginBottom: -2, marginLeft: 30 }} />
      <div style={{ textAlign: 'left' }}>
        {componentType === 'login' ? (
          <>
            <span className="text-bluegray-500 font-normal mb-2 inline-block">
              Need an account?
            </span>
            <br />
            <Link to="/signup" className="text-orange-500">
              Register here
            </Link>
          </>
        ) : (
          <>
            <span className="text-bluegray-500 font-normal mb-2 inline-block">
              Already have an account?
            </span>
            <br />
            <Link to="/login" className="text-orange-500">
              Login here
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Links;
