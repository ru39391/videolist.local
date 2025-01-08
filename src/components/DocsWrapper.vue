<template>
  <Layout>
    <template #navbar>
      <Navbar
        v-if="tagsList.length > 0"
        :counter="taggedItemsSumm"
        :tagsList="tagsList"
        :selectTag="selectTag"
        :currentTag="currentTag"
      />
    </template>
    <template #content>
      <button
        v-if="tagsList.length === 0"
        class="btn btn-outline-primary btn-sm"
        type="button"
        :disabled="isLoading"
        @click="fetchBookmarks"
      >
        Обновить список
      </button>
      <ul class="list-group list-group-flush mb-3" v-else>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Видео
          <span class="badge bg-danger rounded-pill">{{ bookmarksData.videoList.length }}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Ссылки
          <span class="badge bg-primary rounded-pill">{{ bookmarksData.itemsList.length }}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <template v-if="bookmarksData.videoList.length + bookmarksData.itemsList.length">
            Всего
            <span class="badge bg-secondary rounded-pill">{{ bookmarksData.videoList.length + bookmarksData.itemsList.length }}</span>
          </template>
          <template v-else>Список пуст</template>
        </li>
      </ul>

      <ul
        v-if="currentBookmarks.length > 0"
        class="list-group list-group-light"
      >
        <DocRow
          v-for="(item, index) in currentBookmarks"
          :key="index"
          :item="item"
          :index="index + 1"
          :id="item.item_id"
          :name="item.name"
          :category="item.category"
          :url="item.url"
          :savedon="item.savedon"
          :createBookmark="createBookmark"
          :removeBookmark="removeBookmark"
        />
      </ul>
    </template>
  </Layout>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { useBookmarksStore } from '../store/modules/bookmarks';
import { CATEGORY_KEY, COUNTER_KEY } from '../utils/constants';
import type { TTagData, TItemData } from '../utils/types';
import DocRow from './DocRow.vue';
import Layout from './Layout.vue';
import Navbar from './Navbar.vue';

export default defineComponent({
  name: 'DocsWrapper',

  components: {
    DocRow,
    Layout,
    Navbar
  },

  setup() {
    const bookmarksStore = useBookmarksStore();
    const isLoading = computed(() => bookmarksStore.isLoading);
    const tagsList = computed(() => bookmarksStore.bookmarkTagsList);
    const taggedItemsSumm = computed(() => bookmarksStore.bookmarkTagsList.reduce((acc, item) => acc + Number(item[COUNTER_KEY]), 0));
    const currentBookmarks = computed(() => bookmarksStore.currentBookmarks);
    const currentTag = computed(() => bookmarksStore.currentBookmarks.length > 0 ? bookmarksStore.currentBookmarks[0][CATEGORY_KEY] : '');
    const bookmarksData = computed(() => bookmarksStore.bookmarksData);

    const fetchBookmarks = () => bookmarksStore.fetchBookmarks();
    const createBookmark = (item: TItemData) => bookmarksStore.createBookmark(item);
    const removeBookmark = (item: TItemData) => bookmarksStore.removeBookmark(item);

    const selectTag = (data: TTagData | null = null) => {
      if(!data) {
        return;
      }

      bookmarksStore.setCurrentItems(data);
    };

    watch(
      () => bookmarksStore.currentBookmarks,
      (arr) => {
        bookmarksStore.setBookmarksData(arr);
      },
      { deep: false }
    );

    return {
      isLoading,
      tagsList,
      taggedItemsSumm,
      currentBookmarks,
      currentTag,
      bookmarksData,
      fetchBookmarks,
      createBookmark,
      removeBookmark,
      selectTag
    };
  }
});
</script>
