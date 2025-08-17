<template>
  <div class="d-flex ga-2 mb-4">
    <v-text-field
      v-model="text"
      label="Nhập công việc..."
      @keyup.enter="submit"
      variant="outlined"
      density="comfortable"
      hide-details
      class="flex-1"
    />
    <v-btn
      color="primary"
      @click="submit"
      rounded="lg"
    >
      Thêm
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    }
  },
  methods: {
    submit() {
      if (this.text.trim()) {
        this.$emit("add", this.text);
        this.text = "";
      }
    }
  }
}
</script>
