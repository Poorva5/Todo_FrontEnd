import * as React from 'react';
import {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
const theme = createTheme ();

const SignUp = () => {
  const handleSubmit = event => {
    event.preventDefault ();
    const data = new FormData (event.currentTarget);
    console.log ({
      email: data.get ('email'),
      password: data.get ('password'),
    });
  };

  const [email, setEmail] = useState ('');
  const [username, setUserName] = useState ('');
  const [password, setPassword] = useState ('');
  const [errors, setErrors] = useState (false);
  const [loading, setLoading] = useState (true);

  useEffect (() => {
    if (localStorage.getItem ('token') !== null) {
      window.location.replace ('http://localhost:3000/dashboard');
    } else {
      setLoading (false);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault ();

    const user = {
      email: email,
      username: username,
      password: password,
    };

    fetch ('http://127.0.0.1:8000/api/user/auth/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify (user),
    })
      // .then (res => res.json ())
      .then (res => {
        console.log (res, res.data, 'res', res.status, res.status===201);
        if (res.status === 201) {
          localStorage.clear ();
          // localStorage.setItem ('token', res.data.key);
          window.location.replace ('http://localhost:3000/dashboard');
        } else {
          setEmail ('');
          setUserName ('');
          setPassword ('');
          localStorage.clear ();
          setErrors (true);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}} />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="userame"
                  label="User Name"
                  value={username}
                  onChange={e => setUserName (e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail (e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword (e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              onClick={onSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
