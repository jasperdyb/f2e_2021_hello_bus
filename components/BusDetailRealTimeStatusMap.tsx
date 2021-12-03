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
import Chip, { chipClasses } from "@mui/material/Chip";
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
  OverlayView,
} from "@react-google-maps/api";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faBus } from "@fortawesome/free-solid-svg-icons/faBus";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faCircle as farCircle } from "@fortawesome/free-regular-svg-icons/faCircle";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons/faHeart";

import { parsePointType, parseBusRouteData } from "services/bus";
import { StopType, BusA1DataType, BusN1EstimateTimeDataType } from "types/bus";

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
  stops?: Array<StopType>;
  buses?: Array<BusA1DataType>;
  routeShape?: Array<google.maps.LatLngLiteral>;
  InitStop?: BusN1EstimateTimeDataType;
  ZoomInStop?: BusN1EstimateTimeDataType;
  StopsNearlyArrived?: Array<BusN1EstimateTimeDataType["StopID"]>;
};

const BusDetailRealTimeStatusMap: React.FC<Props> = ({
  stops,
  buses,
  routeShape,
  InitStop,
  ZoomInStop,
  StopsNearlyArrived,
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
  const [MapZoom, setMapZoom] = useState(15);
  const [TriggerZoom, setTriggerZoom] = useState(false);
  const [TriggerZoomUpdate, setTriggerZoomUpdate] = useState(false);
  const [ShowStops, setShowStops] = useState(false);

  useEffect(() => {
    if (isLoaded && InitStop) {
      const stop = stops.find((s) => s.StopID === InitStop.StopID);
      if (stop) {
        setMapCenter(parsePointType(stop.StopPosition));
        setMapZoom(15);
        setTriggerZoom(!TriggerZoom);
      }
    }
  }, [isLoaded, InitStop]);

  useEffect(() => {
    if (isLoaded && ZoomInStop) {
      const stop = stops.find((s) => s.StopID === ZoomInStop.StopID);
      if (stop) {
        setMapCenter(parsePointType(stop.StopPosition));
        setMapZoom(17);
        setTriggerZoom(!TriggerZoom);
      }
    }
  }, [ZoomInStop]);

  const onLoad = React.useCallback(function callback(map) {}, []);

  const onUnmount = React.useCallback(function callback(map) {}, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onZoomChanged={() => {
        console.log("=== onZoomChanged ===");
        setTriggerZoomUpdate(!TriggerZoomUpdate);
      }}
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
      <ZoomComponent
        MapZoom={MapZoom}
        TriggerZoom={TriggerZoom}
        setMapZoom={(zoom) => setMapZoom(zoom)}
      />
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

      <RenderStopMarkers
        stops={stops}
        ShowStops={ShowStops}
        TriggerZoomUpdate={TriggerZoomUpdate}
        StopsNearlyArrived={StopsNearlyArrived}
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

const PanningComponent: React.FC<{
  MapCenter: google.maps.LatLngLiteral;
}> = ({ MapCenter }) => {
  const map = useGoogleMap();
  React.useEffect(() => {
    if (map && MapCenter) {
      console.log("map pan to", MapCenter);
      map.panTo(MapCenter);
    }
  }, [map, MapCenter]);

  return null;
};

const ZoomComponent: React.FC<{
  MapZoom: number;
  TriggerZoom: boolean;
  setMapZoom: (zoom: number) => void;
}> = ({ MapZoom = 15, TriggerZoom, setMapZoom }) => {
  const map = useGoogleMap();

  React.useEffect(() => {
    if (map) {
      console.log("map zoom to", MapZoom);
      map.setZoom(MapZoom);
    }
  }, [map, MapZoom, TriggerZoom]);

  return null;
};

const ZoomThreshold = 16;
const RenderStopMarkers: React.FC<{
  stops: Array<StopType>;
  ShowStops: boolean;
  TriggerZoomUpdate: boolean;
  StopsNearlyArrived?: Array<BusN1EstimateTimeDataType["StopID"]>;
}> = ({ stops, ShowStops, TriggerZoomUpdate, StopsNearlyArrived }) => {
  const [Zoom, setZoom] = useState(14);
  const map = useGoogleMap();

  useEffect(() => {
    console.log("===Zoom===", Zoom);
    if (map) {
      setZoom(map.getZoom());
    }
  }, [TriggerZoomUpdate]);
  return (
    <>
      {stops.map((s, i) => (
        <>
          {[0, stops.length - 1].includes(i) ? (
            <>
              <FontAwesomeMarker
                position={parsePointType(s.StopPosition)}
                icon={faCircle}
                color="#5CBCDB"
                size={Zoom > ZoomThreshold ? 21 : 7}
              />
              <FontAwesomeMarker
                position={parsePointType(s.StopPosition)}
                icon={farCircle}
                color="#5CBCDB"
                size={Zoom > ZoomThreshold ? 60 : 20}
              />
            </>
          ) : (
            ShowStops && (
              <>
                <FontAwesomeMarker
                  key={i}
                  position={parsePointType(s.StopPosition)}
                  icon={faCircle}
                  color="#4C546A"
                  size={Zoom > ZoomThreshold ? 50 : 13}
                />
                {Zoom > ZoomThreshold &&
                  StopsNearlyArrived?.length &&
                  StopsNearlyArrived.indexOf(s.StopID) && (
                    <FontAwesomeMarker
                      key={i}
                      position={parsePointType(s.StopPosition)}
                      icon={faCircle}
                      color="#EDBE62"
                      size={40}
                    />
                  )}
              </>
            )
          )}
          {Zoom > ZoomThreshold && ShowStops && (
            <OverlayView
              position={parsePointType(s.StopPosition)}
              mapPaneName={OverlayView.FLOAT_PANE}
            >
              <StopChip
                icon={
                  <FontAwesomeIcon
                    icon={farHeart}
                    width={25}
                    onClick={() => {
                      console.log("like");
                    }}
                  />
                }
                label={s.StopName.Zh_tw}
              />
            </OverlayView>
          )}
        </>
      ))}
    </>
  );
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
const StopChip = muiStyled(Chip)(({ theme }) => ({
  position: "absolute",
  left: 24,
  height: 46,
  color: theme.palette.common.white,
  backgroundColor: "#EDBE62",
  paddingRight: 75,
  paddingLeft: 30,
  paddingTop: 10,
  paddingBottom: 10,
  [`& .${chipClasses.icon}`]: {
    color: theme.palette.common.white,
    position: "absolute",
    right: 25,
    width: 25,
    height: 22,
    cursor: "pointer",
  },
  [`& .${chipClasses.label}`]: {
    fontSize: 18,
    lineHeight: 26 / 18,
    paddingRight: 0,
    paddingLeft: 0,
  },
}));

export default BusDetailRealTimeStatusMap;
