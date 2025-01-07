<template>
  <Layout>
    <template #navbar>
      <Navbar
        v-if="tagsList.length > 0"
        :counter="taggedItemsSumm"
        :tagsList="tagsList"
        :selectTag="selectTag"
      />
    </template>
    <template #content>
      <ol v-if="currentBookmarks.length > 0">
        <li
          v-for="(item, index) in currentBookmarks"
          :key="index"
        >
          {{ item.name }}
        </li>
      </ol>
    </template>
  </Layout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useBookmarksStore } from '../store/modules/bookmarks';
import { COUNTER_KEY } from '../utils/constants';
import type { TTagData } from '../utils/types';
import Layout from '../components/Layout.vue';
import Navbar from './Navbar.vue';

export default defineComponent({
  name: 'DocsWrapper',

  components: {
    Layout,
    Navbar
  },

  setup() {
    const bookmarksStore = useBookmarksStore();
    const tagsList = computed(() => bookmarksStore.bookmarkTagsList);
    const taggedItemsSumm = computed(() => bookmarksStore.bookmarkTagsList.reduce((acc, item) => acc + Number(item[COUNTER_KEY]), 0));
    const currentBookmarks = computed(() => bookmarksStore.currentBookmarks);

    const selectTag = (data: TTagData | null = null) => {
      if(!data) {
        return;
      }

      bookmarksStore.setCurrentItems(data);
    };

    return {
      tagsList,
      taggedItemsSumm,
      currentBookmarks,
      selectTag
    };
  }
});
</script>
