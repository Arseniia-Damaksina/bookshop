import './EditBookPage.css';
import Header from '../components/Header';
import EditBookForm from '../components/EditBookForm';

const EditProductPage = () => {
    return (
        <div className="mainContainer">
            <Header />
            <h1 className="title">Edit Book</h1>
            <div className="content">
                <div className="formContainer">
                    <EditBookForm />
                </div>
            </div>
        </div>
    );
};

export default EditProductPage;
