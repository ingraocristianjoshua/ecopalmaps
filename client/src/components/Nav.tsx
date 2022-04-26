import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../styles/devices";
import Account from "./icons/Account";
import Logo from "./icons/Logo";

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
    gap: 12px;
    text-decoration: none;

    @media ${devices.mobileS} {
        gap: 24px;
    }
`;

const NavBrandText = styled.div`
    display: block;
    font-weight: 700;
    font-size: 26px;
    color: #000000;
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

function Nav() {
    const navigate = useNavigate();

    return (
        <NavContainer>
            <NavBrandContainer>
                <NavBrandLink to="/" title="EcoPalMaps">
                    <Logo type="index-logo" />
                    <NavBrandText>EcoPalMaps</NavBrandText>
                </NavBrandLink>
            </NavBrandContainer>
            <NavAccountButton role="link" title="Vai al profilo" onClick={() => {
                navigate("/profile");
            }}>
                <Account />
            </NavAccountButton>
        </NavContainer>
    );
}

export default Nav;
