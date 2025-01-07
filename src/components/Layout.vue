<template>
  <div class="d-flex align-items-stretch">
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
        <slot name="navbar"></slot>
      </div>
    </nav>

    <div class="col-10 p-5">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { SITE_NAME } from '../utils/constants';

export default defineComponent({
  name: 'Layout',

  setup() {
    const route = useRoute();
    const isMainPage = computed(() => route.path === '/');
    const siteName = computed(() => SITE_NAME);

    return {
      siteName,
      isMainPage,
    };
  }
});
</script>
