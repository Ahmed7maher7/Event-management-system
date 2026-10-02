import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/api";
import EventCard from "../components/EventCard";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const load = () => {
    setLoading(true);
    const q = new URLSearchParams({ page, limit: 6 });
    if (search) q.set("search", search);
    if (category) q.set("category", category);
    api
      .get(`/events?${q}`)
      .then((r) => {
        setEvents(r.data.events);
        setPages(r.data.pagination.pages);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    api.get("/categories").then((r) => setCategories(r.data.categories));
  }, []);
  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [page, search, category]);
  return (
    <Container maxWidth="lg" sx={{ py: 7, minHeight: "60vh" }}>
      <Typography variant="overline" color="primary" fontWeight={700}>
        DISCOVER
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Find your next event.
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Search by name, place, or category.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={4}>
        <TextField
          fullWidth
          placeholder="Search events or locations..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: { sm: 230 } }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
          >
            <MenuItem value="">All categories</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      {loading ? (
        <Grid container spacing={3}>
          {[1, 2, 3].map((x) => (
            <Grid item xs={12} md={4} key={x}>
              <Box sx={{ height: 320, bgcolor: "#e8e3d9", borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      ) : events.length ? (
        <>
          <Grid container spacing={3}>
            {events.map((e) => (
              <Grid item xs={12} md={6} lg={4} key={e._id}>
                <EventCard event={e} />
              </Grid>
            ))}
          </Grid>
          <Stack alignItems="center" mt={5}>
            <Pagination
              count={pages}
              page={page}
              onChange={(_, v) => setPage(v)}
              color="primary"
            />
          </Stack>
        </>
      ) : (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h5">No events found</Typography>
          <Typography color="text.secondary" mb={2}>
            Try another search or category.
          </Typography>
          <Button
            onClick={() => {
              setSearch("");
              setCategory("");
              setPage(1);
            }}
          >
            Clear filters
          </Button>
        </Box>
      )}
    </Container>
  );
}
