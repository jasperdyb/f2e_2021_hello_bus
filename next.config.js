/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NUMBER_PER_PAGE: 12,
    TDC_APP_ID: process.env.TDC_APP_ID,
    TDC_APP_KEY: process.env.TDC_APP_KEY,
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    GOOGLE_GEOCODING_API_KEY: process.env.GOOGLE_GEOCODING_API_KEY,
  },
  images: {
    domains: [
      "www.travel.taipei",
      "www.northguan-nsa.gov.tw",
      "newtaipei.travel",
      "www.trimt-nsa.gov.tw",
      "www.penghu-nsa.gov.tw",
      "www.eastcoast-nsa.gov.tw",
      "www.ali-nsa.net",
      "tourism.chcg.gov.tw",
      "cloud.culture.tw",
    ],
  },
};
