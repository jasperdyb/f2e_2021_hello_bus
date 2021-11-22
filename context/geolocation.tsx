import React, { createContext, useContext, useState, useEffect } from "react";
import type { Location } from "types/geolocation";
import { CityOptions } from "types/cyclingRoute";

import {
  getCurrentPosition,
  getGeocodingReverse,
  getGeocoding,
} from "services/geolocation";

export type GeolocationContextType = {
  location: Location;
  setLocation: (l: Location) => void;
  address: string;
  setAddress: (a: string) => void;
  autoAddress: boolean;
  setAutoAddress: (a: boolean) => void;
  searchKey: string;
  setSearchKey: (s: string) => void;
  city: string;
  setCity: (c: string) => void;
  apply: boolean;
  setApply: (a: boolean) => void;
  applySearch: (address?: string) => void;
  resetSearch: () => void;
};

export const initValues = {
  location: {
    latitude: 0,
    longitude: 0,
  },
  setLocation: () => {},
  address: "",
  setAddress: () => {},
  autoAddress: false,
  setAutoAddress: () => {},
  searchKey: "",
  setSearchKey: () => {},
  city: "",
  setCity: () => {},
  apply: false,
  setApply: () => {},
  applySearch: () => {},
  resetSearch: () => {},
};

export const GeolocationContext =
  createContext<GeolocationContextType>(initValues);
export const useGeolocationContext = () => useContext(GeolocationContext);

export const GeolocationContextProvider: React.FC = (props) => {
  // this state will be shared with all components
  const [location, setLocation] = useState(initValues.location);
  const [address, setAddress] = useState(initValues.address);
  const [searchKey, setSearchKey] = useState(initValues.address);
  const [autoAddress, setAutoAddress] = useState(initValues.autoAddress);
  const [city, setCity] = useState(initValues.city);
  const [apply, setApply] = useState(initValues.apply);

  const resetSearch = () => {
    setLocation(initValues.location);
    setAddress(initValues.address);
    setSearchKey(initValues.address);
    setAutoAddress(initValues.autoAddress);
    setCity(initValues.city);
  };

  useEffect(() => {
    console.log("=== autoAddress updated ===");
    const checkAddress = async (location) => {
      const searchedAddress = await getGeocodingReverse({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      if (searchedAddress) {
        setAddress(searchedAddress);
      }
    };
    const updateAddress = async () => {
      if (autoAddress) {
        getCurrentPosition(
          (p) => {
            console.log("=== getCurrentPosition success ===", p);
            setLocation(p.coords);
            checkAddress(p.coords);
          },
          (e) => {
            console.log(e.message);
          }
        );
      }
    };

    updateAddress();
  }, [autoAddress]);

  useEffect(() => {
    if (apply) {
      const cities = CityOptions.filter(
        (city) => address.indexOf(city.title) > -1
      );

      console.log("=== cities ===", cities);
      if (cities.length) {
        console.log("=== city ===", cities[0].searchString);
        setCity(cities[0].searchString);
      } else {
        setCity(initValues.city);
      }
    }
  }, [apply]);

  const applySearch = async (address?: string) => {
    if (address) {
      const geocodedLoaction = await getGeocoding(address);

      console.log("=== onSubmit ===", geocodedLoaction);
      if (geocodedLoaction) {
        setAddress(address);
        setLocation({
          longitude: geocodedLoaction.lng,
          latitude: geocodedLoaction.lat,
        });
      }
    }

    setApply(true);
    setApply(false);
  };
  return (
    // this is the provider providing state
    <GeolocationContext.Provider
      value={{
        location,
        setLocation,
        address,
        setAddress,
        autoAddress,
        setAutoAddress,
        searchKey,
        setSearchKey,
        city,
        setCity,
        apply,
        setApply,
        applySearch,
        resetSearch,
      }}
    >
      {props.children}
    </GeolocationContext.Provider>
  );
};
