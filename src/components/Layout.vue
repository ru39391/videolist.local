<template>
  <div class="d-flex align-items-stretch">
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
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="#" class="nav-link text-white">Home</a>
          </li>
        </ul>
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

export default defineComponent({
  name: 'Layout',

  setup() {
    const route = useRoute();
    const isMainPage = computed(() => route.path === '/');

    return {
      isMainPage
    };
  }
});
</script>
