<!-- <template>
  <v-container max-width="600px" class="py-6">
    <h1 class="text-h5 font-weight-bold mb-4">📋 To-do List API</h1>

    <TodoInput @add="createTask" />

    <TodoFilter
      :filters="filters"
      :active="activeFilter"
      @filter="activeFilter = $event"
    />

    <transition-group name="fade" tag="v-list">
      <TodoItem
        v-for="task in filteredTasks"
        :key="task._id"
        :task="task"
        @update="updateTask"
        @delete="deleteTask"
      />
    </transition-group>
  </v-container>
</template>

<script>
import { addTodo, deleteTodo, updateTodo } from "./api/todoService";
import TodoFilter from "./components/todoFilter.vue";
import TodoInput from "./components/todoInput.vue";
import TodoItem from "./components/todoItem.vue";
import TodoSearch from "./components/todoSearch.vue";
import { getTodos } from "./api/todoService";
export default {
  components: { TodoInput, TodoSearch, TodoFilter, TodoItem },
  data() {
    return {
      tasks: [],
      search: "",
      activeFilter: "Tất cả",
      filters: ["Tất cả", "Hoàn thành", "Chưa hoàn thành"],
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks
        .filter((t) => t.text.toLowerCase().includes(this.search.toLowerCase()))
        .filter((t) => {
          if (this.activeFilter === "Hoàn thành") return t.done;
          if (this.activeFilter === "Chưa hoàn thành") return !t.done;
          return true;
        });
    },
  },
  methods: {
    async fetchTasks() {
      const res = await getTodos();
      this.tasks = res.data;
    },
    async createTask(text) {
      const res = await addTodo(text);
      this.tasks.push(res.data);
    },
    async updateTask(task) {
      await updateTodo(task._id, { done: task.done });
    },
    async deleteTask(id) {
      await deleteTodo(id);
      this.tasks = this.tasks.filter((t) => t._id !== id);
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style> -->

<template>
  <v-container>
    <h1>Donations</h1>
    <v-text-field
      type="number"
      v-model="donationAmount"
      label="Enter donation amount"
    ></v-text-field>
    <v-btn @click="submitDonation()">Donate</v-btn>
    <div v-if="donationAmount < 0" style="color: red; margin-top: 8px">
      Donation amount cannot be negative
    </div>
    <div>
      <ul>
        <li v-for="donation in donations" :key="donation.id">
          {{ donation.amount }}
          <v-btn @click="removeDonation(donation.id)">X</v-btn>
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const donationAmount = ref(0);
    const donations = ref([]);

    const submitDonation = () => {
      if (donationAmount.value > 0) {
        donations.value.push({ id: Date.now(), amount: donationAmount.value });
        donationAmount.value = 0;
      }
    };

    const removeDonation = (id) => {
      donations.value = donations.value.filter((donation) => donation.id !== id);
    };

    return {
      donationAmount,
      donations,
      submitDonation,
      removeDonation,
    };
  },
};
</script>
