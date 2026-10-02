import { CalendarMonth } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/Toast";

export default function Auth({ mode = "login" }) {
  const isLogin = mode === "login";
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) await login({ email: form.email, password: form.password });
      else await register(form);
      navigate(location.state?.from || "/events");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container maxWidth="sm" sx={{ py: 8, minHeight: "65vh" }}>
      <Paper sx={{ p: { xs: 3, sm: 5 }, background: "#fffdf8" }}>
        <Stack alignItems="center" spacing={1} mb={3}>
          <CalendarMonth color="primary" fontSize="large" />
          <Typography variant="h4" fontWeight={800}>
            {isLogin ? "Welcome back" : "Join Eventoo"}
          </Typography>
          <Typography color="text.secondary" textAlign="center">
            {isLogin
              ? "Log in to manage your events and tickets."
              : "Create an account and start discovering events."}
          </Typography>
        </Stack>
        <Box component="form" onSubmit={submit}>
          <Stack spacing={2.2}>
            {!isLogin && (
              <TextField
                label="Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            )}
            <TextField
              label="Email"
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              label="Password"
              required
              minLength={6}
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Toast message={error} type="error" />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Log in"
                  : "Create account"}
            </Button>
            <Typography
              textAlign="center"
              variant="body2"
              color="text.secondary"
            >
              {isLogin ? "New here? " : "Already have an account? "}
              <Link to={isLogin ? "/register" : "/login"}>
                {isLogin ? "Create an account" : "Log in"}
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
