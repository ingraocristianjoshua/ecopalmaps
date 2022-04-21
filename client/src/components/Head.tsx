import { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

export interface HeadProps {
    title: string;
    description: string;
}

const Head: FunctionComponent<HeadProps> = ({ title, description }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
};

export default Head;
