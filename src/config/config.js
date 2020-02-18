export const domain =
  process.env.NODE_ENV === "production"
    ? "https://cab.yavir2000.com/"
    : "http://192.168.1.102:4000/";

export const socketURL =
  process.env.NODE_ENV === "production"
    ? "https://cab.yavir2000.com"
    : "http://172.16.0.151";
