import { requestFactory } from './requester';
import { Configuration, OpenAIApi } from "openai";

const baseUrl = 'https://api.openai.com/v1/images/generations';

export const openAiServiceFactory = (token) => {
    const request = requestFactory(token);

    const configure = async () => {
        const configuration = new Configuration({
                organization: "org-fCvULid",
                apiKey: "API_KEY",
            });
            const openai = new OpenAIApi(configuration);
        //     const response = await openai.listEngines();
        return configuration;
    };

    const getImage = async (prompt) => {
        const result = await request.post(baseUrl, { 
                prompt: prompt,
                n: 1,
                size: "1024x1024"
        });
    
        console.log(result);
    
        return result;
    };
    
    return {
        configure,
        getImage
    };
}