import Api from './Api';
import { MAIN_API_URL } from './consts';

class MainApi extends Api {
  register = (data) =>
    fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        ...this.headers,
      },
      body: JSON.stringify(data),
    }).then((res) => MainApi.handleResponse(res));

  authorize = (data) =>
    fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        ...this.headers,
      },
      body: JSON.stringify(data),
    })
      .then((res) => MainApi.handleResponse(res))
      .then((res) => {
        if (res.data.newToken) {
          const token = res.data.newToken;
          localStorage.setItem('token', token);
          return token;
        }
        return res;
      });

  logout = () =>
    fetch(`${this.url}/users/signout`, {
      method: 'GET',
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => MainApi.handleResponse(res))
      .then((res) => {
        localStorage.clear();
        return res;
      });

  getUserData = () =>
    fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => MainApi.handleResponse(res));

  updateUserData = (data) =>
    fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    }).then((res) => MainApi.handleResponse(res));
}

export default new MainApi({
  url: MAIN_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
