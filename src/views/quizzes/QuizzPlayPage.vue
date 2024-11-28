<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const quiz = ref<any>({
  id: 1,
  title: "Sample Quiz",
  description: "This is a sample quiz for demonstration purposes.",
  time_limit: 5, // 5 minutes
  questions: [
    {
      id: 1,
      title: "What is the capital of France?",
      media: "https://via.placeholder.com/150", // Example media for the question
      options: [
        { id: 1, text: "Paris", media: "https://via.placeholder.com/50" },
        { id: 2, text: "London", media: "https://via.placeholder.com/50" },
        { id: 3, text: "Berlin", media: "https://via.placeholder.com/50" },
        { id: 4, text: "Madrid", media: "https://via.placeholder.com/50" },
      ],
    },
    {
      id: 2,
      title: "What is the largest planet in our solar system?",
      media: "https://via.placeholder.com/150", // Example media for the question
      options: [
        { id: 1, text: "Earth", media: "https://via.placeholder.com/50" },
        { id: 2, text: "Jupiter", media: "https://via.placeholder.com/50" },
        { id: 3, text: "Mars", media: "https://via.placeholder.com/50" },
        { id: 4, text: "Saturn", media: "https://via.placeholder.com/50" },
      ],
    },
    {
      id: 3,
      title: "Who developed the theory of relativity?",
      media: "https://via.placeholder.com/150", // Example media for the question
      options: [
        { id: 1, text: "Isaac Newton", media: "https://via.placeholder.com/50" },
        { id: 2, text: "Albert Einstein", media: "https://via.placeholder.com/50" },
        { id: 3, text: "Nikola Tesla", media: "https://via.placeholder.com/50" },
        { id: 4, text: "Galileo Galilei", media: "https://via.placeholder.com/50" },
      ],
    },
  ],
});

const currentQuestionIndex = ref(0);
const selectedOption = ref<number | null>(null); // To track the selected option
const answers = ref<any[]>([]);
const timer = ref(0);
const timerInterval = ref<NodeJS.Timeout | null>(null);

const loading = ref(false);

const page = ref({ title: "Play Quiz" });

// Set up timer
onMounted(() => {
  timer.value = quiz.value.time_limit * 60; // Convert minutes to seconds
  startTimer();
});

// Start the countdown timer
function startTimer() {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
  timerInterval.value = setInterval(() => {
    if (timer.value > 0) {
      timer.value -= 1;
    } else {
      clearInterval(timerInterval.value);
      submitQuiz();
    }
  }, 1000);
}

// Save the user's answer for the current question
function saveAnswer(questionId: number, optionId: number) {
  const existingAnswerIndex = answers.value.findIndex(
    (answer) => answer.questionId === questionId
  );

  if (existingAnswerIndex >= 0) {
    answers.value[existingAnswerIndex].optionId = optionId;
  } else {
    answers.value.push({ questionId, optionId });
  }
}

// Navigate to the next question
function nextQuestion() {
  if (currentQuestionIndex.value < quiz.value.questions.length - 1) {
    saveAnswer(
      quiz.value.questions[currentQuestionIndex.value].id,
      selectedOption.value as number
    );
    currentQuestionIndex.value += 1;
    selectedOption.value = null; // Reset selected option
  }
}

// Navigate to the previous question
function previousQuestion() {
  if (currentQuestionIndex.value > 0) {
    saveAnswer(
      quiz.value.questions[currentQuestionIndex.value].id,
      selectedOption.value as number
    );
    currentQuestionIndex.value -= 1;
    selectedOption.value = null; // Reset selected option
  }
}

// Submit the quiz and display the result
async function submitQuiz() {
  // Just a simple log for static data
  console.log("Quiz submitted!", answers.value);
  // Normally, you would submit answers to an API here
  router.push({ name: "quizResult", params: { quizId: quiz.value.id } });
}
</script>

<template>
  <v-container>
    <BaseBreadcrumb
      :title="page.title"
      :breadcrumbs="[
        { title: 'Home', href: '/' },
        { title: 'Quiz Play', disabled: true },
      ]"
    />

    <!-- Loader -->
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      size="50"
    ></v-progress-circular>

    <!-- Quiz Content -->
    <v-row v-if="quiz && quiz.questions && quiz.questions.length > 0">
      <v-col cols="12" md="12">
        <h2>{{ quiz.title }}</h2>
        <p>{{ quiz.description }}</p>
        <p>
          <strong>Time Remaining:</strong> {{ Math.floor(timer / 60) }}:{{
            timer % 60 < 10 ? "0" + (timer % 60) : timer % 60
          }}
        </p>

        <!-- Progress Bar -->
        <v-progress-linear
          v-model="currentQuestionIndex"
          :max="quiz.questions.length - 1"
          height="15"
          color="primary"
          striped
        >
          <template #default>
            Question {{ currentQuestionIndex + 1 }} of {{ quiz.questions.length }}
          </template>
        </v-progress-linear>

        <!-- Question and Options -->
        <div>
          <v-card class="mt-4">
            <v-card-title>
              <v-img
                :src="quiz.questions[currentQuestionIndex].media"
                max-height="200"
                contain
              />
              {{ quiz.questions[currentQuestionIndex].title }}
            </v-card-title>
            <v-card-text>
              <v-radio-group v-model="selectedOption" row>
                <v-radio
                  v-for="(option, index) in quiz.questions[currentQuestionIndex].options"
                  :key="index"
                  :label="option.text"
                  :value="option.id"
                >
                  <template #label>
                    <v-img
                      v-if="option.media"
                      :src="option.media"
                      max-height="50"
                      contain
                    />
                    {{ option.text }}
                  </template>
                </v-radio>
              </v-radio-group>
            </v-card-text>
          </v-card>

          <!-- Navigation Buttons -->
          <v-btn color="primary" @click="previousQuestion" v-if="currentQuestionIndex > 0"
            >Previous Question</v-btn
          >
          <v-btn
            color="primary"
            @click="nextQuestion"
            v-if="currentQuestionIndex < quiz.questions.length - 1"
            >Next Question</v-btn
          >
          <v-btn color="primary" @click="submitQuiz" v-else>Submit Quiz</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-container {
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

p {
  color: #555;
  margin-bottom: 10px;
}

/* Progress Bar */
.v-progress-linear {
  background-color: #f0f0f0;
}

.v-progress-linear__bar {
  background-color: #2196f3;
}

/* Time Remaining */
strong {
  font-weight: bold;
  color: #333;
}

/* Question Card */
.v-card {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.v-card-title {
  /* font-size: 20px; */
  font-weight: 500;
  color: #333;
}

.v-img {
  margin-bottom: 10px;
  border-radius: 8px;
}

.v-radio {
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 5px;
  border-radius: 4px;
  margin-bottom: 0px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.v-radio:hover {
  background-color: #f1f1f1;
}

.v-radio input[type="radio"] {
  margin-right: 10px;
}

.v-radio-label {
  font-weight: normal;
  color: #555;
}

.v-radio:focus {
  outline: none;
}

/* Navigation Buttons */
.v-btn {
  font-size: 16px;
  padding: 10px 30px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.v-btn:hover {
  background-color: #2196f3;
  color: white;
}

.v-btn[disabled] {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

/* Quiz Footer */
.v-btn:focus {
  outline: none;
}

/* Additional Media for Questions */
.v-card-title img {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
}
</style>
