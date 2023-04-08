import { CatalogItem } from "../Catalog/CatalogItem/CatalogItem";
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const MyStories = ({
    stories,
    readingList,
    onStoryRemovedFromList,
    onStoryAddedToList
    }) => {
        const { isAuthenticated, userId } = useContext(AuthContext);
        console.log("my-stories", readingList);
        const myStories = stories.filter(x => isAuthenticated && userId === x._ownerId);
        return (
            <section id="catalog-page">
                <h1>My Stories</h1>
    
                {myStories.map(x =>
                    <CatalogItem key={x._id} {...x} onStoryRemovedFromList={onStoryRemovedFromList}  onStoryAddedToList={onStoryAddedToList} readingList={readingList} />
                )}
    
                {myStories.length === 0 && (
                    <h3 className="no-articles">No articles yet</h3>
                )}
            </section>
        );
    };