import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Preloader from "./components/utils/Preloader";
import IsAuthenticated from "./components/routes/IsAuthenticated";
import IsNotAuthenticated from "./components/routes/IsNotAuthenticated";
import Authentication from "./pages/Authentication";
import City from "./pages/City";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ModifyPassword from "./pages/ModifyPassword";
import PlacePage from "./pages/PlacePage";
import Profile from "./pages/Profile";
import RecoverPassword from "./pages/RecoverPassword";
import Signup from "./pages/Signup";
import VerifyAccount from "./pages/VerifyAccount";
import { setAccessToken } from "./utils/token";
import Electric from "./pages/Electric";
import ElectricPage from "./pages/ElectricPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";
import SupportAndFeedback from "./pages/SupportAndFeedback";
import ProfileSettings from "./pages/ProfileSettings";

function App() {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_ORIGIN!, {
            method: "POST",
            credentials: "include",
        }).then(async (x) => {
            const { accessToken } = await x.json();
            setAccessToken(accessToken);
            if (accessToken) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Preloader />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<Authentication />}
                        />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<Login />}
                        />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<Signup />}
                        />
                    }
                />
                <Route
                    path="/verify/:token"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<VerifyAccount />}
                        />
                    }
                />
                <Route
                    path="/recover-password"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<RecoverPassword />}
                        />
                    }
                />
                <Route
                    path="/modify-password/:token"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<ModifyPassword />}
                        />
                    }
                />
                <Route
                    path="/logout"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<Logout />}
                        />
                    }
                />
                <Route
                    path="/home"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<HomePage />}
                        />
                    }
                />
                <Route
                    path="/e-mobility"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<Electric />}
                        />
                    }
                />
                <Route
                    path="/go-to/:slug"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<PlacePage />}
                        />
                    }
                />
                <Route
                    path="/electric/:slug"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<ElectricPage />}
                        />
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<Profile />}
                        />
                    }
                />
                <Route
                    path="/profile/settings"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<ProfileSettings />}
                        />
                    }
                />
                <Route
                    path="/palma-di-montechiaro"
                    element={
                        <IsAuthenticated isAuth={isAuth} children={<City />} />
                    }
                />
                <Route
                    path="/about"
                    element={
                        <IsAuthenticated isAuth={isAuth} children={<About />} />
                    }
                />
                <Route
                    path="/support-and-feedback"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<SupportAndFeedback />}
                        />
                    }
                />
                <Route
                    path="/privacy-policy"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<PrivacyPolicy />}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
