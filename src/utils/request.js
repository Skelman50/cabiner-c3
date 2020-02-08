import axios from "axios";
const baseUrl = "http://192.168.1.104:4000/";

export const request = async ({
  url,
  method = "GET",
  token = null,
  data = {}
}) => {
  const response = await axios(`${baseUrl}${url}`, {
    method,
    data,
    headers: { authorization: token ? `Bearer ${token}` : "" }
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
