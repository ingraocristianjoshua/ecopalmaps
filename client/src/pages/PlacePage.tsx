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
import Carousel from "react-gallery-carousel";

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
        images: [""],
        description: "",
        content: { __html: "" },
    });

    useEffect(() => {
        try {
            setPlaceItem(places.find((place) => place.slug === params.slug)!);
        } catch (error) {
            navigate("/home");
        }
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
        } else {
            setPlaceName(
                "Non è possible ottenere la tua posizione attuale"
            );
        }
    } else {
        setPlaceName(
            "I servizi Google non sono al momento disponibili"
        );
    }

    let images;

    if (placeItem.images.length !== 1) {
        images = placeItem.images.map((image) => ({
            src: image,
        }));
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
                                        {placeItem.images.length === 1 ? (
                                            <img
                                                src={placeItem.images[0]}
                                                title={placeItem.title}
                                            />
                                        ) : (
                                            <Carousel
                                                images={
                                                    images as HTMLImageElement[]
                                                }
                                                hasDotButtons={false}
                                                hasThumbnails={false}
                                                canAutoPlay={false}
                                                leftIcon={
                                                    <div className="_lfOsC _1Pekn">
                                                        <svg className="_3WRGR" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3.29289 11.2929C2.90237 11.6834 2.90237 12.3166 3.29289 12.7071L9.65685 19.0711C10.0474 19.4616 10.6805 19.4616 11.0711 19.0711C11.4616 18.6805 11.4616 18.0474 11.0711 17.6569L5.41421 12L11.0711 6.34315C11.4616 5.95262 11.4616 5.31946 11.0711 4.92893C10.6805 4.53841 10.0474 4.53841 9.65685 4.92893L3.29289 11.2929ZM20 13C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11V13ZM4 13H20V11H4V13Z" />
                                                        </svg>
                                                    </div>
                                                }
                                                rightIcon={
                                                    <div className="_lfOsC _1Pekn">
                                                        <svg className="_3WRGR rotate" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3.29289 11.2929C2.90237 11.6834 2.90237 12.3166 3.29289 12.7071L9.65685 19.0711C10.0474 19.4616 10.6805 19.4616 11.0711 19.0711C11.4616 18.6805 11.4616 18.0474 11.0711 17.6569L5.41421 12L11.0711 6.34315C11.4616 5.95262 11.4616 5.31946 11.0711 4.92893C10.6805 4.53841 10.0474 4.53841 9.65685 4.92893L3.29289 11.2929ZM20 13C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11V13ZM4 13H20V11H4V13Z" />
                                                        </svg>
                                                    </div>
                                                }
                                                maxIcon={
                                                    <div className="_lfOsC _dZ8C-">
                                                        <svg className="_3WRGR" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M4 5C4 4.44772 4.44772 4 5 4H9C9.55228 4 10 3.55228 10 3C10 2.44772 9.55228 2 9 2H5C3.34315 2 2 3.34315 2 5V9C2 9.55228 2.44772 10 3 10C3.55228 10 4 9.55228 4 9V5Z" />
                                                            <path d="M20 5C20 4.44772 19.5523 4 19 4H15C14.4477 4 14 3.55228 14 3C14 2.44772 14.4477 2 15 2H19C20.6569 2 22 3.34315 22 5V9C22 9.55228 21.5523 10 21 10C20.4477 10 20 9.55228 20 9V5Z" />
                                                            <path d="M5 20C4.44772 20 4 19.5523 4 19V15C4 14.4477 3.55228 14 3 14C2.44772 14 2 14.4477 2 15V19C2 20.6569 3.34315 22 5 22H9C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20H5Z" />
                                                            <path d="M20 19C20 19.5523 19.5523 20 19 20H15C14.4477 20 14 20.4477 14 21C14 21.5523 14.4477 22 15 22H19C20.6569 22 22 20.6569 22 19V15C22 14.4477 21.5523 14 21 14C20.4477 14 20 14.4477 20 15V19Z" />
                                                        </svg>
                                                    </div>
                                                }
                                                minIcon={
                                                    <div className="_lfOsC _dZ8C-">
                                                        <svg className="_3WRGR" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8 7C8 7.55228 7.55228 8 7 8H3C2.44772 8 2 8.44772 2 9C2 9.55228 2.44772 10 3 10H7C8.65685 10 10 8.65685 10 7V3C10 2.44772 9.55228 2 9 2C8.44772 2 8 2.44772 8 3V7Z" />
                                                            <path d="M16 7C16 7.55228 16.4477 8 17 8H21C21.5523 8 22 8.44772 22 9C22 9.55228 21.5523 10 21 10H17C15.3431 10 14 8.65685 14 7V3C14 2.44772 14.4477 2 15 2C15.5523 2 16 2.44772 16 3V7Z" />
                                                            <path d="M7 16C7.55228 16 8 16.4477 8 17V21C8 21.5523 8.44772 22 9 22C9.55228 22 10 21.5523 10 21V17C10 15.3431 8.65685 14 7 14H3C2.44772 14 2 14.4477 2 15C2 15.5523 2.44772 16 3 16H7Z" />
                                                            <path d="M16 17C16 16.4477 16.4477 16 17 16H21C21.5523 16 22 15.5523 22 15C22 14.4477 21.5523 14 21 14H17C15.3431 14 14 15.3431 14 17V21C14 21.5523 14.4477 22 15 22C15.5523 22 16 21.5523 16 21V17Z" />
                                                        </svg>
                                                    </div>
                                                }
                                            />
                                        )}
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

                                                        if (giveDirections) {
                                                            navigate(0);
                                                        }
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
