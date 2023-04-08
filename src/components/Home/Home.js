import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

export const Home = () => {
    const { isAuthenticated, userEmail } = useContext(AuthContext);

    return (
        <section id="welcome-world">
            {
            isAuthenticated &&
                (<div id="home-page">
                    <h1>Welcome, {userEmail}!</h1>

                    {/* <!-- Display paragraph: If there is no games  --> */}
                    <p className="no-articles">Check out our latest <Link className='stories-link' to="/catalog">stories</Link></p>
                </div>)
            }

            {!isAuthenticated &&
                (<div id="home-page">
                    <h1>Welcome, stranger!</h1>

                    {/* <!-- Display paragraph: If there is no games  --> */}
                    <p className="no-articles">Check out our latest <Link className='stories-link' to="/catalog">stories</Link></p>
                </div>)
            }
        </section>
    );
}