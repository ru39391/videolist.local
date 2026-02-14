import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  POSTS_ERROR_MESS
} from '../../utils/constants';
import axios from 'axios';

import type {
  TItemData,
  TTagData
} from '../../utils/types';

import { handleDate, sortArrValues } from '../../utils';

const useModalStore = defineStore('modal', () => {
  const isVisible = ref<boolean>(false);

  const toggleModalVisibility = (value: boolean) => {
    isVisible.value = value;
  };

  return {
    isVisible,
    toggleModalVisibility
  };
});

export { useModalStore };
