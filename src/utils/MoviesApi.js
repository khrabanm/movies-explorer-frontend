import { MOVIES_API_URL } from './consts';

class MoviesApi {
  constructor(options) {
    this.headers = {
      ...options.headers,
    };
    this.url = options.baseUrl;
  }

  static handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Error: ${res.status}`));
  }

  getMovies() {
    return fetch(this.url).then((res) => MoviesApi.handleResponse(res));
  }
}

export default new MoviesApi({
  baseUrl: MOVIES_API_URL,
});
