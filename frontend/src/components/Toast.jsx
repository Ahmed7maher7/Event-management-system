import { Alert } from "@mui/material";
export default function Toast({ message, type = "success" }) {
  if (!message) return null;
  return (
    <Alert severity={type === "error" ? "error" : "success"} sx={{ mb: 2 }}>
      {message}
    </Alert>
  );
}
