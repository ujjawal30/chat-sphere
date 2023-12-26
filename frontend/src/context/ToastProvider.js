import { createContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

export const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toast, toastify] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    toastify((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ toast, toastify }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={toast.type}
          variant="filled"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
