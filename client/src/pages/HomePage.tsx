import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import styled from "styled-components";
import { devices } from "../styles/devices";

const PageContent = styled.div`
    display: grid;
    grid-template-rows: 50% auto;
    row-gap: 24px;
    column-gap: 0px;
    min-height: calc(100vh - 80px);

    @media ${devices.tablet} {
        grid-template-columns: 50% auto;
        row-gap: 0px;
        column-gap: 48px;
    }
`;

const MapContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    position: sticky;
    top: 80px;

    @media ${devices.tablet} {
        height: calc(100vh - 80px);
    }

    iframe {
        width: inherit;
        height: inherit;
        border: none;
    }
`;

function HomePage() {
    return (
        <>
            <Head
                title="Home | EcoPalMaps"
                description="La prima piattaforma per valorizzare i luoghi culturali del territorio di Palma di Montechiaro in maniera ecologica."
            />
            <PageLayout
                content={
                    <PageContent>
                        <MapContainer>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12713.506306460187!2d13.757992934422878!3d37.191284077916045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13108837b60b3477%3A0xec56eeffb9aef5ae!2s92020%20Palma%20di%20Montechiaro%20AG!5e0!3m2!1sit!2sit!4v1650649585164!5m2!1sit!2sit" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </MapContainer>
                    </PageContent>
                }
            />
        </>
    );
}

export default HomePage;
