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
import { GameDetails } from './components/GameDetails/GameDetails';
import { EditStory } from './components/EditStory/EditStory';
// import { openAiServiceFactory } from './services/openaiService';

function App() {
    const navigate = useNavigate();
    const [stories, setStories] = useState([]);
    const storyService = storyServiceFactory(); //auth.accessToken
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
        setStories(state => state.map(x => x._id === values._id ? result : x))
        navigate(`/catalog/${values._id}`);
    }

    const onStoryDelete = async (story) => {
        await storyService.delete(story._id);
        setStories(state => state.filter(s => s._id !== story._id));        
        navigate('/catalog');
    }

    // const EnhancedLogin = withAuth(Login);

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
                        <Route path='/catalog' element={<Catalog stories={stories} />} />
                        <Route path='/my-stories' element={<MyStories stories={stories} />} />
                        <Route path='/catalog/:storyId' element={<GameDetails onStoryDelete={onStoryDelete} />} />
                        <Route path='/catalog/:storyId/edit' element={<EditStory onStoryEditSubmit={onStoryEditSubmit} />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
