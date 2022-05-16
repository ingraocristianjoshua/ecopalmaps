import styled from "styled-components";
import { devices } from "./devices";

export const Button = styled.button`
    display: block;
    border: none;
    background-color: inherit;
    color: inherit;
    padding: 12px 24px;
    font-weight: 700;
    border-radius: 24px;
    cursor: pointer;
`;

export const PageBlock = styled.div`
    display: block;
`;

export const PageText = styled.div`
    display: block;
    text-align: left;
`;

export const PageTextMT24 = styled(PageText)`
    margin-top: 24px;
`;

export const PageTextMB24 = styled(PageText)`
    margin-bottom: 24px;
`;

export const PageTextMT48 = styled(PageText)`
    margin-top: 48px;
`;

export const PageTextMB48 = styled(PageText)`
    margin-bottom: 48px;
`;

export const SvgIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    fill: inherit;
    stroke: inherit;

    svg {
        width: inherit;
        height: inherit;
        fill: inherit;
        stroke: inherit;
    }
`;

export const AuthForm = styled.div`
    display: block;
`;

export const AuthFormTitle = styled.div`
    display: block;
    font-weight: 700;
    margin-bottom: 48px;
    font-size: 32px;

    @media ${devices.mobileS} {
        font-size: 44px;
    }

    @media ${devices.mobileL} {
        font-size: 50px;
    }

    @media ${devices.tablet} {
        font-size: 60px;
    }
`;

export const AuthFormContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Status = styled.div`
    display: block;
    padding: 6px;
    border-radius: 6px;
    font-size: 14px;
    background-color: #edd035;
    color: #ffffff;
    margin-bottom: 24px;
`;

export const AuthHalfInput = styled.div`
    display: flex;
    gap: 24px;
    flex-direction: column;
    align-items: unset;

    @media ${devices.mobileS} {
        flex-direction: column;
        align-items: unset;
    }

    @media ${devices.mobileL} {
        flex-direction: row;
        align-items: flex-end;
    }
`;

export const AuthButton = styled(Button)`
    background-color: #edd035;
    color: #ffffff;
`;

export const CustomFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

export const CustomFieldError = styled.div`
    display: block;
    font-size: 14px;
`;

export const CustomFieldContainer = styled.div`
    display: block;
    background-color: #c7c5bc;
    height: 72px;
    padding-left: 18px;
    padding-right: 18px;
    border-radius: 18px;
`;

export const CustomInfoContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: flex-start;
    height: 22px;
    margin-top: 8px;
    margin-bottom: 8px;
`;

export const CustomInfo = styled.div`
    display: block;
    font-size: 14px;
    cursor: pointer;
`;

export const CustomInnerFieldContainer = styled.div`
    display: flex;
    align-items: center;
    height: 26px;
    width: 100%;
    margin-top: 38px;
`;

export const PageContentContainer = styled.div`
    display: grid;
    grid-template-rows: auto auto;
    row-gap: 24px;
`;

export const PageContentTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 32px;

    @media ${devices.mobileM} {
        font-size: 44px;
    }

    @media ${devices.mobileL} {
        font-size: 50px;
    }

    @media ${devices.tablet} {
        font-size: 60px;
    }
`;

export const PageContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding-top: 24px;
    padding-bottom: 48px;
    min-height: calc(100vh - 80px);
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
        margin-left: 22%;
        margin-right: 22%;
    }

    @media ${devices.laptopM} {
        margin-left: 28%;
        margin-right: 28%;
    }

    @media ${devices.desktop} {
        margin-left: 30%;
        margin-right: 30%;
    }
`;

export const PageTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 32px;

    @media ${devices.mobileS} {
        font-size: 44px;
    }

    @media ${devices.mobileL} {
        font-size: 50px;
    }

    @media ${devices.tablet} {
        font-size: 60px;
    }
`;

export const RouteDirections = styled(PageBlock)`
    * {
        font-family: "Inter", sans-serif;
        color: #000000;
    }

    .adp-list,
    .adp-placemark {
        border: none;
        font-size: 16px;
        padding: 18px;
        border-radius: 18px;
        background-color: #c7c5bc;
    }

    .adp-warnbox,
    .adp-placemark {
        margin-top: 24px;
        margin-bottom: 24px;
    }

    .warnbox-content {
        background: #edd035;
        padding: 18px;
        border-radius: 18px;
    }

    .warnbox-c1,
    .warnbox-c2 {
        display: none;
    }

    .adp-text {
        padding-left: 12px;
    }
`;
