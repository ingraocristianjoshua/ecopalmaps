import { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

export interface CloseProps {
    type: string;
}

const SmallCross = styled(SvgIcon)`
    width: 20px;
    height: 20px;
    stroke: #000000;
    fill: none;
`;

const NormalCross = styled(SvgIcon)`
    width: 26px;
    height: 26px;
    stroke: #000000;
    fill: none;
`;

const Close: FunctionComponent<CloseProps> = ({ type }) => {
    const [isNormal, setIsNormal] = useState(false);

    useEffect(() => {
        if (type === "normal") {
            setIsNormal(true);
        } else {
            setIsNormal(false);
        }
    }, [type]);

    return (
        <>
            {isNormal ? (
                <NormalCross>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 4L20 20M4 20L20 4"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </NormalCross>
            ) : (
                <SmallCross>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 4L20 20M4 20L20 4"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </SmallCross>
            )}
        </>
    );
};

export default Close;
