<template>
  <v-text-field
    v-model="query"
    label="Tìm kiếm..."
    variant="outlined"
    clearable
    density="comfortable"
    @input="$emit('search', query)"
    class="mb-4"
  />
</template>

<script>
export default {
  data() {
    return {
      query: ""
    }
  }
}
</script>
