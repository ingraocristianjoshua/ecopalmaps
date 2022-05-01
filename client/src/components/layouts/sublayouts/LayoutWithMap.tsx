import { FunctionComponent } from "react";
import styled from "styled-components";
import { devices } from "../../../styles/devices";
import { Wrapper } from "@googlemaps/react-wrapper";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from "fast-equals";
import {
    Children,
    cloneElement,
    EffectCallback,
    isValidElement,
    useEffect,
    useRef,
    useState,
} from "react";
import brandMarker from "../../../images/marker.png";
import { PageText } from "../../../styles/global";
import { Link } from "react-router-dom";
import { places } from "../../../utils/data";
import { useNavigate } from "react-router-dom";

export interface LayoutWithMapProps {
    latLng?: google.maps.LatLngLiteral;
    content: JSX.Element;
    givenCenter?: google.maps.LatLngLiteral;
    givenZoom?: number;
}

interface MapProps extends google.maps.MapOptions {
    style: { [key: string]: string };
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
}

interface MarkerProps extends google.maps.MarkerOptions {
    slug?: string;
}

const PageContent = styled.div`
    display: grid;
    grid-template-rows: 40vh auto;
    grid-template-columns: none;
    min-height: calc(100vh - 80px);

    @media ${devices.tablet} {
        grid-template-rows: none;
        grid-template-columns: 50% auto;
    }
`;

const MapContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    position: sticky;
    top: 80px;

    @media ${devices.tablet} {
        height: calc(100vh - 80px);
    }
`;

const PageContentContainer = styled.div`
    display: block;
    padding-top: 24px;
    padding-left: 12px;
    padding-right: 12px;
    padding-bottom: 24px;

    @media ${devices.mobileM} {
        padding-left: 24px;
        padding-right: 24px;
    }
`;

const MainContainer = styled.main`
    display: grid;
    grid-template-rows: auto 60px;
`;

const MainFooter = styled.footer`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    height: 60px;
    font-size: 14px;
    column-gap: 12px;
    row-gap: 4px;
    padding-left: 12px;
    padding-right: 12px;

    @media ${devices.mobileM} {
        padding-left: 24px;
        padding-right: 24px;
    }
`;

const MainFooterItem = styled(PageText)`
    a {
        text-decoration: none;
    }

    a:hover,
    a:active {
        text-decoration: underline;
    }
`;

const LayoutWithMap: FunctionComponent<LayoutWithMapProps> = ({
    latLng,
    content,
    givenCenter,
    givenZoom,
}) => {
    const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = useState(15);
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({
        lat: 37.19148675220757,
        lng: 13.763526245756793,
    });
    
    const onClick = (e: google.maps.MapMouseEvent) => {
        setClicks([...clicks, e.latLng!]);
    };

    const onIdle = (m: google.maps.Map) => {
        console.log("onIdle");
        setZoom(m.getZoom()!);
        setCenter(m.getCenter()!.toJSON());
    };

    let index = 0;

    if (latLng) {
        places.forEach((place, i) => {
            if (place.latLng === latLng) {
                index = i;
            }
        });
    }

    return (
        <PageContent>
            <MapContainer>
                <Wrapper
                    apiKey={process.env.REACT_APP_GOOGLE_MAPS_API!}
                    language="it"
                >
                    <Map
                        center={givenCenter ? givenCenter : center}
                        onClick={onClick}
                        onIdle={onIdle}
                        zoom={givenZoom ? givenZoom : zoom}
                        style={{
                            position: "unset",
                            top: "unset",
                            width: "auto",
                            height: "100%",
                        }}
                    >
                        {/*{clicks.map((latLng, i) => (
                            <Marker key={i} position={latLng} />
                        ))}*/}
                        {latLng ?
                            <Marker position={latLng} title={places[index].title} />
                         : 
                            places.map((place, i) => (
                                <Marker key={i} position={place.latLng} title={place.title} slug={place.slug} />
                            ))
                        }
                    </Map>
                </Wrapper>
            </MapContainer>
            <MainContainer>
                <PageContentContainer>{content}</PageContentContainer>
                <MainFooter>
                    <MainFooterItem>
                        &copy; {new Date().getFullYear()} EcoPalMaps
                    </MainFooterItem>
                    <MainFooterItem>
                        <Link
                            to="/support"
                            title="Contatta il supporto"
                        >
                            Supporto
                        </Link>
                    </MainFooterItem>
                    <MainFooterItem>
                        <a
                            href="https://iisodierna.edu.it"
                            target="_blank"
                            title="I. I. S. 'G. B. Odierna'"
                            rel="noreferrer"
                        >
                            I. I. S. Odierna
                        </a>
                    </MainFooterItem>
                </MainFooter>
            </MainContainer>
        </PageContent>
    );
};

const Map: FunctionComponent<MapProps> = ({
    onClick,
    onIdle,
    style,
    children,
    ...options
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(
                new window.google.maps.Map(ref.current, {
                    mapId: "5165859eabfa1694",
                })
            );
        }
    }, [ref, map]);

    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    return (
        <>
            <div ref={ref} style={style} />
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    return cloneElement(child, { map });
                } else {
                    return;
                }
            })}
        </>
    );
};

const Marker: FunctionComponent<MarkerProps> = (options, slug) => {
    const [marker, setMarker] = useState<google.maps.Marker>();
    const infoWindow = new google.maps.InfoWindow();
    const navigate = useNavigate();

    useEffect(() => {
        if (!marker) {
            setMarker(
                new google.maps.Marker({
                    icon: brandMarker,
                    clickable: true,
                    label: "",
                })
            );
        }

        return () => {
            if (marker) {
                marker.setMap(null);
                marker.setClickable(true);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker) {
            marker.setOptions(options);
            console.log(slug);
            marker.addListener("click", () => {
                if (slug) {
                    navigate("/go-to/" + slug);
                } else {
                    infoWindow.close();
                    infoWindow.setContent(marker.getTitle());
                    infoWindow.open(marker.getMap(), marker);
                }
            });
        }
    }, [marker, options, infoWindow, navigate, slug]);

    return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a: any, b: any) => {
        if (
            isLatLngLiteral(a) ||
            a instanceof google.maps.LatLng ||
            isLatLngLiteral(b) ||
            b instanceof google.maps.LatLng
        ) {
            return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
        }

        return deepEqual(a, b);
    }
);

function useDeepCompareMemoize(value: any) {
    const ref = useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}

function useDeepCompareEffectForMaps(
    callback: EffectCallback,
    dependencies: any[]
) {
    useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default LayoutWithMap;
