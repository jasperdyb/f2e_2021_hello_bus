import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { useRouter } from "next/router";
import { styled as muiStyled } from "@mui/material/styles";
import { useForm, useWatch, Controller, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";

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
        gestureHandling: "none",
        keyboardShortcuts: false,
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
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

      {/* <FontAwesomeMarker
        position={route[0]}
        icon={faCircle}
        color="#000"
        size={30}
      /> */}

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

      {stops.slice(1, -1).map((s, i) => (
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

const BusDetailRealTimeStatusHeader = muiStyled(Grid)(({ theme }) => ({
  width: "100%",
  paddingBottom: 14,
  paddingTop: 14,
}));

const ColorText = muiStyled("span")(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const BusDetailRealTimeStatusContainer = muiStyled(Stack)(({ theme }) => ({
  width: 414,
  // height: 470,
}));

const BusDetailRealTimeStatusBody = muiStyled(Grid)(({ theme }) => ({
  width: "100%",
  overflow: "auto",
}));

const steps = [
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
  {
    label: "Step",
  },
];

export default BusDetailRealTimeStatusMap;
