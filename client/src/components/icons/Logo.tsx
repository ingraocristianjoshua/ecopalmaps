import { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

export interface LogoProps {
    type: string;
}

const IndexLogo = styled(SvgIcon)`
    width: 54px;
    height: 54px;
`;

const InlineLogo = styled(SvgIcon)`
    width: 42px;
    height: 42px;
`;

const Logo: FunctionComponent<LogoProps> = ({ type }) => {
    const [isIndexLogo, setIsIndexLogo] = useState(false);

    useEffect(() => {
        if (type === "index-logo") {
            setIsIndexLogo(true);
        } else {
            setIsIndexLogo(false);
        }
    }, [type]);

    return (
        <>
            {isIndexLogo ? (
                <IndexLogo>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9C19 12.866 15.866 16 12 16C8.13401 16 5 12.866 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9Z" fill="#EDD035" />
                        <path d="M10.3501 10.6499C10.7877 11.0875 11.3812 11.3333 12 11.3333C12.6188 11.3333 13.2123 11.0875 13.6499 10.6499C14.0875 10.2123 14.3333 9.61884 14.3333 9C14.3333 8.38116 14.0875 7.78767 13.6499 7.35008L10.3501 10.6499Z" fill="#08D608" />
                        <path d="M13.6499 7.35008C13.2123 6.9125 12.6188 6.66667 12 6.66667C11.3812 6.66667 10.7877 6.9125 10.3501 7.35008C9.9125 7.78767 9.66667 8.38116 9.66667 9C9.66667 9.61884 9.9125 10.2123 10.3501 10.6499L13.6499 7.35008Z" fill="#039BE5" />
                        <path d="M12 23L5.93782 12.5H18.0622L12 23Z" fill="#EDD035" />
                    </svg>
                </IndexLogo>
            ) : (
                <InlineLogo>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9C19 12.866 15.866 16 12 16C8.13401 16 5 12.866 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9Z" fill="#EDD035" />
                        <path d="M10.3501 10.6499C10.7877 11.0875 11.3812 11.3333 12 11.3333C12.6188 11.3333 13.2123 11.0875 13.6499 10.6499C14.0875 10.2123 14.3333 9.61884 14.3333 9C14.3333 8.38116 14.0875 7.78767 13.6499 7.35008L10.3501 10.6499Z" fill="#08D608" />
                        <path d="M13.6499 7.35008C13.2123 6.9125 12.6188 6.66667 12 6.66667C11.3812 6.66667 10.7877 6.9125 10.3501 7.35008C9.9125 7.78767 9.66667 8.38116 9.66667 9C9.66667 9.61884 9.9125 10.2123 10.3501 10.6499L13.6499 7.35008Z" fill="#039BE5" />
                        <path d="M12 23L5.93782 12.5H18.0622L12 23Z" fill="#EDD035" />
                    </svg>
                </InlineLogo>
            )}
        </>
    );
};

export default Logo;
