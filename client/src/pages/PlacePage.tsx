import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import LayoutWithMap from "../components/layouts/sublayouts/LayoutWithMap";
import { places } from "../utils/data";
import styled from "styled-components";
import {
    Button,
    PageBlock,
    PageContentContainer,
    PageText,
    RouteDirections,
} from "../styles/global";
import Back from "../components/icons/Back";

const PlacePageHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 24px;
`;

const PlacePageContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const PlacePageGoBack = styled.div`
    display: block;
    cursor: pointer;
`;

const PlacePageHeaderTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 20px;
`;

const PlacePageImageContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 24px;

    img {
        width: inherit;
        height: inherit;
        object-fit: cover;
        object-position: center;
        border-radius: inherit;
    }
`;

const PlacePageTitle = styled.div`
    display: block;
    font-size: 38px;
    font-weight: 700;
`;

const PlacePageDescription = styled(PageText)`
    font-size: 16px;
    padding: 18px;
    border-radius: 18px;
    background-color: #c7c5bc;
`;

const PlaceContent = styled(PageText)`
    h3:first-child {
        margin-top: 0px;
    }

    border-bottom: 2px solid black;
    padding-bottom: 24px;
`;

const DirectionBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const DirectionBlockTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 24px;
`;

const DirectionBlockContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const DirectionButton = styled(Button)`
    background-color: #000000;
    color: #ffffff;
`;

const RouteInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const RouteInfoBlock = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    column-gap: 12px;
    row-gap: 4px;
`;

function PlacePage() {
    const navigate = useNavigate();
    const params = useParams();
    const [giveDirections, setGiveDirections] = useState(false);

    const [placeItem, setPlaceItem] = useState({
        slug: "",
        title: "",
        latLng: {
            lat: 0.0,
            lng: 0.0,
        },
        cover_image: "",
        description: "",
        content: { __html: "" },
    });

    useEffect(() => {
        console.log(params.slug);
        try {
            setPlaceItem(places.find((place) => place.slug === params.slug)!);
        } catch (error) {
            navigate("/home");
        }

        return () => {
            navigate("/home");
        };
    }, [navigate, params.slug]);

    const [placeName, setPlaceName] = useState("");

    const google = window.google;

    if (google) {
        const geocoder = new google.maps.Geocoder();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    geocoder
                        .geocode({ location: userLocation })
                        .then((response) => {
                            setPlaceName(response.results[0].formatted_address);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                },
                () => {
                    setPlaceName(
                        "Non è possible ottenere la tua posizione attuale"
                    );
                }
            );
        }
    }

    return (
        <>
            <Head
                title={`${placeItem.title} | EcoPalMaps`}
                description="La prima piattaforma per valorizzare i luoghi culturali del territorio di Palma di Montechiaro in maniera ecologica."
            />
            <PageLayout
                content={
                    <LayoutWithMap
                        type={"place"}
                        giveDirections={giveDirections}
                        givenCenter={placeItem.latLng}
                        givenZoom={18}
                        latLng={placeItem.latLng}
                        content={
                            <PageContentContainer>
                                <PlacePageHeader>
                                    <PlacePageGoBack
                                        title="Vai indietro"
                                        onClick={() => {
                                            navigate("/");
                                        }}
                                    >
                                        <Back />
                                    </PlacePageGoBack>
                                    <PlacePageHeaderTitle>
                                        {placeItem.title}
                                    </PlacePageHeaderTitle>
                                </PlacePageHeader>
                                <PlacePageContent>
                                    <PlacePageImageContainer>
                                        <img
                                            src={placeItem.cover_image}
                                            title={placeItem.title}
                                        />
                                    </PlacePageImageContainer>
                                    <PlacePageTitle>
                                        {placeItem.title}
                                    </PlacePageTitle>
                                    <PlacePageDescription>
                                        {placeItem.description}
                                    </PlacePageDescription>
                                    <PlaceContent
                                        dangerouslySetInnerHTML={
                                            placeItem.content
                                        }
                                    />
                                    <DirectionBlock>
                                        <DirectionBlockTitle>
                                            Raggiungi questo luogo
                                        </DirectionBlockTitle>
                                        <DirectionBlockContent>
                                            <RouteInfo>
                                                <RouteInfoBlock>
                                                    <PageText>
                                                        <b>Punto di partenza</b>
                                                    </PageText>
                                                    <PageText>
                                                        {placeName}
                                                    </PageText>
                                                </RouteInfoBlock>
                                                <RouteInfoBlock>
                                                    <PageText>
                                                        <b>Destinazione</b>
                                                    </PageText>
                                                    <PageText>
                                                        {placeItem.title}
                                                    </PageText>
                                                </RouteInfoBlock>
                                            </RouteInfo>
                                            <PageBlock>
                                                <DirectionButton
                                                    role="button"
                                                    title={
                                                        "Vai verso questo luogo: " +
                                                        placeItem.title
                                                    }
                                                    onClick={() => {
                                                        setGiveDirections(
                                                            !giveDirections
                                                        );
                                                    }}
                                                >
                                                    {giveDirections ? (
                                                        <>Annulla</>
                                                    ) : (
                                                        <>Indicazioni</>
                                                    )}
                                                </DirectionButton>
                                            </PageBlock>
                                            <RouteDirections id="directions"></RouteDirections>
                                        </DirectionBlockContent>
                                    </DirectionBlock>
                                </PlacePageContent>
                            </PageContentContainer>
                        }
                    />
                }
            />
        </>
    );
}

export default PlacePage;
