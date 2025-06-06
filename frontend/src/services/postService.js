import sendRequest from "./sendRequest";

const BASE_URL = '/api/posts';

export async function index() {
  return sendRequest(BASE_URL);

}

export async function create(postData) {
  return sendRequest(BASE_URL, 'POST', postData);

}

export async function update(postId, formData) {
    return sendRequest(`${BASE_URL}/${postId}`, 'PUT', formData);
}

export async function show (id) {
  return sendRequest(`${BASE_URL}/${id}`);

}

export async function remove (id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');

}
export async function createComment (postId, commentData) {
    return sendRequest(`${BASE_URL}/${postId}/comments`, 'POST', commentData);
}