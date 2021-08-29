import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory, useLocation} from 'react-router-dom';
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
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const [fetchMovieList, setFetchMovieList] = useState([]);
  const [renderMovieList, setRenderMovieList] = useState([]);
  const [savedMovieList, setSavedMovieList] = useState([]);
  const [savedRenderMovieList, setSavedRenderMovieList] = useState([]);

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
  const [fetchError, setFetchError] = useState({
    isError: false,
    error: '',
  })

  const history = useHistory();
  const location = useLocation();

  function getMovieList({ input, isShortFilm }) {
    getFilms()
      .then(films => {
        setIsInfoToolTipActive(false);
        setLoading(false);
        const sortMovieList = sortFilms(films, input, isShortFilm);
        if (!sortMovieList.length) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
        setFetchMovieList(sortMovieList);
        localStorage.setItem("movies", JSON.stringify(sortMovieList));
      })
      .catch(err => {
        if (err) {
          setLoading(false);
          setIsInfoToolTipActive(true);
        }
      })
      .finally(() => setLoading(true));
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

    if (localStorage.movies !== undefined && fetchMovies.length === 0) {
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

  const handleSearchFormMovies = (input, isShortFilm) => {
    if (location.pathname === "/saved-movies") {
      // console.log(sortFilms(savedMovieList, input, isShortFilm));
      setSavedRenderMovieList(sortFilms(savedMovieList, input, isShortFilm))
    } else {
      getMovieList({ input, isShortFilm });
    }
  };

  const moreMoviesBtnHandler = () => {
    renderMoreMovies(fetchMovieList, renderMovieList.length, setCountRenderMovies().more);
  };

  function handleCardSave(filmData, isSave) {
    const jwt = localStorage.jwt;
    addFilm(filmData, jwt)
      .then(savedMovie => {
        if (savedMovie) {
        const { movie } = savedMovie;
        setSavedMovieList(savedMovieList.concat(movie));
        setIsCardSave(isSave);
        }
      })
      .catch(err => console.log(err));
  };

  function handleCardDelete(movieId) {
    const jwt = localStorage.jwt;
    deleteFilm(movieId, jwt)
      .then(deleteMovie => {
        if (deleteMovie) getSavedMovies();
      });
  };

  function getSavedMovies() {
    if (localStorage.jwt !== undefined) {
      getSavedFilms(localStorage.jwt)
        .then((savedMovies) =>
          setSavedMovieList(savedMovies)
        )
        .catch(err => console.log(err));
    }
  }

  function checkToken () {
    const jwt = localStorage.getItem('jwt');
    if (jwt && jwt !== undefined) {
      getUserInfo(jwt)
        .then(user => authorize(user))
        .catch(err => console.log(err));
    }
  }

  useEffect(() => checkToken(), []);

  useEffect(() => getSavedMovies(), [isCardSave]);

  const authorize = user => {
    const { _id, token, name } = user;
    if (token !== undefined) {
      localStorage.setItem("jwt", token);
    }
    setCurrentUser({ _id, name, email: user.email });
    setLoggedIn(true);
    history.push("movies");
}

  function handleRegister({ name, email, password }) {
    register(name, email, password)
      .then((regUser) => {
        if (regUser) {
          login(email, password).then((user) => {
            if (user) {
              authorize(user)
            }
          });
        }
      })

      .catch((err) => console.log(err.message));
  }

  function handleLogin({ email, password }) {
    login(email, password)
      .then((user) => {
        setFetchError({
          isError: false,
          error: '',
        });
        authorize(user);
      })
      .catch((err) => {
        setFetchError({
          isError: true,
          error: err,
        })
      });
  }

  function handleUpdateUserInfo({ email, name }) {
    updateUserInfo(email, name, localStorage.getItem('jwt'))
      .then(newUserInfo => {
        if (newUserInfo) {
          setFetchError({
            isError: false,
            error: '',
          });
          setCurrentUser({
            ...currentUser,
            name: newUserInfo.name,
            email: newUserInfo.email,
          });
        }
      })
      .catch(err => {
        setFetchError({
          isError: true,
          error: err,
        })
      })

  }

  const signOutHandler = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push("/");
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
            handleSearchFormMovies={handleSearchFormMovies}
            moreMoviesBtnHandler={moreMoviesBtnHandler}
            handleCardSave={handleCardSave}
          />
          <ProtectedRoute
            component={SavedMovies}
            path="/saved-movies"
            loggedIn={loggedIn}
            savedMovieList={savedMovieList}
            MoviesForRender={savedRenderMovieList}
            handleSearchFormMovies={handleSearchFormMovies}
            onCardDelete={handleCardDelete}
          />
          <ProtectedRoute
            component={Profile}
            path="/profile"
            loggedIn={loggedIn}
            profileUpdate={handleUpdateUserInfo}
            signOutHandler={signOutHandler}
          />
          <Route path="/signup">
            <Register
              registerHandler={handleRegister}
              fetchError={fetchError}
            />
          </Route>
          <Route path="/signin">
            <Login submitHandler={handleLogin} fetchError={fetchError} />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        <Footer />
      </currentUserContext.Provider>
    </div>
  );
}

export default App;
