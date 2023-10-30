import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import MainContainer from '../MainContainer/MainContainer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Authentication from '../Authentication/Authentication';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { MOVIES_IMAGE_URL, UNAUTHORIZED_ERROR } from '../../utils/consts';
import { ProtectedAuthRoute, ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({
    email: '',
    name: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isMoviesError, setIsMoviesError] = useState(false);
  const [isSavedMoviesError, setIsSavedMoviesError] = useState(false);

  const navigate = useNavigate();

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentUser({
      email: '',
      name: '',
    });
    setMovies([]);
    setSavedMovies([]);
    localStorage.clear();
    navigate('/', { replace: true });
  }, [navigate]);

  const getSavedMovies = useCallback(
    async () =>
      mainApi
        .getSavedMovies()
        .then(({ data }) => {
          setSavedMovies(data.movies);
          return data.movies;
        })
        .catch((err) => {
          console.error(err);
          if (err.message === UNAUTHORIZED_ERROR) {
            logout();
          }
          setIsSavedMoviesError(true);
        }),
    [logout],
  );

  const checkToken = useCallback(async () => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
      return mainApi
        .getUserData()
        .then(({ data }) => {
          setIsLoggedIn(true);
          setCurrentUser((prevState) => ({ ...prevState, ...data }));
          getSavedMovies();
          return data;
        })
        .catch((err) => {
          console.error(err);
          if (err.message === UNAUTHORIZED_ERROR) {
            logout();
          }
          return err;
        });
    }
    setIsLoggedIn(false);
    return null;
  }, [getSavedMovies, logout]);

  const getMovies = async () =>
    moviesApi
      .getMovies()
      .then((res) => {
        const allMovies = res.map((movie) => ({
          ...movie,
          image: `${MOVIES_IMAGE_URL}${movie.image.url}`,
          thumbnail: `${MOVIES_IMAGE_URL}${movie.image.formats.thumbnail.url}`,
          movieId: movie.id,
          id: undefined,
          created_at: undefined,
          updated_at: undefined,
        }));
        setMovies(allMovies);
        return allMovies;
      })
      .catch((err) => {
        console.error(err);
        setIsMoviesError(true);
      });

  const handleLogin = async (data) =>
    mainApi.authorize(data).then(() => {
      setIsLoggedIn(true);
      checkToken().then(() => {
        navigate('/movies', { replace: true });
      });
    });

  const handleRegister = async ({ name, email, password }) =>
    mainApi.register({ name, email, password }).then(() => handleLogin({ email, password }));

  const handleLogOut = async () =>
    mainApi
      .logout()
      .then((res) => {
        setIsLoggedIn(false);
        navigate('/', { replace: true });
        return res;
      })
      .catch((err) => {
        console.error(err);
        if (err.message === UNAUTHORIZED_ERROR) {
          logout();
        }
        return err;
      });

  const handleUpdateUser = async ({ name, email }) =>
    mainApi
      .updateUserData({ name, email })
      .then((res) => {
        setCurrentUser((prevState) => ({ ...prevState, name, email }));
        return res;
      })
      .catch((err) => {
        console.error(err);
        if (err.message === UNAUTHORIZED_ERROR) {
          logout();
        }
        return Promise.reject(new Error(err));
      });

  const handleSaveMovie = async (movie) =>
    mainApi
      .saveMovie(movie)
      .then((res) => {
        setSavedMovies((prevState) => [...prevState, res]);
        return res;
      })
      .catch((err) => {
        console.error(err);
        if (err.message === UNAUTHORIZED_ERROR) {
          logout();
        }
        return Promise.reject(new Error(err));
      });

  const handleDeleteMovie = async (movieId) =>
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        setSavedMovies((prevState) => prevState.filter((movie) => movie._id !== movieId));
      })
      .catch((err) => {
        console.error(err);
        if (err.message === UNAUTHORIZED_ERROR) {
          logout();
        }
        return Promise.reject(new Error(err));
      });

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <MainContainer>
                  <Movies
                    allMovies={movies}
                    savedMovies={savedMovies}
                    getMovies={getMovies}
                    onSave={handleSaveMovie}
                    onDelete={handleDeleteMovie}
                    isError={isMoviesError}
                  />
                </MainContainer>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <MainContainer>
                  <Movies
                    savedMovies={savedMovies}
                    getMovies={getSavedMovies}
                    onDelete={handleDeleteMovie}
                    isError={isSavedMoviesError}
                    isSaved
                  />
                </MainContainer>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Header />
                <Profile onLogOut={handleLogOut} onUpdate={handleUpdateUser} />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/signin"
            element={
              <ProtectedAuthRoute isLoggedIn={isLoggedIn}>
                <Authentication onSubmit={handleLogin} />
              </ProtectedAuthRoute>
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <ProtectedAuthRoute isLoggedIn={isLoggedIn}>
                <Authentication onSubmit={handleRegister} isSignIn={false} />
              </ProtectedAuthRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
