import axios from "axios";

const base_url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function postLogin(body) {
  const promise = axios.post(`${base_url}/auth/login`, body);
  return promise;
}

function postSignUp(body) {
  const promise = axios.post(`${base_url}/auth/sign-up`, body);
  return promise;
}

function getAllHabbits(body) {
  const promise = axios.get(`${base_url}/habits`, body);
  return promise;
}

function getTodayHabbits(body) {
  const promise = axios.get(`${base_url}/habits/today`, body);
  return promise;
}

function createHabbit(body) {
  const promise = axios.post(`${base_url}/habits`, body);
  return promise;
}

function validateHabbit(body) {
  const promise = axios.post(`${base_url}/habits/:habbitIt/check`, body);
  return promise;
}

function unvalidateHabbit(body) {
  const promise = axios.post(`${base_url}/habits/:habbitIt/uncheck`, body);
  return promise;
}

function deleteHabbit(body) {
  const promise = axios.post(`${base_url}/habits/:habbitId`, body);
  return promise;
}

function getHabbitsHistory(body) {
  const promise = axios.get(`${base_url}/habits/history/daily`, body);
  return promise;
}

export {
  postLogin,
  postSignUp,
  getAllHabbits,
  getTodayHabbits,
  getHabbitsHistory,
  createHabbit,
  deleteHabbit,
  validateHabbit,
  unvalidateHabbit,
};
