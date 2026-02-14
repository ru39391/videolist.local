import { defineStore, setActivePinia } from 'pinia';
import { ref } from 'vue';
import { useBlogStore } from './blog';
import { useModalStore } from './modal';
import piniaStore from '../index';
import {
  ID_KEY,
  NAME_KEY,
  ITEM_ID_KEY,
  URL_KEY,
  COUNTER_KEY,
  TAG_KEY,
  CATEGORY_KEY,
  ALIAS_KEY
} from '../../utils/constants';

import type {
  THandledLinkData,
  TItemData,
  TTagData,
} from '../../utils/types';

import { fetchSourceData, sortArrValues } from '../../utils';

setActivePinia(piniaStore);

const blogStore = useBlogStore();
const modalStore = useModalStore();

const useBookmarksStore = defineStore('bookmarks', () => {
  const isLoading = ref<boolean>(false);
  const currentBookmarks = ref<TItemData[]>([]);
  const bookmarksList = ref<TItemData[]>([]);
  const bookmarkTagsList = ref<TTagData[]>([]);
  const bookmarksData = ref<Record<string, TItemData[]>>({ videoList: [], itemsList: [] });

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const setCurrentItems = ({ id, name }: TTagData) => {
    const array = [...bookmarksList.value].filter((item) => item[CATEGORY_KEY] === name);

    currentBookmarks.value = sortArrValues(
      array.map((item) =>  ({
        ...item,
        [TAG_KEY]: id
      })),
      NAME_KEY
    ) as TItemData[];
  };

  const setBookmarksData = (arr: TItemData[]) => {
    const {
      videoList,
      itemsList
    } = arr.reduce(
      (acc, item) => item[URL_KEY].includes('youtube.com') ? {...acc, videoList: [...acc.videoList, item]} : {...acc, itemsList: [...acc.itemsList, item]},
      { videoList: [], itemsList: [] } as Record<string, TItemData[]>
    );

    bookmarksData.value = { videoList, itemsList };
  };

  const setBookmarksList = (arr: THandledLinkData[][]) => {
    const array = [...arr].flat();

    const bookmarks = sortArrValues(
      array.map((item, index) => ({
        ...item,
        id: index,
        duration: '',
        createdon: '',
        updatedon: null,
        publishedon: null,
        author: 0,
        channel: 0,
        isDownloaded: 0,
        isViewed: 0,
        [ITEM_ID_KEY]: item[URL_KEY].includes('youtube.com') ? item[ITEM_ID_KEY] : '',
        [CATEGORY_KEY]: item[TAG_KEY]
      })),
      NAME_KEY
    ) as TItemData[];

    setBookmarksData(bookmarks);

    bookmarksList.value = bookmarks;
  };

  const handleBookmarksData = (data: Record<string, THandledLinkData[]>) => {
    const arr = Object.entries(data).reduce(
      (acc: { [NAME_KEY]: string; [COUNTER_KEY]: number; }[], item) => [...acc, { [NAME_KEY]: item[0], [COUNTER_KEY]: item[1].length }], []
    );

    setBookmarksList(Object.values(data));

    bookmarkTagsList.value = sortArrValues(
      arr.map((item) => {
        const data = [...blogStore.tagsList].find(data => data[NAME_KEY] === item[NAME_KEY]);

        return {
          ...item,
          [ID_KEY]: data ? data[ID_KEY] : null
        }
      }),
      NAME_KEY
    ) as TTagData[];
  };

  const isBookmarkExist = (item: TItemData) => {
    let isDataExist = false;

    if(item[ITEM_ID_KEY]) {
      isDataExist = Boolean([...blogStore.itemsList].find(data => data[ITEM_ID_KEY].includes(item[ITEM_ID_KEY])));
    } else {
      isDataExist = item[ALIAS_KEY] ? Boolean([...blogStore.itemsList].find(data => data[ALIAS_KEY].includes(item[ALIAS_KEY]))) : false;
    }

    return !isDataExist;
  };

  const removeBookmark = (item: TItemData) => {
    currentBookmarks.value = [...currentBookmarks.value].filter(data => data[ID_KEY] !== item[ID_KEY]);
  };

  const createBookmark = (item: TItemData) => {
    if(!isBookmarkExist(item)) {
      modalStore.isVisible = !isBookmarkExist(item);
      return;
    }
  };

  const fetchBookmarks = async () => {
    setLoading(true);

    try {
      const { isSucceed, data } = await fetchSourceData();

      if(isSucceed) {
        handleBookmarksData(data as Record<string, THandledLinkData[]>);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    bookmarksData,
    bookmarkTagsList,
    currentBookmarks,
    isBookmarkExist,
    fetchBookmarks,
    setCurrentItems,
    setBookmarksData,
    createBookmark,
    removeBookmark
  };
});

export { useBookmarksStore };
