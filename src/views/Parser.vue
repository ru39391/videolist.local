<template>
  Parser
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { useBookmarksStore } from '../store/modules/bookmarks';

export default defineComponent({
  name: 'Parser',

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
