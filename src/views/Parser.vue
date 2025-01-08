<template>
  <DocsWrapper />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DocsWrapper from '../components/DocsWrapper.vue';

export default defineComponent({
  name: 'Parser',

  components: {
    DocsWrapper
  }
});
</script>
