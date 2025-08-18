<template>
  <v-card class="mb-4">
    <v-card-title>Make a Donation</v-card-title>
    <v-card-text>
      <div
        style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap"
      >
        <v-text-field
          type="number"
          v-model="donationAmount"
          label="Enter donation amount"
          style="flex: 1; min-width: 200px"
          @keydown.enter="submitDonation"
        ></v-text-field>

        <v-select
          v-model="selectedLevel"
          :items="levelItems"
          item-title="name"
          item-value="value"
          density="compact"
          label="Quick Select Level"
          style="flex: 1; min-width: 250px"
        ></v-select>

        <v-btn
          @click="submitDonation"
          color="primary"
          size="large"
          :disabled="donationAmount <= 0"
        >name
          Donate
        </v-btn>
      </div>

      <div v-if="donationAmount < 0" class="error-message">
        Donation amount cannot be negative
      </div>

      <div v-if="donationAmount > 0" class="level-info">
        You will achieve:
        {{ getLevelName(getDonationLevel(donationAmount)) }} Level
        {{ getDonationLevel(donationAmount) }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DonationInput",
  emits: ["submit"],
  data() {
    return {
      donationAmount: 0,
      selectedLevel: null,
      levelItems: [
        { name: "🥉 Bronze (Up to 10 USD)", value: 1 },
        { name: "🥈 Silver (Up to 20 USD)", value: 2 },
        { name: "🥇 Gold (Above 20 USD)", value: 3 },
      ],
    };
  },
  watch: {
    selectedLevel(newLevel) {
      if (newLevel === 1) {
        this.donationAmount = 10;
      } else if (newLevel === 2) {
        this.donationAmount = 20;
      } else if (newLevel === 3) {
        this.donationAmount = 50; 
      }
    },
  },
  methods: {
    submitDonation() {
      if (this.donationAmount > 0) {
        this.$emit("submit", {
          amount: this.donationAmount,
          level: this.selectedLevel,
        });
        this.donationAmount = 0;
        this.selectedLevel = null;
      }
    },
    getDonationLevel(amount) {
      if (amount <= 10) return 1;
      if (amount <= 20) return 2;
      return 3;
    },
    getLevelName(level) {
      const names = {
        1: "🥉 Bronze",
        2: "🥈 Silver",
        3: "🥇 Gold",
      };
      return names[level] || "🥉 Bronze";
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 8px;
  font-size: 14px;
}

.level-info {
  color: #2196f3;
  margin-top: 8px;
  font-weight: bold;
  font-size: 14px;
}

@media (max-width: 600px) {
  .donation-input {
    flex-direction: column;
  }

  .donation-input > * {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
