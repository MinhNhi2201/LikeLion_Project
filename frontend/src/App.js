import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import routes from "./routes"
function App() {
  const { accessToken, userId } = useSelector((state) => state.auth);
  const token = localStorage.getItem("accessToken")
  const id = localStorage.getItem("userId")
  useEffect(() => {
    if (
      !token && token !== "undefined" ||
      !id && id !== "undefined"
    ) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
    }
  }, [accessToken, userId]);

  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          return (
            <Route path={route.path} element={route.element} key={route.path} />
          )
        })}
      </Routes>
    </Router>
  )
}
export default App;
