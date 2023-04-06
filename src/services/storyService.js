import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/stories';

export const storyServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(baseUrl);
        const stories = Object.values(result);
    
        return stories;
    };
    
    const getOne = async (storyId) => {
        const result = await request.get(`${baseUrl}/${storyId}`);
    
        return result;
    };
    
    const create = async (storyData) => {
        const result = await request.post(baseUrl, storyData);
    
        console.log(result);
    
        return result;
    };
    
    const edit = (storyId, data) => request.put(`${baseUrl}/${storyId}`, data);

    const deleteStory = (storyId) => request.delete(`${baseUrl}/${storyId}`);


    return {
        getAll,
        getOne,
        create,
        edit,
        delete: deleteStory,
    };
}