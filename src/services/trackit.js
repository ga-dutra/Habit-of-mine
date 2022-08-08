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

function getAllHabbits(config) {
  const promise = axios.get(`${base_url}/habits`, config);
  return promise;
}

function getTodayHabbits(config) {
  const promise = axios.get(`${base_url}/habits/today`, config);
  return promise;
}

function postNewHabbit(body, config) {
  const promise = axios.post(`${base_url}/habits`, body, config);
  return promise;
}

function validateHabbit(config, habbitId) {
  const stringHabbitId = String(habbitId);
  const promise = axios.post(
    `${base_url}/habits/${stringHabbitId}/check`,
    {},
    config
  );
  return promise;
}

function unvalidateHabbit(config, habbitId) {
  const stringHabbitId = String(habbitId);
  const promise = axios.post(
    `${base_url}/habits/${stringHabbitId}/uncheck`,
    {},
    config
  );
  return promise;
}

function deleteHabbit(body, habbitId, config) {
  const stringHabbitId = String(habbitId);
  const promise = axios.delete(`${base_url}/habits/${stringHabbitId}`, config, {
    data: body,
  });
  return promise;
}

function getHabbitsHistory(config) {
  const promise = axios.get(`${base_url}/habits/history/daily`, config);
  return promise;
}

export {
  postLogin,
  postSignUp,
  getAllHabbits,
  getTodayHabbits,
  getHabbitsHistory,
  postNewHabbit,
  deleteHabbit,
  validateHabbit,
  unvalidateHabbit,
};
