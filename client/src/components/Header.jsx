import { useNavigate } from 'react-router-dom';

import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';

const Header = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/');
    };
    
    return (
        <div className="headerContainer">
            <div className="emptyHeader"></div>
            <header>
                <div className="appName" onClick={handleNavigate}>
                    <span>BookStore</span>
                    <FontAwesomeIcon
                        icon={faBook}
                        style={{ color: '#ffffff', fontSize: '44px' }}
                    />
                </div>
                <Navbar />
            </header>
        </div>
    );
};

export default Header;
