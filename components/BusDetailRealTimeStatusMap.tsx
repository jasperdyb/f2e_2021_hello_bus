import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { useRouter } from "next/router";
import { styled as muiStyled } from "@mui/material/styles";
import { useForm, useWatch, Controller, SubmitHandler } from "react-hook-form";
import usePrevious from "helpers/hooks/usePrevious";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent, { cardContentClasses } from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import Switch from "@mui/material/Switch";
import FormControlLabel, {
  formControlLabelClasses,
} from "@mui/material/FormControlLabel";

import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
  useGoogleMap,
} from "@react-google-maps/api";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faBus } from "@fortawesome/free-solid-svg-icons/faBus";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faCircle as farCircle } from "@fortawesome/free-regular-svg-icons/faCircle";

import {
  parsePointType,
  parseBusRouteData,
  testBus,
  testRoute,
} from "services/bus";
import { StopType, BusA1DataType, BusN1EstimateTimeDataType } from "types/bus";

const lat = testBus[0].BusPosition.PositionLat;
const lng = testBus[0].BusPosition.PositionLon;

const position = {
  lat,
  lng,
};

const route = parseBusRouteData(testRoute.Geometry);

const options = {
  strokeColor: "#5CBCDB",
  strokeWeight: 5,
  fillColor: "#5CBCDB",
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};

type Props = {
  buses?: Array<BusA1DataType>;
  stops?: Array<StopType>;
  routeShape?: Array<google.maps.LatLngLiteral>;
  InitStop?: BusN1EstimateTimeDataType;
  ZoomInStop?: BusN1EstimateTimeDataType;
  zoom: number;
  Direction: number;
};

const BusDetailRealTimeStatusMap: React.FC<Props> = ({
  stops,
  buses,
  routeShape,
  InitStop,
  ZoomInStop,
  Direction = 0,
}) => {
  const router = useRouter();
  const [MapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
  });
  const [Zoom, setZoom] = useState(14);

  const PrevDirection = usePrevious(Direction);
  useEffect(() => {
    if (isLoaded && InitStop && Direction !== PrevDirection) {
      const stop = stops.find((s) => s.StopID === InitStop.StopID);
      if (stop) {
        setMapCenter(parsePointType(stop.StopPosition));
        setZoom(14);
      }
    }
  }, [isLoaded, InitStop, Direction]);

  useEffect(() => {
    if (isLoaded && ZoomInStop) {
      const stop = stops.find((s) => s.StopID === ZoomInStop.StopID);
      if (stop) {
        setMapCenter(parsePointType(stop.StopPosition));
        setZoom(17);
      }
    }
  }, [ZoomInStop]);

  const [ShowStops, setShowStops] = useState(false);

  const onLoad = React.useCallback(function callback(map) {}, []);

  const onUnmount = React.useCallback(function callback(map) {}, []);

  const stopLocations = React.useMemo(
    () =>
      stops
        ? stops.map((s) => ({
            lat: s.StopPosition.PositionLat,
            lng: s.StopPosition.PositionLon,
          }))
        : [],
    [stops]
  );

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      // center={MapCenter}
      zoom={Zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        rotateControl: false,
        scaleControl: false,
        fullscreenControl: false,
        // gestureHandling: "none",
        keyboardShortcuts: false,
      }}
    >
      <PanningComponent MapCenter={MapCenter} />
      <SwitchCard>
        <SwitchCardContent>
          <SwitchLabel
            value={ShowStops}
            control={
              <Switch
                onChange={(_, checked) => {
                  setShowStops(checked);
                }}
                color="secondary"
              />
            }
            labelPlacement="start"
            label="顯示站點"
          />
        </SwitchCardContent>
      </SwitchCard>
      {buses &&
        buses.map((b) => (
          <>
            {b.BusPosition && (
              <>
                <FontAwesomeMarker
                  position={parsePointType(b.BusPosition)}
                  icon={faCircle}
                  color="#F66A4B"
                  size={50}
                />
                <FontAwesomeMarker
                  position={parsePointType(b.BusPosition)}
                  icon={faBus}
                  color="#FFF"
                  size={30}
                />
              </>
            )}
          </>
        ))}

      {routeShape && <Polyline path={routeShape} options={options} />}

      <FontAwesomeMarker
        position={stopLocations[0]}
        icon={faCircle}
        color="#5CBCDB"
        size={7}
      />

      <FontAwesomeMarker
        position={stopLocations[0]}
        icon={farCircle}
        color="#5CBCDB"
        size={20}
      />

      <FontAwesomeMarker
        position={stopLocations[stopLocations.length - 1]}
        icon={faCircle}
        color="#5CBCDB"
        size={7}
      />

      <FontAwesomeMarker
        position={stopLocations[stopLocations.length - 1]}
        icon={farCircle}
        color="#5CBCDB"
        size={20}
      />

      {ShowStops &&
        stopLocations
          .slice(1, -1)
          .map((s, i) => (
            <FontAwesomeMarker
              key={i}
              position={s}
              icon={faCircle}
              color="#4C546A"
              size={8}
            />
          ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

const FontAwesomeMarker: React.FC<{
  position: google.maps.LatLng | google.maps.LatLngLiteral;
  icon: IconDefinition;
  size?: number;
  color?: string;
}> = ({ position, size = 60, icon, color = "white" }) => (
  <Marker
    position={position}
    icon={{
      path: icon.icon[4] as string,
      fillColor: color,
      fillOpacity: 1,
      anchor: new google.maps.Point(
        icon.icon[0] / 2, // width
        icon.icon[1] / 2 // height
      ),
      scale: size / icon.icon[0],
    }}
  />
);

const PanningComponent: React.FC<{ MapCenter: google.maps.LatLngLiteral }> = ({
  MapCenter,
}) => {
  const map = useGoogleMap();

  React.useEffect(() => {
    if (map && MapCenter) {
      console.log("map pan to", MapCenter);
      map.panTo(MapCenter);
    }
  }, [map, MapCenter]);

  return null;
};

const containerStyle = {
  width: "50%",
  height: "100%",
};

const SwitchCard = muiStyled(Card)(({ theme }) => ({
  position: "absolute",
  left: 24,
  top: 24,
}));

const SwitchLabel = muiStyled(FormControlLabel)(({ theme }) => ({
  marginLeft: 8,
  marginRight: 8,
  [`& .${formControlLabelClasses.label}`]: {
    marginRight: 6,
  },
}));

const SwitchCardContent = muiStyled(CardContent)(({ theme }) => ({
  padding: 8,
  [`&.${cardContentClasses.root}:last-child`]: {
    paddingBottom: 8,
  },
}));

export default BusDetailRealTimeStatusMap;
