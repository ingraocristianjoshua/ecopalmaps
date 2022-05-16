import { useEffect, useState } from "react";
import { useNavigate, useNavigationType, useParams } from "react-router-dom";
import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import LayoutWithMap from "../components/layouts/sublayouts/LayoutWithMap";
import { ep } from "../utils/ep";
import styled from "styled-components";
import {
    Button,
    PageBlock,
    PageContentContainer,
    PageText,
} from "../styles/global";
import Back from "../components/icons/Back";
import { Sidebar } from "./PlacePage";

const ElectricPageHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 24px;
`;

const ElectricPageContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const ElectricPageGoBack = styled.div`
    display: block;
    cursor: pointer;
`;

const ElectricPageHeaderTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 20px;
`;

const ElectricPageTitle = styled.div`
    display: block;
    font-size: 38px;
    font-weight: 700;
`;

const ElectricPageInfo = styled(PageText)`
    font-size: 16px;
    padding: 18px;
    border-radius: 18px;
    background-color: #c7c5bc;
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

function ElectricPage() {
    const navigate = useNavigate();
    const navigationType = useNavigationType();
    const params = useParams();
    const [giveDirections, setGiveDirections] = useState(false);

    const [item, setItem] = useState({
        slug: 0,
        title: "",
        latLng: {
            lat: 0.0,
            lng: 0.0,
        },
        type: "",
        info: "",
    });

    useEffect(() => {
        try {
            setItem(ep.find((item) => item.slug.toString() === params.slug)!);
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
                title={`${item.title} | EcoPalMaps`}
                description="La prima piattaforma per valorizzare i luoghi culturali del territorio di Palma di Montechiaro in maniera ecologica."
            />
            <PageLayout
                content={
                    <LayoutWithMap
                        type={"electric"}
                        giveDirections={giveDirections}
                        givenCenter={item.latLng}
                        givenZoom={18}
                        latLng={item.latLng}
                        content={
                            <PageContentContainer>
                                <ElectricPageHeader>
                                    <ElectricPageGoBack
                                        title="Vai indietro"
                                        onClick={() => {
                                            if (navigationType === "POP") {
                                                navigate("/");
                                            } else {
                                                navigate(-1);
                                            }
                                        }}
                                    >
                                        <Back />
                                    </ElectricPageGoBack>
                                    <ElectricPageHeaderTitle>
                                        {item.title}
                                    </ElectricPageHeaderTitle>
                                </ElectricPageHeader>
                                <ElectricPageContent>
                                    <ElectricPageTitle>
                                        {item.title}
                                    </ElectricPageTitle>
                                    <ElectricPageInfo>
                                        {item.info}
                                    </ElectricPageInfo>
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
                                                        {item.title}
                                                    </PageText>
                                                </RouteInfoBlock>
                                            </RouteInfo>
                                            <PageBlock>
                                                <DirectionButton
                                                    role="button"
                                                    title={
                                                        "Vai verso questo luogo: " +
                                                        item.title
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
                                            <Sidebar id="sidebar"></Sidebar>
                                        </DirectionBlockContent>
                                    </DirectionBlock>
                                </ElectricPageContent>
                            </PageContentContainer>
                        }
                    />
                }
            />
        </>
    );
}

export default ElectricPage;
