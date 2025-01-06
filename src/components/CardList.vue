<template>
  <div
    v-if="currentItems.length > 0"
    class="row"
  >
    <Card
      v-for="item in currentItems"
      :key="item.id"
      :id="item.item_id"
      :name="item.name"
      :alias="item.alias"
      :url="item.url"
      :tag="item.category"
      :savedon="item.savedon"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useBlogStore } from '../store/modules/blog';
import Card from './Card.vue';

export default defineComponent({
  name: 'CardList',

  components: {
    Card,
  },

  setup() {
    const blogStore = useBlogStore();
    const currentItems = computed(() => blogStore.currentItems);

    return {
      currentItems
    };
  }
});
</script>
