<template>
  <v-radio-group
    :value="selectedFilter"
    @input="$emit('update:selectedFilter', $event)"
    inline
  >
    <v-radio label="Recent" value="recent" />
    <v-radio label="Top" value="top" />
  </v-radio-group>
</template>

<script>
export default {
  name: "DonationFilter",
  props: {
    selectedFilter: {
      type: String,
      required: true,
    },
  },
  emits: ["update:selectedFilter"],
};
</script>
