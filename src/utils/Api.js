export default class Api {
  constructor(options) {
    this.headers = {
      ...options.headers,
    };
    this.url = options.url;
  }

  static handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Error: ${res.status}`));
  }
}
