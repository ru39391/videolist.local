<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div>
      <small class="text-body-secondary">{{ savedon }}</small>
      <div class="fw-bold" @click="console.log(item)">{{ index.toString() }}. {{ name }}</div>
      <h6 v-if="id">
        <span class="badge bg-light border border-secondary text-dark">{{ id }}</span> - {{ id.length }}
      </h6>
      <a class="text-muted" :href="url" target="_blank">{{ url.slice(0,100) }}</a>
    </div>
    <span
      :class="[
        'badge badge-pill text-light',
        { 'bg-primary': !id },
        { 'bg-danger': id },
      ]"
    >
      {{ category }}
    </span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DocRow',

  props: {
    index: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: false,
    }
  },

  setup() {
  }
});
</script>
