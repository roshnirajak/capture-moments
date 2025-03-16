import { useEffect, useState } from 'react';
import axios from 'axios';
import { APP_URL } from './utils/helpers';
import './App.css';

function App() {
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [sessionCode, setSessionCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const addEmail = () => {
    if (emailInput && emailRegex.test(emailInput) && !emails.includes(emailInput)) {
      setEmails([...emails, emailInput]);
      setEmailInput('');
    } else {
      setMessage('Invalid email address!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const startCapture = async () => {
    if (emails && emails.length > 0) {
      setLoading(true);
      try {
        console.log("emails", emails);
        const response = await axios.post(`${APP_URL}/start-capture`);
        setSessionCode(response.data.sessionCode);
        setIsCapturing(true);
        setMessage('Capture started!');
      } catch (error) {
        console.error("Error starting capture:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const stopCapture = async () => {
    setLoading(true);
    try {
      await axios.post(`${APP_URL}/stop-capture`, { emails, sessionCode });
      setIsCapturing(false);
      setEmails([]);
      setSessionCode('');
      setMessage('Email Sent!');
    } catch (error) {
      console.error("Error stopping capture:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios.post(`${APP_URL}/stop-capture`, { emails }).catch((error) => {
      console.error("Error on initial stop-capture:", error);
    });
    setIsCapturing(false);
    setSessionCode('');
  }, []);

  return (
    <>
      <div className="info-container">
        <div className="info-icon">i</div>
        <div className="tooltip">This application automatically captures screenshots <br/>during your video calls at random intervals. <br/>Simply enter your email in the input box, and the captured <br/>screenshots will be sent directly to your inbox. <br/>Stay connected and never miss a moment!</div>
      </div>

      <div className="pixel-heart">
        <div></div> <div className="filled"></div> <div></div> <div className="filled"></div> <div></div>
        <div className="filled"></div> <div className="filled"></div> <div className="filled"></div> <div className="filled"></div> <div className="filled"></div>
        <div className="filled"></div> <div className="filled"></div> <div className="filled"></div> <div className="filled"></div> <div className="filled"></div>
        <div></div> <div className="filled"></div> <div className="filled"></div> <div className="filled"></div> <div></div>
        <div></div> <div></div> <div className="filled"></div> <div></div> <div></div>
      </div>

      <div className="app-container">
        <div className="window-bar">
          <span>Capture Moments</span>
          <div className="window-buttons">
            <span>-</span>
            <span>□</span>
            <span>x</span>
          </div>
        </div>
        <div className="app-content">
          <h1>Capture Moments</h1>
          <div className="input-container">
            <input
              type="email"
              placeholder="Enter email address"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <button onClick={addEmail}>Add Email</button>
          </div>
          <ul className="email-list">
            {emails.map((email, index) => (
              <li key={index}>
                {email}
                <button className="remove-btn" onClick={() => {
                  const updatedEmails = emails.filter((_, i) => i !== index);
                  setEmails(updatedEmails);
                }}>
                  x
                </button>
              </li>
            ))}
          </ul>

          <div className="button-container">
            {!isCapturing ? (
              <button className="capture-button" onClick={startCapture} disabled={loading}>
                {loading ? <span className="spinner"></span> : 'Start Capture'}
              </button>
            ) : (
              <button className="capture-button" onClick={stopCapture} disabled={loading}>
                {loading ? <span className="spinner"></span> : 'Stop Capture and Send Email'}
              </button>
            )}
            <span className="message">{message}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
