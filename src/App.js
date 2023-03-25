import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './components/Home';
import { About } from './components/About';
import { MainNavigation } from './components/MainNavigation';
import { CharacterList } from './components/CharacterList';
import { Character } from './components/Character';

function App() {
    return (    
        <div className="app">
            <header className="app-header">
                <MainNavigation />
            </header>
            <body>
                <Routes>
                    <Route path='*' element={<h1>404</h1>} />
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/characters' element={<CharacterList />} />
                    <Route path='/characters/:characterId/*' element={<Character />} />
                </Routes>
            </body>
        </div>
    );
}

export default App;
