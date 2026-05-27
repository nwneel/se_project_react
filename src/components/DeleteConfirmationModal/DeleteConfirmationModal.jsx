import "../ModalWithForm/ModalWithForm.css";
import "../DeleteConfirmationModal/DeleteConfirmationModal.css";
/* make sure to import close button so it will show up in the form when you open it */
import closeButton from "../../assets/Close-Icon.svg";

function DeleteConfirmationModal({ activeModal, onClose, onDeleteItem }) {
  return (
    <div
      className={`modal ${activeModal == "delete-confirmation" && "modal_opened"}`}
    >
      <div className="modal__content modal__content-delete">
        <button onClick={onClose} type="button" className="modal__close">
          <img className="modal__close-delete" src={closeButton} alt="Close" />
        </button>
        <h2 className="modal__delete-title">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <div className="modal__btn-container">
          {/* Helps delete item */}
          <button
            type="button"
            className="modal__delete-btn"
            onClick={onDeleteItem}
          >
            Yes, delete item
          </button>
          <button type="button" className="modal__cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
