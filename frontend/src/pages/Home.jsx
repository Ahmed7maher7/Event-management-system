import { ArrowForward, CalendarMonth, Groups, LocationOn, Search } from '@mui/icons-material';
import { Box, Button, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/api';
import EventCard from '../components/EventCard';

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/events?limit=3')
      .then(r => setEvents(r.data.events))
      .catch(() => {});
  }, []);

  return (
    <Box>
      <Box
        sx={{
          background: '#0c332d',
          color: 'white',
          py: { xs: 7, md: 10 }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Chip
                label="EVENT MANAGEMENT "
                sx={{
                  mb: 2,
                  color: '#f2f8f7',
                  background: '#2b8b7e',
                  fontWeight: 700
                }}
              />

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: 46, md: 72 },
                  lineHeight: 1.05,
                  maxWidth: 700
                }}
              >
                Find events. Create memories.
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mt: 2,
                  maxWidth: 600,
                  color: '#d6dedb',
                  fontWeight: 400,
                  lineHeight: 1.7
                }}
              >
                Discover workshops, meetups and activities, or create your own event and invite people to join.
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                mt={4}
              >
                <Button
                  component={Link}
                  to="/events"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                >
                  Explore Events
                </Button>

                <Button
                  component={Link}
                  to="/create-event"
                  variant="outlined"
                  size="large"
                  sx={{
                    color: 'white',
                    borderColor: 'white'
                  }}
                >
                  Create an Event
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper
                sx={{
                  p: 3,
                  background: '#f7f4ee',
                  color: '#18332f',
                  transform: 'rotate(2deg)',
                  boxShadow: '12px 12px 0 #2b8b7e'
                }}
              >
                <Typography variant="overline" fontWeight={700}>
                  YOUR NEXT EVENT
                </Typography>

                <Typography variant="h4" fontWeight={800} my={1}>
                  Something worth showing up for.
                </Typography>

                <Stack spacing={1.5} mt={3}>
                  <Typography>
                    <CalendarMonth
                      color="primary"
                      sx={{ mr: 1, verticalAlign: 'middle' }}
                    />
                    Easy event planning
                  </Typography>

                  <Typography>
                    <Groups
                      color="primary"
                      sx={{ mr: 1, verticalAlign: 'middle' }}
                    />
                    Simple registration
                  </Typography>

                  <Typography>
                    <LocationOn
                      color="primary"
                      sx={{ mr: 1, verticalAlign: 'middle' }}
                    />
                    Discover local events
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ sm: 'end' }}
          mb={4}
        >
          <Box>
            <Typography
              variant="overline"
              color="primary"
              fontWeight={700}
            >
              UPCOMING EVENTS
            </Typography>

            <Typography variant="h3">
              What's happening?
            </Typography>
          </Box>

          <Button
            component={Link}
            to="/events"
            endIcon={<Search />}
          >
            See all events
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {events.map((e) => (
            <Grid item xs={12} md={4} key={e._id}>
              <EventCard event={e} />
            </Grid>
          ))}
        </Grid>

        {!events.length && (
          <Typography color="text.secondary">
            No events available yet.
          </Typography>
        )}
      </Container>
    </Box>
  );
}

