import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory} from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import { getFilms } from '../../utils/MoviesApi';
import { sortFilms } from '../../utils/sortFilms';
import {
  addFilm,
  getUserInfo,
  login,
  register,
  updateUserInfo,
  getSavedFilms,
  deleteFilm,
} from "../../utils/MainApi";
import { currentUserContext } from '../../contexts/userContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [fetchMovieList, setFetchMovieList] = useState([]);
  const [renderMovieList, setRenderMovieList] = useState([]);
  const [savedMovieList, setSavedMovieList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isInfoToolTipActive, setIsInfoToolTipActive] = useState(false);
  const [moreBtnDisabled, setMoreBtnDisabled] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    _id: '',
    name: '',
    email: '',
  })
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCardSave, setIsCardSave] = useState(false);

  const history = useHistory();

  async function getMovieList({ input, isShortFilm }) {
    try {
      setIsInfoToolTipActive(false);
      setLoading(true);
      const films = await getFilms();
      const sortMovieList = sortFilms(films, input, isShortFilm);
      setLoading(false);
      if (!sortMovieList.length) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
      setFetchMovieList(sortMovieList);
      localStorage.setItem('movies', JSON.stringify(sortMovieList))
    } catch (err) {
      setLoading(false);
      setIsInfoToolTipActive(true);
    }
  }

  const renderMovies = (fetchMovies, renderCount, moviesArrayForRender) => {

    if (fetchMovies.length < renderCount) {
      fetchMovies.forEach((movie) => moviesArrayForRender.push(movie));
    } else {
      for (let movieCount = 0; movieCount < renderCount; movieCount++) {
        const movie = fetchMovies[movieCount];
        moviesArrayForRender.push(movie);
      }
    }
  };

  const renderBaseMovies = (fetchMovies, renderCount) => {
    const moviesArrayForRender = [];

    if (localStorage.movies !== undefined) {
      renderMovies(JSON.parse(localStorage.movies), renderCount, moviesArrayForRender)
    }

    if (fetchMovies.length) {
      renderMovies(fetchMovies, renderCount, moviesArrayForRender);
    }

    setRenderMovieList(moviesArrayForRender);
    setMoreBtnDisabled(false);
  }

  const renderMoreMovies = (fetchMovies, lastMovieIndex, renderMoreMoviesCount) => {
    if (!fetchMovies.length) {
      fetchMovies = JSON.parse(localStorage.movies);
    }

    const moviesArrayForRender = fetchMovies.slice(
      lastMovieIndex,
      lastMovieIndex + renderMoreMoviesCount
    );

    if (lastMovieIndex === fetchMovies.length) {
      setMoreBtnDisabled(true);
    }
      setRenderMovieList(renderMovieList.concat(moviesArrayForRender));
  }

  const setCountRenderMovies = () => {
    let countsRenderMovies = {
      base: 0,
      more: 0,
    }

    if (window.innerWidth >= 1165) {
      countsRenderMovies.base = 12;
      countsRenderMovies.more = 3;
    } else if (window.innerWidth >= 615 && window.innerWidth <= 1165) {
      countsRenderMovies.base = 8;
      countsRenderMovies.more = 2;
    } else if (window.innerWidth >= 320 && window.innerWidth <= 615) {
      countsRenderMovies.base = 5;
      countsRenderMovies.more = 2;
    }

    return countsRenderMovies;
  }

  useEffect(() => {
    renderBaseMovies(fetchMovieList, setCountRenderMovies().base);
  }, [fetchMovieList]);

  const handleSearchFormSubmit = (input, isShortFilm) => {
    getMovieList({ input, isShortFilm });
  };

  const moreMoviesBtnHandler = () => {
    renderMoreMovies(fetchMovieList, renderMovieList.length, setCountRenderMovies().more);
  }

  async function handleCardSave(filmData, isSave, deleteMovieId) {
    const jwt = localStorage.jwt;
    try {
      if (isSave) {
        console.log(deleteMovieId);
        const deleteMovie = await deleteFilm(deleteMovieId, jwt);
        if (deleteMovie) getSavedMovies();
      } else {
        const savedMovie = await addFilm(filmData, jwt);
        if (savedMovie) {
          const { movie } = savedMovie;
          setSavedMovieList(savedMovieList.concat(movie));
          setIsCardSave(isSave);
        }
      }

    } catch (err) {
      console.log(err);
    }
  }

  async function getSavedMovies() {
    const savedMovies = await getSavedFilms(localStorage.jwt);
    setSavedMovieList(savedMovies);
  }

  async function checkToken () {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      try {
        const userInfo = await getUserInfo(jwt);
        if (userInfo) {
          setCurrentUser({
            ...currentUser,
            email: userInfo.email,
            name: userInfo.name,
          });
          setLoggedIn(true);
          history.push('movies');
        }
      } catch (err) {
        console.log(err);
      }

    }
  }

  useEffect(() => checkToken(), []);

  useEffect(() => getSavedMovies(), [isCardSave]);

  async function handleRegister({ name, email, password }) {
    try {
      const user = await register(name, email, password);
      if (user) history.push('signin');
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLogin({ email, password }) {
    try {
      const user = await login(email, password);
      const { _id, token, name } = await user;
      setCurrentUser({ _id, name, email: user.email });
      localStorage.setItem('jwt', token);
      setLoggedIn(true);
      history.push('movies');
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateUserInfo({ email, name }) {
    try {
      const newUserInfo = await updateUserInfo(email, name, localStorage.getItem('jwt'));
    if (newUserInfo) {
      setCurrentUser({ ...currentUser, name: newUserInfo.name, email: newUserInfo.email });
    }
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <div className="app">
      <currentUserContext.Provider value={currentUser}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
            <ProtectedRoute
              component={Movies}
              path="/movies"
              loggedIn={loggedIn}
              movieList={renderMovieList}
              savedMovies={savedMovieList}
              notFound={notFound}
              loading={loading}
              isActive={isInfoToolTipActive}
              moreBtnActive={moreBtnDisabled}
              handleSearchFormSubmit={handleSearchFormSubmit}
              moreMoviesBtnHandler={moreMoviesBtnHandler}
              handleCardSave={handleCardSave}
            />
            <ProtectedRoute
              component={SavedMovies}
              path="/saved-movies"
              loggedIn={loggedIn}
            />
          <ProtectedRoute
            component={Profile}
            path="/profile"
            loggedIn={loggedIn}
            profileUpdate={handleUpdateUserInfo}
          />
          <Route path="/signup">
            <Register registerHandler={handleRegister} />
          </Route>
          <Route path="/signin">
            <Login submitHandler={handleLogin} />
          </Route>
        </Switch>
        <Footer />
      </currentUserContext.Provider>
    </div>
  );
}

export default App;
