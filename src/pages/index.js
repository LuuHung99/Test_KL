import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Login = lazy(() => import("./authen/login"));
const Register = lazy(() => import("./authen/register"));
const Dashbroad = lazy(() => import("./dashbroad/index"));
const Home = lazy(() => import("./menu/pages/home/home"));
const About = lazy(() => import("./menu/pages/about/about"));
const Products = lazy(() => import("./menu/pages/product/product"));
const Blog = lazy(() => import("./menu/pages/blog/blog"));
const Contact = lazy(() => import("./menu/pages/contact/contact"));
const Logout = lazy(() => import("./authen/login"));

function AppRouter() {
 
  return (
    <Router>
      <Suspense
        fallback={
          <h1 style={{ textAlign: "center", marginTop: "40px" }}>
            Loading ...
          </h1>
        }
      >
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashbroad">
            <Dashbroad />
          </Route>
          {/* <Route path="/tab-data">
            <TabData />
          </Route> */}
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
}

export default AppRouter;
