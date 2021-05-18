import React, { lazy, Suspense } from "react";
//lazy, Suspense: Giúp load component tối ưu nhất
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

const Home = lazy(() => import("./pages/home/home"));
const About = lazy(() => import("./pages/about/about"));
const Products = lazy(() => import("./pages/product/product"));
const Blog = lazy(() => import("./pages/blog/blog"));
const Contact = lazy(() => import("./pages/contact/contact"));
const Logout = lazy(() => import("../authen/login"));
const Movies = () => {
  return (
    <Router>
      <Suspense fallback={false}>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/">
            <Logout />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Movies;
