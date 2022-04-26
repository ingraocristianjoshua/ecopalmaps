import { Link, useNavigate, useNavigationType } from "react-router-dom";
import styled from "styled-components";
import Head from "../components/Head";
import Back from "../components/icons/Back";
import Logo from "../components/icons/Logo";
import Preloader from "../components/Preloader";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { devices } from "../styles/devices";
import { Button, PageText } from "../styles/global";
import { setAccessToken } from "../utils/token";

const LogoutPage = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const LogoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #c7c5bc;
    border-radius: 24px;
    max-width: 90vw;

    @media ${devices.mobileS} {
        max-width: 75vw;
    }

    @media ${devices.mobileM} {
        max-width: 65vw;
    }

    @media ${devices.mobileL} {
        max-width: 57.5vw;
    }

    @media ${devices.tablet} {
        max-width: 40vw;
    }

    @media ${devices.laptopS} {
        max-width: 32vw;
    }

    @media ${devices.laptopM} {
        max-width: 28vw;
    }

    @media ${devices.laptopL} {
        max-width: 26vw;
    }

    @media ${devices.desktop} {
        max-width: 25vw;
    }
`;

const LogoutPageHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    padding: 24px;

    @media ${devices.tablet} {
        gap: 24px;
    }
`;

const ExitLogoutPage = styled.div`
    display: block;
    cursor: pointer;
`;

const LogoText = styled.div`
    display: block;
    font-weight: 700;
    font-size: 22px;
    color: #000000;
`;

const LogoutPageContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 24px;
`;

const LogoutButton = styled(Button)`
    background-color: red;
    color: #ffffff;
`;

function Logout() {
    const navigate = useNavigate();
    const navigationType = useNavigationType();

    const { data, loading } = useMeQuery({ fetchPolicy: "network-only" });
    const [logout, { client }] = useLogoutMutation();

    if (loading || !data?.me) {
        return <Preloader />;
    }

    return (
        <>
            <Head
                title="Disconnettiti | EcoPalMaps"
                description="Disconnettiti da EcoPalMaps."
            />
            <LogoutPage>
                <LogoutContainer>
                    <LogoutPageHeader>
                        <ExitLogoutPage
                            title="Vai indietro"
                            role="button"
                            onClick={() => {
                                if (navigationType === "POP") {
                                    navigate("/");
                                } else {
                                    navigate(-1);
                                }
                            }}
                        >
                            <Back />
                        </ExitLogoutPage>
                        <Link to="/" title="EcoPalMaps">
                            <Logo type="inline" />
                        </Link>
                        <LogoText>Disconnettiti</LogoText>
                    </LogoutPageHeader>
                    <LogoutPageContent>
                        <PageText>
                            Vuoi veramente effettuare la disconnessione da{" "}
                            <b>@{data?.me?.username}</b>?
                        </PageText>
                        <LogoutButton
                            type="button"
                            title="Disconnettiti"
                            onClick={async () => {
                                await logout();
                                setAccessToken("");
                                await client!.resetStore();
                                navigate(0);
                            }}
                        >
                            Disconnettiti
                        </LogoutButton>
                    </LogoutPageContent>
                </LogoutContainer>
            </LogoutPage>
        </>
    );
}

export default Logout;
