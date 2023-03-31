import Customers from "./pages/Customers"
import Profile from "./pages/Profile"
import Logout from "./pages/Logout"
import Login from "./pages/Login/Login"
import Register from "./pages/Register"
import Default from "./components/Default/Default"
import Protected from "./components/Protected/Protected"

const routes = [
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/users",
        element: <Protected><Default><Customers /></Default></Protected>
    }
    ,
    {
        path: "/profile",
        element: <Protected> <Default><Profile /></Default></Protected>
    },
    {
        path: "/logout",
        element: <Protected><Default><Logout /></Default></Protected>
    }
]

export default routes;