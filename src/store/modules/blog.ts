import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  API_URL,
  ITEMS_KEY,
  TAGS_KEY,
  IS_LIKED_KEY,
  IS_DIS_LIKED_KEY,
  DATA_IS_LOADING_MESS,
  POSTS_ERROR_MESS,
  COMMENTS_ERROR_MESS
} from '../../utils/constants';
import axios from 'axios';

import type {
  TPostData,
  TPostRespData,
  TCommentData,
  TCommentRespData,
  TLikedData
} from '../../utils/types';

const useBlogStore = defineStore('blog', () => {
  const isLoading = ref<boolean>(true);
  const alertMessage = ref<string>(DATA_IS_LOADING_MESS);
  const itemsList = ref<TPostData[]>([]);
  const currentPost = ref<TPostData | undefined>(undefined);
  const commentList = ref<TCommentData[]>([]);
  const likesList = ref<TLikedData[]>([]);

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const setAlertMessage = (value: string) => {
    alertMessage.value = value;
  };

  const setItemsList = (arr: TPostData[]) => {
    itemsList.value = [...arr];
  };

  const setCurrentPost = (id: number) => {
    if(id !== 0 && !id) {
      currentPost.value = undefined;
      return;
    }

    currentPost.value = itemsList.value.find(item => item.id === id);
  };

  const setCommentList = (arr: TCommentData[]) => {
    commentList.value = [...arr];
  };

  const removeComment = (id: string) => {
    const arr = commentList.value.filter(item => item.id !== Number(id));

    setCommentList(arr);
  };

  const setLikesList = (arr: TLikedData[]) => {
    likesList.value = [...arr];
  };

  const ratePost = ({ id, key }: { id: string; key: 'isLiked' | 'isDisLiked' }) => {
    const arr = likesList.value.map(
      item => ({
        ...item,
        ...(
          item.id === Number(id) && {
            [key]: !item[key] as boolean,
            ...( key === IS_LIKED_KEY && { [IS_DIS_LIKED_KEY]: false } ),
            ...( key === IS_DIS_LIKED_KEY && { [IS_LIKED_KEY]: false } )
          }
        )
      })
    );

    setLikesList(arr);
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const [{data: itemsData}, {data: tagsData}] = await Promise.all([ITEMS_KEY, TAGS_KEY].map((key) => axios.get(`${API_URL}/${key}`)));
      const isSucceed = [itemsData, tagsData].reduce((acc, { success }) => acc && success, true);
      console.log([itemsData, tagsData]);
      if(isSucceed) {
        setItemsList(itemsData.data);
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
    currentPost,
    commentList,
    likesList,
    setLoading,
    fetchData,
    setCurrentPost,
    ratePost,
    removeComment,
  };
});

export { useBlogStore };
