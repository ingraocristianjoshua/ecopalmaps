import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

const AccountIcon = styled(SvgIcon)`
    width: 42px;
    height: 42px;

    svg {
        border-radius: 21px;
    }
`;

function Account() {
    return (
        <AccountIcon>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355L15.5355 8.46447Z"
                    fill="#039BE5"
                />
                <path
                    d="M8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447L8.46447 15.5355Z"
                    fill="#08D608"
                />
                <path
                    d="M20 24C20 22.4087 19.1571 20.8826 17.6569 19.7574C16.1566 18.6321 14.1217 18 12 18C9.87827 18 7.84344 18.6321 6.34315 19.7574C4.84286 20.8826 4 22.4087 4 24H20Z"
                    fill="black"
                />
            </svg>
        </AccountIcon>
    );
}

export default Account;
