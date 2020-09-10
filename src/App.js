import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Login from './containers/Login'
import Dashboard from './containers/Dashboard';
import AddEditForm from './components/AddEditForm';
import UpdateMessage from './components/UpdateMessage';
import WarningModal from './components/WarningModal';

function App() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || null));
  const [books, setBooks] = useState([]);
  const [formActive, setFormActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({message: "", type: ""});
  const [deleteId, setDeleteId] = useState(null);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [searchField, setSearchField] = useState('Title');
  const [query, setQuery] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPageCount(Math.ceil(books.length/perPage));
    setCurrentPage(0);
  }, [books,perPage,query]);

  // useEffect(() => {
  //   if(currentUser){
  //     localStorage.setItem('user', JSON.stringify({ ...currentUser }));
  //     axios.get('http://localhost:1337/books', { 'headers': {Authorization: `Bearer ${currentUser.jwt}` }})
  //       .then(res => {
  //         setBooks([...res.data]);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //   }
  // }, [currentUser, perPage]);
  
  useEffect(() => {
    if(currentUser){
        localStorage.setItem('user', JSON.stringify({ ...currentUser }));
        setLoading(true);
        axios.get(`https://upsd-biblioteka.herokuapp.com/books?${searchField}_contains=${query}&&_sort=Title:ASC`,{ 'headers': { Authorization: `Bearer ${currentUser.jwt}`} })
      .then(res => {
        setLoading(false);
        setBooks([...res.data]);
      })
      .catch(err => {console.log(err); setLoading(false)});
      }
  }, [query, searchField, currentUser]);

  const login = (data) => {
    setCurrentUser({
      jwt: data.jwt,
      username: data.user.username
    });
  }

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  }

  const openForm = () => {
    setFormActive(true);
  }

  const closeForm = () => {
    setFormActive(false);
    setBookToEdit(null);
  }

  const openModal = () => {
    setModalActive(true);
  }

  const closeModal = () => {
    setModalActive(false);
    setDeleteId(null);
  }

  const setDeleteBook = (id) => {
    openModal();
    setDeleteId(id);
  }

  const setEditBook = (id) => {
    openForm();
    const bookToEdit = books.find(b => b.id === id);
    setBookToEdit(bookToEdit);
  }
 
  const deleteBook = () => {
    axios.delete(`https://upsd-biblioteka.herokuapp.com/books/${deleteId}`, {'headers': {Authorization: `Bearer ${currentUser.jwt}`}}).then(res => {
      setBooks(books.filter(b => b.id !== deleteId));
      closeModal();
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  const addBook = (book) => {
    axios.post('https://upsd-biblioteka.herokuapp.com/books',book, { 'headers': { Authorization: `Bearer ${currentUser.jwt}` } })
      .then(res => {
        setBooks([...books, res.data]);
        setUpdateMessage({ message: "Knjiga je dodata!", type: "success" });
        setTimeout(() => {
          setUpdateMessage({ message: "", type: "" });
        }, 3000);
      })
      .catch(err => console.log(err));
  }

  const editBook = (book) => {
    axios.put(`https://upsd-biblioteka.herokuapp.com/books/${book.id}`, book, { 'headers': { Authorization: `Bearer ${currentUser.jwt}` } })
      .then(res => {
        setBooks(books.map(b => b.id === book.id ? book : b));
        setUpdateMessage({ message: "Knjiga je izmenjena!", type: "success" });
        setBookToEdit(null);
        closeForm();
        setTimeout(() => {
          setUpdateMessage({ message: "", type: "" });
        }, 3000);
      })
      .catch(err => console.log(err));
  }

  const search = (query) => {
    setQuery(query);
  }

  const setSearch = (value) => {
    setSearchField(value);
  }

  const setPerPageValue = (value) => {
    setPerPage(parseInt(value));
  }

  const handleSetPage = (page) => {
    setCurrentPage(page);
  }
 
  return (
    <div className="app">
      <AddEditForm 
        isActive = {formActive} 
        handleCloseForm = {closeForm} 
        handleAddBook = {addBook} 
        bookToEdit = {bookToEdit} 
        handleEditBook = {editBook}
      />
      <UpdateMessage message = {updateMessage}/>
      <WarningModal 
        handleCloseModal = {closeModal} 
        modalActive = {modalActive} 
        handleDeleteBook = {deleteBook}
      />
      <Switch>
        <Route 
          exact
          path = "/"
          render={(props) => <Login {...props} 
          logUserIn = {login} 
          currentUser = {currentUser} />} 
        />
        <Route 
          exact
          path = "/dashboard"
          render={(props) => <Dashboard {...props} 
            currentUser = {currentUser} 
            handleLogout = {handleLogout} 
            books = {books} 
            handleOpenForm = {openForm} 
            setDeleteBook = {setDeleteBook} 
            setEditBook = {setEditBook}
            submitQuery = {search} 
            setSearch = {setSearch} 
            pageCount = {pageCount} 
            perPage = {perPage} 
            handleSetPage = {handleSetPage} 
            currentPage = {currentPage} 
            setPerPageValue = {setPerPageValue}
            loading = {loading}
            /> 
          }
        />
      </Switch>
    </div>
  );
}

export default App;
