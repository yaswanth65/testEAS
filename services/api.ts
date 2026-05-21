import axios from "axios";

const ACCESS_KEY =
  process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY ?? "";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
    "Accept-Version": "v1",
  },
  timeout: 10000,
});

export default unsplashApi;
