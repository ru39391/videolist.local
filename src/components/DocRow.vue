<template>
  <li class="list-group-item d-flex flex-column">
    <div class="d-flex justify-content-between align-items-center mb-1">
      <div>
        <small class="text-body-secondary">{{ savedon }}</small>
        <div
          :class="[
            'fw-bold',
            { 'text-secondary': !isBookmarkExist(item) }
          ]"
        >
          {{ index.toString() }}. {{ name }}
        </div>
        <h6 v-if="id">
          <span class="badge bg-light border border-secondary text-dark">{{ id }}</span> - {{ id.length }}
        </h6>
        <a class="text-muted" :href="url" target="_blank">{{ url.slice(0,100) }}</a>
      </div>
      <span
        :class="[
          'badge badge-pill text-light',
          { 'bg-primary': !id },
          { 'bg-danger': id },
        ]"
      >
        {{ category }}
      </span>
    </div>
    <div class="d-flex align-items-center">
      <button
        class="badge border-0 bg-transparent text-danger px-0 me-3"
        type="button"
        @click="removeBookmark(item)"
      >
        Удалить
      </button>
      <button
        class="badge border-0 bg-transparent text-primary px-0"
        type="button"
        @click="createBookmark(item)"
      >
        Сохранить
      </button>
      <!--
        v-if="isBookmarkExist(item)"
      -->
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { TItemData } from '../utils/types';
import { useBookmarksStore } from '../store/modules/bookmarks';

export default defineComponent({
  name: 'DocRow',

  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: false,
    },
    removeBookmark: {
      type: Function,
      required: true,
    },
    createBookmark: {
      type: Function,
      required: true,
    },
  },

  setup() {
    const bookmarksStore = useBookmarksStore();

    const isBookmarkExist = (item: TItemData) => bookmarksStore.isBookmarkExist(item);

    return {
      isBookmarkExist
    }
  }
});
</script>
