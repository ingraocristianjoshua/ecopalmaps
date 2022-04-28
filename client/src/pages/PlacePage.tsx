import { useEffect, useState } from "react";
import { useNavigate, useNavigationType, useParams } from "react-router-dom";
import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import LayoutWithMap from "../components/layouts/sublayouts/LayoutWithMap";
import { places } from "../utils/data";
import styled from "styled-components";
import { PageContentContainer, PageText } from "../styles/global";
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
        aspect-ratio: 16 / 9;
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
`;

function PlacePage() {
    const navigate = useNavigate();
    const navigationType = useNavigationType();
    const params = useParams();

    let placeItem = {
        slug: "",
        title: "",
        latLng: {
            lat: 0.0000,
            lng: 0.0000,
        },
        cover_image: "",
        description: "",
        content: { __html: "" },
    };

    const [index, setIndex] = useState(0);

    useEffect(() => {
        try {
            places.forEach((place, i) => {
                if (params.slug === place.slug) {
                    setIndex(i);
                }
            });
        } catch (error) {
            navigate("/home");
        }
    }, [navigate, params.slug]);

    placeItem = places[index];

    return (
        <>
            <Head
                title={`${placeItem.title} | EcoPalMaps`}
                description="La prima piattaforma per valorizzare i luoghi culturali del territorio di Palma di Montechiaro in maniera ecologica."
            />
            <PageLayout
                content={
                    <LayoutWithMap givenCenter={placeItem.latLng} givenZoom={18} latLng={placeItem.latLng} content={
                            <PageContentContainer>
                                <PlacePageHeader>
                                    <PlacePageGoBack title="Vai indietro" onClick={() => {
                                        if (navigationType === "POP") {
                                            navigate("/");
                                        } else {
                                            navigate(-1);
                                        }
                                    }}>
                                        <Back />
                                    </PlacePageGoBack>
                                    <PlacePageHeaderTitle>
                                        {placeItem.title}
                                    </PlacePageHeaderTitle>
                                </PlacePageHeader>
                                <PlacePageContent>
                                    <PlacePageImageContainer>
                                        <img src={placeItem.cover_image} title={placeItem.title} />
                                    </PlacePageImageContainer>
                                    <PlacePageTitle>
                                        {placeItem.title}
                                    </PlacePageTitle>
                                    <PlacePageDescription>
                                        {placeItem.description}
                                    </PlacePageDescription>
                                    <PlaceContent dangerouslySetInnerHTML={placeItem.content} />
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
