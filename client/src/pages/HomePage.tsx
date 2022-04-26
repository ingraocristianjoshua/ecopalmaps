import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { FunctionComponent } from "react";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from "fast-equals";
import { Children, cloneElement, EffectCallback, isValidElement, useEffect, useRef, useState } from "react";
import { PageBlock } from "../styles/global";
import brandMarker from "../images/marker.png";

interface MapProps extends google.maps.MapOptions {
    style: { [key: string]: string };
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
}

const render = (status: Status) => {
    return <div>{status}</div>;
};

const PageContent = styled.div`
    display: grid;
    grid-template-rows: 50% auto;
    row-gap: 24px;
    column-gap: 0px;
    min-height: calc(100vh - 80px);

    @media ${devices.tablet} {
        grid-template-columns: 50% auto;
        row-gap: 0px;
        column-gap: 48px;
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

function HomePage() {
    const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = useState(15);
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({
        lat: 37.1921729,
        lng: 13.7606966,
    });

    const onClick = (e: google.maps.MapMouseEvent) => {
        setClicks([...clicks, e.latLng!]);
    };

    const onIdle = (m: google.maps.Map) => {
        console.log("onIdle");
        setZoom(m.getZoom()!);
        setCenter(m.getCenter()!.toJSON());
    };

    return (
        <>
            <Head
                title="Home | EcoPalMaps"
                description="La prima piattaforma per valorizzare i luoghi culturali del territorio di Palma di Montechiaro in maniera ecologica."
            />
            <PageLayout
                content={
                    <PageContent>
                        <MapContainer>
                            <Wrapper
                                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API!}
                                render={render}
                                language="it"
                            >
                                <Map
                                    center={center}
                                    onClick={onClick}
                                    onIdle={onIdle}
                                    zoom={zoom}
                                    style={{ position: "unset", top: "unset", width: "auto", height: "100%" }}
                                >
                                    {clicks.map((latLng, i) => (
                                        <Marker key={i} position={latLng} />
                                    ))}
                                </Map>
                            </Wrapper>
                        </MapContainer>
                        <PageBlock>
                            {clicks.map((latLng, i) => (
                                <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
                            ))}
                        </PageBlock>
                    </PageContent>
                }
            />
        </>
    );
}

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
            setMap(new window.google.maps.Map(ref.current, { mapId: "5165859eabfa1694" }));
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

const Marker: FunctionComponent<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = useState<google.maps.Marker>();

    useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker({
                icon: brandMarker,
            }));
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

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

export default HomePage;
