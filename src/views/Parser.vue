<template>
  Parser
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { fetchSourceData } from '../utils';

export default defineComponent({
  name: 'Parser',

  setup() {
    onBeforeMount(() => {
      fetchSourceData();
    });

    return {
    };
  }
});
</script>
