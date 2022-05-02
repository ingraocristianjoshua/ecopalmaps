import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import LayoutWithMap from "../components/layouts/sublayouts/LayoutWithMap";
import {
    PageContentContainer,
    PageContentTitle,
    PageText,
} from "../styles/global";
import styled from "styled-components";
import { places } from "../utils/data";
import { devices } from "../styles/devices";
import { useNavigate } from "react-router-dom";

const PlacesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const PlaceContainer = styled.div`
    display: grid;
    grid-template-columns: 42% auto;
    cursor: pointer;

    @media ${devices.laptopM} {
        grid-template-columns: 25% auto;
    }
`;

const PlaceImageContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 18px 0px 0px 18px;

    img {
        width: inherit;
        height: inherit;
        object-fit: cover;
        object-position: center;
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
    width: 100%;
    overflow: hidden;
`;

const PlaceName = styled.div`
    display: block;
    font-size: 20px;
    font-weight: 700;
`;

const PlaceDescription = styled(PageText)`
    font-size: 16px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @supports (-webkit-line-clamp: 2) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: initial;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
`;

const ViewMore = styled.div`
    display: block;
    font-weight: 600;
    font-size: 16px;
    color: black;
    text-decoration: underline;
`;

function HomePage() {
    const navigate = useNavigate();

    return (
        <>
            <Head
                title="Home | EcoPalMaps"
                description="La prima piattaforma per valorizzare i luoghi culturali del territorio di Palma di Montechiaro in maniera ecologica."
            />
            <PageLayout
                content={
                    <LayoutWithMap
                        type={"place"}
                        content={
                            <PageContentContainer>
                                <PageContentTitle>
                                    Luoghi da visitare
                                </PageContentTitle>
                                <PlacesContainer>
                                    {places.map((place, key) => (
                                        <PlaceContainer
                                            key={key}
                                            onClick={() => {
                                                navigate(
                                                    "/go-to/" + place.slug
                                                );
                                            }}
                                        >
                                            <PlaceImageContainer>
                                                <img
                                                    src={place.cover_image}
                                                    title={place.title}
                                                />
                                            </PlaceImageContainer>
                                            <PlaceInfoContainer>
                                                <PlaceName>
                                                    {place.title}
                                                </PlaceName>
                                                <PlaceDescription>
                                                    {place.description}
                                                </PlaceDescription>
                                                <ViewMore>
                                                    Scopri di più
                                                </ViewMore>
                                            </PlaceInfoContainer>
                                        </PlaceContainer>
                                    ))}
                                </PlacesContainer>
                            </PageContentContainer>
                        }
                    />
                }
            />
        </>
    );
}

export default HomePage;
