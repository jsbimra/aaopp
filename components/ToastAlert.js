import React from "react";
// import styles from "../styles/Loader.module.scss";

function ToastAlert(props) {
  const { type, show, heading, message, badgeText } = props;

  if (!show) return null;

  const typeStyle = (type) => {
    console.log({ type });

    if (!type) return "";

    switch (type) {
      case "success":
        return "bg-success text-white";
      case "info":
        return "bg-info";
      case "error":
        return "bg-danger text-white";
      case "secondary":
        return "bg-secondary text-white";
      default:
        return "bg-primary";
    }
  };

  // console.log({ typeStyle: typeStyle(type) });
  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 5 }}>
      <div
        id="liveToast"
        className={`toast ${show ? "show" : "hide"} ${typeStyle(
          type
        )}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          {/* <img src="..." className="rounded me-2" alt="..."> */}
          <strong className="me-auto">{heading}</strong>
          <small>{badgeText}</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}

export default ToastAlert;
