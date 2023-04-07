import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../contexts/AuthContext';

export const CatalogItem = ({
    _id,
    _ownerId,
    _createdOn,
    title,
    genre,
    description,
    ownerName
}) => {
    
    const { isAuthenticated, userId } = useContext(AuthContext);

    return (
        <div className="allGames">
            <div className="allGames-info">
                <div className='genre'>{genre}</div>
                <div className='story-title'>{title}</div>
                <div className='description'>{description}</div>
                <div className='created-on'>Created on: {new Date(_createdOn).toLocaleString()}</div>
                <div className='created-on'>By: {ownerName}</div>
                {isAuthenticated && userId == _ownerId && (
                    <Link to={`/catalog/${_id}/edit`} className="edit-button">Edit story</Link>
                )}
                <Link to={`/catalog/${_id}`} className="details-button">Read story</Link>
            </div>
        </div>
    );
}