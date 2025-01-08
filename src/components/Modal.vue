<template>
  <div
    :class="[
      'modal fade show',
      { 'd-block': isModalVisible }
    ]"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Сохранение невозможно</h5>
          <button class="btn-close" type="button"></button>
        </div>
        <div class="modal-body">Запись уже существует</div>
        <div class="modal-footer justify-content-start">
          <button class="btn btn-outline-primary btn-sm" type="button">ОК</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show" v-if="isModalVisible"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useBookmarksStore } from '../store/modules/bookmarks';

export default defineComponent({
  name: 'Modal',

  setup() {
    const bookmarksStore = useBookmarksStore();
    const isModalVisible = computed(() => bookmarksStore.isModalVisible);

    return {
      isModalVisible
    }
  }
});
</script>
