import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import MainContainer from '../MainContainer/MainContainer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Authentication from '../Authentication/Authentication';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [movies, setMovies] = useState([]);
  const [isMoviesError, setIsMoviesError] = useState(false);
  console.log(setIsLoggedIn);

  const getMovies = async () =>
    moviesApi
      .getMovies()
      .then((res) => {
        setMovies(res);
        return res;
      })
      .catch((err) => {
        console.error(err);
        setIsMoviesError(true);
      });

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <MainContainer isLoggedIn={isLoggedIn}>
              <Main />
            </MainContainer>
          }
        />
        <Route
          exact
          path="/movies"
          element={
            <MainContainer>
              <Movies allMovies={movies} getMovies={getMovies} isError={isMoviesError} />
            </MainContainer>
          }
        />
        <Route
          exact
          path="/saved-movies"
          element={
            <MainContainer>
              <Movies isSaved />
            </MainContainer>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <>
              <Header />
              <Profile />
            </>
          }
        />
        <Route exact path="/signin" element={<Authentication />} />
        <Route exact path="/signup" element={<Authentication isSignIn={false} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
