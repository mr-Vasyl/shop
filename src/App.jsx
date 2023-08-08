import { Fragment } from "react";
import Header from "components/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import Footer from "components/Footer/Footer";
import ScrollToTop from "./widgets/ScrollToTop/ScrollToTop";

const App = () => {
  return (
    <Fragment>
      <div className="wrapper">
        <Header />
        <main>
          <div className="container">
            <AppRoutes />
          </div>
        </main>
        <Footer />
      </div>
      <ScrollToTop />
    </Fragment>
  );
};

export default App;
