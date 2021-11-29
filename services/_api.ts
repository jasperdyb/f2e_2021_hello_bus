const baseURL = "https://ptx.transportdata.tw/MOTC/v2";

const apiList = {
  ScenicSpots: (City?: string) => `${baseURL}/Tourism/ScenicSpot/${City}`,
  CyclingIndex: (City?: string) => `${baseURL}/Cycling/Shape/${City}`,
  BusIndex: (City: string) => `${baseURL}/Bus/Route/City/${City}`,
  BusRouteInfo: (City: string, RouteName: string) =>
    `${baseURL}/Bus/Route/City/${City}/${RouteName}`,
  BusRouteStops: (City: string, RouteName: string) =>
    `${baseURL}/Bus/StopOfRoute/City/${City}/${RouteName}`,
  BusRouteSchedule: (City: string, RouteName: string) =>
    `${baseURL}/Bus/Schedule/City/${City}/${RouteName}`,
  BusRouteEstimatedTimeOfArrival: (City: string, RouteName: string) =>
    `${baseURL}/Bus/EstimatedTimeOfArrival/City/${City}/${RouteName}`,
};
export default apiList;
