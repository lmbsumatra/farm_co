import { Navigate } from "react-router-dom";
import { useUserAuth } from "./useAuth";

const RequireUserAuth = ({ children }) => {
    const auth = useUserAuth();

    if(!auth.user) {
        return <Navigate to='/log-in' />
    }

    return children
}

export default RequireUserAuth;