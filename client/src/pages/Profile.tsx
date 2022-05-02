import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import { useMeQuery } from "../generated/graphql";
import { devices } from "../styles/devices";
import {
    Button,
    PageBlock,
    PageContent,
    PageText,
    PageTitle,
} from "../styles/global";

const AccountInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const AccountInfoLine = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: unset;
    justify-content: flex-start;

    @media ${devices.tablet} {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
    }
`;

const LogoutButton = styled(Button)`
    background-color: red;
    color: #ffffff;
`;

function Profile() {
    const { data } = useMeQuery({ fetchPolicy: "cache-and-network" });
    let birthDay = new Date(parseInt(data?.me?.birthDate!)).toLocaleString(
        "it-IT",
        { dateStyle: "long" }
    );
    const navigate = useNavigate();

    return (
        <>
            <Head
                title="Il tuo profilo | EcoPalMaps"
                description="Questa pagina è dedicata al tuo profilo."
            />
            <PageLayout
                content={
                    <PageContent>
                        <PageTitle>Salve, {data?.me?.firstName}</PageTitle>
                        <PageText>
                            Qui puoi trovare tutte le informazioni relative al
                            tuo account.
                        </PageText>
                        <AccountInfo>
                            <AccountInfoLine>
                                <PageText>
                                    <b>Nome completo</b>
                                </PageText>
                                <PageText>
                                    {data?.me?.firstName} {data?.me?.lastName}
                                </PageText>
                            </AccountInfoLine>
                            <AccountInfoLine>
                                <PageText>
                                    <b>Indirizzo email</b>
                                </PageText>
                                <PageText>{data?.me?.email}</PageText>
                            </AccountInfoLine>
                            <AccountInfoLine>
                                <PageText>
                                    <b>Username</b>
                                </PageText>
                                <PageText>{data?.me?.username}</PageText>
                            </AccountInfoLine>
                            <AccountInfoLine>
                                <PageText>
                                    <b>Data di nascita</b>
                                </PageText>
                                <PageText>{birthDay}</PageText>
                            </AccountInfoLine>
                        </AccountInfo>
                        <PageBlock>
                            <LogoutButton
                                title="Esci"
                                onClick={() => {
                                    navigate("/logout");
                                }}
                            >
                                Esci
                            </LogoutButton>
                        </PageBlock>
                    </PageContent>
                }
            />
        </>
    );
}

export default Profile;
