import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import LayoutWithMap from "../components/layouts/sublayouts/LayoutWithMap";

function Page() {
    const latLng = [
        {
            lat: 37.1921729,
            lng: 13.7506966,
        },
        {
            lat: 37.1821729,
            lng: 13.7606966,
        },
    ];

    return (
        <>
            <Head
                title="Page | EcoPalMaps"
                description="La prima piattaforma per valorizzare i luoghi culturali del territorio di Palma di Montechiaro in maniera ecologica."
            />
            <PageLayout
                content={
                    <LayoutWithMap latLng={latLng} content={
                        <>Page.</>
                    } />
                }
            />
        </>
    );
}

export default Page;
