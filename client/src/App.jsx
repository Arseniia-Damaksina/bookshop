import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import BookstorePage from './pages/BookstorePage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AddBookPage from './pages/AddBookPage';
import LogoutPage from './pages/LogoutPage';
import EditBookPage from './pages/EditBookPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/bookstore" element={<BookstorePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/add-book" element={<AddBookPage />} />
                <Route path="/edit/:id" element={<EditBookPage />} />
                <Route path="/logout" element={<LogoutPage />} />
            </Routes>
        </Router>
    );
};

export default App;
