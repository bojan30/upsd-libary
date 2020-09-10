import React from 'react';

const WarningModal = ({handleCloseModal, modalActive, handleDeleteBook}) => {
    return (
        <div className = {`modal-container ${modalActive && 'active'}`}>
            <div onClick = {handleCloseModal} className="form-overlay"></div>
            <form className="form p-4 add-edit-form">
                <div className="form-group">
                    <h5>Da li zaista zelite da obrisete knjigu?</h5>
                </div>
                <button type = "button" onClick = {handleDeleteBook} className="btn btn-outline-danger mr-2">Potvrdi</button>
                <button type="button" onClick = {handleCloseModal} className="btn btn-outline-secondary">Odustani</button>
            </form>
        </div>
    );
}

export default WarningModal;