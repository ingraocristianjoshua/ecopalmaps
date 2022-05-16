import { FunctionComponent } from "react";
import styled from "styled-components";
import { useMeQuery } from "../../../generated/graphql";
import {
    PageContent,
    PageText,
    PageTitle,
} from "../../../styles/global";
import { NavLink } from "react-router-dom";

interface ProfileSubLayoutProps {
    children: JSX.Element;
}

const ProfileNav = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    row-gap: 12px;
    column-gap: 24px;
`;

const ProfileNavItem = styled.div`
    display: flex;
    align-items: center;

    a {
        display: block;
        color: #000000;
        padding: 10px 18px;
        border-radius: 12px;
        text-decoration: none;
        background-color: #c7c5bc;
    }

    a.active {
        background-color: #edd035;
    }
`;

const ProfilePageContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
`;

const ProfileSubLayout: FunctionComponent<ProfileSubLayoutProps> = ({ children }) => {
    const { data } = useMeQuery({ fetchPolicy: "cache-and-network" });

    return (
        <PageContent>
            <PageTitle>Salve, {data?.me?.firstName}</PageTitle>
            <PageText>
                Qui puoi trovare tutte le informazioni relative al
                tuo account.
            </PageText>
            <ProfileNav>
                <ProfileNavItem>
                    <NavLink
                        className={(navData: any) =>
                            navData.isActive ? "active" : ""
                        }
                        end
                        to="/profile"
                        title="Il tuo profilo"
                    >
                        Informazioni
                    </NavLink>
                </ProfileNavItem>
                <ProfileNavItem>
                    <NavLink
                        className={(navData: any) =>
                            navData.isActive ? "active" : ""
                        }
                        end
                        to="/profile/settings"
                        title="Impostazioni"
                    >
                        Impostazioni
                    </NavLink>
                </ProfileNavItem>
            </ProfileNav>
            <ProfilePageContent>
                {children}
            </ProfilePageContent>
        </PageContent>
    );
}

export default ProfileSubLayout;