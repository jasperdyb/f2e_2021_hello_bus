export type CityOptionType = {
  title: string;
  value: number;
  searchString: string;
  region: number;
};

export const CityOptions: Array<CityOptionType> = [
  { title: "臺北市", value: 10, searchString: "Taipei", region: 10 },
  { title: "新北市", value: 20, searchString: "NewTaipei", region: 10 },
  { title: "基隆市", value: 30, searchString: "Keelung", region: 10 },
  { title: "桃園市", value: 40, searchString: "Taoyuan", region: 10 },
  { title: "新竹市", value: 50, searchString: "Hsinchu", region: 10 },
  { title: "新竹縣", value: 60, searchString: "HsinchuCounty", region: 10 },

  { title: "臺中市", value: 70, searchString: "Taichung", region: 20 },
  { title: "苗栗縣", value: 80, searchString: "MiaoliCounty", region: 20 },
  { title: "南投縣", value: 90, searchString: "NantouCounty", region: 20 },
  { title: "彰化縣", value: 100, searchString: "ChanghuaCounty", region: 20 },
  { title: "雲林縣", value: 110, searchString: "YunlinCounty", region: 20 },

  { title: "高雄市", value: 120, searchString: "Kaohsiung", region: 30 },
  { title: "臺南市", value: 130, searchString: "Tainan", region: 30 },
  { title: "嘉義縣", value: 140, searchString: "ChiayiCounty", region: 30 },
  { title: "嘉義市", value: 150, searchString: "Chiayi", region: 30 },
  { title: "屏東縣", value: 160, searchString: "PingtungCounty", region: 30 },

  { title: "宜蘭縣", value: 170, searchString: "YilanCounty", region: 40 },
  { title: "花蓮縣", value: 180, searchString: "HualienCounty", region: 40 },
  { title: "臺東縣", value: 190, searchString: "TaitungCounty", region: 40 },

  { title: "澎湖縣", value: 200, searchString: "PenghuCounty", region: 50 },
  { title: "金門縣", value: 210, searchString: "KinmenCounty", region: 50 },
  { title: "連江縣", value: 220, searchString: "LienchiangCounty", region: 50 },
];

export interface BusIndexDataType {
  RouteUID: string; // 路線唯一識別代碼，規則為 {業管機關簡碼} + {RouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢 ,
  RouteID: string; // 地區既用中之路線代碼(為原資料內碼) ,
  HasSubRoutes: boolean; //實際上是否有多條附屬路線。(此欄位值與SubRoutes結構並無強烈的絕對關聯。詳細說明請參閱swagger上方的【資料服務使用注意事項】) ,
  BusRouteType: 11 | 12 | 13 | 14; //公車路線類別 : [11:'市區公車',12:'公路客運',13:'國道客運',14:'接駁車'] ,
  RouteName: NameType; // 路線名稱 ,
  DepartureStopNameZh?: string; // 起站中文名稱 ,
  DepartureStopNameEn?: string; // 起站英文名稱 ,
  DestinationStopNameZh?: string; // 終點站中文名稱 ,
  DestinationStopNameEn?: string; // 終點站英文名稱 ,
  City?: string; // 路線權管所屬縣市(相當於市區公車API的City參數)[若為公路/國道客運路線則為空值] ,
  CityCode?: string; // 路線權管所屬縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值] ,
  UpdateTime: string; //資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
  VersionID: number;
}

interface NameType {
  Zh_tw?: string; // 中文繁體名稱 ,
  En?: string; // 英文名稱
}

export interface BusStopsDataType {
  RouteUID: string; // (): 路線唯一識別代碼，規則為 {業管機關代碼} + {RouteID}，其中 {業管機關代碼} 可於Authority API中的AuthorityCode欄位查詢 ,
  RouteID: string; // (): 地區既用中之路線代碼(為原資料內碼) ,
  RouteName: NameType; // (NameType): 路線名稱;
  Direction?: number; //(, ): 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知'] ,
  Stops: Array<StopType>; //(Array[Stop]): 所有經過站牌 ,
  UpdateTime: string; //(DateTime): 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
  VersionID: number; //(): 資料版本編號
}

export interface StopType {
  StopUID: string; //(): 站牌唯一識別代碼，規則為 {業管機關簡碼} + {StopID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢 ,
  StopID: string; //(): 地區既用中之站牌代碼(為原資料內碼) ,
  StopName: NameType; //(): 站牌名稱 ,
  StopBoarding?: number; //(, ): 上下車站別 : [-1:'可下車',0:'可上下車',1:'可上車'] ,
  StopSequence: number; //(): 路線經過站牌之順序 ,
  StopPosition: PointType; //(PointType): 站牌位置 ,
  StationID?: string; //(, ): 站牌所屬的站位ID ,
  StationGroupID: string; //(): 站牌所屬的組站位ID ,
  LocationCityCode?: string; //(, ): 站牌位置縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值]
}

interface PointType {
  PositionLon?: number; //(, ): 位置經度(WGS84) ,
  PositionLat?: number; //(, ): 位置緯度(WGS84) ,
  GeoHash?: string; // (String, ): 地理空間編碼
}

export interface BusRouteDataType {
  RouteUID: string; //(): 路線唯一識別代碼，規則為 {業管機關簡碼} + {RouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢 ,
  RouteID: string; //(): 地區既用中之路線代碼(為原資料內碼) ,
  HasSubRoutes: boolean; //(): 實際上是否有多條附屬路線。(此欄位值與SubRoutes結構並無強烈的絕對關聯。詳細說明請參閱swagger上方的【資料服務使用注意事項】) ,
  Operators: Array<RouteOperator>; // ([]): 營運業者 ,
  AuthorityID: string; //(): 業管機關代碼 ,
  ProviderID: string; //(): 資料提供平台代碼 ,
  SubRoutes?: Array<BusSubRoute>; // ([], ): 附屬路線資料(如果原始資料並無提供附屬路線ID，而本平台基於跨來源資料之一致性，會以SubRouteID=RouteID產製一份相對應的附屬路線資料(若有去返程，則會有兩筆)) ,
  BusRouteType: number; //(): 公車路線類別 : [11:'市區公車',12:'公路客運',13:'國道客運',14:'接駁車'] ,
  RouteName: NameType; // (): 路線名稱 ,
  DepartureStopNameZh?: string; //(, ): 起站中文名稱 ,
  DepartureStopNameEn?: string; //(, ): 起站英文名稱 ,
  DestinationStopNameZh?: string; //(, ): 終點站中文名稱 ,
  DestinationStopNameEn?: string; //(, ): 終點站英文名稱 ,
  TicketPriceDescriptionZh?: string; //(, ): 票價中文敘述 ,
  TicketPriceDescriptionEn?: string; //(, ): 票價英文敘述 ,
  FareBufferZoneDescriptionZh?: string; //(, ): 收費緩衝區中文敘述 ,
  FareBufferZoneDescriptionEn?: string; //(, ): 收費緩衝區英文敘述 ,
  RouteMapImageUrl?: string; //(, ): 路線簡圖網址 ,
  City?: string; //(, ): 路線權管所屬縣市(相當於市區公車API的City參數)[若為公路/國道客運路線則為空值] ,
  CityCode?: string; //(, ): 路線權管所屬縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值] ,
  UpdateTime: string; // (): 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
  VersionID: number; //(): 資料版本編號
}

interface RouteOperator {
  OperatorID: string; //(): 營運業者代碼 ,
  OperatorName: NameType; //(): 營運業者名稱 ,
  OperatorCode: string; //(): 營運業者簡碼 ,
  OperatorNo: string; //(): 營運業者編號[交通部票證資料系統定義]
}
interface BusSubRoute {
  SubRouteUID: string; //(): 附屬路線唯一識別代碼，規則為 {業管機關簡碼} + {SubRouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢 ,
  SubRouteID: string; //(): 地區既用中之附屬路線代碼(為原資料內碼) ,
  OperatorIDs: Array<string>; // ([]): 營運業者代碼;
  SubRouteName: NameType; // (): 附屬路線名稱 ,
  Headsign?: string; //(, ): 車頭描述 ,
  HeadsignEn?: string; //(, ): 車頭英文描述 ,
  Direction: number; //(): 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知'] ,
  FirstBusTime?: string; //(, ): 平日第一班發車時間 ,
  LastBusTime?: string; //(, ): 平日返程第一班發車時間 ,
  HolidayFirstBusTime?: string; //(, ): 假日去程第一班發車時間 ,
  HolidayLastBusTime?: string; //(, ): 假日返程第一班發車時間
}

export interface BusShapeDataType {
  RouteUID: string; // (): 路線唯一識別代碼，規則為 {業管機關簡碼} + {RouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢 ,
  RouteID: string; // (): 地區既用中之路線代碼(為原資料內碼) ,
  RouteName: NameType; //(): 路線名稱 ,
  SubRouteUID: string; // (): 附屬路線唯一識別代碼，規則為 {業管機關簡碼} + {SubRouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢 ,
  SubRouteID?: string; // (, ): 附屬路線唯一識別代碼，規則為 {業管機關簡碼} + {SubRouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢 ,
  SubRouteName?: NameType; //(, ): 附屬路線名稱 ,
  Direction: number; //(): 去返程，若無值則表示來源尚無區分去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知'] ,
  Geometry: string; // (): well-known text，為路線軌跡資料 ,
  EncodedPolyline: string; // (): 路線軌跡編碼(encoded polyline) ,
  UpdateTime: string; // (): 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
  VersionID: number; //(): 資料版本編號(由於該服務資料不再版控，固定帶入版號0)
}
