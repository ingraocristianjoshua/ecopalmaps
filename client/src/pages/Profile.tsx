import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageLayout from "../components/layouts/PageLayout";
import { useMeQuery } from "../generated/graphql";
import { devices } from "../styles/devices";
import { Button, PageBlock, PageText } from "../styles/global";

export const PageContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding-top: 24px;
    padding-bottom: 48px;
    min-height: calc(100vh - 80px);
    margin-left: 12px;
    margin-right: 12px;

    @media ${devices.mobileS} {
        margin-left: 24px;
        margin-right: 24px;
    }

    @media ${devices.mobileL} {
        margin-left: 48px;
        margin-right: 48px;
    }
    
    @media ${devices.tablet} {
        margin-left: 16%;
        margin-right: 16%;
    }
    
    @media ${devices.laptopS} {
        margin-left: 22%;
        margin-right: 22%;
    }
    
    @media ${devices.laptopM} {
        margin-left: 28%;
        margin-right: 28%;
    }
    
    @media ${devices.desktop} {
        margin-left: 30%;
        margin-right: 30%;
    }
`;

export const PageTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 32px;
    
    @media ${devices.mobileS} {
        font-size: 44px;
    }
    
    @media ${devices.mobileL} {
        font-size: 50px;
    }
    
    @media ${devices.tablet} {
        font-size: 60px;
    }
`;

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
    let birthDay = new Date(parseInt(data?.me?.birthDate!)).toLocaleString("it-IT", { dateStyle: "long" });
    const navigate = useNavigate();

    return (
        <PageLayout 
            content={
                <PageContent>
                    <PageTitle>
                        Salve, {data?.me?.firstName}
                    </PageTitle>
                    <PageText>
                        Qui puoi trovare tutte le informazioni relative al tuo account.
                    </PageText>
                    <AccountInfo>
                        <AccountInfoLine>
                            <PageText>
                                <b>Nome completo</b>
                            </PageText>
                            <PageText>
                                {data?.me?.firstName}{" "}{data?.me?.lastName}
                            </PageText>
                        </AccountInfoLine>
                        <AccountInfoLine>
                            <PageText>
                                <b>Indirizzo email</b>
                            </PageText>
                            <PageText>
                                {data?.me?.email}
                            </PageText>
                        </AccountInfoLine>
                        <AccountInfoLine>
                            <PageText>
                                <b>Username</b>
                            </PageText>
                            <PageText>
                                {data?.me?.username}
                            </PageText>
                        </AccountInfoLine>
                        <AccountInfoLine>
                            <PageText>
                                <b>Data di nascita</b>
                            </PageText>
                            <PageText>
                                {birthDay}
                            </PageText>
                        </AccountInfoLine>
                    </AccountInfo>
                    <PageBlock>
                        <LogoutButton title="Esci" onClick={() => {
                            navigate("/logout");
                        }}>
                            Esci
                        </LogoutButton>
                    </PageBlock>
                </PageContent>
            }
        />
    );
}

export default Profile;