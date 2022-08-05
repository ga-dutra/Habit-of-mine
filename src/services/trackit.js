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

function postNewHabbit(body, config) {
  const promise = axios.post(`${base_url}/habits`, body, config);
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

function deleteHabbit(body, habbitId, config) {
  const stringHabbitId = String(habbitId);
  console.log(`body: ${body}`);
  console.log(`habbitId: ${habbitId}`);
  console.log(`stringHabbitId: ${stringHabbitId}`);
  console.log(`config: ${config}`);
  const promise = axios.delete(`${base_url}/habits/${stringHabbitId}`, config, {
    data: body,
  });
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
  postNewHabbit,
  deleteHabbit,
  validateHabbit,
  unvalidateHabbit,
};
