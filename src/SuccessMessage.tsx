// SuccessMessage.tsx
import React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Alert severity="success" sx={{ textAlign: "center" }}>
        {message}
      </Alert>
    </Box>
  );
};

export default SuccessMessage;
