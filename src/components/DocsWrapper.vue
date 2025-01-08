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
      <ul
        v-if="currentBookmarks.length > 0"
        class="list-group list-group-light"
      >
        <DocRow
          v-for="(item, index) in currentBookmarks"
          :key="index"
          :index="index + 1"
          :id="item.item_id"
          :name="item.name"
          :category="item.category"
          :url="item.url"
          :savedon="item.savedon"
        />
      </ul>
    </template>
  </Layout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useBookmarksStore } from '../store/modules/bookmarks';
import { CATEGORY_KEY, COUNTER_KEY } from '../utils/constants';
import type { TTagData } from '../utils/types';
import DocRow from '../components/DocRow.vue';
import Layout from '../components/Layout.vue';
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
    const tagsList = computed(() => bookmarksStore.bookmarkTagsList);
    const taggedItemsSumm = computed(() => bookmarksStore.bookmarkTagsList.reduce((acc, item) => acc + Number(item[COUNTER_KEY]), 0));
    const currentBookmarks = computed(() => bookmarksStore.currentBookmarks);
    const currentTag = computed(() => bookmarksStore.currentBookmarks.length > 0 ? bookmarksStore.currentBookmarks[0][CATEGORY_KEY] : '');

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
      currentTag,
      selectTag
    };
  }
});
</script>
