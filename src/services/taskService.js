import http from "./httpService";

const apiEndPoint = "/tasks";

function taskUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getTasks() {
  return http.get(apiEndPoint);
}

export function getTask(id) {
  return http.get(taskUrl(id));
}

export function createTask(task) {
  return http.post(apiEndPoint, task);
}

export function updateTask(task) {
  return http.put(taskUrl(task.id), task);
}

export function deleteTask(id) {
  return http.delete(taskUrl(id));
}
