import Twig, { Template } from 'twig';
import { SITE_URL } from './constants';
import type {
  TCustomData,
  TItemData,
  TTagData,
  TItemDataKeys,
  TTagDataKeys,
  TLinkData,
  THandledLinkData
} from './types';

const fetchArray = (arr: TCustomData<string | number>[], param: string): TCustomData<string | number>[] => {
  return arr.reduce((acc: TCustomData<string | number>[], item: TCustomData<string | number>) => {
    if(acc.find(data => data[param] === item[param])) {
      return acc;
    } else {
      return [...acc, item];
    }
  }, []);
};

const handleDate = (value: string): number => {
  const date = new Date(value.replace(' ', 'T'));

  return Math.floor(date.getTime() / 1000);
}

const sortArrValues = (arr: TItemData[] | TTagData[], key: string, dir: string = 'ASC'): TItemData[] | TTagData[] => {
  const handleStrValue = (value: string): string => value !== null && value !== undefined ? value.toString().toLowerCase() : '';

  const handleNumValue = (value: number): number => value !== null && value !== undefined ? Number(value) : 0;

  const handleValue = (value: string | number | null | undefined): string | number => typeof value === 'string'
    ? handleStrValue(value as string)
    : handleNumValue(value as number);

  const isItemData = (item: TItemData | TTagData): item is TItemData => typeof key in item;

  const array = arr.sort((a: TItemData | TTagData, b: TItemData | TTagData) => {
    const valueA = handleValue(
      isItemData(a) ? ({...a} as TItemData)[key as TItemDataKeys] : ({...a} as TTagData)[key as TTagDataKeys]
    );
    const valueB = handleValue(
      isItemData(b) ? ({...b} as TItemData)[key as TItemDataKeys] : ({...b} as TTagData)[key as TTagDataKeys]
    );

    if(valueA < valueB) {
      return -1;
    }
    if(valueA > valueB) {
      return 1;
    }
    return 0;
  });

  return dir === 'ASC' ? array : array.reverse();
}

const translit = (str: string): string => {
  const pattern = /[^a-zа-я0-9\s]/g;
  const letters = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z',
      'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
      'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
      'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya', '-': '-'
  };
  const caption = str
    .toLowerCase()
    .replace(pattern, ' ')
    .trim()
    .split(' ')
    .reduce(
      (acc, item, index) => Boolean(item) ? `${acc}${index !== 0 ? '-' : ''}${item}` : acc, ''
    );

  return caption
    .split('')
    .reduce(
      (acc, item) => item === 'ъ' || item === 'ь' ? acc : `${acc}${letters[item] || item}`, ''
    )
    .slice(0,255);
}

const formatName = (str: string): { name: string; alias: string; } => {
  const value = str.split(' • • ')[0];
  const caption = value && str.includes(' • • ') ? value.split(' Подтверждено')[0] : str;

  return {
    name: caption.trim().slice(0,255),
    alias: translit(caption)
  };
}

const formatUrl = (str: string): { url: string; item_id: string; } => {
  const value = str.split('v%3D')[1];
  const url = value && str.includes('google') && str.includes('youtube.com')
    ? `https://www.youtube.com/watch?v=${value.split('&usg=')[0]}`
    : str;
  const [_, id] = url.includes('v=') ? url.split('v=') : ['', url];
  const item_id = id.length === 11 ? id : id.split('&')[0];

  return {
    url,
    item_id: url.includes('youtube.com') ? item_id : ''
  };
}

const formatDate = (value: string): string => {
  const date = new Date(Number(value) * 1000);

  const year = date.getFullYear();
  const [
      month,
      day,
      hours,
      minutes,
      seconds
  ] = [
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
  ].map(item => `0${item}`.slice(-2));

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const handleLinkList = (arr: HTMLElement[]): Record<string, THandledLinkData[]> => {
  const array = arr.map((item) => {
    const data = {
      caption: item.textContent,
      href: item.getAttribute('href'),
      savedon: item.getAttribute('last_modified'),
      tag: item.getAttribute('tags'),
    };

    return Object.entries(data).reduce((acc, item) => ({ ...acc, [item[0]]: item[1] || ''}), {} as TLinkData);
  });

  const bookmarks = array.map(({ caption, href, savedon, tag }) => {
    const { name, alias } = formatName(caption.trim());
    const { url, item_id } = formatUrl(href.trim());

    return {
      name,
      alias,
      item_id,
      url,
      savedon: formatDate(savedon.trim()),
      tag: tag.trim() || '-',
    }
  });

  return bookmarks.reduce(
    (acc, item) => acc[item.tag] ? {...acc, [item.tag]: [...acc[item.tag], item]} : {...acc, [item.tag]: [item]}, {} as Record<string, THandledLinkData[]>
  );
}

const fetchSourceData = async(): Promise<Template | undefined> => {
  const parser = new DOMParser();
  let result: {
    isSucceed: boolean;
    data: Record<string, THandledLinkData[]> | null;
  } = { isSucceed: false, data: null };

  try {
    const res = await fetch(`${SITE_URL}assets/source/src.twig`);
    const data = await res.text();
    const tpl = await Twig.twig({ data });

    const { body } = parser.parseFromString(tpl.render(), 'text/html');

    result = {
      isSucceed: true,
      data: handleLinkList(Array.from(body.querySelectorAll('a')))
    };
  } catch(err) {
    console.error(err);
  }

  return result;
}

export {
  fetchArray,
  handleDate,
  sortArrValues,
  fetchSourceData
}
