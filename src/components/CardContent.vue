<template>
  <div class="card-body">
    <p class="card-text">
      <small class="text-body-secondary">{{ tag }}</small><br />
      {{ name }}
    </p>
    <p class="card-text"><small class="text-body-secondary">{{ savedon }}</small></p>
    <p class="card-text"><a :href="url" target="_blank">{{ url }}</a></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardContent',

  props: {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
    savedon: {
      type: String,
      required: false,
    },
    tag: {
      type: String,
      required: false,
    },
  },
});
</script>
