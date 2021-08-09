import React from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';

function App() {
  return (
    <div className="app">
      <Header />

      {/* <Main /> */}
      <Movies />

      <Footer />
    </div>
  );
}

export default App;
