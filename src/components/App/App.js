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
import { CARD_COUNT, SIZES } from '../../utils/constance';

function App() {
  const [fetchMovieList, setFetchMovieList] = useState([]);
  const [sortedMovieList, setSortedMovieList] = useState([]);
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
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [isCardSave, setIsCardSave] = useState(false);
  const [fetchError, setFetchError] = useState({
    isSuccess: false,
    isError: false,
    error: '',
  });

  const history = useHistory();
  const location = useLocation();

  const getFetchMovie = () => {
    getFilms()
      .then((fetchFilms) => {
        setLoading(false);
        setFetchMovieList(fetchFilms);
        localStorage.setItem("movies", JSON.stringify(fetchFilms));
      })
      .catch((err) => {
        if (err) {
          setLoading(false);
          setIsInfoToolTipActive(true);
        }
      })
      .finally(() => setLoading(true));
  }

  function generateSortedMovieList({ input, isShortFilm }) {
    if (localStorage.sortedMovies !== undefined && !input && !isShortFilm) {
      setSortedMovieList(
        sortFilms(JSON.parse(localStorage.sortedMovies), input, isShortFilm)
      );
    }
    if (localStorage.movies === undefined && fetchMovieList.length === 0) {
      console.log("fetch");
      getFetchMovie();
    } else if (fetchMovieList.length !== 0) {
      console.log("fromfetch");
      setSortedMovieList(sortFilms(fetchMovieList, input, isShortFilm));
    } else if (localStorage.movies !== undefined) {
      console.log("fromlocal");
      setSortedMovieList(
        sortFilms(JSON.parse(localStorage.movies), input, isShortFilm)
      );
      localStorage.setItem("sortedMovies", JSON.stringify(sortedMovieList));
    }

  }

  function sortShortFilm({ input, isShortFilm }) {
    const shortFilm = !isShortFilm;
    shortFilm
      ? setSortedMovieList(sortFilms(sortedMovieList, input, shortFilm))
      : generateSortedMovieList(input, isShortFilm);
  }

  const renderMovies = (sortMovies, renderCount, moviesArrayForRender) => {
    sortedMovieList.length === 0 ? setNotFound(true) : setNotFound(false);
    setLoading(false);

    if (sortMovies.length < renderCount) {
      sortMovies.forEach((movie) => moviesArrayForRender.push(movie));
    } else {
      for (let movieCount = 0; movieCount < renderCount; movieCount++) {
        const movie = sortMovies[movieCount];
        moviesArrayForRender.push(movie);
      }
    }
  };

  const renderBaseMovies = (sortMovies, renderCount) => {
    const moviesArrayForRender = [];

    if (sortMovies.length !== 0) {
      setIsInfoToolTipActive(false);
      setMoreBtnDisabled(false);
      renderMovies(sortMovies, renderCount, moviesArrayForRender);
    } else {
      setLoading(false);
      setIsInfoToolTipActive(true);
      setMoreBtnDisabled(true);
    }

    setRenderMovieList(moviesArrayForRender);

  }

  const renderMoreMovies = (sortMovies, lastMovieIndex, renderMoreMoviesCount) => {
    if (lastMovieIndex === sortMovies.length) {
      setMoreBtnDisabled(true);
    }
    const moviesArrayForRender = sortMovies.slice(
      lastMovieIndex,
      lastMovieIndex + renderMoreMoviesCount
    );
    setRenderMovieList(renderMovieList.concat(moviesArrayForRender));
  }

  const setCountRenderMovies = () => {
    const countsRenderMovies = {
      base: 0,
      more: 0,
    }

    if (window.innerWidth >= SIZES.desktop) {
      countsRenderMovies.base = CARD_COUNT.baseForDesktop;
      countsRenderMovies.more = CARD_COUNT.moreForDecktop;
    } else if (window.innerWidth >= SIZES.tablet && window.innerWidth <= SIZES.desktop) {
      countsRenderMovies.base = CARD_COUNT.baseForTablet;
      countsRenderMovies.more = CARD_COUNT.moreForTablet;
    } else if (window.innerWidth >= SIZES.mobile && window.innerWidth <= SIZES.tablet) {
      countsRenderMovies.base = CARD_COUNT.baseForMobile;
      countsRenderMovies.more = CARD_COUNT.moreForMobile;
    }

    return countsRenderMovies;
  }

  useEffect(() => {
    generateSortedMovieList({
      input: '',
      isShortFilm: false,
    });
  }, [])
  useEffect(() => {
    renderBaseMovies(sortedMovieList, setCountRenderMovies().base);
  }, [sortedMovieList]);
  useEffect(() => {
    window.addEventListener('resize', renderBaseMovies(fetchMovieList, setCountRenderMovies().base))
    return window.removeEventListener(
      "resize",
      renderBaseMovies(fetchMovieList, setCountRenderMovies().base)
    );
  }, [window.innerWidth])

  const handleSearchFormMovies = (input, isShortFilm) => {
    if (location.pathname === "/saved-movies") {
      setSavedRenderMovieList(sortFilms(savedMovieList, input, isShortFilm))
    } else {
      console.log('search');
      generateSortedMovieList({ input, isShortFilm });
    }
  };

  const moreMoviesBtnHandler = () => {
    renderMoreMovies(sortedMovieList, renderMovieList.length, setCountRenderMovies().more);
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
        .then(user => {
          authorize(user);
          history.push(location.pathname);
        })
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
}

  function handleRegister({ name, email, password }) {
    register(name, email, password)
      .then((regUser) => {
        if (regUser) {
          login(email, password).then((user) => {
            if (user) {
              authorize(user);
              history.push("/movies");
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
          isSuccess: false,
          isError: false,
          error: "",
        });
        authorize(user);
        history.push('/movies');
      })
      .catch((err) => {
        setFetchError({
          isSuccess: false,
          isError: true,
          error: err,
        });
      });
  }

  function handleUpdateUserInfo({ email, name }) {
    updateUserInfo(email, name, localStorage.getItem("jwt"))
      .then((newUserInfo) => {
        if (newUserInfo) {
          setFetchError({
            isSuccess: true,
            isError: false,
            error: "",
          });
          setCurrentUser({
            ...currentUser,
            name: newUserInfo.name,
            email: newUserInfo.email,
          });
        }
      })
      .catch((err) => {
        setFetchError({
          isSuccess: false,
          isError: true,
          error: err,
        });
      })


  }

  const signOutHandler = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('sortedMovies');
    setLoggedIn(false);
    history.push("/");
  }

  return (
    <div className="app">
      <currentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} />
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
            onCardDelete={handleCardDelete}
            sortShortFilm={sortShortFilm}
          />
          <ProtectedRoute
            component={SavedMovies}
            path="/saved-movies"
            loggedIn={loggedIn}
            savedMovieList={savedMovieList}
            MoviesForRender={savedRenderMovieList}
            handleSearchFormMovies={handleSearchFormMovies}
            onCardDelete={handleCardDelete}
            sortShortFilm={sortShortFilm}
          />
          <ProtectedRoute
            component={Profile}
            path="/profile"
            loggedIn={loggedIn}
            profileUpdate={handleUpdateUserInfo}
            signOutHandler={signOutHandler}
            fetchError={fetchError}
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
