import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import EventCard from "../components/EventCard";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await api.get("/events/mine");
        setEvents(response.data.events);
      } catch (err) {
        setEvents([]);
      }
    }

    fetchEvents();
  }, []);

  const deleteEvent = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      alert(
        err.response?.data?.message || "Could not delete event"
      );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 7, minHeight: "60vh" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ sm: "center" }}
        mb={4}
      >
        <BoxTitle />

        <Button
          component={Link}
          to="/create-event"
          variant="contained"
          startIcon={<Add />}
        >
          New Event
        </Button>
      </Stack>

      {events.length ? (
        <Grid container spacing={3}>
          {events.map((e) => (
            <Grid item xs={12} md={6} lg={4} key={e._id}>
              <Stack spacing={1}>
                <EventCard event={e} />

                <Stack direction="row" spacing={1}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() =>
                      navigate(`/events/${e._id}/edit`)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => deleteEvent(e._id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack alignItems="center" spacing={2} sx={{ py: 8 }}>
          <Typography variant="h5">No events yet</Typography>

          <Typography color="text.secondary">
            Create your first event and invite people.
          </Typography>

          <Button
            component={Link}
            to="/create-event"
            variant="contained"
          >
            Create an Event
          </Button>
        </Stack>
      )}
    </Container>
  );
}

function BoxTitle() {
  return (
    <div>
      <Typography
        variant="overline"
        color="primary"
        fontWeight={700}
      >
        YOUR SPACE
      </Typography>

      <Typography variant="h2">My Events</Typography>

      <Typography color="text.secondary">
        Events you created.
      </Typography>
    </div>
  );
}

