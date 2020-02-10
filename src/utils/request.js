import axios from "axios";
import { domain } from "../config/config";
const baseUrl = domain;

export const request = async ({
  url,
  method = "GET",
  token = null,
  data = {}
}) => {
  const response = await axios(`${baseUrl}${url}`, {
    method,
    data,
    headers: { authorization: token ? `${token}` : "" }
  });
  return { data: response.data };
};

// export const errorHandler = (dispatch, error) => {
//   dispatch({
//     type: FETCH_ERROR,
//     payload: error.response
//       ? error.response.data.message
//       : "Something went wrong"
//   });
// };
