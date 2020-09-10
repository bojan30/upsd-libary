import React from 'react';
import ReactPaginate from 'react-paginate';
import Loader from './Loader';

const Bookshelf = ({books, setDeleteBook, setEditBook, perPage, pageCount, handleSetPage, currentPage, loading}) => {
    console.log(loading);
    const renderPaginator = () => {
        if(pageCount > 1){
            return (
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    forcePage = {currentPage}
                />
            );   
        }
        else return <div></div>;
    }
    const handleSetDeleteBook = (e, id) => {
        setDeleteBook(id);
    }
    const handleSetEditBook = (e, id) => {
        setEditBook(id);
    }
    const handlePageClick = (d) => {
        handleSetPage(d.selected);
    }
    return (
        <div className="mt-4">
            
                
                {loading && <Loader/>}
                {!loading && books && pageCount > 1 && renderPaginator()}
                <table className="table table-bordered table-striped mb-4">
                    <thead className = "bg-primary text-white">
                        <tr>
                            {/* <th scope="col">ID</th> */}
                            <th scope="col">Naslov</th>
                            <th scope="col">Autor</th>
                            <th scope="col">Izdavač</th>
                            <th scope="col">Pozajmio</th>
                            <th scope="col">Datum pozajmljivanja</th>
                            <th>Izmeni</th>
                        </tr>
                    </thead>
                    {!loading && books &&
                        <tbody>
                        {
                        books && books.slice(currentPage * perPage, (currentPage + 1)*perPage).map(book => {
                            return (
                                <tr key = {book.id}>
                                    {/* <th scope="row">{book.id}</th> */}
                                    <td>{book.Title}</td>
                                    <td>{book.Author}</td>
                                    <td>{book.Publisher}</td>
                                    <td>{book.LoanedTo}</td>
                                    <td>{book.DateLoaned}</td>
                                    <td>
                                        <button onClick = {(e) => handleSetEditBook(e, book.id)} className="text-primary modify-button mr-2"><i className="fas fa-pen-square"></i></button>
                                        <button onClick = {(e) => handleSetDeleteBook(e, book.id)} className="text-danger modify-button"><i className="fas fa-minus-square"></i></button>
                                    </td>
                                </tr>
                            );
                        })
                        }
                    </tbody>
                    }
                </table>
        </div>
    );

}

export default Bookshelf;