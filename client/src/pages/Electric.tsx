import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import LayoutWithMap from "../components/layouts/sublayouts/LayoutWithMap";
import {
    PageContentContainer,
    PageContentTitle,
    PageText,
} from "../styles/global";
import styled from "styled-components";
import { ep } from "../utils/ep";
import { useNavigate } from "react-router-dom";

const ElectricPlacesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const ElectricPlaceContainer = styled.div`
    display: grid;
    cursor: pointer;
`;

const ElectricPlaceInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
    padding: 18px;
    background-color: #c7c5bc;
    border-radius: 18px;
    width: 100%;
    overflow: hidden;
`;

const ElectricPlaceName = styled.div`
    display: block;
    font-size: 20px;
    font-weight: 700;
`;

const ElectricPlaceInfo = styled(PageText)`
    font-size: 16px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @supports (-webkit-line-clamp: 2) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: initial;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
`;

function Electric() {
    const navigate = useNavigate();

    return (
        <>
            <Head
                title="E-mobility | EcoPalMaps"
                description="In questa pagina puoi scegliere alcuni veicoli elettrici presenti a Palma di Montechiaro per spostarti in maniera eco-sostenibile in tutta la città."
            />
            <PageLayout
                content={
                    <LayoutWithMap
                        content={
                            <PageContentContainer>
                                <PageContentTitle>
                                    Veicoli elettrici
                                </PageContentTitle>
                                <ElectricPlacesContainer>
                                    {ep.map((item, key) => (
                                        <ElectricPlaceContainer
                                            key={key}
                                            onClick={() => {
                                                navigate(
                                                    "/electric/" + item.slug
                                                );
                                            }}
                                        >
                                            <ElectricPlaceInfoContainer>
                                                <ElectricPlaceName>
                                                    {item.title}
                                                </ElectricPlaceName>
                                                <ElectricPlaceInfo>
                                                    {item.info}
                                                </ElectricPlaceInfo>
                                            </ElectricPlaceInfoContainer>
                                        </ElectricPlaceContainer>
                                    ))}
                                </ElectricPlacesContainer>
                            </PageContentContainer>
                        }
                    />
                }
            />
        </>
    );
}

export default Electric;
