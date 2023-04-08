import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { storyServiceFactory } from './services/storyService';
import { AuthProvider } from './contexts/AuthContext';

import { Header } from "./components/Header";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { Register } from "./components/Register/Register";
import { CreateStory } from "./components/CreateStory/CreateStory";
import { Catalog } from "./components/Catalog/Catalog";
import { MyStories } from "./components/MyStories/MyStories";
import { StoryDetails } from './components/StoryDetails/StoryDetails';
import { EditStory } from './components/EditStory/EditStory';
import { ReadingList } from './components/ReadingList/ReadingList';
import { readingListServiceFactory } from './services/readingListService';
// import { AuthContext } from './contexts/AuthContext';
// import { useContext } from 'react';
// import { openAiServiceFactory } from './services/openaiService';

function App() {
    const navigate = useNavigate();

    const [stories, setStories] = useState([]);
    const [readingList, setReadingList]= useState([]);

    const storyService = storyServiceFactory();
    const readingListService = readingListServiceFactory();
    // const { isAuthenticated, userId } = useContext(AuthContext);
    // const openAiService = openAiServiceFactory();
    // openAiService.configure();    

    useEffect(() => {
        storyService.getAll()
            .then(result => {
                setStories(result)
            })
    }, []);

    const onCreateStorySubmit = async (data) => {
        const newStory = await storyService.create(data);
        setStories(state => [...state, newStory]);

        navigate('/catalog');
    };

    const onStoryEditSubmit = async (values) => {
        const result = await storyService.edit(values._id, values);
        setStories(state => state.map(x => x._id === values._id ? result : x));
        navigate(`/catalog/${values._id}`);
    }

    const onStoryDelete = async (story) => {
        await storyService.delete(story._id);
        setStories(state => state.filter(s => s._id !== story._id));        
        navigate('/catalog');
    }

    useEffect(() => {
        readingListService.getList()
            .then(result => {
                setReadingList(result);
            })
    }, []);
    
    const onStoryAddedToList = async (storyId) => {
        const item = await readingListService.addStory(storyId);
        setReadingList(state => [...state, storyId]);

    };
    const onStoryRemovedFromList = async (storyId) => {
        console.log(storyId);
        await readingListService.removeStory(storyId);
        setReadingList(state => state.filter(s => s !== storyId));
        console.log("readingList", readingList);
    }

    return (
        <AuthProvider>
            <div id="box">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/create-story' element={<CreateStory onCreateStorySubmit={onCreateStorySubmit} />} />
                        <Route path='/catalog' element={<Catalog stories={stories} readingList={readingList} onStoryRemovedFromList={onStoryRemovedFromList} onStoryAddedToList={onStoryAddedToList} />} />
                        <Route path='/my-stories' element={<MyStories stories={stories}/>} readingList={readingList} onStoryRemovedFromList={onStoryRemovedFromList} onStoryAddedToList={onStoryAddedToList} />
                        <Route path='/reading-list' element={<ReadingList stories={stories} readingList={readingList} onStoryRemovedFromList={onStoryRemovedFromList} onStoryAddedToList={onStoryAddedToList}  />} />
                        <Route path='/catalog/:storyId' element={<StoryDetails onStoryDelete={onStoryDelete} />} />
                        <Route path='/catalog/:storyId/edit' element={<EditStory onStoryEditSubmit={onStoryEditSubmit} />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
