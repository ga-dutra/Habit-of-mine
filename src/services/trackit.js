import axios from "axios";

const base_url =
  "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth";

function postLogin(body) {
  const promise = axios.post(`${base_url}/post`, body);
  return promise;
}
