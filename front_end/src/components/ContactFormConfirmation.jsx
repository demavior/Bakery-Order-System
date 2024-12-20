import React from 'react';

function ContactFormConfirmation({ name, email, message, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="confirmation-popup">
                    <h2>Submission Successful</h2>
                    <p>Thank you for your message!</p>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Message:</strong> {message}</p>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ContactFormConfirmation;
