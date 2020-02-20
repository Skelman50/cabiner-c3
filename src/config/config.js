export const domain =
  process.env.NODE_ENV === "production"
    ? "https://cab.yavir2000.com/"
    : "http://172.16.0.151/yavir2000/";

export const socketURL =
  process.env.NODE_ENV === "production"
    ? "https://cab.yavir2000.com"
    : "http://172.16.0.151";
