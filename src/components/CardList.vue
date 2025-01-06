<template>
  <div
    v-if="itemsList.length > 0"
    class="row"
  >
    <Card
      v-for="item in itemsList"
      :key="item.id"
      :id="item.item_id"
      :alias="item.alias"
      :name="item.name"
      :url="item.url"
      :tag="item.tag"
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
    const itemsList = computed(() => blogStore.itemsList);

    return {
      itemsList
    };
  }
});
</script>
