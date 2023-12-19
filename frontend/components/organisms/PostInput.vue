<template>
  <div class="container">
    <v-textarea
      :model-value="message"
      placeholder="message"
      variant="solo"
      rows="1"
      auto-grow
      :loading="loading"
      @update:model-value="$emit('update:message', $event)"
    ></v-textarea>
    <v-btn
      :disabled="message.length === 0"
      icon="mdi-send"
      size="small"
      color="black"
      :loading="loading"
      @click="onClick"
    />
  </div>
</template>

<script setup lang="ts">
const { POST } = useClient();
const loading = ref<boolean>(false);
const { $postErrorHandler } = useNuxtApp();
const props = defineProps<{
  message: string;
}>();
const emit = defineEmits<{
  'update:message': [event: string];
  then: [];
}>();

const onClick = () => {
  loading.value = true;
  POST('/post', {
    body: {
      content: props.message,
    },
  }).then((res) => {
    loading.value = false;

    if (res.error) {
      $postErrorHandler(res.error);
    } else {
      emit('then');
    }
  });
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  display: flex;
  align-items: flex-end;
}

.v-btn {
  margin-left: 5px;
  margin-bottom: 22px;
}
</style>
