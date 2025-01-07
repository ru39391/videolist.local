const ID_KEY = 'id';
const NAME_KEY = 'name';
const TAG_KEY = 'tag';
const DATE_KEY = 'date';
const SAVEDON_KEY = 'savedon';
const COUNTER_KEY = 'counter';
const CATEGORY_KEY = 'category';

const ITEMS_KEY = 'items';
const TAGS_KEY = 'tags';
const BOOKMARKS_KEY = 'bookmarks';

const DATA_IS_LOADING_MESS = 'Данные загружаются';
const POSTS_ERROR_MESS = 'При загрузке списка статей произошла ошибка, повторите попытку позже';

const SITE_NAME = import.meta.env.VITE_SITE_NAME;
const API_URL = import.meta.env.VITE_API_URL;

export {
  API_URL,
  SITE_NAME,
  ITEMS_KEY,
  TAGS_KEY,
  BOOKMARKS_KEY,
  ID_KEY,
  NAME_KEY,
  TAG_KEY,
  DATE_KEY,
  SAVEDON_KEY,
  COUNTER_KEY,
  CATEGORY_KEY,
  DATA_IS_LOADING_MESS,
  POSTS_ERROR_MESS,
}
