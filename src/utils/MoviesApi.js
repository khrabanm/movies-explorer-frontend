import { MOVIES_API_URL } from './consts';
import Api from './Api';

class MoviesApi extends Api {
  getMovies() {
    return fetch(this.url).then((res) => MoviesApi.handleResponse(res));
  }
}

export default new MoviesApi({
  url: MOVIES_API_URL,
});
