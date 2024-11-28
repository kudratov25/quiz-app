<script setup lang="ts">
import { ref, shallowRef, onMounted } from "vue";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import api from "@/utils/api";

const loading = ref(true);

interface Quiz {
  id: number;
  title: string;
  description: string;
  price: number;
  time_limit: number;
  deadline: string;
}

const page = ref({ title: "Quiz List" });
const breadcrumbs = shallowRef([
  { title: "Home", disabled: false, href: "/" },
  { title: "Quiz List", disabled: true, href: "#" },
]);

const quizzes = ref<Quiz[]>([]);
const modalDescription = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await api.get("/quizzes");
    quizzes.value = response.data;
  } catch (error) {
    console.log("Error fetching quizzes:", error);
  } finally {
    loading.value = false;
  }
});

function startQuiz(id: number) {
  alert(`Starting quiz with ID: ${id}`);
}

function showModalDescription(description: string) {
  modalDescription.value = description;
}

function closeModal() {
  modalDescription.value = null;
}
</script>

<template>
  <v-container>
    <!-- Breadcrumb -->
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <!-- Quiz List -->
    <v-row class="mt-4" dense justify="center" align="center" style="min-height: 400px">
      <v-progress-circular v-if="loading" indeterminate color="primary" size="50">
      </v-progress-circular>
      <v-col cols="12" md="6" lg="4" v-for="quiz in quizzes" :key="quiz.id">
        <UiParentCard :title="quiz.title" class="quiz-card">
          <div>
            <p><strong>Price:</strong> ${{ quiz.price }}</p>
            <p><strong>Time Limit:</strong> {{ quiz.time_limit }} mins</p>
            <p>
              <strong>Deadline:</strong> {{ new Date(quiz.deadline).toLocaleString() }}
            </p>

            <!-- Description Title as clickable text -->
            <p
              class="description-title pb-3"
              @click="showModalDescription(quiz.description)"
            >
              <strong>Description:</strong> Click to view
            </p>

            <v-btn color="primary" @click="startQuiz(quiz.id)">Start Quiz</v-btn>
          </div>
        </UiParentCard>
      </v-col>
    </v-row>
  </v-container>

  <!-- Modal for Description -->
  <v-dialog v-model="modalDescription" max-width="600px">
    <v-card>
      <v-card-title class="headline">Quiz Description</v-card-title>
      <v-card-text>
        <p>{{ modalDescription }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="closeModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.quiz-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 240px;
}

.description-title {
  color: #1976d2;
  cursor: pointer;
  text-decoration: underline;
}

.description-title:hover {
  color: #1565c0;
}
</style>
