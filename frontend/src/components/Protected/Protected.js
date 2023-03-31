import { useSelector } from "react-redux";
import Login from "../../pages/Login/Login";

function Protected({ children }) {
    const { accessToken } = useSelector(state => state.auth);
    const auth = accessToken && accessToken !== "undefined"
    // console.log(accessToken.length)
    return ((auth) ? children : <Login />)
}

export default Protected;