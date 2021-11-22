import { Interface } from "readline";
import { Location } from "types/geolocation";

export const RegionOptions = [
  { title: "北部地區", value: 10 },
  { title: "中部地區", value: 20 },
  { title: "南部地區", value: 30 },
  { title: "東部地區", value: 40 },
  { title: "離島地區", value: 50 },
];

export const CityOptions = [
  { title: "臺北市", value: 10, searchString: "Taipei", region: 10 },
  { title: "台北市", value: 10, searchString: "Taipei", region: 10 },
  { title: "新北市", value: 20, searchString: "NewTaipei", region: 10 },
  { title: "基隆市", value: 30, searchString: "Keelung", region: 10 },
  { title: "桃園市", value: 40, searchString: "Taoyuan", region: 10 },
  { title: "新竹市", value: 50, searchString: "Hsinchu", region: 10 },
  { title: "新竹縣", value: 60, searchString: "HsinchuCounty", region: 10 },

  { title: "臺中市", value: 70, searchString: "Taichung", region: 20 },
  { title: "台中市", value: 70, searchString: "Taichung", region: 20 },
  { title: "苗栗縣", value: 80, searchString: "MiaoliCounty", region: 20 },
  { title: "南投縣", value: 90, searchString: "NantouCounty", region: 20 },
  { title: "彰化縣", value: 100, searchString: "ChanghuaCounty", region: 20 },
  { title: "雲林縣", value: 110, searchString: "YunlinCounty", region: 20 },

  { title: "高雄市", value: 120, searchString: "Kaohsiung", region: 30 },
  { title: "臺南市", value: 130, searchString: "Tainan", region: 30 },
  { title: "台南市", value: 130, searchString: "Tainan", region: 30 },
  { title: "嘉義縣", value: 140, searchString: "ChiayiCounty", region: 30 },
  { title: "嘉義市", value: 150, searchString: "Chiayi", region: 30 },
  { title: "屏東縣", value: 160, searchString: "PingtungCounty", region: 30 },

  { title: "宜蘭縣", value: 170, searchString: "YilanCounty", region: 40 },
  { title: "花蓮縣", value: 180, searchString: "HualienCounty", region: 40 },
  { title: "臺東縣", value: 190, searchString: "TaitungCounty", region: 40 },
  { title: "台東縣", value: 190, searchString: "TaitungCounty", region: 40 },

  { title: "澎湖縣", value: 200, searchString: "PenghuCounty", region: 50 },
  { title: "金門縣", value: 210, searchString: "KinmenCounty", region: 50 },
  { title: "連江縣", value: 220, searchString: "LienchiangCounty", region: 50 },
];

export interface CyclingIndexDataType {
  RouteName: string;
  CityCode: string;
  City: string;
  Town?: string;
  Direction?: string;
  CyclingLength?: number;
  UpdateTime: string;
  Geometry: Array<Location>;
}
