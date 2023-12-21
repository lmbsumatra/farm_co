import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const RequireAuth = ({ children }) => {
    const auth = useAuth();

    if(!auth.user) {
        return <Navigate to='/log-in' />
    }

    return children
}

export default RequireAuth;