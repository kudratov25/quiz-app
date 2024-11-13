<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/utils/api";

const loading = ref(true);
const authFailed = ref(false);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const provider = route.params.provider as string;
  const queryParams = new URLSearchParams(window.location.search);

  try {
    const response = await api.get(`/login/${provider}/callback`, {
      params: {
        code: queryParams.get("code"),
        state: queryParams.get("state"),
      },
    });

    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push({ name: "Main" });
    } else {
      console.error("Authentication failed - Token not received");
    }
  } catch (error) {
    console.error("Callback request failed:", error);
    authFailed.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-row class="bg-containerBg position-relative" no-gutters>
    <v-col cols="12" lg="12" class="d-flex align-center">
      <v-container>
        <div
          class="d-flex align-center justify-center"
          style="min-height: calc(100vh - 148px)"
        >
          <v-row justify="center">
            <v-col cols="12" md="12"></v-col>
            <div>
              <v-progress-circular
                v-if="loading"
                indeterminate
                color="primary"
                size="50"
              ></v-progress-circular>
              <div v-else>
                <p v-if="authFailed">
                  Authentication failed.
                  <a href="/auth/login" class="center">Try again</a>
                </p>
                <p v-else>Redirecting...</p>
              </div>
            </div>
          </v-row>
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>
