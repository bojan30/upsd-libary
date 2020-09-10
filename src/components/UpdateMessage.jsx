import React from 'react';

const UpdateMessage = ({message}) => {
    return (
        <div className={`alert alert-${message.type} p-2 update-message ${message.message && 'active'}`} role="alert">
            <i className={`fas fa-${message.type === 'success' ? 'check' : 'times'}`}></i> <span>{message.message}</span>
        </div>
    );
}

export default UpdateMessage;