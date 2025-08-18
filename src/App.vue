<template>
  <v-container>
    <h1>Donations</h1>
    <v-card class="mb-4" outlined>
      <v-card-title style="text-align: center">Donation Levels</v-card-title>
      <v-card-text style="justify-content: center; display: flex">
        <div style="display: flex; gap: 20px; flex-wrap: wrap">
          <div style="text-align: center">
            <div style="font-size: 24px">🥉</div>
            <div><strong>Bronze</strong></div>
            <div style="font-size: 12px">Up to 10 USD</div>
          </div>
          <div style="text-align: center">
            <div style="font-size: 24px">🥈</div>
            <div><strong>Silver</strong></div>
            <div style="font-size: 12px">Up to 20 USD</div>
          </div>
          <div style="text-align: center">
            <div style="font-size: 24px">🥇</div>
            <div><strong>Gold</strong></div>
            <div style="font-size: 12px">Above 20 USD</div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <DonationInput @submit="submitDonation" />

    <DonationFilter
      :selected-filter="selectedFilter"
      @update:selected-filter="selectedFilter = $event"
    />

    <div v-if="filteredDonations.length > 0">
      <h3>Your Donations</h3>
      <v-row>
        <v-col
          v-for="donation in filteredDonations"
          :key="donation.id"
          cols="12"
          sm="6"
          md="4"
        >
          <DonationCard :donation="donation" @remove="removeDonation" />
        </v-col>
      </v-row>
    </div>
    <div v-else style="text-align: center; margin-top: 20px; color: #666">
      No donations yet. Make your first donation!
    </div>
  </v-container>
</template>

<!-- Composition API -->
<!-- <script setup>
import { ref, computed, onMounted } from "vue";
import DonationInput from "./components/donationInput.vue";
import DonationCard from "./components/donationCard.vue";
import DonationFilter from "./components/donationFilter.vue";
import {
  getDonations,
  createDonation,
  deleteDonation,
} from "./api/donateService";

const donations = ref([]);
const selectedFilter = ref("recent");

const getDonationLevel = (amount) => {
  if (amount <= 10) return 1;
  if (amount <= 20) return 2;
  return 3;
};

const fetchDonations = async () => {
  try {
    const data = await getDonations();
    donations.value = data;
    console.log("Fetched donations:", donations.value);
  } catch (err) {
    console.error("Failed to fetch donations", err);
  }
};

const submitDonation = async (donationData) => {
  try {
    // donationData có thể là number (amount) hoặc object { amount, level }
    const amount = typeof donationData === 'number' ? donationData : donationData.amount;
    const level = typeof donatiCHF
CHF
CHFonData === 'object' ? donationData.level : null;
    
    const newDonation = await createDonation({ 
      amount, 
      level: level || getDonationLevel(amount) 
    });
    console.log("Created donation:", newDonation);
    await fetchDonations();
  } catch (err) {
    console.error("Failed to add donation", err);
  }
};

const removeDonation = async (id) => {
  try {
    await deleteDonation(id);
    donations.value = donations.value.filter((d) => d.id !== id);
  } catch (err) {
    console.error("Failed to delete donation", err);
  }
};

onMounted(fetchDonations);
// const submitDonation = (amount) => {
//   if (amount && amount > 0) {
//     donations.value.push({
//       id: Date.now(),
//       amount: Number(amount),
//       createdAt: Date.now(),
//     });
//   }
// };

// const removeDonation = (id) => {
//   if (id && donations.value) {
//     donations.value = donations.value.filter((donation) => donation?.id !== id);
//   }
// };

const filteredDonations = computed(() => {
  if (!donations.value || !Array.isArray(donations.value)) {
    return [];
  }

  if (selectedFilter.value === "top") {
    return [...donations.value].sort(
      (a, b) => (b.amount || 0) - (a.amount || 0)
    );
  } else {
    return [...donations.value].sort(
      (a, b) => (b.id || b.createdAt || 0) - (a.id || a.createdAt || 0)
    );
  }
});
</script> -->

<!-- Opntions API -->
<script>
import DonationInput from "./components/donationInput.vue";
import DonationCard from "./components/donationCard.vue";
import DonationFilter from "./components/donationFilter.vue";
import { loadDonations, saveDonations } from "./utils/localStorage";
import {
  getDonations,
  createDonation,
  deleteDonation,
} from "./api/donateService";

export default {
  name: "App",
  components: {
    DonationInput,
    DonationCard,
    DonationFilter,
  },
  data() {
    return {
      donations: [],
      selectedFilter: "recent",
    };
  },
  //load donations from storage when the component is mounted
  // mounted() {
  //   this.donations = loadDonations();
  // },

  // fetch donation when component is mounted
  async mounted() {
    await this.fetchDonations();
  },
  //save donations to storage whenever they change
  // watch: {
  //   donations: {
  //     handler(newDonations) {
  //       saveDonations(newDonations);
  //     },
  //     deep: true,
  //   },
  // },

  // methods: {
  //   submitDonation(amount) {
  //     if (amount && amount > 0) {
  //       this.donations.push({
  //         id: Date.now(),
  //         amount: Number(amount),
  //         createdAt: Date.now(),
  //       });
  //     }
  //   },
  //   removeDonation(id) {
  //     if (id && this.donations) {
  //       this.donations = this.donations.filter(
  //         (donation) => donation?.id !== id
  //       );
  //     }
  //   },
  // },

  //CALL API
  methods: {
    async fetchDonations() {
      try {
        const data = await getDonations();
        this.donations = data;
        console.log("Fetched donations:", this.donations);
      } catch (err) {
        console.error("Failed to fetch donations", err);
      }
    },
    async submitDonation(payload) {
      try {
        const {amount, level} = payload;
        const newDonation = await createDonation({ amount, level });
        await this.fetchDonations(newDonation);
      } catch (err) {
        console.error("Failed to add donation", err);
      }
    },
    async removeDonation(id) {
      try {
        await deleteDonation(id);
        this.donations = this.donations.filter((d) => d.id !== id);
      } catch (err) {
        console.error("Failed to delete donation", err);
      }
    },
  },
  computed: {
    filteredDonations() {
      if (!this.donations || !Array.isArray(this.donations)) {
        return [];
      }

      if (this.selectedFilter === "top") {
        return [...this.donations].sort(
          (a, b) => (b.amount || 0) - (a.amount || 0)
        );
      } else {
        return [...this.donations].sort(
          (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
        );
      }
    },
  },
};
</script>

<style scoped>
.donation-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  min-height: 200px;
}
.donation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.donation-card .v-card-text {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
