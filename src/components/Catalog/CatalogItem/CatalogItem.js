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
    ownerName,
    readingList,
    updateReadingList,
    onStoryRemovedFromList,
    onStoryAddedToList
}
) => {

    const { isAuthenticated, userId } = useContext(AuthContext);
    const onRemoveClick = async () => {
        return onStoryRemovedFromList(_id);
    };

    const onAddClick = async () => {
        return onStoryAddedToList(_id);
    };

    return (
        <div className="allStories">
            <div className="allStories-info">
                <div className='genre'>{genre}</div>
                <div className='story-title'>{title}</div>
                <div className='description'>{description}</div>
                <div className='created-on'>Created on: {new Date(_createdOn).toLocaleString()}</div>
                <div className='created-on'>By: {ownerName}</div>
                {isAuthenticated && 
                ((readingList && readingList.length > 0 && readingList.indexOf(_id)!==-1 && (<button className="button reading-list remove-btn" onClick={onRemoveClick}>&nbsp;</button>))||
                ((!readingList || readingList.length === 0 || readingList.indexOf(_id) ===-1) && (<button className="button reading-list add-btn" onClick={onAddClick}>&nbsp; </button>)))
                    
                }
                <Link to={`/catalog/${_id}`} className="details-button">Read story</Link>
                {isAuthenticated && userId == _ownerId && (
                    <Link to={`/catalog/${_id}/edit`} className="edit-button">Edit story</Link>
                )}
            </div>
        </div>
    );
}