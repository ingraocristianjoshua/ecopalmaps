import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import LayoutWithMap from "../components/layouts/sublayouts/LayoutWithMap";
import { PageContentContainer, PageContentTitle, PageText } from "../styles/global";
import styled from "styled-components";
import { places } from "../utils/data";

const PlacesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const PlaceContainer = styled.div`
    display: grid;
    grid-template-columns: 25% auto;
    cursor: pointer;
`;

const PlaceImageContainer = styled.div`
    display: block;
    width: 100%;
    height: auto;
    border-radius: 18px 0px 0px 18px;

    img {
        width: inherit;
        height: inherit;
        aspect-ratio: 1 / 1;
        border-radius: inherit;
    }
`;

const PlaceInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
    padding: 18px;
    background-color: #c7c5bc;
    border-radius: 0px 18px 18px 0px;
`;

const PlaceName = styled.div`
    display: block;
    font-size: 20px;
    font-weight: 700;
`;

const PlaceDescription = styled(PageText)`
    font-size: 16px;
`;

function HomePage() {
    const latLng = [
        {
            lat: 37.1821729,
            lng: 13.7606966,
        },
    ];

    return (
        <>
            <Head
                title="Home | EcoPalMaps"
                description="La prima piattaforma per valorizzare i luoghi culturali del territorio di Palma di Montechiaro in maniera ecologica."
            />
            <PageLayout
                content={
                    <LayoutWithMap latLng={latLng} content={
                        <PageContentContainer>
                            <PageContentTitle>
                                Luoghi da visitare
                            </PageContentTitle>
                            <PlacesContainer>
                                {places.map((place, key) => (
                                    <PlaceContainer key={key}>
                                        <PlaceImageContainer>
                                            <img src={place.cover_image} title={place.title} />
                                        </PlaceImageContainer>
                                        <PlaceInfoContainer>
                                            <PlaceName>
                                                {place.title}
                                            </PlaceName>
                                            <PlaceDescription>
                                                {place.description}
                                            </PlaceDescription>
                                        </PlaceInfoContainer>
                                    </PlaceContainer>
                                ))}
                            </PlacesContainer>
                        </PageContentContainer>
                    } />
                }
            />
        </>
    );
}

export default HomePage;
