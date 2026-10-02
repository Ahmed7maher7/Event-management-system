import { AddCircleOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Toast from "../components/Toast";

export default function CreateEvent() {
  const nav = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: 30,
    category: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.categories);
      } catch (err) {
        setError("Could not load categories");
      }
    }

    fetchCategories();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/events", form);
      nav(`/events/${data.event._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 7 }}>
      <Stack direction="row" spacing={2} alignItems="center" mb={4}>
        <AddCircleOutline color="primary" fontSize="large" />

        <Box>
          <Typography variant="h3">Create an event</Typography>
          <Typography color="text.secondary">
            Add the details and publish it for other users.
          </Typography>
        </Box>
      </Stack>

      <Paper
        component="form"
        onSubmit={submit}
        sx={{ p: { xs: 3, sm: 5 }, background: "#fffdf8" }}
      >
        <Stack spacing={2.5}>
          <TextField
            label="Event title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Frontend Night"
          />

          <FormControl required>
            <InputLabel>Category</InputLabel>

            <Select
              value={form.category}
              label="Category"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <MenuItem value="">Choose a category</MenuItem>

              {categories.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Description"
            required
            multiline
            rows={5}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date & time"
                required
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Capacity"
                required
                type="number"
                inputProps={{ min: 1 }}
                value={form.capacity}
                onChange={(e) =>
                  setForm({ ...form, capacity: e.target.value })
                }
              />
            </Grid>
          </Grid>

          <TextField
            label="Location"
            required
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <Toast message={error} type="error" />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            {loading ? "Creating..." : "Publish Event"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

