import axios from "axios";
import jsSHA from "jssha";

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

export const tdxClientInstance = axios.create({
  baseURL: "/",
  timeout: 3000,
  headers: getAuthorizationHeader(),
});
