import {
  CalendarMonth,
  ConfirmationNumber,
  LocationOn,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function MyRegistrations() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        const response = await api.get("/registrations/mine");
        setItems(response.data.registrations);
      } catch (err) {
        setItems([]);
      }
    }

    fetchRegistrations();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 7, minHeight: "60vh" }}>
      <Typography variant="overline" color="primary" fontWeight={700}>
        YOUR CALENDAR
      </Typography>

      <Typography variant="h2" mb={1}>
        My Tickets
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Events you chose to show up for.
      </Typography>

      {items.length ? (
        <Stack spacing={2}>
          {items.map((r) => {
            const e = r.event;
            const d = new Date(e.date);

            return (
              <Card key={r._id} sx={{ background: "#fffdf8" }}>
                <CardContent>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems={{ sm: "center" }}
                  >
                    <Stack alignItems="center" sx={{ minWidth: 70 }}>
                      <Typography variant="caption" fontWeight={700}>
                        {d
                          .toLocaleDateString("en-US", { month: "short" })
                          .toUpperCase()}
                      </Typography>

                      <Typography variant="h4" fontWeight={800}>
                        {d.getDate()}
                      </Typography>
                    </Stack>

                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ display: { xs: "none", sm: "block" } }}
                    />

                    <BoxInfo event={e} date={d} />

                    <Button
                      component={Link}
                      to={`/events/${e._id}`}
                      variant="outlined"
                      sx={{ ml: { sm: "auto" } }}
                    >
                      View
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      ) : (
        <Stack alignItems="center" spacing={2} sx={{ py: 7 }}>
          <ConfirmationNumber sx={{ fontSize: 45 }} color="primary" />

          <Typography variant="h5">No tickets yet</Typography>

          <Typography color="text.secondary">
            Explore events and reserve your spot.
          </Typography>

          <Button component={Link} to="/events" variant="contained">
            Explore Events
          </Button>
        </Stack>
      )}
    </Container>
  );
}

function BoxInfo({ event: e, date: d }) {
  return (
    <Box>
      <Typography variant="caption" color="primary">
        {e.category?.name}
      </Typography>

      <Typography variant="h6" fontWeight={800}>
        {e.title}
      </Typography>

      <Stack direction="row" spacing={2} color="text.secondary">
        <Typography
          variant="caption"
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        >
          <CalendarMonth fontSize="small" />
          {d.toLocaleDateString()}
        </Typography>

        <Typography
          variant="caption"
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        >
          <LocationOn fontSize="small" />
          {e.location}
        </Typography>
      </Stack>
    </Box>
  );
}

