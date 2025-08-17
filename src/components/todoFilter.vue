<template>
  <div class="mb-4">
    <v-btn-toggle
      v-model="internalActive"
      mandatory
      class="d-flex ga-2"
      color="primary"
    >
      <v-btn
        v-for="f in filters"
        :key="f"
        @click="$emit('filter', f)"
        :value="f"
      >
        {{ f }}
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  props: {
    filters: {
      type: Array,
      required: true
    },
    active: {
      type: String,
      required: true
    }
  },
  emits: ['filter'],
  data() {
    return {
      internalActive: this.active
    }
  },
  watch: {
    active(newVal) {
      this.internalActive = newVal
    },
    internalActive(newVal) {
      this.$emit('filter', newVal)
    }
  }
}
</script>
