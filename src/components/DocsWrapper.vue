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
        <li
          v-for="(item, index) in currentBookmarks"
          :key="index"
           class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <div class="fw-bold" @click="console.log(item)">{{ (index + 1).toString() }}. {{ item.name }}</div>
            <a class="text-muted" :href="item.url" target="_blank">{{ item.url.slice(0,100) }}</a>
          </div>
          <span
            :class="[
              'badge badge-pill text-light',
              { 'bg-primary': !item.item_id },
              { 'bg-danger': item.item_id },
            ]"
          >
            {{ item.item_id && item.item_id.length }} {{ item.item_id || item.category }}
          </span>
        </li>
      </ul>
    </template>
  </Layout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useBookmarksStore } from '../store/modules/bookmarks';
import { CATEGORY_KEY, COUNTER_KEY } from '../utils/constants';
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
