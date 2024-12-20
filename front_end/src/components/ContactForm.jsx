// ContactForm.jsx
import React, { useState } from 'react';
import ContactFormConfirmation from './ContactFormConfirmation';
import FileDrop from './FileDrop';

function ContactForm() {

    // Define state variables for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // For FileDrop
    const handleFileDrop = (droppedFiles) => {
        setFiles([...droppedFiles]);
    };


    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Sending the form data to a server

        // Show confirmation popup
        setShowConfirmation(true);

    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
        // Reset form fields after submission
        setName('');
        setEmail('');
        setMessage('');
        setFiles([]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>

                <label htmlFor="attachment">Attachment:</label>
                <FileDrop onFileDrop={handleFileDrop} />

                <button type="submit">Submit</button>
            </form>
            {showConfirmation && (
                <ContactFormConfirmation
                    name={name}
                    email={email}
                    message={message}
                    onClose={handleCloseConfirmation}
                />
            )}
        </div>
    );
}

export default ContactForm;