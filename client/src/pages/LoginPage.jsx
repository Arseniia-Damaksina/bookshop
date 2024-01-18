import './LoginPage.css';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div className="mainContainer">
            <Header />
            <div className="content">
                <div className="formContainer">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
