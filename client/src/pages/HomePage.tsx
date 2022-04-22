import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";

function HomePage() {
    return (
        <>
            <Head
                title="Home | EcoPalMaps"
                description="La prima piattaforma per valorizzare i luoghi culturali del territorio di Palma di Montechiaro in maniera ecologica."
            />
            <PageLayout
                content={
                    <>Home.</>
                }
            />
        </>
    );
}

export default HomePage;
