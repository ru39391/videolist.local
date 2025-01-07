import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  API_URL,
  BOOKMARKS_KEY
} from '../../utils/constants';
import axios from 'axios';

import type {
  TItemData,
  TTagData
} from '../../utils/types';

import { fetchSourceData } from '../../utils';

const useBookmarksStore = defineStore('bookmarks', () => {
  const isLoading = ref<boolean>(true);
  //const itemsList = ref<TItemData[]>([]);
  //const tagsList = ref<TTagData[]>([]);

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const fetchBookmarks = async () => {
    setLoading(true);

    try {
      const { isSucceed, data } = await fetchSourceData();

      if(isSucceed) {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    fetchBookmarks,
  };
});

export { useBookmarksStore };
