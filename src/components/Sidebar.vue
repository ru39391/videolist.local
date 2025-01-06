<template>
  <nav class="col-2 text-white bg-dark p-0">
    <div class="position-sticky fixed-top p-3">
      <h1 v-if="isMainPage" class="fs-4 text-white text-decoration-none mb-0">MyIT</h1>
      <router-link
        v-else
        to="/"
        class="fs-4 text-white text-decoration-none mb-0"
      >
        MyIT
      </router-link>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto" v-if="tagsList.length > 0">
        <li
         v-for="tag in tagsList"
         :key="tag.id"
         class="nav-item d-flex flex-column"
        >
          <button class="nav-link d-flex align-items-center justify-content-between text-white">
            {{ tag.name }}
            <span class="badge badge-pill bg-light text-dark ml-auto">{{ tag.counter }}</span>
          </button>
        </li>
      </ul>
      <hr />
      <div class="d-flex align-items-center justify-content-end px-2">
        <span class="badge badge-pill bg-light text-dark ml-auto">{{ taggedItemsSumm }}</span>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { COUNTER_KEY } from '../utils/constants';
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

    return {
      isMainPage,
      tagsList,
      taggedItemsSumm
    };
  },
});
</script>
