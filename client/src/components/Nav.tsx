import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { Button } from "../styles/global";
import Account from "./icons/Account";
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
    text-decoration: none;

    svg {
        height: 52px;
    }

    @media ${devices.laptopS} {
        svg {
            height: 62px;
        }
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
    (props: { isOpened: boolean, visible: boolean }) => props
)`
    display: flex;
    align-items: left;
    flex-direction: column;
    gap: 8px;
    position: fixed;
    top: unset;
    left: 0;
    right: 0;
    bottom: ${(props) => (props.isOpened ? `0` : `-100%`)};
    background-color: #ffffff;
    z-index: 10000;
    padding-top: 24px;
    padding-bottom: 24px;
    border-radius: 18px 18px 0px 0px;
    animation: ${(props) => (props.visible ? `slideIn` : `slideOut`)} 0.4s;

    @media ${devices.tablet} {
        display: flex;
        position: relative;
        top: unset;
        left: unset;
        right: unset;
        bottom: unset;
        flex-direction: row;
        gap: 24px;
        align-items: center;
        box-shadow: none;
        border-radius: 0px;
        padding: 0;
        background-color: transparent;
        animation: none;
    }

    @keyframes slideIn {
        from {
            transform: translateY(100%);
        }

        to {
            transform: translateY(0%);
        }
    }

    @keyframes slideOut {
        from {
            transform: translateY(0%);
        }

        to {
            transform: translateY(100%);
        }
    }
`;

const NavExtraOptionsOverlay = styled.div.attrs(
    (props: { isOpened: boolean }) => props
)`
    display: ${(props) => (props.isOpened ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 100;

    @media ${devices.tablet} {
        display: none;
    }
`;

const NavExtraOption = styled.div.attrs(
    (props: { color: string }) => props
)`
    display: flex;
    align-items: center;

    a {
        width: 100%;
        text-decoration: none;
        background-color: transparent;
        color: ${(props) => (props.color || "#edd035")};
        padding: 16px 24px;
        border-radius: 18px;
    }

    a.active {
        background-color: ${(props) => (props.color || "#edd035")};
        color: #ffffff;
        padding: 16px 24px;
        border-radius: inherit;
    }

    @media ${devices.tablet} {
        :first-child {
            border-radius: unset;
        }

        :last-child {
            border-radius: unset;
        }

        a {
            text-decoration: none;
            background-color: transparent;
            color: ${(props) => (props.color || "#edd035")};
            padding: 0;
            border-radius: 0px;
            width: auto;
        }

        a.active {
            background-color: ${(props) => (props.color || "#edd035")};
            color: #ffffff;
            padding: 2px 6px;
            border-radius: 4px;
        }
    }
`;

const CloseNavExtraOptionsContainer = styled.div`
    display: block;
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;

    @media ${devices.tablet} {
        display: none;
    }
`;

const CloseNavExtraOptions = styled(Button)`
    color: #ffffff;
    background-color: transparent;
    background-image: linear-gradient(90deg, #08D608 0%, #039BE5 50%, #EDD035 100%);
    width: 100%;

    @media ${devices.tablet} {
        display: none;
    }
`;

const NavMenuButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @media ${devices.tablet} {
        display: none;
    }
`;

function Nav() {
    const navigate = useNavigate();
    const [isOpened, setIsOpened] = useState(false);
    const [visible, setVisible] = useState(false);

    return (
        <NavContainer>
            <NavBrandContainer>
                <NavBrandLink to="/" title="EcoPalMaps">
                    <svg viewBox="0 0 153 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_b_119_66)">
                            <path d="M21.4634 24.1829L22.6341 26.3293H9.7561V19.3537H18.5L16.5 21.5H11.9024V24.1829H21.4634Z" fill="#08D608"/>
                            <path d="M22.6341 26.7805V30H6V8H22.6341V11.2195H9.21951V26.7805H22.6341Z" fill="#EDD035"/>
                            <path d="M22.6341 12L21.4634 14.1463H11.9024V16.8293H16.5L18.5 18.9756H9.7561V12H22.6341Z" fill="#039BE5"/>
                            <path d="M30.2955 30.2557C28.9886 30.2557 27.8665 29.9688 26.929 29.3949C25.9972 28.821 25.2784 28.0284 24.7727 27.017C24.2727 26 24.0227 24.8295 24.0227 23.5057C24.0227 22.1761 24.2784 21.0028 24.7898 19.9858C25.3011 18.9631 26.0227 18.1676 26.9545 17.5994C27.892 17.0256 29 16.7386 30.2784 16.7386C31.3409 16.7386 32.2812 16.9347 33.0994 17.3267C33.9233 17.7131 34.5795 18.2614 35.0682 18.9716C35.5568 19.6761 35.8352 20.5 35.9034 21.4432H32.9545C32.8352 20.8125 32.5511 20.2869 32.1023 19.8665C31.6591 19.4403 31.0653 19.2273 30.321 19.2273C29.6903 19.2273 29.1364 19.3977 28.6591 19.7386C28.1818 20.0739 27.8097 20.5568 27.5426 21.1875C27.2812 21.8182 27.1506 22.5739 27.1506 23.4545C27.1506 24.3466 27.2812 25.1136 27.5426 25.7557C27.804 26.392 28.1705 26.8835 28.642 27.2301C29.1193 27.571 29.679 27.7415 30.321 27.7415C30.7756 27.7415 31.1818 27.6562 31.5398 27.4858C31.9034 27.3097 32.2074 27.0568 32.4517 26.7273C32.696 26.3977 32.8636 25.9972 32.9545 25.5256H35.9034C35.8295 26.4517 35.5568 27.2727 35.0852 27.9886C34.6136 28.6989 33.9716 29.2557 33.1591 29.6591C32.3466 30.0568 31.392 30.2557 30.2955 30.2557Z" fill="#08D608"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M44.147 30.2557C42.8686 30.2557 41.7607 29.9744 40.8232 29.4119C39.8857 28.8494 39.1584 28.0625 38.6413 27.0511C38.13 26.0398 37.8743 24.858 37.8743 23.5057C37.8743 22.1534 38.13 20.9688 38.6413 19.9517C39.1584 18.9347 39.8857 18.1449 40.8232 17.5824C41.7607 17.0199 42.8686 16.7386 44.147 16.7386C45.4254 16.7386 46.5334 17.0199 47.4709 17.5824C48.4084 18.1449 49.1328 18.9347 49.6442 19.9517C50.1612 20.9688 50.4197 22.1534 50.4197 23.5057C50.4197 24.858 50.1612 26.0398 49.6442 27.0511C49.1328 28.0625 48.4084 28.8494 47.4709 29.4119C46.5334 29.9744 45.4254 30.2557 44.147 30.2557ZM45.9027 27.2131C45.4368 27.5938 44.8572 27.7841 44.1641 27.7841C43.4538 27.7841 42.8629 27.5938 42.3913 27.2131C41.9254 26.8267 41.576 26.3097 41.343 25.6619C41.1158 25.0142 41.0021 24.2926 41.0021 23.4972C41.0021 22.696 41.1158 21.9716 41.343 21.3239C41.576 20.6705 41.9254 20.1506 42.3913 19.7642C42.8629 19.3778 43.4538 19.1847 44.1641 19.1847C44.8572 19.1847 45.4368 19.3778 45.9027 19.7642C46.3686 20.1506 46.7152 20.6705 46.9425 21.3239C47.1754 21.9716 47.2919 22.696 47.2919 23.4972C47.2919 24.2926 47.1754 25.0142 46.9425 25.6619C46.7152 26.3097 46.3686 26.8267 45.9027 27.2131Z" fill="#08D608"/>
                            <path d="M53.1747 12.5455V30H56.3366V24.1023V21.5028V15.1875H59.2344C60.0241 15.1875 60.669 15.321 61.169 15.5881C61.6747 15.8494 62.0469 16.2159 62.2855 16.6875C62.5298 17.1591 62.652 17.7045 62.652 18.3239C62.652 18.9432 62.5298 19.4915 62.2855 19.9688C62.0469 20.446 61.6776 20.821 61.1776 21.0938C60.6776 21.3665 60.0355 21.5028 59.2514 21.5028H56.3366V24.1023H59.6776C61.0241 24.1023 62.1577 23.8551 63.0781 23.3608C63.9986 22.8608 64.6946 22.1761 65.1662 21.3068C65.6378 20.4375 65.8736 19.4432 65.8736 18.3239C65.8736 17.2159 65.6378 16.2273 65.1662 15.358C64.7003 14.483 64.0099 13.7955 63.0952 13.2955C62.1861 12.7955 61.0611 12.5455 59.7202 12.5455H53.1747Z" fill="#039BE5"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M72.0163 30.2642C71.1868 30.2642 70.4396 30.1165 69.7749 29.821C69.1158 29.5199 68.593 29.0767 68.2067 28.4915C67.826 27.9062 67.6357 27.1847 67.6357 26.3267C67.6357 25.5881 67.772 24.9773 68.0447 24.4943C68.3175 24.0114 68.6896 23.625 69.1612 23.3352C69.6328 23.0455 70.1641 22.8267 70.755 22.679C71.3516 22.5256 71.968 22.4148 72.6044 22.3466C73.3714 22.267 73.9936 22.196 74.4709 22.1335C74.9482 22.0653 75.2947 21.9631 75.5107 21.8267C75.7322 21.6847 75.843 21.4659 75.843 21.1705V21.1193C75.843 20.4773 75.6527 19.9801 75.272 19.6278C74.8913 19.2756 74.343 19.0994 73.6271 19.0994C72.8714 19.0994 72.272 19.2642 71.8288 19.5938C71.3913 19.9233 71.0959 20.3125 70.9425 20.7614L68.0618 20.3523C68.2891 19.5568 68.6641 18.892 69.1868 18.358C69.7095 17.8182 70.3487 17.4148 71.1044 17.1477C71.8601 16.875 72.6953 16.7386 73.6101 16.7386C74.2408 16.7386 74.8686 16.8125 75.4936 16.9602C76.1186 17.108 76.6896 17.3523 77.2067 17.6932C77.7237 18.0284 78.1385 18.4858 78.451 19.0653C78.7692 19.6449 78.9283 20.3693 78.9283 21.2386V30H75.9624V28.2017H75.8601C75.6726 28.5653 75.4084 28.9062 75.0675 29.2244C74.7322 29.5369 74.3089 29.7898 73.7976 29.983C73.2919 30.1705 72.6982 30.2642 72.0163 30.2642ZM74.4283 27.6307C73.9737 27.875 73.4368 27.9972 72.8175 27.9972C72.1754 27.9972 71.647 27.8523 71.2322 27.5625C70.8175 27.2727 70.6101 26.8438 70.6101 26.2756C70.6101 25.8778 70.7152 25.554 70.9254 25.304C71.1357 25.0483 71.4226 24.8494 71.7862 24.7074C72.1499 24.5653 72.5618 24.4631 73.022 24.4006C73.2266 24.3722 73.468 24.3381 73.7465 24.2983C74.0249 24.2585 74.3061 24.2131 74.5902 24.1619C74.8743 24.1108 75.13 24.0511 75.3572 23.983C75.5902 23.9148 75.755 23.8409 75.8516 23.7614V25.304C75.8516 25.7869 75.7266 26.233 75.4766 26.642C75.2322 27.0511 74.8828 27.3807 74.4283 27.6307Z" fill="#039BE5"/>
                            <path d="M85.1158 12.5455V30H82.0305V12.5455H85.1158Z" fill="#039BE5"/>
                            <path d="M88.4247 12.5455H92.294L97.4759 25.1932H97.6804L102.862 12.5455H106.732V30H103.697V18.0085H103.536L98.7116 29.9489H96.4446L91.6207 17.983H91.4588V30H88.4247V12.5455Z" fill="#EDD035"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M113.805 30.2642C112.976 30.2642 112.229 30.1165 111.564 29.821C110.905 29.5199 110.382 29.0767 109.996 28.4915C109.615 27.9062 109.425 27.1847 109.425 26.3267C109.425 25.5881 109.561 24.9773 109.834 24.4943C110.107 24.0114 110.479 23.625 110.95 23.3352C111.422 23.0455 111.953 22.8267 112.544 22.679C113.141 22.5256 113.757 22.4148 114.393 22.3466C115.161 22.267 115.783 22.196 116.26 22.1335C116.737 22.0653 117.084 21.9631 117.3 21.8267C117.521 21.6847 117.632 21.4659 117.632 21.1705V21.1193C117.632 20.4773 117.442 19.9801 117.061 19.6278C116.68 19.2756 116.132 19.0994 115.416 19.0994C114.661 19.0994 114.061 19.2642 113.618 19.5938C113.18 19.9233 112.885 20.3125 112.732 20.7614L109.851 20.3523C110.078 19.5568 110.453 18.892 110.976 18.358C111.499 17.8182 112.138 17.4148 112.893 17.1477C113.649 16.875 114.484 16.7386 115.399 16.7386C116.03 16.7386 116.658 16.8125 117.283 16.9602C117.908 17.108 118.479 17.3523 118.996 17.6932C119.513 18.0284 119.928 18.4858 120.24 19.0653C120.558 19.6449 120.717 20.3693 120.717 21.2386V30H117.751V28.2017H117.649C117.462 28.5653 117.197 28.9062 116.857 29.2244C116.521 29.5369 116.098 29.7898 115.587 29.983C115.081 30.1705 114.487 30.2642 113.805 30.2642ZM116.217 27.6307C115.763 27.875 115.226 27.9972 114.607 27.9972C113.964 27.9972 113.436 27.8523 113.021 27.5625C112.607 27.2727 112.399 26.8438 112.399 26.2756C112.399 25.8778 112.504 25.554 112.714 25.304C112.925 25.0483 113.212 24.8494 113.575 24.7074C113.939 24.5653 114.351 24.4631 114.811 24.4006C115.016 24.3722 115.257 24.3381 115.536 24.2983C115.814 24.2585 116.095 24.2131 116.379 24.1619C116.663 24.1108 116.919 24.0511 117.146 23.983C117.379 23.9148 117.544 23.8409 117.641 23.7614V25.304C117.641 25.7869 117.516 26.233 117.266 26.642C117.021 27.0511 116.672 27.3807 116.217 27.6307Z" fill="#EDD035"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M123.82 34.9091V16.9091H126.854V19.0739H127.033C127.192 18.7557 127.416 18.4176 127.706 18.0597C127.996 17.696 128.388 17.3864 128.882 17.1307C129.376 16.8693 130.007 16.7386 130.774 16.7386C131.786 16.7386 132.697 16.9972 133.51 17.5142C134.328 18.0256 134.976 18.7841 135.453 19.7898C135.936 20.7898 136.178 22.017 136.178 23.4716C136.178 24.9091 135.942 26.1307 135.47 27.1364C134.999 28.142 134.357 28.9091 133.544 29.4375C132.732 29.9659 131.811 30.2301 130.783 30.2301C130.033 30.2301 129.411 30.1051 128.916 29.8551C128.422 29.6051 128.024 29.304 127.723 28.9517C127.428 28.5938 127.197 28.2557 127.033 27.9375H126.905V34.9091H123.82ZM127.203 25.679C126.964 25.0426 126.845 24.3011 126.845 23.4545C126.845 22.608 126.962 21.8722 127.195 21.2472C127.433 20.6222 127.783 20.1364 128.243 19.7898C128.703 19.4432 129.263 19.2699 129.922 19.2699C130.609 19.2699 131.183 19.4489 131.643 19.8068C132.104 20.1648 132.45 20.6591 132.683 21.2898C132.916 21.9205 133.033 22.642 133.033 23.4545C133.033 24.2727 132.913 25.0028 132.675 25.6449C132.442 26.2812 132.095 26.7841 131.635 27.1534C131.175 27.517 130.604 27.6989 129.922 27.6989C129.268 27.6989 128.712 27.5227 128.251 27.1705C127.797 26.8125 127.447 26.3153 127.203 25.679Z" fill="#EDD035"/>
                            <path d="M149.166 20.3693L146.354 20.6761C146.274 20.392 146.135 20.125 145.936 19.875C145.743 19.625 145.482 19.4233 145.152 19.2699C144.822 19.1165 144.419 19.0398 143.942 19.0398C143.3 19.0398 142.76 19.179 142.322 19.4574C141.891 19.7358 141.678 20.0966 141.683 20.5398C141.678 20.9205 141.817 21.2301 142.101 21.4688C142.391 21.7074 142.868 21.9034 143.533 22.0568L145.766 22.5341C147.004 22.8011 147.925 23.2244 148.527 23.804C149.135 24.3835 149.442 25.142 149.447 26.0795C149.442 26.9034 149.2 27.6307 148.723 28.2614C148.251 28.8864 147.595 29.375 146.754 29.7273C145.913 30.0795 144.947 30.2557 143.857 30.2557C142.254 30.2557 140.964 29.9205 139.987 29.25C139.01 28.5739 138.428 27.6335 138.24 26.429L141.249 26.1392C141.385 26.7301 141.675 27.1761 142.118 27.4773C142.561 27.7784 143.138 27.929 143.848 27.929C144.581 27.929 145.169 27.7784 145.612 27.4773C146.061 27.1761 146.286 26.804 146.286 26.3608C146.286 25.9858 146.141 25.6761 145.851 25.4318C145.567 25.1875 145.124 25 144.521 24.8693L142.288 24.4006C141.033 24.1392 140.104 23.6989 139.501 23.0795C138.899 22.4545 138.601 21.6648 138.607 20.7102C138.601 19.9034 138.82 19.2045 139.263 18.6136C139.712 18.017 140.334 17.5568 141.129 17.233C141.93 16.9034 142.854 16.7386 143.899 16.7386C145.433 16.7386 146.641 17.0653 147.521 17.7188C148.408 18.3722 148.956 19.2557 149.166 20.3693Z" fill="#EDD035"/>
                        </g>
                        <defs>
                            <filter id="filter0_b_119_66" x="2" y="4" width="151.447" height="34.9091" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feGaussianBlur in="BackgroundImage" stdDeviation="2"/>
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_119_66"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_119_66" result="shape"/>
                            </filter>
                        </defs>
                    </svg>
                </NavBrandLink>
            </NavBrandContainer>
            <NavOptionsContainer>
                <NavExtraOptionsOverlay role="link" 
                    onClick={() => {
                        setVisible(false);
                        setTimeout(() => {
                            setIsOpened(false);
                        }, 400);
                    }} 
                    isOpened={isOpened}
                ></NavExtraOptionsOverlay>
                <NavExtraOptions isOpened={isOpened} visible={visible}>
                    <NavExtraOption color={"#08D608"}>
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
                    <NavExtraOption color={"#039BE5"}>
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
                    <NavExtraOption color={"#EDD035"}>
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
                    <CloseNavExtraOptionsContainer>
                        <CloseNavExtraOptions
                            role="button"
                            onClick={() => {
                                setVisible(false);
                                setTimeout(() => {
                                    setIsOpened(false);
                                }, 400);
                            }}
                        >
                            Chiudi
                        </CloseNavExtraOptions>
                    </CloseNavExtraOptionsContainer>
                </NavExtraOptions>
                <NavMenuButton
                    role="button"
                    onClick={() => {
                        setIsOpened(true);
                        setVisible(true);
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
