<template>
  <CardList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardList from '../components/CardList.vue';

export default defineComponent({
  name: 'Blog',

  components: {
    CardList
  },
});
</script>
