import React, { createContext, useContext, useState, useEffect } from "react";
import { RegionOptions, CityOptions } from "types/sceneSpots";

interface citySelectionItem {
  title: string;
  value: number;
}

export type SceneSpotContent = {
  region: number;
  setRegion: (c: number) => void;
  city: number;
  setCity: (c: number) => void;
  page: number;
  setPage: (c: number) => void;
  type: string | null;
  setType: (t: string) => void;
  citySelections: Array<citySelectionItem>;
  setCitySelections: (s: Array<citySelectionItem>) => void;
};

export const initValues = {
  region: RegionOptions[0].value,
  setRegion: () => {},
  city: CityOptions[0].value,
  setCity: () => {},
  page: 1,
  setPage: () => {},
  type: null,
  setType: () => {},
  citySelections: [],
  setCitySelections: () => {},
};

export const SceneSpotContext = createContext<SceneSpotContent>(initValues);
export const useSceneSpotContext = () => useContext(SceneSpotContext);

export const SceneSpotContextProvider: React.FC = (props) => {
  // this state will be shared with all components
  const [citySelections, setCitySelections] = useState<
    Array<{
      title: string;
      value: number;
    }>
  >([]);
  const [region, setRegion] = useState(initValues.region);
  const [city, setCity] = useState(initValues.city);
  const [page, setPage] = useState(initValues.page);
  const [type, setType] = useState<string>();

  useEffect(() => {
    setPage(1);
  }, [city]);

  return (
    // this is the provider providing state
    <SceneSpotContext.Provider
      value={{
        region,
        setRegion,
        city,
        setCity,
        page,
        setPage,
        type,
        setType,
        citySelections,
        setCitySelections,
      }}
    >
      {props.children}
    </SceneSpotContext.Provider>
  );
};
