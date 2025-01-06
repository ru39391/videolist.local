<template>
  <nav class="col-2 text-white bg-dark p-0">
    <div class="position-sticky fixed-top p-3">
      <h1 v-if="isMainPage" class="fs-4 text-white text-decoration-none mb-0">{{ siteName }}</h1>
      <router-link
        v-else
        to="/"
        class="fs-4 text-white text-decoration-none mb-0"
      >
        {{ siteName }}
      </router-link>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto" v-if="tagsList.length > 0">
        <li
         v-for="tag in tagsList"
         :key="tag.id"
         class="nav-item d-flex flex-column"
        >
          <button
            class="nav-link d-flex align-items-center justify-content-between text-white"
            @click="selectTag(tag.id)"
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
            <span class="badge badge-pill bg-light text-dark ml-auto">{{ taggedItemsSumm }}</span>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { SITE_NAME, COUNTER_KEY } from '../utils/constants';
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useBlogStore } from '../store/modules/blog';

export default defineComponent({
  name: 'Sidebar',

  setup() {
    const route = useRoute();
    const blogStore = useBlogStore();
    const isMainPage = computed(() => route.path === '/');
    const tagsList = computed(() => blogStore.tagsList);
    const taggedItemsSumm = computed(() => blogStore.tagsList.reduce((acc, item) => acc + Number(item[COUNTER_KEY]), 0));
    const siteName = computed(() => SITE_NAME);

    const selectTag = (value: number) => {
      blogStore.setCurrentItems(value);
    };

    return {
      siteName,
      isMainPage,
      tagsList,
      taggedItemsSumm,
      selectTag
    };
  },
});
</script>
