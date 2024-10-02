import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import Header from "../Components/Header"


function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // New state to show/hide the popup

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);  // Show popup/modal on submit
    setConfirmationMessage('A confirmation email has been sent to your email address!');
  };

  const closeModal = () => {
    setShowModal(false);  // Close popup when user clicks close
  };

  return (
    <div>
    <Header/>
    <div className="signin-container">
      <div className="form-box animated fadeInUp">
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group animated fadeIn">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              
            />
          </div>

          <div className="form-group animated fadeIn delay-1s" >
            <label id='password1'>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="animated fadeIn delay-2s" id='submit'>Sign In</button>
        </form>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>Sign In Successful</h2>
            <p>{confirmationMessage}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>

    </div>
  );
};



export default Signin


 



