// Thanawat Jarusuthirug ID: 6488178 Section 1
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  Divider,
} from "@mui/material";

// I'm using mui for the style css, form and make card

function App() {
  // initial variable
  const [data, setData] = useState([]); // data is for fetch data and response is array
  const [name, setName] = useState(""); // setName the anime when using search Textfield when submited
  const [adult, setAdult] = useState(true); // setAdult default is true
  const [year, setYear] = useState(""); // set year and also default is true
  const [selectedMovie, setSelectedMovie] = useState(null); // when click the card it's will take that movie data

  const getData = async (e) => {
    e.preventDefault(); //
    const key = "886a0a93767adc8e3b2fbaffee3abf2f"; // api key from the moviedb for fetch data
    // I'm using axios for fetch by query and have parameter (query for searching by name, Include adult(true/flase) and release year)
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${name}&include_adult=${adult}&primary_release_year=${year}`
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // when movie card has been click it's will get the only that movie data
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <Container>
      {/* 
        I'm using Container from mui for easy make container 
        and when clicking reel image it's will go to root
      */}
      <Grid container alignItems="center" justifyContent="center">
        <a href="/">
          <img
            src={
              "https://images.vexels.com/media/users/3/205433/isolated/preview/196af608efee6f3e3590741fa7c7dc7e-old-film-reel-black.png"
            }
            style={{
              width: "150px",
            }}
          />
        </a>
      </Grid>
      {/* 
        I'm using Grid container for row the data and using TextField as a form
        so when on insert the alphabet it's will re-assign the value consist of name, year
        and include adult(Check mark) or not
      */}
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ marginTop: "10px" }}
      >
        <Grid item>
          <TextField
            label="Movie Name"
            variant="outlined"
            size="small"
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Year"
            variant="outlined"
            size="small"
            type="number"
            inputProps={{ min: 1999, max: 2023 }}
            onChange={(e) => setYear(e.target.value)}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Include Adult"
            onChange={(e) => setAdult(e.target.checked)}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={getData}>
            Submit
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: "15px" }} />{" "}
      {/* Using Divider for (_) the page*/}
      <Grid
        container
        direction="row"
        spacing={2}
        justifyContent="center"
        alignContent="center"
        sx={{ marginTop: "15px" }}
      >
        {data.results?.map((items) => (
          <Grid item xs={6} sm={4} md={3} key={items.id}>
            {/* 
              xs= extra small, sm= small, md=medium
              Grid container have 12 row for each item
              so if screen size is xs it's will have only 2 card
            */}
            <Card sx={{ height: "100%" }}>
              <CardActionArea onClick={() => handleMovieClick(items)}>
                {/* when card is click it'll using handleMovieClick function */}
                <CardMedia
                  component="img"
                  height="300"
                  image={
                    items.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${items.poster_path}`
                      : "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
                  }
                  alt={`${items.poster_path}`}
                  sx={{
                    objectFit: "cover",
                    height: "400px",
                    minHeight: "400px",
                  }}
                />
                <CardContent sx={{ height: "100%" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      height: "50px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {items.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                      fontSize: "0.9rem",
                      height: "120px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {/* items?.vote_average.toFixed(2) Round the value have 2 decimal */}
                    {items?.vote_average.toFixed(2) != 0.0
                      ? items?.vote_average.toFixed(2)
                      : "No Rating"}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/*
        Using Modal as a popup after click the movie card
        and set if selectedMovie not null it's will open
        and if close it's will turn selectedMovie to null
        and I'm using ? for handling error
        Example Explain:
          1. selectedMovie? : if array is null it's will return by not error
          2. selectedMovie?.backdrop_path ? `https://image.tmdb.org/t/p/w500/${selectedMovie?.backdrop_path}` : ""
                if backdrop_path not have will return "" and if have will return the image
      */}
      <Modal
        open={selectedMovie !== null}
        onClose={() => setSelectedMovie(null)}
      >
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Box sx={{ bgcolor: "background.paper", p: 2 }}>
            <img
              src={
                selectedMovie?.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500/${selectedMovie?.backdrop_path}`
                  : ""
              }
              style={{ width: "100%" }}
            />
            <Typography variant="h4" gutterBottom>
              {selectedMovie?.title ? selectedMovie?.title : "No title"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {selectedMovie?.overview
                ? selectedMovie?.overview
                : "No description"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {selectedMovie?.release_date
                ? "Release date: " + selectedMovie?.release_date
                : "Release date: -"}
            </Typography>
          </Box>
        </Container>
      </Modal>
    </Container>
  );
}

// ps. for including adult sometime it's show adult it's because api not my fault thank you :)

export default App;
