/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PrivateRoute = ({element}) =>{
if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))){
        return element;
    }

    return <Navigate to={'/login'} replace />
}

export default PrivateRoute;