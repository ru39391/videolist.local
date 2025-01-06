import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  API_URL,
  ITEMS_KEY,
  TAGS_KEY,
  ID_KEY,
  NAME_KEY,
  TAG_KEY,
  DATE_KEY,
  SAVEDON_KEY,
  COUNTER_KEY,
  CATEGORY_KEY,
  DATA_IS_LOADING_MESS,
  POSTS_ERROR_MESS
} from '../../utils/constants';
import axios from 'axios';

import type {
  TItemData,
  TTagData
} from '../../utils/types';

import { handleDate, sortArrValues } from '../../utils';

const useBlogStore = defineStore('blog', () => {
  const isLoading = ref<boolean>(true);
  const alertMessage = ref<string>(DATA_IS_LOADING_MESS);
  const itemsList = ref<TItemData[]>([]);
  const tagsList = ref<TTagData[]>([]);
  const currentItems = ref<TItemData[]>([]);

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const setAlertMessage = (value: string) => {
    alertMessage.value = value;
  };

  const setItemsList = (itemsArr: TItemData[], tagsArr: TTagData[]) => {
    const array = [...itemsArr].map(
      (item) => {
        const tagData = [...tagsArr].find(data => data[ID_KEY] === item[TAG_KEY]);

        return ({ ...item, [DATE_KEY]: handleDate(item[SAVEDON_KEY]), [CATEGORY_KEY]: tagData ? tagData[NAME_KEY] : '' });
      }
    );

    itemsList.value = sortArrValues(array, DATE_KEY, 'DESC') as TItemData[];
  };

  const setTagsList = (tagsArr: TTagData[], itemsArr: TItemData[]) => {
    const array = [...tagsArr].map(
      (item) => ({ ...item, [COUNTER_KEY]: itemsArr.filter(data => item[ID_KEY] === data[TAG_KEY]).length })
    );

    tagsList.value = sortArrValues(array.filter(item => item[COUNTER_KEY] > 0), COUNTER_KEY, 'DESC') as TTagData[];
  };

  const setCurrentItems = (value: number | null = null) => {
    currentItems.value = value === null ? [...itemsList.value] : [...itemsList.value].filter(item => item[TAG_KEY] === value);
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const [
        {data: itemsData},
        {data: tagsData}
      ] = await Promise.all([ITEMS_KEY, TAGS_KEY].map((key) => axios.get(`${API_URL}${key}`)));
      const isSucceed: boolean = [itemsData, tagsData].reduce((acc: boolean, { success }: { success: boolean; }) => acc && success, true);

      if(isSucceed) {
        setItemsList(itemsData.data, tagsData.data);
        setTagsList(tagsData.data, itemsData.data);
      }
    } catch (error) {
      setAlertMessage(POSTS_ERROR_MESS);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    alertMessage,
    itemsList,
    tagsList,
    currentItems,
    setCurrentItems,
    setLoading,
    fetchData,
  };
});

export { useBlogStore };
