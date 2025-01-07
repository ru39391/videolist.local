<template>
  <DocsWrapper />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { useBookmarksStore } from '../store/modules/bookmarks';
import DocsWrapper from '../components/DocsWrapper.vue';

export default defineComponent({
  name: 'Parser',

  components: {
    DocsWrapper
  },

  setup() {
    const bookmarksStore = useBookmarksStore();

    onBeforeMount(() => {
      bookmarksStore.fetchBookmarks();
    });

    return {
    };
  }
});
</script>
