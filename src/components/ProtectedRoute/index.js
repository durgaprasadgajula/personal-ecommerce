// import { Navigate } from "react-router-dom";
// import Cookie from "js-cookie";

// const ProtectedRoute = ({ children }) => {
//     const token = Cookie.get("jwt_token");
//     if (token === undefined) {
//         return <Navigate to="/login" />;
//     }
//     return children;
// };

// export default ProtectedRoute;
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ ...rest }) => {
    const token = Cookies.get("jwt_token");
    if (token === undefined) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
