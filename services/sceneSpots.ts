import axios from "axios";
import jsSHA from "jssha";
import useSWR from "swr";
import apiList from "services/_api";

import { SceneSpotDataType, SceneSpotSearchOptions } from "types/sceneSpots";
import { useSceneSpotContext } from "context/sceneSpot";
import { CityOptions } from "types/sceneSpots";

const instance = axios.create({
  baseURL: "/",
  timeout: 1000,
  headers: getAuthorizationHeader(),
});

const mockData = [
  {
    ID: "C1_379000000A_002642",
    Name: "｢花現台北杜鵑花季｣ 溫羅汀咖啡街區巷弄",
    DescriptionDetail:
      "春風微拂、陽光和煦的3月份，正是台北杜鵑花盛開的時刻，沿著台北杜鵑花的賞花地圖，來到溫羅汀街區巷弄漫步，在這一帶安靜的街道中，每條巷弄都隱身著具有質感、文青、復古、清新、溫馨、文藝氣息等各式各樣的書店、咖啡廳、文創小店。但你/妳有沒有發現有些不一樣呢？每年台北杜鵑花季，在地店家開始紛紛妝點上繽紛的杜鵑花窗貼，當人們一走進巷弄中，彷彿置身於粉紅杜鵑花海中，浪漫的杜鵑花語訴說著「我們的約定」，今年也一起相約來參與台北杜鵑花季吧！快準備好你的相機，跟著杜鵑花散步在粉色浪漫的咖啡巷弄，一起拍一波網美照吧！咖啡香、書香、浪漫杜鵑花，等著與你一起共度美好、幸福、有愛的台北杜鵑花季~",
    Phone: "886-2-27208889",
    ZipCode: "106",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/218146",
      PictureDescription1: "｢花現台北杜鵑花季｣ 溫羅汀咖啡街區巷弄",
    },
    Position: {
      PositionLon: 121.53323364257812,
      PositionLat: 25.02260971069336,
      GeoHash: "wsqqme1z3",
    },
    Class1: "其他",
    Level: "非古蹟",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_000406",
    Name: "140高地公園",
    DescriptionDetail:
      "140高地公園位於台北市文山區萬美里境內，萬寧街北側，介於萬寧街與萬美街2段間的丘陵地，最高海拔為138公尺的枹子腳山（枹仔坑山），山頂視野遼闊；93年間闢建了文山（木柵）80號公園，96年闢建了文山（木柵）30號公園，兩者併稱「140高地公園」，環境幽靜，景緻秀麗，空氣清新，鳥語蟬鳴，與山腳下市區的紛擾相比，可謂別有洞天，已成為鄰近居民平時登山踏青的好去處。公園登山口分位於萬寧街125號及225號旁，沿蜿蜒的木棧階梯往上，登上稜線後轉為碎石階梯步道，循稜線而行，林相豐富，沿途設有3座觀景平臺，1座涼亭，視野極佳，可俯瞰山下景觀，遙望101大樓與萬家燈火，更可遠眺文山區山光水色，亦為觀星賞月的最佳地點。為營造永續的生態環境，在公園開闢時儘可能維持原有地貌，避免破壞動植物棲地，園內僅設置必要的設施及步道串聯周邊綠地，提供市民一處自然的運動與休憩場所。園內設置以石頭堆圈圍水池的簡易過濾槽過濾池水，目前已成功吸引蛙類棲息，蛙鳴響亮，更顯清幽。本公園並設有全台北市唯一的「山岳標示導覽圖」，可認識山岳並知名稱、高度。還有簡易的體健設施，運動器材，伸展椅等，在登山賞景之餘，也可在清幽的山中體驗伸展筋骨之樂。(資料來源：臺北市政府工務局公園路燈工程管理處)",
    Phone: "886-2-27884255",
    ZipCode: "116",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/65988",
      PictureDescription1: "140高地公園",
    },
    Position: {
      PositionLon: 121.56661224365234,
      PositionLat: 25.004289627075195,
      GeoHash: "wsqqnrfhe",
    },
    Class1: "遊憩類",
    Class2: "都會公園類",
    Level: "非古蹟",
    WebsiteUrl: "https://parks.taipei/parks/m2/pkl_parks_m2C.php?sid=147",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_002166",
    Name: "6號彩虹 / Rainbow Six",
    DescriptionDetail:
      "108年5月17日，臺灣成為亞洲第一個同志可合法結婚的國家，臺北市在多方單位努力下，在同年的9月25日於西門町捷運站6號出口處劃設了「6號彩虹 / Rainbow Six」彩虹地景，象徵臺北市在尊重人權、提倡性平及性別友善的積極與努力，也讓這個新的彩虹地景成為臺北市熱門的打卡景點。",
    Phone: "886-2-27208889",
    ZipCode: "108",
    OpenTime: "開放空間",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/180447",
      PictureDescription1: "6號彩虹 / Rainbow Six",
    },
    Position: {
      PositionLon: 121.50752258300781,
      PositionLat: 25.042560577392578,
      GeoHash: "wsqqkyz56",
    },
    Class1: "其他",
    Level: "非古蹟",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_001873",
    Name: "ARKI GALÉRIA築空間",
    DescriptionDetail:
      "築空間期許自身能成為台北城中一處創意無限、活力無窮的文創聚落，扮演好一個「中介者」的角色，連接起「藝術家」和「大眾」。藉由一系列的藝文活動，引導培養大眾從藝術欣賞，進階到藝術品味，再到藝術收藏。使人們在此與藝術、與創意、與另一群志同道合的藝文愛好者相遇、相識、相知，讓藝術真正融入人們的生活。",
    Description:
      "為了分享生活的美好，讓藝術融入生活， ARKI GALÉRIA築空間分別以都市旅人的心靈驛站「閱讀驛Arki Café」、藝術家的生命舞台「A展廳」、多元創意空間-「B展廳」 以及劇院級聆賞空間「數位音樂廳」，共築出一個藝術及創意無所不在的幸福空間，希望能讓民眾感受到對生命不同層次的感動。",
    Phone: "886-2-2382-1000",
    ZipCode: "100",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/103041",
      PictureDescription1: "ARKI GALÉRIA築空間",
    },
    Position: {
      PositionLon: 121.51312255859375,
      PositionLat: 25.04698944091797,
      GeoHash: "wsqqmpejk",
    },
    Class1: "其他",
    Level: "非古蹟",
    WebsiteUrl: "http://www.arki.com.tw",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_001865",
    Name: "Art Space 金魚空間",
    DescriptionDetail:
      "日本人2012年於台北開設的主要是舉辦日籍藝術家的展覽的藝廊。「Kin Gyo」和「Koo Kan」分別是「金魚」和「空間」的日文發音。本藝廊始終堅持專為具有紮實素描等的美術基礎的藝術家提供一個空間,展示略顯不協調但令人怦然心動且獨一無二的原創作品。",
    Description:
      "日本人2012年於台北開設的主要是舉辦日籍藝術家的展覽的藝廊。「Kin Gyo」和「Koo Kan」分別是「金魚」和「空間」的日文發音。本藝廊始終堅持專為具有紮實素描等的美術基礎的藝術家提供一個空間,展示略顯不協調但令人怦然心動且獨一無二的原創作品。",
    Phone: "886-2-2550 5818 或 886-975-123-960",
    ZipCode: "103",
    OpenTime: "周三至周日 13：00～18：00，周一、周二及換展休館",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/103006",
      PictureDescription1: "Art Space 金魚空間",
    },
    Position: {
      PositionLon: 121.51809692382812,
      PositionLat: 25.053640365600586,
      GeoHash: "wsqqt0yu0",
    },
    Class1: "其他",
    Level: "非古蹟",
    WebsiteUrl: "https://www.kingyokookan.com",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_002215",
    Name: "i-Ride TAIPEI飛行劇院",
    DescriptionDetail:
      "微風南山內的i-Ride TAIPEI具有懸空式動感座椅、巨型球幕影片，以及搭配風、水及氣味等特效，達到視覺、聽覺、嗅覺、觸覺與位移五感體驗的模擬飛行劇院，其中的飛越台灣5D飛行劇場讓您坐著也能飛越台灣各地鳥瞰台灣的獨特的地理景觀及欣賞風俗人文，不管是台灣人或是外國觀光客，都適合到i-Ride TAIPEI體驗飛越台灣5D飛行劇場的絕妙之旅。",
    Phone: "886-2-27238098",
    ZipCode: "110",
    OpenTime:
      "週日至週三 11：30 ~ 21：30週四至週六(含例假日前夕) 11：30 ~ 22：00※每日最終售票時間為營業結束前1小時。(特殊時段請依現場及官網公告為主)",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/180983",
      PictureDescription1: "i-Ride TAIPEI飛行劇院",
    },
    Position: {
      PositionLon: 121.5660629272461,
      PositionLat: 25.03451919555664,
      GeoHash: "wsqqqm3sw",
    },
    Class1: "其他",
    Level: "非古蹟",
    WebsiteUrl: "http://www.iridetaipei.com/",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_001850",
    Name: "Kidsawesome奧森兒童博物館",
    DescriptionDetail:
      "台灣目前唯一的兒童博物館，傳遞「學習玩樂，玩樂學習」的理念，以多元的設施提供父母及孩子寓教於樂的場所。在KidsAwesome奧森兒童博物館，我們提供了：1.    學習玩樂及玩樂學習的天地我們希望讓玩樂的場域同時也是學習的場域。館內每個展覽設施皆是經由美國丹佛兒童博物館的設計團隊發揮巧思，賦予展覽分享知識、刺激思考、鍛鍊肢體協調等教育功能，並以多元啟發式玩法取代單一引導式的操作，讓孩子自由發揮無窮創意，決定自己的遊戲方式，啟動源源不絕的好奇心與學習熱情。2.    孩子勇於探索的機會玩樂是孩子最喜歡、成效最好的學習方式，因此我們樂見孩子們活用身體和大腦探索所有展覽，在其中大膽冒險、挑戰自我、嘗試新事物，並藉由經驗的累積、父母的引導鼓勵，逐漸發現界線與保護自己。縱使孩子有可能犯錯或經歷失敗，但我們相信這些經驗都將轉化為成長的養份，當孩子長大獨立、離開父母的保護羽翼時，能夠了解自己的狀態和能力，在千變萬化的世界中作出正確的決定。3.    與家人享受親密互動的時光從為人父母的經驗中我們體認到，建立親密家庭關係的方式就是陪伴，因此我們鼓勵全家人帶著孩子一同玩耍。館中展覽遊具中皆包含了親子共玩的設計，讓父母能夠以協助、鼓勵、引導的多元角色，理解孩子的需求和想法，增進親子溝通，創造難忘的美好回憶，並讓這樣的互動持續發酵至家庭生活中。我們期待這些回憶和家人之間的連結力量，將伴隨孩子一輩子，在成長的路上給他/她支持與力量繼續向前進。除了環境與硬體設施之外，我們還計劃邀請藝術家、音樂家、表演家、食育專家等在館中陪伴孩子們一起探索，培養孩子的多元興趣，創造更多可能，促進孩子之間與家長之間的交流，期許奧森兒童博物館成為台灣親子互動的空間和平台。我們和天下所有的父母親一樣，當孩子開心地笑著，就覺得一切都值得了。",
    Description:
      "台灣目前唯一的兒童博物館，傳遞「學習玩樂，玩樂學習」的理念，以多元的設施提供父母及孩子寓教於樂的場所。",
    Phone: "886-2-27071060",
    ZipCode: "106",
    OpenTime:
      "每日上午10:00 ~下午 5:00(中間不清場，可重複進出)，週三為固定休館日,如遇國定假日,皆正常營運。",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/99667",
      PictureDescription1: "Kidsawesome奧森兒童博物館",
    },
    Position: {
      PositionLon: 121.54248046875,
      PositionLat: 25.033580780029297,
      GeoHash: "wsqqmv0x1",
    },
    Class1: "其他",
    Level: "非古蹟",
    WebsiteUrl: "http://www.kidsawesome.com.tw/",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_001794",
    Name: "MAJI集食行樂_圓山花博爭豔館",
    DescriptionDetail:
      "「MAJI2集食行樂」鄰近台北市立美術館，隱身在台北花博公園圓山園區一角，於2013年6月正式營運。由歌手哈林庾澄慶與知名設計師葉裕清精心規劃，在大自然中運用貨櫃、原木穀倉，巧妙包覆住美食、原創商品、音樂、藝術等元素，打造出具有異國氛圍的生活市集空間：一座城市遊樂園。MAJI2包含六大區域：神農市場、寰宇小吃街、創意市集、異國美食餐廳、特色商店街及多功能展演空間。【神農市場】為愛吃愛做菜的人把好吃、安心、天然、無毒食材通通集合再一起的神農市場，精心挑選全國各精緻小農的作物產品，其中為數不好少是獲得農委會神農獎章的好農商品，以及一般超市難見的優質小品牌調味醬料，並引進南門市場的傳統食材，與帶入華人口味的熟菜食堂，讓顧客可以直接帶回家。【寰宇小吃街】以貨櫃排列，搭配復古桌椅，營造出獨特用餐空間。無論是臺灣味小吃，還是東西方美食匯串，都在異國小吃街。【創意市集】創意市集聚集手工皮革包、原創服飾、特色飾品，以及各類生活設計小物，讓你目不暇給，隨處發現驚喜。(部分資料來源：財團法人臺北市會展產業發展基金會)",
    Phone: "886-2-25977112",
    ZipCode: "104",
    OpenTime:
      "*神農市場*星期一～星期五PM12:00-PM19:30*寰宇小吃攤*星期一~星期四 11:30~20:30星期五 11:30~21:30星期六~星期日 10:30~21:30(含例假日)",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/184759",
      PictureDescription1: "MAJI集食行樂_圓山花博爭豔館",
    },
    Position: {
      PositionLon: 121.521728515625,
      PositionLat: 25.069660186767578,
      GeoHash: "wsqqt7c3m",
    },
    Class1: "其他",
    Level: "非古蹟",
    WebsiteUrl: "http://www.majisquare.com/",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_000036",
    Name: "SPOT光點台北電影館",
    DescriptionDetail:
      "外觀為白色的2層樓西洋建築，廊柱為希臘柱式，風格似美國南方殖民風格，美國大使藍欽、莊萊德、柯爾克等人皆以這棟建築物做為官邸。1979年中美斷交後，最後一任大使離臺，建築物正式關閉。閒置多時的建築物，於內政部在1997年2月20日指定為第三級古蹟，有了新的轉機，臺北市文化局委託臺灣電影文化協會經營，成為以電影文化為主的「臺北之家」。內設光點電影院，有88座位。「光點．紅氣球」為提供輕食的電影沙龍，可容納約50人，每日下午5點以前開放民眾使用該空間。迴廊展覽館呈現各藝術創作者的作品，多功能藝文廳，面積為25坪，可容納約60人，內部設有電影相關書櫃，提供民眾閱讀，可以在此舉辦演講、座談會、茶會等。「光點．珈琲時光」咖啡廳，在庭園邊老樹旁，「光點．生活」書店則是一家專以「電影」與「城市」為主題的書店。臺北光點，為臺北的電影文化點亮了美好的光影。",
    Phone: "886-2-25117786",
    ZipCode: "104",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/63724",
      PictureDescription1: "SPOT光點台北電影館",
    },
    Position: {
      PositionLon: 121.52224731445312,
      PositionLat: 25.05324935913086,
      GeoHash: "wsqqt2ccc",
    },
    Level: "非古蹟",
    WebsiteUrl: "http://www.spot.org.tw/",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_001862",
    Name: "THE WALL MUSIC 這牆音樂藝文展演空間",
    DescriptionDetail:
      "The Wall Live House 這牆 成立於 2003 年 台灣最國際化音樂品味與專業規格的音樂空間 樹立了台灣樂團風潮 領先建立了亞洲最具代表性的音樂節點 提供無以數計飢渴的音樂靈魂整整十多年的持續養分 不斷開拓音樂環境未曾實現的美麗場景",
    Description:
      "THE WALL MUSIC提供無以數計飢渴的音樂靈魂持續養分，開拓音樂產業未曾想像過的 LIVE 狂潮!",
    Phone: "886-2-29300162",
    ZipCode: "116",
    OpenTime: "依活動而定",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/102592",
      PictureDescription1: "THE WALL MUSIC 這牆音樂藝文展演空間",
    },
    Position: {
      PositionLon: 121.53665924072266,
      PositionLat: 25.010910034179688,
      GeoHash: "wsqqm9h71",
    },
    Class1: "其他",
    Level: "非古蹟",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_000017",
    Name: "七星山系_天母古道親山步道",
    DescriptionDetail:
      "天母古道親山步道穿越士林華岡地區的西北山坡，也是紗帽山南邊的鞍部，屬於早年魚路古道的後段，涵蓋華岡至天母間的數條步道，沿著大水管構築，潺潺溪水、原始林相，步行其間，讓人倍覺涼爽舒適。步道還可順遊經翠峰瀑布至猴洞產業道路的「翠峰步道」，夾峙在山間林蔭中，走起來特別涼爽舒適。天母古道曾經是金山與天母間重要的連絡要道，自從仰德大道開通後，這條早年的便道就成為名符其實的古道，近年更躍昇為熱門的登山路線，每逢假日遊人如織。天母古道生態景觀天母古道全區海拔高度從約300公尺至120公尺屬於臺灣低海拔亞熱帶闊葉林生態系。從大屯山鞍部吹來的東北季風帶來強風、雨水和低溫，使山腰古道迎風面，呈現暖溫帶闊葉林景致；相反的山腰避風面溪谷陰溼地環境則利於熱帶熱帶闊葉樹種生長，如熱帶板根、幹生花、纏勒等現象。天母古道雖海拔僅300公尺，卻有著熱帶、亞熱帶及暖溫帶闊葉林等不同生態之壓縮型生態系環境，相當難得而珍貴。◎特別提醒山友：步道下切翠峰瀑布的岔路附近，容易看見猴群出沒，當您看見猴群出現時，請不要任意餵食，以免猴兒為爭搶食物，不小心傷害到您喔！水管路步道水管路步道自日據時代便是保安林區的水源重地，不僅林相原始豐富，沿途築水而居的蕨類、姑婆芋等植物，更見茂盛而繁多。水管路係為接引第三水源地泉水到天母、士林一帶所闢建，步道前段爬坡路沿線已不見大水管，而步道後段水管就埋在步道底下。1930年間水管上陸續鋪設石板和水泥作為保護，水管路就因此而形成，水管路與步道在天母地區因山勢漸緩才分道揚鑣。目前步道入口處的三角埔發電廠是步道的起點，也是水管路的終點。入山林前先暖身自登山口出發，得先經過上千級石階的考驗，沿途有人遞熱茶熱湯免費試喝，才剛覺得熱，遮陽帽就出現了，若是口渴，林間還有果汁、茶，和甜美的地瓜湯在等著你。怪怪，還沒到陽明山呢，「在地」的蔬菜、竹筍、地瓜就已一字排開。說是有一千多個階梯，就當作是進入山林前的「暖身」。首先映入眼簾是龍眼樹林，石階兩旁高大的龍眼樹，有的樹腰粗到要兩人合抱。從前，龍眼可是這裡的主要產業。再往上走，出現傳說中的黑色大水管，山路也突然變得陡直。上坡路不免要費點體力，累了，中途和盡頭都有涼亭可以歇歇腳。站在中途涼亭旁回望，天母市區已在山腳下，小有成就感，即使有點喘吁吁也能繼續向前行；走到盡頭，如果天氣晴朗，還能遠眺林口台地，據說從這裡觀看台北夜景也很不錯喲。終於走完這段陡坡，在蓄水池旁洗把臉擦擦汗，馬上就要進入林蔭坦途囉。詩意的步道之旅造訪過水管路步道的人，多半都會愛上這段路。沿途林木蔽日，夏日走在如履平地的山路上倍覺舒適涼爽；冬季只聽見北風在溪谷中呼嘯，但不覺有刺骨寒風。這裡的路面平整，很適合駐足觀景。漫步林間小徑，視野由眺望天母、北投轉換至山林溪谷，山間梯田與裊裊煙霧構成如詩如畫的動人美景。海拔僅300公尺高的水管路步道，因為自日據時代便是「水源重地」和「保安林區」，林相原始豐富，不但沿途可見許多逐水而居的蕨類、姑婆芋等指標性植物，生活其間的植物更高達三百餘種，可見生態環境受到很好的保護。路旁山崖的石壁上時有石頭堆砌，從岩壁流出的山泉水流入圳溝，吸引不少溪蝦和蝌蚪在此聚集。步道後段還有一條小水溝，清澈的水流同樣來自山上湧出的泉水，裡面有許多沼蝦和螃蟹，更是多種蜻蜓及蛙類繁殖的場所。從秋季到次年春季時，不時可以聽到斯文豪氏赤蛙如鳥叫的鳴聲。清晨或黃昏時段，還有機會看到台灣獼猴在此出沒呢。水道水　潺潺流水管路步道源自於日據時期，為了接引第三水源地的泉水到天母、士林一帶所開闢。行走在沿山壁開鑿的山徑，已不見前段爬坡路上的大水管，其實後段水管就埋在步道底下。一九三○年代，水管之上陸續鋪設石板和泥土作為保護，水管路就此成形。接近天母地區，因為山勢漸展，水管與步道才「分道揚鑣」。現在靠山崖的路上見到圳溝，石頭堆砌引導山泉流下的水溝彷彿是昔日藉水管引水的縮影；站在上坡路的水管旁，還可聽到大水管內急速的水流聲。步道入口的三角埔發電廠是步道的起點，也是水管道的終點，儘管已功成身退，依然見證了這水道的今與昔。",
    Phone: "886-2-27593001",
    ZipCode: "111",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/221111",
      PictureDescription1: "七星山系_天母古道親山步道",
    },
    Position: {
      PositionLon: 121.5336685180664,
      PositionLat: 25.127639770507812,
      GeoHash: "wsqqvw655",
    },
    Class1: "自然風景類",
    Class2: "遊憩類",
    Class3: "體育健身類",
    Level: "非古蹟",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_000394",
    Name: "三創生活",
    DescriptionDetail:
      "「三創生活」坐落於市民大道三段與金山北路交界，佔地2,687 坪，建築外觀呈現前瞻氣勢，立面設計詮釋產業特性，結合鄰近綠帶的視野，實踐自然與科技共生的設計理念。 空間規劃導入科技生活、潮流影音、子親娛樂、動漫文化、探索體驗、創作育成及藝術展演等多元概念，結合園區內隨處可見的數位視屏，讓影像的多元樣貌，觸動對生活的無限想像。 園區以人為核心，打造實踐未來的生活平台。期待能藉由互動、分享、探索、學習與創作，帶領大眾重新建構科技、文化與生活的連結。 園區共12層樓，緊鄰光華數位新天地，提供選購3C產品的更多選擇。",
    Phone: "886-809-093300",
    ZipCode: "100",
    OpenTime: "週日至週四 11:00-21:30／週五至週六及國定假日前夕 11:00-22:00",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/65876",
      PictureDescription1: "三創生活",
    },
    Position: {
      PositionLon: 121.53111267089844,
      PositionLat: 25.04534912109375,
      GeoHash: "wsqqmx278",
    },
    Class2: "遊憩類",
    Level: "非古蹟",
    WebsiteUrl: "https://www.syntrend.com.tw/",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_000354",
    Name: "三腳渡擺渡口",
    DescriptionDetail:
      "三腳渡所在，土名後港墘。後港墘在連結社子、劍潭、大龍峒(大浪泵)，隨著土地的墾殖，村庄的形成，街庄的依賴漸形重要。三腳渡除了連結街庄，具有交通的功能外，也是附近居民維生船隻聚集的港灣，除了在陸上從事農作，河邊養鴨，河裡耙蜆仔、捕魚，也是他們重要的謀生方式。後因河川整治，碼頭功能慢慢萎縮消失，而三腳渡的歷史，見證了淡水河的變遷，是一個極富歷史意義的空間點。 目前，僅有10多艘舢舨船在三腳渡靜靜地訴說渡頭的過去，並由保存者阿正司（生於臺北劍潭三腳渡的造船世家，十七歲學造船，製作過舢舨船近300艘，龍舟100艘，是臺灣目前少數的手工造龍舟師傅）讓技藝傳承、文化播種，水岸記憶可以延續，同時讓熱情再次溫暖三腳渡。 景觀重點介紹：包括有親水河岸碼頭、舢舨船和龍舟、製作龍舟的基地、國寶級龍舟製作師傅劉清正先生。",
    Phone: "886-2-27208889",
    ZipCode: "111",
    OpenTime: "全天開放",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/89496",
      PictureDescription1: "三腳渡擺渡口",
    },
    Position: {
      PositionLon: 121.5182113647461,
      PositionLat: 25.080699920654297,
      GeoHash: "wsqqtjyce",
    },
    Class2: "遊憩類",
    Level: "非古蹟",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_000416",
    Name: "三重世貿公園",
    DescriptionDetail:
      "為提供市民更多的停車空間，停管處新建南港區世貿公園地下停車場，並於民國100年簡易綠美化，公園面積約1.2公頃，位於南港區經貿二路106巷，東側為南港展覽館、西側為南港軟體園區 (第一、二期園區)、南側為南港軟體園區(第三期園區)、北側為中國信託企業總部大樓。為了提供更優質之休憩場域，中國信託商業銀行股份有限公司秉持服務社會的精神，於102年投入經費捐建認養三重世貿公園，將原有簡易綠美化之草坪，改造成以樹木開花編導季節色彩之公園，在春、夏、秋季點綴出夢幻的花色，分別以青春粉嫩、朱夏金澄及白秋褐紅，訴說著季節的更迭。園區內有多樣化之景觀配置，特別設置噴霧系統，營造大多數的蕨類喜好陰涼而溼潤的環境，種植多樣蕨類─蕨類谷地園；清淺水池旁種植水柳、穗花棋盤腳等水生植物；並架設高架棧道提供遊園民眾閱讀林相環境；旱地噴泉廣場，更是小朋友們流連忘返之地；夜晚配置高、低景觀燈，點亮行人空間，越夜越美麗。公園內種植樟樹、苦楝、魚木、楓香、烏桕、青楓、杜英、鳳凰花、盾柱木、阿勃勒、光臘樹、山櫻花、昭和櫻、八重櫻等多種喬木，散發出多量的芬多精，彷彿置身於森林浴中，提供遊園民眾“森呼吸”。繁忙緊湊生活的步調下，不論您是附近上班族，或是特別來此一遊的民眾，都可得到視覺及聽覺心靈享受，保證不虛此行喔！(資料來源：公園走透透網站)",
    Phone: "886-2-27884255",
    ZipCode: "115",
    OpenTime: "全天開放",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/66046",
      PictureDescription1: "三重世貿公園",
    },
    Position: {
      PositionLon: 121.61528015136719,
      PositionLat: 25.057910919189453,
      GeoHash: "wsqqx3tsc",
    },
    Class1: "遊憩類",
    Class2: "都會公園類",
    Level: "非古蹟",
    WebsiteUrl: "https://parks.taipei/parks/m2/pkl_parks_m2C.php?sid=539",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_A25000000E_100004",
    Name: "下北沢世代",
    DescriptionDetail:
      "除了是專營古本、二手雜誌、絕版逸品、文房雜貨等各類商品的書店外，更是結合企画、選書、編集、設計的出版工作室。透過流通販售日本、歐美、香港的美術攝影、獨立刊物等主題商品，並策劃多檔以雜誌與zine為主題的平面活動。目前台中也有分店。",
    Phone: "886-2-23145650",
    Address: "臺北市  中正區和平西路二段141號2樓之1",
    ZipCode: "104",
    TravelInfo:
      "捷運「龍山寺」站3號出口直行約10分鐘，或可搭北市公車1、007、和平幹線及藍28至「和平中華路口」站下車；或12、202、205、212、223、246、250、253、260、307、604、670、671及673至「大埔街」站下車。",
    OpenTime: "周六～日：13:00~19:00，週一～五公休",
    Picture: {
      PictureUrl1:
        "http://cloud.culture.tw/e_upload_ccacloud/festival/image/A0/B0/C0/D0/E0/F27/ffd53fcd-b4eb-4d60-afae-da040f4b0185.jpg",
    },
    Position: {
      PositionLon: 121.52241516113281,
      PositionLat: 25.047977447509766,
      GeoHash: "wsqqmrcgj",
    },
    Class1: "藝術類",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_002217",
    Name: "中央藝文公園_華山大草原遊戲場",
    DescriptionDetail:
      "華山大草原遊戲場從入口處的火車造型牆作為開端，遊戲場以鐵軌和火車隧道等意象串連而成。其中，火車隧道的2個牆面，一面為舉辦工作坊時孩童留下的夢想泡泡，一面為華山車站歷史的展現。遊戲場中最具代表性的是結合山坡地景綠樹中的「煙囪遊戲塔」，其煙囪外型與華山酒廠大煙囪呼應，利用高低層次的遊戲塔，創造不同的遊戲高度體驗，場內更設有「水沙世界」、「極限滑索」、「飛天鞦韆」、「大坡面溜滑梯」等設施環繞，提供多樣的機能與挑戰。延伸至遊戲場的大草坪，讓孩童能發揮自我的想像空間，進行更多元的遊戲行為。",
    Phone: "886-2-23032451",
    ZipCode: "100",
    OpenTime: "開放空間",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/182869",
      PictureDescription1: "中央藝文公園_華山大草原遊戲場",
    },
    Position: {
      PositionLon: 121.5268325805664,
      PositionLat: 25.046119689941406,
      GeoHash: "wsqqmrt0h",
    },
    Class1: "其他",
    Level: "非古蹟",
    WebsiteUrl:
      "https://play4u.gov.taipei/News_Content.aspx?n=4773608F226124D4&sms=7B56BA5392EB632C&s=6A692C83A2717DA3",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_001554",
    Name: "中山北路婚紗街",
    DescriptionDetail:
      "臺北具有異國風情的林蔭大道當推中山北路婚紗街，寬敞的街道與層層樹蔭，人行道上櫥窗內滿是美麗的婚紗禮服。短短一公里多的路上聚集了近30間的婚紗攝影與喜餅、婚禮顧問、美體工作室等相關產業，春天走在這裡的楓香林蔭下可說是一大享受，看著櫥窗裡如同童話公主穿著的各式豪華婚紗爭奇鬥艷，店家在門口擺出一張張儷影雙雙的照片，常勾起人對於幸福的浪漫遐思，並永存當下佳人形影的幸福氣息。",
    Phone: "886-2-25031369",
    ZipCode: "104",
    OpenTime: "依商圈各店情形不同",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/181240",
      PictureDescription1: "中山北路婚紗街",
    },
    Position: {
      PositionLon: 121.52313232421875,
      PositionLat: 25.059160232543945,
      GeoHash: "wsqqt3fkn",
    },
    Class1: "其他",
    Level: "非古蹟",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_001589",
    Name: "中山北路條通商圈",
    DescriptionDetail:
      "中山北路的條通文化源自於日據時期，街廓裡的各式日式小吃店、酒吧是許多日僑及觀光客喜愛光臨之處，有著日據時期延續至今的異國情調，頗可感受到與臺灣歷史緊密結合的氣氛。至今條通仍保有濃厚的東洋情調，不但有居酒屋、懷石料理亭，還有不少日本家常菜，如：馬鈴薯燉肉、關東煮、鰻魚飯、燒肉等日常料理，在巷弄深處飄散著老東京的味道。這裡集合的臺日美食，也反映臺灣從前到現代的飲食文化，例如七條通就是臺灣燒肉文化的發源地。",
    Phone: "886-2-25626434",
    ZipCode: "104",
    OpenTime: "依商圈各店情況不同",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/88133",
      PictureDescription1: "中山北路條通商圈",
    },
    Position: {
      PositionLon: 121.52263641357422,
      PositionLat: 25.05164909362793,
      GeoHash: "wsqqt2d06",
    },
    Class1: "遊憩類",
    Level: "非古蹟",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_001859",
    Name: "中油藝廊",
    DescriptionDetail:
      "自102年起即邀請不同藝術團體或個人於中油藝廊展出，提供同仁及民眾欣賞多元風格藝術作品、增進環境藝術氛圍並推廣藝文交流，甚獲好評。中油藝廊展出內容包括國畫、油畫、水彩、粉彩、攝影、書法等不拘，2個月為一個檔期。歡迎蒞臨參觀。",
    Phone: "886-2-87258027",
    ZipCode: "110",
    OpenTime: "週一至週五 9:00~17:00，週六週日不開放",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/102578",
      PictureDescription1: "中油藝廊",
    },
    Position: {
      PositionLon: 121.56918334960938,
      PositionLat: 25.03948974609375,
      GeoHash: "wsqqqq7cx",
    },
    Class1: "其他",
    Level: "非古蹟",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
  {
    ID: "C1_379000000A_000089",
    Name: "中華民國總統府",
    DescriptionDetail:
      "日本人統治臺灣，並不是一個單純的領土擴張，而是整個東亞殖民地計畫的第一步，所以處處都要是最好的模範，將來才好展示給其它「歸順」的新殖民地。在這個殖民地的目標下，他們學習的對象是西方，在臺灣蓋了很多歐洲巴洛克風格的建築，這些建築技術在今天看來都是很傑出的。總統府是日據時期的總督府，於1919年完工，當時總督在辦公室面向東方，可以眺望到四獸山以內的整個臺北市，每天看著旭日東昇，擘劃著永續的宏圖偉業。從第7任總督開始，總共有13位總督在此辦公，光復後陳誠的東南軍政長官公署和中華民國行政院、中華民國總統府共用此建築，而後的歷任總統，均以此為總統府，在此日理萬機。",
    Phone: "886-2-23113731",
    ZipCode: "100",
    Picture: {
      PictureUrl1: "https://www.travel.taipei/image/215849",
      PictureDescription1: "中華民國總統府",
    },
    Position: {
      PositionLon: 121.51194763183594,
      PositionLat: 25.040090560913086,
      GeoHash: "wsqqmn6m1",
    },
    Level: "非古蹟",
    WebsiteUrl: "https://www.president.gov.tw/",
    ParkingPosition: {},
    City: "臺北市",
    SrcUpdateTime: "2021-11-14T01:13:50+08:00",
    UpdateTime: "2021-11-14T02:40:14+08:00",
  },
];

function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  let AppID = process.env.TDC_APP_ID;
  let AppKey = process.env.TDC_APP_KEY;
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toUTCString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey ? AppKey : "", "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    AppID && HMAC
      ? `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`
      : null;

  console.log("==== Authorization ===", Authorization);
  return { Authorization: Authorization, "X-Date": GMTString };
}

const fetcher = (url: string, $top?: number, $filter?: String) =>
  instance
    .get(url, {
      params: { $top, $filter: $filter ? `Class1 eq '${$filter}'` : null },
    })
    .then((res) => res.data);

export function useGetSceneSpots(
  City = "Taipei",
  options: {
    $top?: String;
    $filter?: String;
  }
): {
  spots: Array<SceneSpotDataType>;
  isLoading: boolean;
  isError: boolean;
} {
  console.log("==== useGetSceneSpots ===");

  const top = 10;

  const url = apiList.ScenicSpots(City);
  console.log("==== useGetSceneSpots url ===", url);

  const { data, error } = useSWR([url, options.$top, options.$filter], fetcher);

  return {
    spots: mockData,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useGetTopSceneSpots(): {
  topSpots: Array<SceneSpotDataType>;
  isLoading: boolean;
  isError: boolean;
} {
  console.log("==== useGetSceneSpots ===");

  const { data, error } = useSWR([apiList.ScenicSpots(""), 10], fetcher);

  return {
    topSpots: mockData,
    isLoading: !error && !data,
    isError: error,
  };
}
