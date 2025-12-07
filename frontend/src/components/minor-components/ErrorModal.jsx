import { useState, useEffect } from "react";
import "./css/error-modal.css";

const ErrorModal = ({ setShowModal }) => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) {
      return setShowModal(false);
    }
    const id = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className="modal-container">
      <div className="modal">
        <h4>THERE WAS AN ERROR!</h4>
        <p>Check browser console for more information.</p>
        <div>{count}</div>
        <div className="btn-container">
          <button className="confirm-btn" onClick={() => setShowModal(false)}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
