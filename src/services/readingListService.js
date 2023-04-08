import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/readingList';

export const readingListServiceFactory = (token) => {
        const request = requestFactory(token);
        const userId = request.userId;
        
        const getList = async () => {
                const searchQuery = encodeURIComponent(`userId="${userId}"`);            
                const result = await request.get(`${baseUrl}?where=${searchQuery}`);
                let list = result[0];
                return list.stories;
        };

        const addStory = async (storyId) => {
                const searchQuery = encodeURIComponent(`userId="${userId}"`);            
                const result = await request.get(`${baseUrl}?where=${searchQuery}`);
                let list = result[0];
                if (!(storyId in list.stories)) { 
                        list.stories.push(storyId);
                }
                const item =  await request.put(`${baseUrl}/${list._id}`, list);
                return item;
        };


        const removeStory = async (storyId) => {
                const searchQuery = encodeURIComponent(`userId="${userId}"`);            
                const result = await request.get(`${baseUrl}?where=${searchQuery}`);
                let list = result[0];
 
                if (storyId in list.stories) { 
                        list.stories.pop(storyId);
                }
                const item =  await request.put(`${baseUrl}/${list._id}`, list);
                return item;
        };
        
        return {
                getList,
                addStory,
                removeStory
        };
}