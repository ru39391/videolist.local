<template>
  <ul class="nav nav-pills d-flex flex-column flex-nowrap position-absolute fixed-top overflow-auto h-100 p-3">
    <li
      v-for="(tag, index) in tagsList"
      :key="index"
      class="nav-item d-flex flex-column"
    >
      <button
        :class="[
          'nav-link d-flex align-items-center justify-content-between text-white',
          { 'active': currentTag === tag.name }
        ]"
        @click="selectTag(tag)"
      >
        {{ tag.name }}
        <span class="badge badge-pill bg-light text-dark ml-auto">{{ tag.counter }}</span>
      </button>
    </li>
    <li><hr /></li>
    <li class="nav-item d-flex flex-column">
      <button
        class="nav-link d-flex align-items-center justify-content-between text-white"
        @click="selectTag()"
      >
        Все
        <span class="badge badge-pill bg-light text-dark ml-auto">{{ counter }}</span>
      </button>
    </li>
    <li class="nav-item">
      <router-link
        v-if="isMainPage"
        to="/parser"
        class="nav-link d-flex align-items-center justify-content-between text-white"
      >
        Парсер
      </router-link>
      <router-link
        v-else
        to="/"
        class="nav-link d-flex align-items-center justify-content-between text-white"
      >
        На главную
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Navbar',

  props: {
    tagsList: {
      type: Array,
      required: true,
    },
    counter: {
      type: Number,
      required: true,
    },
    selectTag: {
      type: Function,
      required: true,
    },
    currentTag: {
      type: String,
      required: true,
    }
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
