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
          <div class="card-body">
            <p class="card-text">
              <small class="text-body-secondary">{{ savedon }}</small><br />
              {{ name }}
            </p>
            <h6 class="card-subtitle">[[+item_id]]</h6>
            <p class="card-text"><small class="text-body-secondary">{{ alias }}</small></p>
          </div>
        </div>
      </div>
      <div class="card-body" v-else>
        <p class="card-text">
          <small class="text-body-secondary">{{ savedon }}</small><br />
          {{ name }}
        </p>
        <p class="card-text"><small class="text-body-secondary">{{ alias }}</small></p>
        <p class="card-text"><a :href="url" target="_blank">{{ url }}</a></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useBlogStore } from '../store/modules/blog';

export default defineComponent({
  name: 'Card',

  components: {
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

  setup() {
    const blogStore = useBlogStore();

    return {
      ratePost: blogStore.ratePost
    };
  },
});
</script>
