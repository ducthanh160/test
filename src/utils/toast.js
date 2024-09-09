// toast.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (type, message) => {
    const toastType = type === "success" ? toast.success : toast.error;
    toastType(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
};
