import {
  CalendarMonth,
  CheckCircle,
  LocationOn,
  People,
  Schedule,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/Toast";

export default function EventDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [toast, setToast] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const load = () =>
    api.get(`/events/${id}`).then((r) => setEvent(r.data.event));
  useEffect(() => {
    load();
    if (user)
      api
        .get("/registrations/mine")
        .then((r) =>
          setRegistered(r.data.registrations.some((x) => x.event?._id === id)),
        );
  }, [id, user]);
  const register = async () => {
    if (!user) return navigate("/login");
    try {
      await api.post(`/registrations/events/${id}`);
      setRegistered(true);
      setToast("You are registered!");
      load();
    } catch (e) {
      setToast(e.response?.data?.message || "Could not register");
    }
  };
  const cancel = async () => {
    try {
      await api.delete(`/registrations/events/${id}`);
      setRegistered(false);
      setToast("Registration cancelled");
      load();
    } catch (e) {
      setToast(e.response?.data?.message || "Could not cancel");
    }
  };
  const loadRegs = () =>
    api
      .get(`/registrations/events/${id}`)
      .then((r) => setRegistrations(r.data.registrations))
      .catch(() => {});
  if (!event)
    return (
      <Box sx={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        Loading...
      </Box>
    );
  const date = new Date(event.date),
    full = event.registered >= event.capacity,
    owner = user?.id === event.createdBy?._id;
  return (
    <Container maxWidth="lg" sx={{ py: 7 }}>
      <Button component={Link} to="/events" sx={{ mb: 3 }}>
        ← Back to events
      </Button>
      <Toast
        message={toast}
        type={toast.includes("Could") ? "error" : "success"}
      />
      <Grid container spacing={5}>
        <Grid item xs={12} md={8}>
          <Chip
            label={event.category?.name || "Event"}
            color="primary"
            sx={{ mb: 2 }}
          />
          <Typography variant="h2" sx={{ fontSize: { xs: 42, md: 64 } }}>
            {event.title}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            fontWeight={400}
            sx={{ lineHeight: 1.7, my: 3 }}
          >
            {event.description}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            {[
              [
                <CalendarMonth />,
                "Date",
                date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }),
              ],
              [
                <Schedule />,
                "Time",
                date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              ],
              [<LocationOn />, "Location", event.location],
            ].map((x, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Stack direction="row" spacing={1.5}>
                  <Box sx={{ color: "primary.main" }}>{x[0]}</Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {x[1]}
                    </Typography>
                    <Typography variant="body2" fontWeight={700}>
                      {x[2]}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              position: { md: "sticky" },
              top: { md: 90 },
              background: "#fffdf8",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  background: "#f7f4ee",
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                <Typography variant="h3" fontWeight={800}>
                  {event.registered}
                </Typography>
                <Typography color="text.secondary">
                  of {event.capacity} spots filled
                </Typography>
              </Box>
              {user ? (
                registered ? (
                  <Button fullWidth variant="outlined" onClick={cancel}>
                    Cancel Registration
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={full}
                    onClick={register}
                  >
                    {full ? "Event Full" : "Register for Event"}
                  </Button>
                )
              ) : (
                <Button
                  fullWidth
                  component={Link}
                  to="/login"
                  variant="contained"
                >
                  Log in to register
                </Button>
              )}
              <Divider sx={{ my: 3 }} />
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar>{event.createdBy?.name?.[0]}</Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Hosted by
                  </Typography>
                  <Typography fontWeight={700}>
                    {event.createdBy?.name}
                  </Typography>
                </Box>
              </Stack>
              {owner && (
                <>
                  <Button
                    fullWidth
                    sx={{ mt: 2 }}
                    variant="outlined"
                    onClick={loadRegs}
                  >
                    View Registrations
                  </Button>
                  {registrations.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      {registrations.map((r) => (
                        <Stack
                          direction="row"
                          spacing={1}
                          key={r._id}
                          sx={{ my: 1 }}
                        >
                          <CheckCircle color="primary" fontSize="small" />
                          <Box>
                            <Typography variant="body2">
                              {r.user.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {r.user.email}
                            </Typography>
                          </Box>
                        </Stack>
                      ))}
                    </Box>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
