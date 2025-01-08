<template>
  <Layout>
    <template #navbar>
      <Navbar
        v-if="tagsList.length > 0"
        :counter="taggedItemsSumm"
        :tagsList="tagsList"
        :selectTag="selectTag"
        :currentTag="currentTag"
      />
    </template>
    <template #content>
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
  </Layout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useBlogStore } from '../store/modules/blog';
import { COUNTER_KEY } from '../utils/constants';
import type { TTagData } from '../utils/types';
import Card from './Card.vue';
import Layout from './Layout.vue';
import Navbar from './Navbar.vue';

export default defineComponent({
  name: 'CardsWrapper',

  components: {
    Card,
    Layout,
    Navbar
  },

  setup() {
    const blogStore = useBlogStore();
    const currentItems = computed(() => blogStore.currentItems);
    const tagsList = computed(() => blogStore.tagsList);
    const taggedItemsSumm = computed(() => blogStore.tagsList.reduce((acc, item) => acc + Number(item[COUNTER_KEY]), 0));

    const selectTag = (data: TTagData | null = null) => {
      blogStore.setCurrentItems(data);
    };

    return {
      currentItems,
      tagsList,
      taggedItemsSumm,
      selectTag
    };
  }
});
</script>
