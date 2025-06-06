import { NavLink, Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user }) {
    const navigate = useNavigate();
    function handleLogOut() {
        logOut();
        setUser(null);
        // navigate('/') not working; 
        // The<Link> that was clicked will navigate to '/'
        // Due to async issues

    }
  return (
    <nav className="NavBar">
      <NavLink to="/">HOME</NavLink>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <NavLink to="/posts" end>
            HOOTS
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/posts/new">NEW HOOT</NavLink>
          &nbsp; | &nbsp;
          <Link to="/" onClick={handleLogOut}>LOG OUT</Link>
          <span>Welcome, {user.name}</span>
        </>
      ) : (
        <>
          <NavLink to="/login">LOG IN</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/signup">SIGN UP</NavLink>
        </>
      )}
    </nav>
  );
}