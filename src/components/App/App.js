import React, { useEffect, useState } from 'react';
import { Switch, Route} from 'react-router-dom';
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

function App() {
  const [fetchMovieList, setFetchMovieList] = useState([]);
  const [renderMovieList, setRenderMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isInfoToolTipActive, setIsInfoToolTipActive] = useState(false);
  const [moreBtnDisabled, setMoreBtnDisabled] = useState(false);
  const [isCardSave, setIsCardSave] = useState(false);

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

    if (window.innerWidth >= 1280) {
      countsRenderMovies.base = 12;
      countsRenderMovies.more = 3;
    } else if (window.innerWidth >= 768) {
      countsRenderMovies.base = 8;
      countsRenderMovies.more = 2;
    } else if (window.innerWidth >= 320 && window.innerWidth <= 425) {
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

  const handleCardSave = () => {
    isCardSave ? setIsCardSave(false) : setIsCardSave(true);
    console.log(isCardSave);
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Header />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header />
          <Movies
            movieList={renderMovieList}
            notFound={notFound}
            loading={loading}
            isActive={isInfoToolTipActive}
            moreBtnActive={moreBtnDisabled}
            handleSearchFormSubmit={handleSearchFormSubmit}
            moreMoviesBtnHandler={moreMoviesBtnHandler}
            isCardSave={isCardSave}
            handleCardSave={handleCardSave}
          />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header />
          <Profile user="Виталий" />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
