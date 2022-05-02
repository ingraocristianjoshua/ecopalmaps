import { FunctionComponent, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

export interface IsAuthenticatedProps {
    children: JSX.Element;
    isAuth: boolean;
}

const IsAuthenticated: FunctionComponent<IsAuthenticatedProps> = ({
    children,
    isAuth,
}) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return isAuth ? children : <Navigate replace to="/" />;
};

export default IsAuthenticated;
