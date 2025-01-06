<template>
  <div class="d-flex align-items-stretch">
    <Sidebar />
    <div class="col-10 p-5">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './Sidebar.vue';

export default defineComponent({
  name: 'Layout',

  components: {
    Sidebar
  },

  setup() {
    const route = useRoute();
    const isMainPage = computed(() => route.path === '/');

    return {
      isMainPage
    };
  }
});
</script>
