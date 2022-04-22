import { FunctionComponent } from "react";
import styled from "styled-components";
import Back from "../icons/Back";
import { Link, useNavigate, useNavigationType } from "react-router-dom";
import Logo from "../icons/Logo";
import { devices } from "../../styles/devices";
import { PageBlock, PageTextMT48 } from "../../styles/global";

export interface AuthLayoutProps {
    content: JSX.Element;
}

const AuthPage = styled.div`
    display: grid;
    margin-left: 12px;
    margin-right: 12px;

    @media ${devices.mobileS} {
        margin-left: 24px;
        margin-right: 24px;
    }

    @media ${devices.mobileL} {
        margin-left: 48px;
        margin-right: 48px;
    }

    @media ${devices.tablet} {
        margin-left: 16%;
        margin-right: 16%;
    }

    @media ${devices.laptopS} {
        margin-left: 24%;
        margin-right: 24%;
    }

    @media ${devices.laptopM} {
        margin-left: 30%;
        margin-right: 30%;
    }

    @media ${devices.desktop} {
        margin-left: 32%;
        margin-right: 32%;
    }
`;

const AuthPageHeader = styled.div`
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    height: 60px;
    z-index: 100;
    background-color: #ffffff;
`;

const ExitAuthPage = styled.div`
    display: block;
    cursor: pointer;
`;

const AuthPageLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-right: 28px;
`;

const AuthPageContentContainer = styled.div`
    display: block;
    margin-top: 48px;
    padding-bottom: 84px;
`;

const AuthPageContent = styled.div`
    display: block;
`;

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ content }) => {
    const navigate = useNavigate();
    const navigationType = useNavigationType();

    let showLoginOption = true;

    if (window.location.pathname === "/login") {
        showLoginOption = false;
    }

    return (
        <AuthPage>
            <AuthPageHeader>
                <ExitAuthPage
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
                </ExitAuthPage>
                <AuthPageLogo>
                    <Link to="/" title="EcoPalMaps">
                        <Logo type="inline" />
                    </Link>
                </AuthPageLogo>
            </AuthPageHeader>
            <AuthPageContentContainer>
                <AuthPageContent>{content}</AuthPageContent>
                <PageTextMT48>
                    {showLoginOption ? (
                        <PageBlock>
                            Hai già un account?{" "}
                            <Link to="/login" title="Accedi">
                                Accedi
                            </Link>
                        </PageBlock>
                    ) : (
                        <PageBlock>
                            Hai dimenticato la tua password?{" "}
                            <Link
                                to="/recover-password"
                                title="Recupera la tua password"
                            >
                                Recupera la tua password
                            </Link>
                        </PageBlock>
                    )}
                </PageTextMT48>
            </AuthPageContentContainer>
        </AuthPage>
    );
};

export default AuthLayout;
