import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../styles/devices";
import Account from "./icons/Account";
import Logo from "./icons/Logo";
import Menu from "./icons/Menu";

const NavContainer = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    height: 80px;
    width: 100%;
    background-color: #ffffff;
    align-items: center;
    justify-content: space-between;
    padding-left: 12px;
    padding-right: 12px;
    z-index: 10000;

    @media ${devices.mobileM} {
        padding-left: 24px;
        padding-right: 24px;
    }
`;

const NavBrandContainer = styled.div`
    display: flex;
`;

const NavBrandLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
    text-decoration: none;

    @media ${devices.mobileM} {
        gap: 12px;
    }

    @media ${devices.mobileL} {
        gap: 24px;
    }
`;

const NavBrandText = styled.div`
    display: none;

    @media ${devices.mobileS} {
        display: block;
        font-weight: 700;
        font-size: 22px;
        color: #000000;
    }

    @media ${devices.mobileM} {
        font-size: 26px;
    }
`;

const NavAccountButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 42px;
    height: 42px;
    border-radius: 21px;
    background-color: #edd035;
`;

const NavOptionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

const NavExtraOptions = styled.div.attrs(
    (props: { isOpened: boolean }) => props
)`
    display: ${(props) => (props.isOpened ? "flex" : "none")};
    align-items: left;
    flex-direction: column;
    gap: 0px;
    position: fixed;
    top: 100px;
    right: 12px;
    background-color: #ffffff;
    z-index: 10000;
    border-radius: 18px;
    box-shadow: 0px 0px 2px #0b0f10;

    @media ${devices.mobileM} {
        right: 24px;
    }

    @media (min-width: 550px) {
        display: flex;
        position: relative;
        top: unset;
        right: unset;
        flex-direction: row;
        gap: 24px;
        align-items: center;
        box-shadow: none;
        border-radius: 0px;
    }
`;

const NavExtraOption = styled.div`
    display: flex;
    align-items: center;

    a {
        width: 100%;
        text-decoration: none;
        background-color: transparent;
        color: #edd035;
        padding: 8px 20px;
        border-radius: inherit;
    }

    a.active {
        background-color: #edd035;
        color: #ffffff;
        border-radius: inherit;
    }

    :first-child {
        border-radius: 18px 18px 0px 0px;
    }

    :last-child {
        border-radius: 0px 0px 18px 18px;
    }

    @media (min-width: 550px) {
        :first-child {
            border-radius: unset;
        }

        :last-child {
            border-radius: unset;
        }

        a {
            text-decoration: none;
            background-color: transparent;
            color: #edd035;
            padding: 0;
            border-radius: 0px;
            width: auto;
        }

        a.active {
            background-color: #edd035;
            color: #ffffff;
            padding: 2px 6px;
            border-radius: 4px;
        }
    }
`;

const NavMenuButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @media (min-width: 550px) {
        display: none;
    }
`;

function Nav() {
    const navigate = useNavigate();
    const [isOpened, setIsOpened] = useState(false);

    return (
        <NavContainer>
            <NavBrandContainer>
                <NavBrandLink to="/" title="EcoPalMaps">
                    <Logo type="index-logo" />
                    <NavBrandText>EcoPalMaps</NavBrandText>
                </NavBrandLink>
            </NavBrandContainer>
            <NavOptionsContainer>
                <NavExtraOptions isOpened={isOpened}>
                    <NavExtraOption>
                        <NavLink
                            className={(navData: any) =>
                                navData.isActive ? "active" : ""
                            }
                            to="/e-mobility"
                            title="E-mobility"
                        >
                            E-mobility
                        </NavLink>
                    </NavExtraOption>
                    <NavExtraOption>
                        <NavLink
                            className={(navData: any) =>
                                navData.isActive ? "active" : ""
                            }
                            to="/palma-di-montechiaro"
                            title="Palma di Montechiaro"
                        >
                            La città
                        </NavLink>
                    </NavExtraOption>
                    <NavExtraOption>
                        <NavLink
                            className={(navData: any) =>
                                navData.isActive ? "active" : ""
                            }
                            to="/about"
                            title="Informazioni"
                        >
                            Informazioni
                        </NavLink>
                    </NavExtraOption>
                </NavExtraOptions>
                <NavMenuButton
                    role="button"
                    onClick={() => {
                        setIsOpened(!isOpened);
                    }}
                >
                    <Menu />
                </NavMenuButton>
                <NavAccountButton
                    role="link"
                    title="Vai al profilo"
                    onClick={() => {
                        navigate("/profile");
                    }}
                >
                    <Account />
                </NavAccountButton>
            </NavOptionsContainer>
        </NavContainer>
    );
}

export default Nav;
