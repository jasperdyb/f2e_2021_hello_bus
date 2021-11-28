import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { useRouter } from "next/router";
import { styled as muiStyled } from "@mui/material/styles";
import { useForm, useWatch, Controller, SubmitHandler } from "react-hook-form";

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
} from "@react-google-maps/api";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faBus } from "@fortawesome/free-solid-svg-icons/faBus";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faCircle as farCircle } from "@fortawesome/free-regular-svg-icons/faCircle";

import { parseBusRouteData, testBus, testRoute, testStops } from "services/bus";

const lat = testBus[0].BusPosition.PositionLat;
const lng = testBus[0].BusPosition.PositionLon;

const position = {
  lat,
  lng,
};

const route = parseBusRouteData(testRoute.Geometry);

const stops = testStops[0].Stops.map((s) => ({
  lat: s.StopPosition.PositionLat,
  lng: s.StopPosition.PositionLon,
}));

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

const BusDetailRealTimeStatusMap: React.FC = () => {
  const router = useRouter();

  const [MapCenter, setMapCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const [ShowStops, setShowStops] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
  });

  const onLoad = React.useCallback(function callback(map) {
    setMapCenter({ lat, lng });
  }, []);

  const onUnmount = React.useCallback(function callback(map) {}, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={MapCenter}
      zoom={14}
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

      <FontAwesomeMarker
        position={position}
        icon={faCircle}
        color="#F66A4B"
        size={50}
      />

      <FontAwesomeMarker
        position={position}
        icon={faBus}
        color="#FFF"
        size={30}
      />

      <Polyline path={route} options={options} />

      <FontAwesomeMarker
        position={stops[0]}
        icon={faCircle}
        color="#5CBCDB"
        size={7}
      />

      <FontAwesomeMarker
        position={stops[0]}
        icon={farCircle}
        color="#5CBCDB"
        size={20}
      />

      <FontAwesomeMarker
        position={stops[stops.length - 1]}
        icon={faCircle}
        color="#5CBCDB"
        size={7}
      />

      <FontAwesomeMarker
        position={stops[stops.length - 1]}
        icon={farCircle}
        color="#5CBCDB"
        size={20}
      />

      {ShowStops &&
        stops
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
