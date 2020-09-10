import React, {useState, useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const AddEditForm = ({isActive, handleCloseForm, handleAddBook, bookToEdit, handleEditBook}) => {
    // const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const [bookData, setBookData] = useState(
        {
            Title: "",
            Author: "",
            Publisher: "",
            LoanedTo: "",
            DateLoaned: ""
        });

    useEffect(() => {
        if(bookToEdit){
            setBookData(bookToEdit);
        }
        else resetBookData();
    }, [bookToEdit]);

    const resetBookData = () => {
        setBookData({
            Title: "",
            Author: "",
            Publisher: "",
            LoanedTo: "",
            DateLoaned: ""
        });
    }

    const handleChange = (e) => {
        setBookData({...bookData, [e.target.id]: e.target.value});
    }

    const handleDateChange = (date) => {
        setBookData({...bookData, DateLoaned: date ? moment(date).format('DD-MM-YYYY') : null});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!bookData.Title || !bookData.Author || !bookData.Publisher){
            setError('Prva tri polja su obavezna');
        }
        else{
            //can enter new book
            const newBook = {...bookData};
            bookToEdit ? handleEditBook(newBook) : handleAddBook(newBook);
            resetBookData();
        }
    }
    return (
        <div className = {`form-container ${isActive && 'active'}`}>
            <div onClick = {handleCloseForm} className = "form-overlay"></div>
            <form onSubmit = {handleSubmit} className="form p-4 add-edit-form">
                <div className="form-group">
                <h5>{bookToEdit ? 'Izmeni knjigu' : 'Dodaj knjigu'}</h5>
                </div>
                <div className="form-group">
                    <input id = "Title" type="text" className="form-control" onChange = {handleChange} value = {bookData.Title} placeholder = "Naslov"/>
                </div>
                <div className="form-group">
                    <input id="Author" type="text" className="form-control" onChange={handleChange} value={bookData.Author} placeholder = "Autor"/>
                </div>
                <div className="form-group">
                    <input id="Publisher" type="text" className="form-control" onChange={handleChange} value={bookData.Publisher} placeholder = "Izdavač"/>
                </div>
                <div className="form-group">
                    <input id="LoanedTo" type="text" className="form-control" onChange={handleChange} value={bookData.LoanedTo} placeholder = "Pozajmio"/>
                </div>
                <div className="form-group">
                    <DatePicker 
                        selected = {bookData.DateLoaned ? moment(bookData.DateLoaned, 'DD-MM-2020').toDate() : null}
                        onSelect = {handleDateChange}
                        onChange = {handleDateChange} 
                        dateFormat="dd-MM-yyyy"
                        placeholderText = "Datum pozajmljivanja"
                    />
                </div>
                {error && <div className="alert alert-danger p-2" role="alert">
                    {error}
                </div>}
                <button type="submit" className="btn btn-primary">{bookToEdit ? 'Izmeni' : 'Dodaj'}</button>
            </form>
        </div>
    );

}

export default AddEditForm;