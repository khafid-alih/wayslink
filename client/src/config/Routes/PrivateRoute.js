import { useContext } from 'react';

import { Outlet, Navigate } from 'react-router-dom'

import userContext from '../../reducer/context/userContext';

const PrivateRoute = () => {
    const [state,] = useContext(userContext);

    return (
        state?.isLogin === true ? <Outlet /> : <Navigate to="/" /> 
    )
}

export default PrivateRoute
