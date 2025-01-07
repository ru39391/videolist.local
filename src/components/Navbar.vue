<template>
  <ul class="nav nav-pills flex-column mb-auto">
    <li
      v-for="(tag, index) in tagsList"
      :key="index"
      class="nav-item d-flex flex-column"
    >
      <button
        class="nav-link d-flex align-items-center justify-content-between text-white"
        @click="selectTag(tag)"
      >
        {{ tag.name }}
        <span class="badge badge-pill bg-light text-dark ml-auto">{{ tag.counter }}</span>
      </button>
    </li>
    <li><hr /></li>
    <li class="nav-item d-flex flex-column">
      <button
        class="nav-link d-flex align-items-center justify-content-between text-white"
        @click="selectTag()"
      >
        Все
        <span class="badge badge-pill bg-light text-dark ml-auto">{{ counter }}</span>
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useBlogStore } from '../store/modules/blog';

export default defineComponent({
  name: 'Navbar',

  props: {
    tagsList: {
      type: Array,
      required: true,
    },
    counter: {
      type: Number,
      required: true,
    },
    selectTag: {
      type: Function,
      required: true,
    },
  },

  setup() {
    const blogStore = useBlogStore();
    //const tagsList = computed(() => blogStore.tagsList);
    //const taggedItemsSumm = computed(() => blogStore.tagsList.reduce((acc, item) => acc + Number(item[COUNTER_KEY]), 0));

/*
    const selectTag = (value: number | null = null) => {
      blogStore.setCurrentItems(value);
    };*/

    return {
      //tagsList,
      //taggedItemsSumm,
      //selectTag
    };
  },
});
</script>
