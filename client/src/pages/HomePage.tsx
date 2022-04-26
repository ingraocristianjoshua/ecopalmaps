import { Link } from "react-router-dom";
import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import LayoutWithMap from "../components/layouts/sublayouts/LayoutWithMap";

function HomePage() {
    const latLng = {
        lat: 37.1821729,
        lng: 13.7606966,
    };

    return (
        <>
            <Head
                title="Home | EcoPalMaps"
                description="La prima piattaforma per valorizzare i luoghi culturali del territorio di Palma di Montechiaro in maniera ecologica."
            />
            <PageLayout
                content={
                    <LayoutWithMap latLng={latLng} content={
                        <>
                            Home.{" "}
                            <Link to="/page">Vai alla pagina</Link>
                        </>
                    } />
                }
            />
        </>
    );
}

export default HomePage;
