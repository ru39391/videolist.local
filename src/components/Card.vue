<template>
  <div class="col-md-4 mb-3">
    <div class="card h-100">
      <div class="row g-0 h-100" v-if="false">
        <!-- id.length === 11 -->
        <div class="col-md-4">
          <a :href="url" target="_blank">
            <img
              :src="`https://i1.ytimg.com/vi/${id}/hqdefault.jpg`"
              :alt="name"
              class="w-100 h-100 object-fit-cover rounded-start"
            />
            <!-- :src="`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`" -->
            </a>
        </div>
        <div class="col-md-8">
          <CardContent :name="name" :savedon="savedon" :tag="tag" :url="url" />
        </div>
      </div>
      <CardContent :name="name" :savedon="savedon" :tag="tag" :url="url" v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardContent from './CardContent.vue';

export default defineComponent({
  name: 'Card',

  components: {
    CardContent
  },

  props: {
    id: {
      type: String,
      required: true,
    },
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
