import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import { PageContent, PageText, PageTitle } from "../styles/global";
import styled from "styled-components";

const PageDescription = styled.div`
    font-size: 16px;
    padding: 18px;
    border-radius: 18px;
    background-color: #c7c5bc;
`;

const CityContent = styled(PageText)`
    h3:first-child {
        margin-top: 0px;
    }
`;

const CityImageContainer = styled.div`
    display: block;
    width: 100%;
    height: auto;

    img {
        width: inherit;
        height: inherit;
    }
`;

function City() {
    return (
        <>
            <Head
                title="Palma di Montechiaro | EcoPalMaps"
                description="Scopri di più su questa meravigliosa città."
            />
            <PageLayout
                content={
                    <>
                        <CityImageContainer>
                            <img
                                src="https://res.cloudinary.com/vincenzoingraojr/image/upload/v1651427286/ecopalmaps/palma-di-montechiaro.jpg"
                                title="Palma di Montechiaro"
                            />
                        </CityImageContainer>
                        <PageContent>
                            <PageTitle>Palma di Montechiaro</PageTitle>
                            <PageDescription>
                                Il paese sorge su un'altura rocciosa da cui
                                domina la vallata sottostante che si protende
                                fino al mare. Spiccano in primo piano, ben
                                visibili dallo scorrimento veloce che attraversa
                                la vallata, i monumenti storici del secondo
                                palazzo ducale, (1659), la chiesa madre, (1666),
                                in cima ad una larga scalinata e il monastero
                                delle Benedettine, (1637) primo edificio della
                                città.
                            </PageDescription>
                            <CityContent>
                                <h3>Storia</h3>
                                L'atto di fondazione della città di Palma porta
                                la data del 3 maggio 1637. Nello stesso
                                documento si rileva che a fondare la città fu
                                Carlo Caro Tomasi dopo avere ottenuto il 16
                                gennaio 1637 la "licentia populandi" dal re
                                Filippo IV di Spagna. Il 3 maggio 1637 fu posta
                                la prima pietra. La città di Palma venne fondata
                                il 3 maggio 1637 nella baronia di Montechiaro,
                                dai fratelli gemelli Carlo, Barone Tomasi, e
                                Giulio, che pochi anni dopo gli sarebbe
                                subentrato nel titolo. L'effettivo artefice
                                della fondazione fu però un potente zio dei
                                gemelli, Mario Tomasi de Caro, capitano del
                                Sant'Uffizio dell'Inquisizione di Licata, e
                                governatore della stessa città, da cui
                                provenivano anche Carlo e Giulio Tomasi.
                                Anch'egli, insieme a suo cugino sacerdote Carlo
                                de Caro era presente alla posa della prima
                                pietra della Chiesa della Vergine del Rosario.
                                Il progetto della città, disegnato secondo un
                                ideale pianta ortogonale, è ricordato da una
                                relazione redatta dall'astronomo e primo
                                arciprete di Palma, Giovan Battista Odierna. In
                                una tela che si conserva nella sacrestia della
                                Chiesa di Maria Santissima del Rosario, la
                                chiesa madre, si vede raffigurato l'Odierna al
                                suo tavolo di studio con sullo sfondo, bene in
                                evidenza, un disegno a pianta quadrata col
                                titolo “Chronologia Terrae Palmae”. Il paese
                                sorge su un'altura rocciosa da cui domina la
                                vallata sottostante che si protende fino al
                                mare. Spiccano in primo piano, ben visibili
                                dallo scorrimento veloce che attraversa la
                                vallata, i monumenti storici del secondo Palazzo
                                Ducale, (1659), la Chiesa Madre, (1666), in cima
                                ad una larga scalinata e il Monastero delle
                                Benedettine, (1637) primo edificio della città.
                                <h4>La Famiglia Tomasi</h4>
                                Il capostipite, Mario Tomasi, era giunto in
                                Sicilia al seguito di Marcantonio Colonna, che
                                lo aveva nominato Capitano d'armi di Licata,
                                solo nel 1585. Solo il suo matrimonio con
                                Francesca Caro di Montechiaro aveva segnato la
                                sua accettazione nell'alto ceto. L'acquisizione
                                da parte di Carlo, Barone dal 1616, della
                                Licentia populandi nel 1637 con la conseguente
                                elevazione al titolo di Duca di Palma, è un
                                evidente passo nella stessa direzione. Poco dopo
                                Carlo Tomasi, dalla salute fragile e da sempre
                                attratto dalla vita religiosa, lascia il ducato
                                e la fidanzata Rosalia Traina, nipote del
                                potente Vescovo di Agrigento, al fratello
                                Giulio, per entrare nell'Ordine dei chierici
                                regolari teatini. La dote della nuova duchessa,
                                numerosi feudi e un largo patrimonio liquido,
                                permettono il definitivo consolidamento della
                                famiglia Tomasi nei più alti strati
                                dell'aristocrazia isolana, di cui alla fine
                                doveva risultare tra le più durature famiglie: è
                                ben noto che il penultimo dei Tomasi di
                                Lampedusa Giuseppe, autore de Il Gattopardo
                                possedeva ancora vaste seppur sterili proprietà
                                nella zona di Palma, e che vi ambientò gran
                                parte delle vicende del suo romanzo, appena
                                mascherando il nome in "Donnafugata".
                                <h4>Palma, città santa</h4>
                                ll duca Giulio (detto il Duca Santo), dopo aver
                                cresciuto nel fervore religioso i 6 figli avuti
                                dalla moglie nel casto matrimonio, ottenne dal
                                Papa lo scioglimento in vita del matrimonio
                                dalla moglie e la separazione, dopo aver
                                rinunciato al ducato e alle gioie del
                                matrimonio, si ritira per poter vivere gli
                                ultimi anni della sua vita da eremita. La moglie
                                Rosalia Traina, prima duchessa di Palma, decide
                                a sua volta di entrare in monastero insieme alle
                                figlie, col nome di Suor Maria Seppellita e lì
                                rimane fino alla sua morte. Il monastero era
                                stato fortemente voluto da una delle figlie del
                                Duca, Isabella Tomasi (la Beata Corbera del
                                Gattopardo). Il duca preferì donare addirittura
                                il suo palazzo e la sua cappella privata, e
                                costruirsi un altro palazzo ai piedi della
                                chiesa madre. Isabella, entrata nel monastero
                                col nome di Suor Maria Crocifissa della
                                Concezione divenne una celebre mistica, punto di
                                riferimento dei nobili della Sicilia e non per
                                il suo fervore religioso e il suo grande
                                misticismo, nella sua biografia si ricordano
                                innumerevoli tentazioni da parte del demonio, e
                                lettere colme di fede e devozione. Una causa di
                                beatificazione è da anni in corso. Nel frattempo
                                alla Tomasi è stato concesso il titolo di
                                Venerabile. Dei due fratelli maschi il maggiore
                                seguì lo zio fra i Teatini, e diventerà infine
                                cardinale. È oggi venerato dalla Chiesa come San
                                Giuseppe Maria Tomasi, le sue spoglie si
                                conservano a Roma in Sant'Andrea della Valle. Il
                                fratello minore sposò la figlia del principe di
                                Aragona e visse appena il tempo di dare un
                                erede. Muore infatti a 17 anni. Al seguito dei
                                Tomasi arrivò a Palma don Giovanni Battista
                                Hodierna, di Ragusa, insigne pioniere della
                                scienza ed intellettuale. Anche
                                nell'edificazione della città l'aspetto
                                religioso è preponderante; trent'anni dopo la
                                fondazione Palma conta solo 4.630 abitanti, ma
                                vanta ben dieci chiese, più il Monastero del SS.
                                Rosario, Il santuario extra moenia del Calvario
                                meta di processioni, sedici sacerdoti ed
                                altrettanti chierici, e le chiese risultano al
                                visitatore tutte ben tenute e dotate di ricchi
                                arredi, tutti assolutamente conformi ai dettami
                                del recentissimo Concilio di Trento; ingenti
                                somme sono spese nell'acquisto di reliquie, che
                                d'altronde attraggono pellegrini anche da luoghi
                                lontani. L'organizzazione della società laica
                                era basata sulle confraternite.
                            </CityContent>
                        </PageContent>
                    </>
                }
            />
        </>
    );
}

export default City;
