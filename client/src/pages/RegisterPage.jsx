import './RegisterPage.css';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
    return (
        <div className="mainContainer">
            <Header />
            <div className="content">
                <div className="formContainer">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
