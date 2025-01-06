const IS_LIKED_KEY = 'isLiked';
const IS_DIS_LIKED_KEY = 'isDisLiked';

const ITEMS_KEY = 'items';
const TAGS_KEY = 'tags';

const DATA_IS_LOADING_MESS = 'Данные загружаются';
const POSTS_ERROR_MESS = 'При загрузке списка статей произошла ошибка, повторите попытку позже';
const COMMENTS_ERROR_MESS = 'При загрузке списка комментариев произошла ошибка, повторите попытку позже';

const ROOT_PATH = import.meta.env.VITE_ROOT_PATH;
const SITE_URL = import.meta.env.VITE_SITE_URL;
const API_URL = import.meta.env.VITE_API_URL;

export {
  API_URL,
  ITEMS_KEY,
  TAGS_KEY,
  IS_LIKED_KEY,
  IS_DIS_LIKED_KEY,
  DATA_IS_LOADING_MESS,
  POSTS_ERROR_MESS,
  COMMENTS_ERROR_MESS
}
