import { FunctionComponent, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

export interface IsNotAuthenticatedProps {
    children: JSX.Element;
    isAuth: boolean;
}

const IsNotAuthenticated: FunctionComponent<IsNotAuthenticatedProps> = ({
    children,
    isAuth,
}) => {
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return isAuth ? <Navigate replace to="/home" /> : children;
};

export default IsNotAuthenticated;
