import { FunctionComponent } from "react";
import styled from "styled-components";
import Nav from "../Nav";

export interface PageLayoutProps {
    content: JSX.Element;
}

const PageLayoutContainer = styled.div`
    display: grid;
    grid-template-rows: 80px auto;
`;

const PageContentContainer = styled.div`
    display: block;
`;

const PageLayout: FunctionComponent<PageLayoutProps> = ({ content }) => {
    return (
        <PageLayoutContainer>
            <Nav />
            <PageContentContainer>
                {content}
            </PageContentContainer>
        </PageLayoutContainer>
    );
};

export default PageLayout;