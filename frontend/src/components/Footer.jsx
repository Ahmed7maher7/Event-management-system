import { CalendarMonth, Email, LocationOn, Phone } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ mt: 8, background: "#18332f", color: "white" }}
    >
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarMonth color="primary" />
                <Typography variant="h5" fontWeight={800}>
                  Eventoo
                </Typography>
              </Stack>
              <Typography
                sx={{ color: "#d6dedb", maxWidth: 430, lineHeight: 1.7 }}
              >
                A simple place to discover events, meet people, and create
                experiences worth remembering.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography fontWeight={700} mb={1.5}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link
                component={RouterLink}
                to="/events"
                color="#d6dedb"
                underline="hover"
              >
                Explore Events
              </Link>
              <Link
                component={RouterLink}
                to="/create-event"
                color="#d6dedb"
                underline="hover"
              >
                Create Event
              </Link>
              <Link
                component={RouterLink}
                to="/register"
                color="#d6dedb"
                underline="hover"
              >
                Join Eventoo
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Typography fontWeight={700} mb={1.5}>
              Contact
            </Typography>
            <Stack spacing={1}>
              <Typography
                variant="body2"
                sx={{ display: "flex", gap: 1, alignItems: "center" }}
              >
                <Email fontSize="small" /> eventoo@gmail.com
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", gap: 1, alignItems: "center" }}
              >
                <Phone fontSize="small" /> +20 100 111 2222
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", gap: 1, alignItems: "center" }}
              >
                <LocationOn fontSize="small" /> Menoufia, Egypt
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: "#3d5652" }} />
        <Typography variant="body2" sx={{ color: "#aebbb7" }}>
          © 2026 Eventoo | Event Management System .
        </Typography>
      </Container>
    </Box>
  );
}
