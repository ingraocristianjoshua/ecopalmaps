import { Link } from "react-router-dom";
import Head from "../components/Head";
import Logo from "../components/icons/Logo";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { PageBlock, PageText } from "../styles/global";
import image from "../images/palma-di-montechiaro.png";

const PageContainer = styled.div`
    display: grid;
    align-items: center;

    @media ${devices.mobileS} {
        grid-template-rows: auto auto;
        grid-template-columns: none;
    }

    @media ${devices.laptopS} {
        grid-template-rows: none;
        grid-template-columns: 45% 55%;
    }
`;

const FlexContainer = styled.div`
    display: flex;
`;

const PageContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding-top: 48px;
    padding-bottom: 48px;
    padding-left: 12px;
    padding-right: 12px;

    @media ${devices.mobileS} {
        padding-left: 24px;
        padding-right: 24px;
    }

    @media ${devices.mobileL} {
        padding-left: 48px;
        padding-right: 48px;
    }

    @media ${devices.tablet} {
        padding-left: 96px;
        padding-right: 96px;
    }

    @media ${devices.laptopS} {
        padding-left: 48px;
        padding-right: 48px;
    }

    @media ${devices.desktop} {
        padding-left: 6%;
        padding-right: 6%;
    }
`;

const SiteTitle = styled.div`
    display: block;
    font-size: 42px;
    font-weight: 700;

    @media ${devices.mobileS} {
        font-size: 52px;
    }

    @media ${devices.mobileL} {
        font-size: 58px;
    }

    @media ${devices.tablet} {
        font-size: 62px;
    }

    @media ${devices.laptopS} {
        font-size: 52px;
    }

    @media ${devices.laptopM} {
        font-size: 58px;
    }

    @media ${devices.laptopL} {
        font-size: 60px;
    }

    @media ${devices.desktop} {
        font-size: 64px;
    }
`;

const BrandLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    text-decoration: none;

    @media ${devices.mobileS} {
        gap: 24px;
    }
`;

const BrandText = styled.div`
    display: block;
    font-weight: 700;
    font-size: 28px;
    color: #000000;
`;

const PageFlex = styled(PageBlock)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 24px;
`;

const LinkButton = styled(Link)`
    display: inline-block;
    padding: 12px 24px;
    border-radius: 24px;
    text-decoration: none;
    color: #ffffff;

    :first-child {
        background-color: #000000;
    }

    :last-child {
        background-color: #EDD035;
    }
`;

const LandingImage = styled.div`
    background-image: url(${image});
    width: 100%;
    background-position: center center;
    background-size: cover;

    @media ${devices.mobileS} {
        height: 50vh;
    }

    @media ${devices.laptopS} {
        min-height: 100%;
        height: 100vh;
        border-bottom-left-radius: 24px;
    }
`;

const PageFooter = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    height: 80px;
    font-size: 14px;
    column-gap: 12px;
    row-gap: 4px;
    padding-left: 12px;
    padding-right: 12px;

    @media ${devices.mobileS} {
        padding-left: 24px;
        padding-right: 24px;
    }

    @media ${devices.mobileL} {
        padding-left: 48px;
        padding-right: 48px;
    }

    @media ${devices.tablet} {
        padding-left: 96px;
        padding-right: 96px;
    }

    @media ${devices.laptopS} {
        padding-left: 48px;
        padding-right: 48px;
    }

    @media ${devices.desktop} {
        padding-left: 6%;
        padding-right: 6%;
    }
`;

const FooterItem = styled(PageText)`
    a {
        text-decoration: none;
    }

    a:hover, a:active {
        text-decoration: underline;
    }
`;

function Authentication() {
    return (
        <>
            <Head
                title="EcoPalMaps"
                description="La prima piattaforma per valorizzare i luoghi culturali del territorio di Palma di Montechiaro in maniera ecologica."
            />
            <PageContainer>
                <PageContent>
                    <FlexContainer>
                        <BrandLink to="/" title="EcoPalMaps">
                            <Logo type="index-logo" />
                            <BrandText>
                                EcoPalMaps
                            </BrandText>
                        </BrandLink>
                    </FlexContainer>
                    <SiteTitle>Scopri la cultura di Palma di Montechiaro</SiteTitle>
                    <PageText>
                        Questa è la prima piattaforma per valorizzare i luoghi culturali del territorio di Palma di Montechiaro in maniera ecologica.
                    </PageText>
                    <PageFlex>
                        <LinkButton to="/login" title="Accedi">
                            Accedi
                        </LinkButton>
                        <LinkButton to="/signup" title="Registrati">
                            Registrati
                        </LinkButton>
                    </PageFlex>
                </PageContent>
                <LandingImage />
            </PageContainer>
            <PageFooter>
                <FooterItem>
                    &copy; {new Date().getFullYear()} EcoPalMaps
                </FooterItem>
                <FooterItem>
                    <a
                        href="https://iisodierna.edu.it"
                        target="_blank"
                        title="I. I. S. 'G. B. Odierna'"
                        rel="noreferrer"
                    >
                        I. I. S. Odierna
                    </a>
                </FooterItem>
            </PageFooter>
        </>
    );
}

export default Authentication;
