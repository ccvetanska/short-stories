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
import { GameDetails } from './components/GameDetails/GameDetails';
import { EditGame } from './components/EditGame/EditGame';
// import { openAiServiceFactory } from './services/openaiService';

function App() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const storyService = storyServiceFactory(); //auth.accessToken
    // const openAiService = openAiServiceFactory();
    // openAiService.configure();

    useEffect(() => {
        storyService.getAll()
            .then(result => {
                setGames(result)
            })
    }, []);

    const onCreateStorySubmit = async (data) => {
        const newGame = await storyService.create(data);

        setGames(state => [...state, newGame]);

        navigate('/catalog');
    };

    const onGameEditSubmit = async (values) => {
        const result = await storyService.edit(values._id, values);

        setGames(state => state.map(x => x._id === values._id ? result : x))

        navigate(`/catalog/${values._id}`);
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
                        <Route path='/catalog' element={<Catalog games={games} />} />
                        <Route path='/catalog/:gameId' element={<GameDetails />} />
                        <Route path='/catalog/:gameId/edit' element={<EditGame onGameEditSubmit={onGameEditSubmit} />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
