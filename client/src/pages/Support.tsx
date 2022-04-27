import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import { PageContent, PageText, PageTitle } from "../styles/global";

function Support() {
    return (
        <>
            <Head
                title="Supporto | EcoPalMaps"
                description="In questa pagina troverai tutte le istruzioni per ricevere supporto."
            />
            <PageLayout
                content={
                    <PageContent>
                        <PageTitle>Contatta il supporto</PageTitle>
                        <PageText>
                            Per qualsiasi problema, puoi contattarci tramite questa email: <a href="mailto:support@ecopalmaps.com" title="Email di supporto">support@ecopalmaps.com</a>.
                        </PageText>
                    </PageContent>
                }
            />
        </>
    );
}

export default Support;