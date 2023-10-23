import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './MainContainer.css';

function MainContainer({ isLoggedIn, children }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="main-container">{children}</main>
      <Footer />
    </>
  );
}

export default MainContainer;
