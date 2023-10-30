// eslint-disable-next-line import/prefer-default-export
export const MOVIES_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const MAIN_API_URL = 'https://api.movies-explorer.khr.nomoredomainsrocks.ru';
export const MOVIES_IMAGE_URL = 'https://api.nomoreparties.co/';

export const SHORT_MOVIE_DURATION = 40;

export const MOVIES_COUNT = {
  DESKTOP: 16,
  TABLET: 8,
  MOBILE: 5,
  DESKTOP_ADD: 4,
  TABLET_ADD: 2,
  MOBILE_ADD: 2,
};

export const MOVIES_TEXT_ERROR =
  'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const MOVIES_TEXT_NOT_FOUND = 'Ничего не найдено';
export const PROFILE_SUCCESS_MESSAGE = 'Данные успешно обновлены';

export const UNAUTHORIZED_ERROR = 'Error: 401';

export const FORM_REGEXP = {
  name: /^[a-zA-ZА-Яа-яЁё\s].{1,19}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
};

export const FORM_ERROR_MESSAGES = {
  search: 'Нужно ввести ключевое слово',
  name: 'Имя должно быть от 2 до 20 символов',
  email: 'Неправильный формат email',
  password: 'Пароль должен быть от 8 до 30 символов, содержать цифры, заглавные и строчные буквы',
};

export const SERVER_ERRORS_CODE = {
  'Error: 400': 400,
  'Error: 401': 401,
  'Error: 409': 409,
};

export const SIGNUP_ERROR_MESSAGES = {
  400: 'Некорректно заполнено одно из полей',
  409: 'При регистрации пользователя произошла ошибка',
};

export const SIGNIN_ERROR_MESSAGES = {
  401: 'Вы ввели неправильный логин или пароль.',
  400: 'Вы ввели неправильный логин или пароль.',
};

export const PROFILE_ERRORS_MESSAGES = {
  400: 'При обновлении профиля произошла ошибка.',
  409: 'Пользователь с таким email уже существует.',
};

export const NAME_MIN = 2;
export const NAME_MAX = 20;
export const EMAIL_MIN = 8;
export const EMAIL_MAX = 200;
export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 30;
