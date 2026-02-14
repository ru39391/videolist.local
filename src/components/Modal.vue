<template>
  <div
    class="modal fade show d-block"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Сохранение невозможно</h5>
          <button
            class="btn-close"
            type="button"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">Запись уже существует</div>
        <div class="modal-footer justify-content-start">
          <button
            class="btn btn-outline-primary btn-sm"
            type="button"
            @click="closeModal"
          >
            ОК
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal-backdrop fade show"
    @click="closeModal"
  ></div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useModalStore } from '../store/modules/modal';

export default defineComponent({
  name: 'Modal',

  setup() {
    const modalStore = useModalStore();

    const closeModal = () => {
      modalStore.toggleModalVisibility(false);
    }

    return {
      closeModal
    }
  }
});
</script>
