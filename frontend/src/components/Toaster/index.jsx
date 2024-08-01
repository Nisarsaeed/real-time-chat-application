import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faXmark } from "@fortawesome/free-solid-svg-icons";

export const Toaster = ({ msg, display, onClose, isError }) => {
  return (
    <div
      id="toast-default"
      className={`flex items-center absolute top-8  z-20 w-full max-w-xs p-4 text-gray-500 rounded-lg shadow border ${
        isError ? "border-red-300" : "border-blue-300"
      } ${display}`}
      role="alert"
    >
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg ${
          isError ? "text-red-500 bg-red-100" : ""
        }`}
      >
        <FontAwesomeIcon icon={faBell} />
      </div>
      <div className="ms-3 text-sm font-normal">{msg}</div>
      <button
        type="button"
        onClick={onClose}
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8  "
        data-dismiss-target="#toast-default"
        aria-label="Close"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};
Toaster.propTypes = {
  msg: PropTypes.string.isRequired,
  display: PropTypes.string,
  onClose: PropTypes.func,
  isError: PropTypes.bool,
};
