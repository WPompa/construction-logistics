import { useState, useEffect } from "react";
import "./css/error-modal.css";

const ErrorModal = ({ setShowModal }) => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (count <= 0) {
      setShowModal(false);
    }
  }, [count]);

  return (
    <dialog className="modal-container">
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
    </dialog>
  );
};

export default ErrorModal;
