import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

const PreloaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #ffffff;
`;

const PreloaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PreloaderLogo = styled(SvgIcon)`
    width: 72px;
    height: 72px;
`;

function Preloader() {
    return (
        <PreloaderWrapper>
            <PreloaderContainer>
                <PreloaderLogo>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.4634 17.0976L20.6341 19.2439H7.7561V12.2683H16.5L14.5 14.4146H9.90244V17.0976H19.4634Z"
                            fill="#08D608"
                        />
                        <path
                            d="M20.6341 19.7805V23H4V1H20.6341V4.21951H7.21951V19.7805H20.6341Z"
                            fill="#EDD035"
                        />
                        <path
                            d="M20.6341 4.7561L19.4634 6.90244H9.90244V9.58537H14.5L16.5 11.7317H7.7561V4.7561H20.6341Z"
                            fill="#039BE5"
                        />
                    </svg>
                </PreloaderLogo>
            </PreloaderContainer>
        </PreloaderWrapper>
    );
}

export default Preloader;
