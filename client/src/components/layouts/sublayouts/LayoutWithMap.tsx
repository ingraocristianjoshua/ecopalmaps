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
import epMarker from "../../../images/ep-marker.png";
import { PageText } from "../../../styles/global";
import { Link } from "react-router-dom";
import { places } from "../../../utils/data";
import { useNavigate } from "react-router-dom";
import { ep } from "../../../utils/ep";

export interface LayoutWithMapProps {
    latLng?: google.maps.LatLngLiteral;
    content: JSX.Element;
    givenCenter?: google.maps.LatLngLiteral;
    givenZoom?: number;
    giveDirections?: boolean;
    type: string;
}

interface MapProps extends google.maps.MapOptions {
    style: { [key: string]: string };
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    giveDirections?: boolean;
    latLng?: google.maps.LatLngLiteral;
}

interface MarkerProps extends google.maps.MarkerOptions {
    slug?: string | number;
    type: string;
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
    z-index: 1000;

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
    giveDirections,
    type,
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

    let items;

    if (type === "place") {
        items = places;
    } else {
        items = ep;
    }

    let index = 0;

    if (latLng) {
        items.forEach((item, i) => {
            if (item.latLng === latLng) {
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
                        giveDirections={giveDirections}
                        latLng={latLng}
                    >
                        {/*{clicks.map((latLng, i) => (
                            <Marker key={i} position={latLng} />
                        ))}*/}
                        {latLng ? (
                            <Marker
                                type={type}
                                position={latLng}
                                title={items[index].title}
                            />
                        ) : (
                            items.map((item, i) => (
                                <Marker
                                    key={i}
                                    type={type}
                                    position={item.latLng}
                                    title={item.title}
                                    slug={item.slug}
                                />
                            ))
                        )}
                    </Map>
                </Wrapper>
            </MapContainer>
            <MainContainer>
                <PageContentContainer>{content}</PageContentContainer>
                <MainFooter>
                    <MainFooterItem>
                        &copy; {new Date().getFullYear()} EcoPalMaps (v0.1.3-beta)
                    </MainFooterItem>
                    <MainFooterItem>
                        <Link to="/support-and-feedback" title="Contatta il supporto oppure invia un feedback">
                            Supporto e feedback
                        </Link>
                    </MainFooterItem>
                    <MainFooterItem>
                        <Link
                            to="/privacy-policy"
                            title="Privacy policy del sito"
                        >
                            Privacy policy
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
    giveDirections,
    latLng,
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

    useEffect(() => {
        const infoWindow = new google.maps.InfoWindow();
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
        });

        const handleLocationError = (
            browserHasGeolocation: boolean,
            infoWindow: google.maps.InfoWindow,
            pos: google.maps.LatLng
        ) => {
            infoWindow.setPosition(pos);
            infoWindow.setContent(
                browserHasGeolocation
                    ? "Error: The Geolocation service failed."
                    : "Error: Your browser doesn't support geolocation."
            );
            infoWindow.open(map);
        };

        if (map && giveDirections !== undefined && latLng) {
            if (giveDirections) {
                directionsRenderer.setMap(map);
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position: GeolocationPosition) => {
                            const userLocation = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };

                            infoWindow.setPosition(userLocation);
                            infoWindow.setContent("La mia posizione");
                            infoWindow.open(map);

                            directionsService
                                .route({
                                    origin: {
                                        location: userLocation,
                                    },
                                    destination: {
                                        location: latLng,
                                    },
                                    travelMode: google.maps.TravelMode.WALKING,
                                    provideRouteAlternatives: true,
                                    unitSystem: google.maps.UnitSystem.METRIC,
                                })
                                .then((response) => {
                                    directionsRenderer.setOptions({
                                        polylineOptions: {
                                            strokeColor: "#edd035",
                                            geodesic: true,
                                        },
                                    });
                                    directionsRenderer.setPanel(
                                        document.getElementById(
                                            "directions"
                                        ) as HTMLElement
                                    );
                                    directionsRenderer.setDirections(response);
                                })
                                .catch((e) =>
                                    window.alert(
                                        "La richiesta di indicazioni è fallita a causa di " +
                                            e
                                    )
                                );
                        },
                        () => {
                            handleLocationError(
                                true,
                                infoWindow,
                                map.getCenter()!
                            );
                        }
                    );
                } else {
                    handleLocationError(false, infoWindow, map.getCenter()!);
                }
            } else {
                map.setCenter(latLng);
                map.setZoom(18);
                directionsRenderer.setPanel(null);
                document.getElementById("directions")!.innerHTML = "";
            }
        }
    }, [map, latLng, giveDirections]);

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

const Marker: FunctionComponent<MarkerProps> = ({ slug, type, ...options }) => {
    const [marker, setMarker] = useState<google.maps.Marker>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!marker) {
            if (type === "place") {
                setMarker(
                    new google.maps.Marker({
                        icon: brandMarker,
                        clickable: true,
                    })
                );
            } else {
                setMarker(
                    new google.maps.Marker({
                        icon: epMarker,
                        clickable: true,
                    })
                );
            }
        }

        return () => {
            if (marker) {
                marker.setMap(null);
                marker.setClickable(true);
            }
        };
    }, [marker, type]);

    useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    useEffect(() => {
        const infoWindow = new google.maps.InfoWindow();
        if (marker) {
            marker.addListener("click", () => {
                if (slug) {
                    if (type === "place") {
                        navigate("/go-to/" + slug);
                    } else {
                        navigate("/electric/" + slug);
                    }
                } else {
                    infoWindow.close();
                    infoWindow.setContent(marker.getTitle());
                    infoWindow.open(marker.getMap(), marker);
                }
            });
        }
    }, [marker, navigate, slug, type]);

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
