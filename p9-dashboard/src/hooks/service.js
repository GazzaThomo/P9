function getSessions() {
  const response = apiClient.get(`/user/${userId}/average-sessions`);
  return response;
}
