import { Edit } from "@mui/icons-material";
import {
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
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import Toast from "../components/Toast";

export default function EditEvent() {
  const { id } = useParams();
  const nav = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
    category: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const eventResponse = await api.get(`/events/${id}`);
        const event = eventResponse.data.event;

        setForm({
          title: event.title,
          description: event.description,
          date: event.date ? event.date.slice(0, 16) : "",
          location: event.location,
          capacity: event.capacity,
          category: event.category?._id || "",
        });

        const categoriesResponse = await api.get("/categories");
        setCategories(categoriesResponse.data.categories);
      } catch (err) {
        setError(
          err.response?.data?.message || "Could not load event"
        );
      }
    }

    fetchData();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.put(`/events/${id}`, {
        ...form,
        capacity: Number(form.capacity),
      });

      nav(`/events/${id}`);
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not update event"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 7 }}>
      <Stack direction="row" spacing={2} alignItems="center" mb={4}>
        <Edit color="primary" fontSize="large" />

        <div>
          <Typography variant="h3">Edit Event</Typography>

          <Typography color="text.secondary">
            Update your event details.
          </Typography>
        </div>
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
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <FormControl required>
            <InputLabel>Category</InputLabel>

            <Select
              value={form.category}
              label="Category"
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
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
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
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
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <Toast message={error} type="error" />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

