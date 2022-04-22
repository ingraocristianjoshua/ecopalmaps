import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import styled from "styled-components";

const PageContent = styled.div`
    display: grid;
    grid-template-columns: 50% auto;
    column-gap: 48px;
`;

const MapContainer = styled.div`
    display: block;
    width: 100%;
    height: calc(100vh - 80px);
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
                        <MapContainer></MapContainer>
                    </PageContent>
                }
            />
        </>
    );
}

export default HomePage;
