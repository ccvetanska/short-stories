import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
    const { isAuthenticated, userEmail } = useContext(AuthContext);

    return (
        <header>
            <h1><Link className="home" to="/">Short Stories</Link></h1>
            <nav>
                <Link to="/catalog">All stories</Link>
                {isAuthenticated && (
                    <div id="user">
                        <Link to="/create-story">New story</Link>
                        <Link to="/my-stories">My stories</Link>
                        <span>( {userEmail} )</span>
                        <Link to="/logout">Logout</Link>
                    </div>
                )}

                {!isAuthenticated && (
                    <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};