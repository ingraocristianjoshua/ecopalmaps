import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

const MenuButton = styled(SvgIcon)`
    width: 30px;
    height: 30px;
    fill: none;
    stroke: #000000;
`;

function Menu() {
    return (
        <MenuButton>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H21M3 12H21M3 18H21" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </MenuButton>
    );
}

export default Menu;