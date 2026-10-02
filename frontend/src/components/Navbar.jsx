import {
  CalendarMonth,
  Add,
  ConfirmationNumber,
  Event,
  Logout,
  Menu,
  Person,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: "1px solid rgba(226, 221, 210, 0.7)",
        backgroundColor: "rgba(250, 248, 242, 0.91)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ minHeight: 70, justifyContent: "space-between" }}
        >
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{
              fontWeight: 800,
              fontSize: 22,
              textTransform: "none",
              p: 0,
              minWidth: 0,
            }}
            startIcon={<CalendarMonth color="primary" />}
          >
            Eventoo
          </Button>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Button
              component={Link}
              to="/events"
              color="inherit"
              startIcon={<Event />}
            >
              Explore
            </Button>
            {user && (
              <Button component={Link} to="/my-events" color="inherit">
                My Events
              </Button>
            )}
            {user && (
              <Button
                component={Link}
                to="/my-registrations"
                color="inherit"
                startIcon={<ConfirmationNumber />}
              >
                Tickets
              </Button>
            )}
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            {user ? (
              <>
                <Button
                  component={Link}
                  to="/create-event"
                  variant="contained"
                  startIcon={<Add />}
                >
                  Create Event
                </Button>
                <Avatar
                  sx={{ width: 34, height: 34, bgcolor: "secondary.main" }}
                >
                  {user.name?.[0]?.toUpperCase()}
                </Avatar>
                <Typography variant="body2">{user.name}</Typography>
                <Button onClick={handleLogout} startIcon={<Logout />}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Log in
                </Button>
                <Button component={Link} to="/register" variant="contained">
                  Join Eventoo
                </Button>
              </>
            )}
          </Stack>
          <IconButton
            sx={{ display: { xs: "flex", sm: "none" } }}
            onClick={() => setOpen(!open)}
          >
            <Menu />
          </IconButton>
        </Toolbar>
        {open && (
          <Box sx={{ pb: 2, display: { xs: "block", sm: "none" } }}>
            <MenuItem
              component={Link}
              to="/events"
              onClick={() => setOpen(false)}
            >
              Explore
            </MenuItem>
            {user && (
              <MenuItem
                component={Link}
                to="/my-events"
                onClick={() => setOpen(false)}
              >
                My Events
              </MenuItem>
            )}
            {user && (
              <MenuItem
                component={Link}
                to="/my-registrations"
                onClick={() => setOpen(false)}
              >
                My Tickets
              </MenuItem>
            )}
            {user && (
              <MenuItem
                component={Link}
                to="/create-event"
                onClick={() => setOpen(false)}
              >
                Create Event
              </MenuItem>
            )}
            {user ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <>
                <MenuItem component={Link} to="/login">
                  Log in
                </MenuItem>
                <MenuItem component={Link} to="/register">
                  Join Eventoo
                </MenuItem>
              </>
            )}
          </Box>
        )}
      </Container>
    </AppBar>
  );
}
