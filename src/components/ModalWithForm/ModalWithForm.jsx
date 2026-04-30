import "./ModalWithForm.css";
import closeButton from "../../assets/Close-Icon.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  onSubmit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    const form = e.target;

    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i];
      if (element.id) {
        formData[element.id] = element.value;
      }
      if (element.type === "radio" && element.checked) {
        formData.weather = element.id;
      }
    }

    onSubmit(formData);
  };

  return (
    <div
      className={`modal ${activeModal === "add-garment" && "modal__opened"}`}
    >
      <div className="modal__content">
        <form className="modal__form" onSubmit={handleSubmit}>
          <h2 className="modal__title">{title}</h2>
          <button onClick={onClose} type="button" className="modal__close">
            <img src={closeButton} alt="Close" />
          </button>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
