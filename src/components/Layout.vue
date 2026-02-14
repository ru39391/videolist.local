<template>
  <div class="d-flex justify-content-end">
    <nav class="d-flex flex-column fixed-top fixed-bottom col-2 text-white bg-dark">
      <div class="p-3 pb-0">
        <h1 v-if="isMainPage" class="fs-4 text-white text-decoration-none mb-0">{{ siteName }}</h1>
        <router-link
          v-else
          to="/"
          class="fs-4 text-white text-decoration-none mb-0"
        >
          {{ siteName }}
        </router-link>
        <hr />
      </div>
      <div class="position-relative flex-grow-1">
        <slot name="navbar"></slot>
      </div>
    </nav>

    <div class="col-10 p-5">
      <slot name="content"></slot>
    </div>
  </div>
  <Modal v-if="isModalVisible" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { SITE_NAME } from '../utils/constants';
import { useModalStore } from '../store/modules/modal';
import Modal from './Modal.vue';

export default defineComponent({
  name: 'Layout',

  components: {
    Modal
  },

  setup() {
    const route = useRoute();
    const isMainPage = computed(() => route.path === '/');
    const siteName = computed(() => SITE_NAME);
    const modalStore = useModalStore();
    const isModalVisible = computed(() => modalStore.isVisible);

    return {
      siteName,
      isMainPage,
      isModalVisible
    };
  }
});
</script>
