import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import LayoutWithMap from "../components/layouts/sublayouts/LayoutWithMap";
import { places } from "../utils/data";

function PlacePage() {
    const navigate = useNavigate();
    const params = useParams();

    let placeItem = {
        slug: "",
        title: "",
        latLng: [
            {
                lat: 0.0000,
                lng: 0.0000,
            }
        ],
        cover_image: "",
        description: "",
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
    }, []);

    placeItem = places[index];

    return (
        <>
            <Head
                title={`${placeItem.title} | EcoPalMaps`}
                description="La prima piattaforma per valorizzare i luoghi culturali del territorio di Palma di Montechiaro in maniera ecologica."
            />
            <PageLayout
                content={
                    <LayoutWithMap latLng={placeItem.latLng} content={
                            <>
                                {placeItem.title}
                            </>
                        } 
                    />
                }
            />
        </>
    );
}

export default PlacePage;
