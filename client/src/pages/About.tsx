import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import { PageContent, PageText, PageTitle } from "../styles/global";

function About() {
    return (
        <>
            <Head
                title="Informazioni | EcoPalMaps"
                description="In questa pagina troverai tutte le informazioni relative a EcoPalMaps."
            />
            <PageLayout
                content={
                    <PageContent>
                        <PageTitle>Informazioni su EcoPalMaps</PageTitle>
                        <PageText>
                            EcoPalMaps è la prima web app per valorizzare i
                            luoghi culturali della città di Palma di Montechiaro
                            in maniera ecologica e sostenibile. EcoPalMaps offre
                            un servizio di guida cittadina ai turisti e a tutti
                            coloro che vogliono conoscere e scoprire il
                            patrimonio culturale della città,{" "}
                            <b>
                                mettendo in risalto uno dei punti dell'obiettivo
                                11 dell'Agenda 2030
                            </b>{" "}
                            (11.4: Potenziare gli sforzi per proteggere e
                            salvaguardare il patrimonio culturale e naturale del
                            mondo) promossa dall'ONU. Tale funzione viene
                            combinata con la volontà di mettere in risalto
                            l’ecologia. Ecco come utilizzare la Web-App:
                            <ul>
                                <li>
                                    Bisogna essere autenticati, effettuando la
                                    registrazione o l'accesso;
                                </li>
                                <li>
                                    Selezionare il luogo culturale che si vuole
                                    raggiungere cliccando un segnaposto presente
                                    nella mappa, oppure dall'elenco;
                                </li>
                                <li>
                                    Cliccare il pulsante "Indicazioni" per
                                    raggiungere il luogo scelto attraverso un
                                    percorso da seguire (è possibile giungere a
                                    destinazione usufruendo di alcuni mezzi
                                    elettrici, visualizzabili nella sezione
                                    "E-mobility" presente in alto a destra);
                                </li>
                                <li>
                                    Visitare il monumento scelto, leggendo le
                                    informazioni presenti nella descrizione, in
                                    modo da avere delle nozioni culturali sul
                                    luogo selezionato.
                                </li>
                            </ul>
                            EcoPalMaps dispone anche di una sezione, denominata{" "}
                            <b>La città</b>, dove è possibile scoprire di più
                            sulla città di Palma di Montechiaro. Inoltre, è
                            presente un’area dedicata all’utente, dove
                            quest'ultimo può visionare i dati inseriti in fase
                            di registrazione ed effettuare la disconnessione.
                            Infine, vi è una pagina di supporto, dove è
                            possibile mettersi in comunicazione con il Team di
                            assistenza, cosicché possano essere individuati e
                            risolti tutti gli eventuali problemi riscontrati
                            dall'utente.
                        </PageText>
                    </PageContent>
                }
            />
        </>
    );
}

export default About;
