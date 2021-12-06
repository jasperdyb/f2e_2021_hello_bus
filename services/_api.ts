const baseURL = "https://ptx.transportdata.tw/MOTC/v2";

const apiList = {
  ScenicSpots: (City?: string | string[]) =>
    `${baseURL}/Tourism/ScenicSpot/${City}`,
  CyclingIndex: (City?: string | string[]) =>
    `${baseURL}/Cycling/Shape/${City}`,
  BusIndex: (City: string | string[]) => `${baseURL}/Bus/Route/City/${City}`,
  BusRouteInfo: (City: string | string[], RouteName: string | string[]) =>
    `${baseURL}/Bus/Route/City/${City}/${RouteName}`,
  BusRouteStops: (City: string | string[], RouteName: string | string[]) =>
    `${baseURL}/Bus/StopOfRoute/City/${City}/${RouteName}`,
  BusRouteSchedule: (City: string | string[], RouteName: string | string[]) =>
    `${baseURL}/Bus/Schedule/City/${City}/${RouteName}`,
  BusRouteEstimatedTimeOfArrival: (
    City: string | string[],
    RouteName: string | string[]
  ) => `${baseURL}/Bus/EstimatedTimeOfArrival/City/${City}/${RouteName}`,
  BusRouteShape: (City: string | string[], RouteName: string | string[]) =>
    `${baseURL}/Bus/Shape/City/${City}/${RouteName}`,
  BusRouteBusRealTimeByFrequency: (
    City: string | string[],
    RouteName: string | string[]
  ) => `${baseURL}/Bus/RealTimeByFrequency/City/${City}/${RouteName}`,
};
export default apiList;
