import "./AddBookPage.css";
import Header from '../components/Header';
import AddBookForm from '../components/AddBookForm';

const AddBookPage = () => {
  return (
    <div className="mainContainer">
        <Header />
        <h1 className="title">Add Book</h1>
        <div className="content">
            <div className="formContainer">
                <AddBookForm />
            </div>
        </div>
    </div>
);
}

export default AddBookPage