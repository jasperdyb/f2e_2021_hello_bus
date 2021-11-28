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

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faBus } from "@fortawesome/free-solid-svg-icons/faBus";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";

const testBus = [
  {
    PlateNumb: "012-U5",
    OperatorID: "200",
    RouteUID: "TPE16111",
    RouteID: "16111",
    RouteName: {
      Zh_tw: "307",
      En: "307",
    },
    SubRouteUID: "TPE157462",
    SubRouteID: "157462",
    SubRouteName: {
      Zh_tw: "307莒光往板橋前站",
      En: "307",
    },
    Direction: 1,
    BusPosition: {
      PositionLon: 121.49547,
      PositionLat: 25.015492,
      GeoHash: "wsqqk9ymc",
    },
    Speed: 37,
    Azimuth: 180,
    DutyStatus: 1,
    BusStatus: 0,
    GPSTime: "2021-11-28T14:14:27+08:00",
    SrcUpdateTime: "2021-11-28T14:22:00+08:00",
    UpdateTime: "2021-11-28T14:22:02+08:00",
  },
  {
    PlateNumb: "013-U5",
    OperatorID: "200",
    RouteUID: "TPE16111",
    RouteID: "16111",
    RouteName: {
      Zh_tw: "307",
      En: "307",
    },
    SubRouteUID: "TPE157462",
    SubRouteID: "157462",
    SubRouteName: {
      Zh_tw: "307莒光往板橋前站",
      En: "307",
    },
    Direction: 1,
    BusPosition: {
      PositionLon: 121.456637,
      PositionLat: 25.015813,
      GeoHash: "wsqq7cfp8",
    },
    Speed: 17,
    Azimuth: 7,
    DutyStatus: 1,
    BusStatus: 0,
    GPSTime: "2021-11-28T14:21:49+08:00",
    SrcUpdateTime: "2021-11-28T14:22:00+08:00",
    UpdateTime: "2021-11-28T14:22:02+08:00",
  },
  {
    PlateNumb: "019-U5",
    OperatorID: "200",
    RouteUID: "TPE16111",
    RouteID: "16111",
    RouteName: {
      Zh_tw: "307",
      En: "307",
    },
    SubRouteUID: "TPE157463",
    SubRouteID: "157463",
    SubRouteName: {
      Zh_tw: "307莒光往撫遠街",
      En: "307",
    },
    Direction: 0,
    BusPosition: {
      PositionLon: 121.52268,
      PositionLat: 25.043747,
      GeoHash: "wsqqmr447",
    },
    Speed: 14,
    Azimuth: 102,
    DutyStatus: 1,
    BusStatus: 0,
    GPSTime: "2021-11-28T14:21:47+08:00",
    SrcUpdateTime: "2021-11-28T14:22:00+08:00",
    UpdateTime: "2021-11-28T14:22:02+08:00",
  },
  {
    PlateNumb: "027-U5",
    OperatorID: "200",
    RouteUID: "TPE16111",
    RouteID: "16111",
    RouteName: {
      Zh_tw: "307",
      En: "307",
    },
    SubRouteUID: "TPE157462",
    SubRouteID: "157462",
    SubRouteName: {
      Zh_tw: "307莒光往板橋前站",
      En: "307",
    },
    Direction: 1,
    BusPosition: {
      PositionLon: 121.500185,
      PositionLat: 25.02444,
      GeoHash: "wsqqkg99z",
    },
    Speed: 10,
    Azimuth: 193,
    DutyStatus: 1,
    BusStatus: 0,
    GPSTime: "2021-11-28T14:21:46+08:00",
    SrcUpdateTime: "2021-11-28T14:22:00+08:00",
    UpdateTime: "2021-11-28T14:22:02+08:00",
  },
  {
    PlateNumb: "028-U5",
    OperatorID: "200",
    RouteUID: "TPE16111",
    RouteID: "16111",
    RouteName: {
      Zh_tw: "307",
      En: "307",
    },
    SubRouteUID: "TPE157463",
    SubRouteID: "157463",
    SubRouteName: {
      Zh_tw: "307莒光往撫遠街",
      En: "307",
    },
    Direction: 0,
    BusPosition: {
      PositionLon: 121.568345,
      PositionLat: 25.051397,
      GeoHash: "wsqqw27qg",
    },
    Speed: 0,
    Azimuth: 97,
    DutyStatus: 1,
    BusStatus: 0,
    GPSTime: "2021-11-28T14:21:52+08:00",
    SrcUpdateTime: "2021-11-28T14:22:00+08:00",
    UpdateTime: "2021-11-28T14:22:02+08:00",
  },
];

const lat = testBus[0].BusPosition.PositionLat;
const lng = testBus[0].BusPosition.PositionLon;

const position = {
  lat,
  lng,
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
