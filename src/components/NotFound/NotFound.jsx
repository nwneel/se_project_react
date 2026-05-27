import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__message">Page Not Found</p>
        <p className="not-found__description">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <button
          className="not-found__button"
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
