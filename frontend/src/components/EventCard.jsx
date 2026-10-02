import { CalendarMonth, LocationOn, People } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const date = new Date(event.date);
  const full = event.registered >= event.capacity;
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#f7f4ee",
        transition: ".2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 22px rgba(0,0,0,.08)",
        },
      }}
    >
      <Stack
        direction="row"
        sx={{ background: "#2b8b7e", color: "white", p: 1.5 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="caption" fontWeight={700}>
          {date.toLocaleDateString("en-US", { month: "short" }).toUpperCase()}
        </Typography>
        <Typography variant="h5" fontWeight={800}>
          {date.getDate()}
        </Typography>
      </Stack>
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Chip size="small" label={event.category?.name || "General"} />
          <Typography variant="caption" color="text.secondary">
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Stack>
        <Typography variant="h6" fontWeight={800} gutterBottom>
          {event.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.7, mb: 2 }}
        >
          {event.description}
        </Typography>
        <Stack spacing={1} mb={2}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "flex", gap: 1, alignItems: "center" }}
          >
            <LocationOn fontSize="small" /> {event.location}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "flex", gap: 1, alignItems: "center" }}
          >
            <People fontSize="small" /> {event.registered}/{event.capacity}{" "}
            registered
          </Typography>
        </Stack>
        <Divider />
        <Button
          component={Link}
          to={`/events/${event._id}`}
          endIcon={<CalendarMonth />}
          sx={{
            mt: "auto",
            pt: 2,
            justifyContent: "space-between",
            textTransform: "none",
          }}
        >
          {full ? "View Event" : "View Event"}
        </Button>
      </CardContent>
    </Card>
  );
}
