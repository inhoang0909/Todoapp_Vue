<template>
  <v-list-item class="bg-white rounded elevation-1 my-2">
    <v-list-item-action>
      <v-checkbox
        v-model="task.done"
        @change="$emit('update', task)"
        hide-details
      />
    </v-list-item-action>

    <v-list-item-content>
      <v-list-item-title :class="{ 'text-decoration-line-through text-grey': task.done }">
        {{ task.text }}
      </v-list-item-title>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn
        icon
        color="red"
        @click="$emit('delete', task._id)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: ["task"]
}
</script>
