import { FunctionComponent } from "react";
import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

export interface EyeProps {
    mode: boolean;
}

const EyeContainer = styled(SvgIcon)`
    width: 26px;
    height: 26px;
    fill: #000000;
    stroke: none;
`;

const Eye: FunctionComponent<EyeProps> = ({ mode }) => {
    return (
        <EyeContainer>
            {mode ? (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.7071 4.70711C21.0976 4.31658 21.0976 3.68342 20.7071 3.29289C20.3166 2.90237 19.6834 2.90237 19.2929 3.29289L3.29289 19.2929C2.90237 19.6834 2.90237 20.3166 3.29289 20.7071C3.68342 21.0976 4.31658 21.0976 4.70711 20.7071L20.7071 4.70711ZM2.41699 8.9743C5.94519 5.12536 11.2125 3.91206 15.8372 5.3344L14.1935 6.97809C10.5541 6.24211 6.61173 7.358 3.8913 10.3257L2.97598 11.3243C2.62552 11.7066 2.62552 12.2934 2.97598 12.6757L3.8913 13.6743C4.48292 14.3197 5.13233 14.8775 5.82385 15.3477L4.38787 16.7837C3.68723 16.2763 3.02619 15.6903 2.41699 15.0257L1.50167 14.0272C0.450289 12.8802 0.450289 11.1198 1.50167 9.97283L2.41699 8.9743ZM12 8C12.3583 8 12.7056 8.04712 13.0361 8.13549L10.5876 10.584L10.584 10.5876L8.13549 13.0361C8.04711 12.7056 8 12.3583 8 12C8 9.79086 9.79086 8 12 8ZM15.8645 10.9639L10.9639 15.8645C11.2944 15.9529 11.6417 16 12 16C14.2091 16 16 14.2091 16 12C16 11.6417 15.9529 11.2944 15.8645 10.9639ZM20.1087 13.6743C17.3883 16.642 13.4459 17.7579 9.80651 17.0219L8.16283 18.6656C12.7875 20.0879 18.0548 18.8746 21.583 15.0257L22.4983 14.0272C23.5497 12.8802 23.5497 11.1198 22.4983 9.97283L21.583 8.9743C20.9738 8.30972 20.3128 7.72372 19.6121 7.2163L18.1761 8.65228C18.8677 9.12252 19.5171 9.68034 20.1087 10.3257L21.024 11.3243C21.3745 11.7066 21.3745 12.2934 21.024 12.6757L20.1087 13.6743Z"
                    />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21.583 8.9743C16.4306 3.35352 7.56937 3.35352 2.41699 8.9743L1.50167 9.97283C0.450289 11.1198 0.450289 12.8802 1.50167 14.0272L2.41699 15.0257C7.56937 20.6465 16.4306 20.6465 21.583 15.0257L22.4983 14.0272C23.5497 12.8802 23.5497 11.1198 22.4983 9.97283L21.583 8.9743ZM3.8913 10.3257C8.251 5.56971 15.749 5.56971 20.1087 10.3257L21.024 11.3243C21.3745 11.7066 21.3745 12.2934 21.024 12.6757L20.1087 13.6743C15.749 18.4303 8.251 18.4303 3.8913 13.6743L2.97598 12.6757C2.62552 12.2934 2.62552 11.7066 2.97598 11.3243L3.8913 10.3257ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                    />
                </svg>
            )}
        </EyeContainer>
    );
};

export default Eye;