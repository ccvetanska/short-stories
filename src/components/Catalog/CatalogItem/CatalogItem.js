import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../contexts/AuthContext';

export const CatalogItem = ({
    _id,
    _ownerId,
    title,
    genre,
    description
}) => {
    
    const { isAuthenticated, userId } = useContext(AuthContext);

    return (
        <div className="allGames">
            <div className="allGames-info">
                <div className='genre'>{genre}</div>
                <div className='story-title'>{title}</div>
                <div className='description'>{description}</div>
                {isAuthenticated && userId == _ownerId && (
                    <Link to={`/catalog/${_id}/edit`} className="edit-button">Edit story</Link>
                )}
                <Link to={`/catalog/${_id}`} className="details-button">Read story</Link>
            </div>
        </div>
    );
}