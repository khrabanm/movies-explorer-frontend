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

function App() {
  const [currentUser, setCurrentUser] = useState({
    email: '',
    name: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [movies, setMovies] = useState([]);
  const [isMoviesError, setIsMoviesError] = useState(false);

  const navigate = useNavigate();

  const checkToken = useCallback(async () => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
      return mainApi
        .getUserData()
        .then(({ data }) => {
          setIsLoggedIn(true);
          setCurrentUser((prevState) => ({ ...prevState, ...data }));
          return data;
        })
        .catch((err) => {
          console.error(err);
          return err;
        });
    }
    return null;
  }, []);

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
        return err;
      });

  const handleUpdateUser = async ({ name, email }) =>
    mainApi.updateUserData({ name, email }).then((res) => {
      setCurrentUser((prevState) => ({ ...prevState, name, email }));
      return res;
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
                <Profile onLogOut={handleLogOut} onUpdate={handleUpdateUser} />
              </>
            }
          />
          <Route exact path="/signin" element={<Authentication onSubmit={handleLogin} />} />
          <Route
            exact
            path="/signup"
            element={<Authentication onSubmit={handleRegister} isSignIn={false} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
