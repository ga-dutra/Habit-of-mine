import axios from "axios";

const base_url =
  "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth";

function postLogin(body) {
  const promise = axios.post(`${base_url}/login`, body);
  return promise;
}

function postSignUp(body) {
  const promise = axios.post(`${base_url}/sign-up`, body);
  return promise;
}

export { postLogin, postSignUp };
