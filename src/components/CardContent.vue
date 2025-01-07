<template>
  <div class="card-body">
    <p class="card-text">
      <small class="text-body-secondary">{{ tag }}</small><br />
      {{ name || alias }}
    </p>
    <p class="card-text"><small class="text-body-secondary">{{ savedon }}</small></p>
    <p class="card-text" v-if="url"><a :href="url" target="_blank">{{ urlCaption }}</a></p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'CardContent',

  props: {
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: false,
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

  setup(props) {
    const urlCaption = computed(() => props.url !== undefined ? props.url.slice(0, 100) : '');

    return {
      urlCaption
    };
  }
});
</script>
