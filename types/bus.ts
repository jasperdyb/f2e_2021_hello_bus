export const CityOptions = [
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
