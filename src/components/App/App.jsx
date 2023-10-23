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
import film from '../../images/film.jpg';

const FILMS = [
  {
    id: 1,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: false,
    image: film,
  },
  {
    id: 2,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: true,
    image: film,
  },
  {
    id: 3,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: false,
    image: film,
  },
  {
    id: 4,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: false,
    image: film,
  },
  {
    id: 5,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: true,
    image: film,
  },
  {
    id: 6,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: false,
    image: film,
  },
  {
    id: 7,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: false,
    image: film,
  },
  {
    id: 8,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: true,
    image: film,
  },
  {
    id: 9,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: false,
    image: film,
  },
  {
    id: 10,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: false,
    image: film,
  },
  {
    id: 11,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: true,
    image: film,
  },
  {
    id: 12,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: false,
    image: film,
  },
  {
    id: 13,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: true,
    image: film,
  },
  {
    id: 14,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: false,
    image: film,
  },
  {
    id: 15,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: false,
    image: film,
  },
  {
    id: 16,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    isLiked: true,
    image: film,
  },
];

const SAVED_FILMS = [
  {
    id: 1,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    image: film,
  },
  {
    id: 2,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    image: film,
  },
  {
    id: 3,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    image: film,
  },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  console.log(setIsLoggedIn);

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
              <Movies movies={FILMS} />
            </MainContainer>
          }
        />
        <Route
          exact
          path="/saved-movies"
          element={
            <MainContainer>
              <Movies movies={SAVED_FILMS} isSaved />
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
