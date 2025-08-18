<template>
  <v-card class="donation-card">
    <v-card-text>
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        "
      >
        <span style="font-size: 48px">{{ levelImage }}</span>
        <div>
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 4px">
            {{ formattedAmount }}
          </div>
          <div style="font-size: 14px; color: #666; margin-bottom: 8px">
            Level {{ level }} - {{ levelName }}
          </div>
        </div>
        <!-- 
        $emit: method to remove donation
        $emit(eventName, payload)
         -->
        <v-btn
          @click="$emit('remove', donation?.id)"
          size="small"
          color="error"
          variant="outlined"
          :disabled="!donation?.id"
        >
          <v-icon size="small">mdi-delete</v-icon>
          Remove
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
<!-- Options API -->
<script>
import { formatCurrency } from "../utils/formatCurrency";

export default {
  props: {
    donation: {
      type: Object,
      required: true,
      default: () => ({ amount: 0, id: null }),
    },
  },
  emits: ["remove"],
  computed: {
    level() {
      const amt = this.donation?.amount || 0;
      if (amt <= 10) return 1;
      if (amt <= 20) return 2;
      return 3;
    },
    levelImage() {
      return (
        {
          1: "🥉",
          2: "🥈",
          3: "🥇",
        }[this.level] || "🥉"
      );
    },
    levelName() {
      return (
        {
          1: "Bronze",
          2: "Silver",
          3: "Gold",
        }[this.level] || "Bronze"
      );
    },
    formattedAmount() {
      return formatCurrency(this.donation?.amount || 0);
    },
  },
};
</script>
<!-- Composition API -->
<!-- <script setup>
import { computed } from 'vue';
import { formatCurrency } from '../utils/formatCurrency';

const props = defineProps({
  donation: {
    type: Object,
    required: true,
    default: () => ({ amount: 0, id: null }),
  },
});

const emit = defineEmits(['remove']);

const level = computed(() => {
  const amt = props.donation?.amount || 0;
  if (amt <= 10) return 1;
  if (amt <= 20) return 2;
  return 3;
});

const levelImage = computed(() => {
  return {
    1: '🥉',
    2: '🥈',
    3: '🥇',
  }[level.value] || '🥉';
});

const levelName = computed(() => {
  return {
    1: 'Bronze',
    2: 'Silver',
    3: 'Gold',
  }[level.value] || 'Bronze';
});

const formattedAmount = computed(() => {
  return formatCurrency(props.donation?.amount || 0);
});
</script> -->
