import React, {useEffect} from 'react';
import Nav from '../components/Nav';
import Bookshelf from '../components/Bookshelf';
import { useHistory } from 'react-router-dom';
import Search from '../components/Search';
import Select from '../components/Select';

const Dashboard = ({currentUser, handleLogout, books, handleOpenForm, setDeleteBook, setEditBook, submitQuery, setSearch, perPage, pageCount, handleSetPage, currentPage, setPerPageValue, loading}) => {
    const history = useHistory();
    useEffect(() => {
        if (!currentUser) history.push("/");
    }, [currentUser, history]);
    return (
        <div>
            <Nav currentUser = {currentUser} handleLogout = {handleLogout}/>
            <div className="container">
                <div className = "d-flex justify-content-between align-items-center mt-4">
                    <h4>Spisak knjiga</h4>
                    <button onClick = {handleOpenForm} className = "add-book"><i className = "fas fa-plus"></i></button>
                </div>
                <div className = "d-flex justify-content-start align-items-center mt-4">
                <Search submitQuery = {submitQuery}/>
                <Select
                    title = "Pretraži po:"
                    options = {[{value: 'Title', text: 'Naslov'},{value: 'Author', text: 'Autor'},{value: 'Publisher', text: 'Izdavač'}]} handleSelected = {setSearch} />
                <Select
                    title = "Po strani:"
                    options = {[{value: 5, text: '5'}, {value: 10, text: '10'}, {value: 50, text: '50'}]}
                    handleSelected = {setPerPageValue}
                />
                </div>
                <Bookshelf books = {books} loading = {loading} setDeleteBook = {setDeleteBook} setEditBook = {setEditBook} perPage = {perPage} pageCount = {pageCount} handleSetPage = {handleSetPage} currentPage = {currentPage}/>
            </div>
        </div>
    );

}
export default Dashboard;