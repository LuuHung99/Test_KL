import React, { useEffect } from "react";
import "antd/dist/antd.css";
import AppRouter from "./pages/index";
import { useDispatch } from "react-redux";
import { getAllProducts, getTabSession } from "./redux/actions/product.action";
import { isUserLogin } from "./redux/actions/auth.action";
import { getAllTab } from "./redux/actions/tab.action";
import { getAllBackend } from "./redux/actions/backend.action";
import { getAllRoles, getAllActveRoles } from "./redux/actions/role.action";
import { getAllUsers } from "./redux/actions/user.action";

function App() {
  const dispatch = useDispatch();
  const auth = useDispatch((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLogin());
    }
    dispatch(getTabSession());
    dispatch(getAllProducts());
    dispatch(getAllTab());
    dispatch(getAllBackend());
    dispatch(getAllRoles());
    dispatch(getAllActveRoles());
    dispatch(getAllUsers());
  }, [auth, dispatch]);

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
