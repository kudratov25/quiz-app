<script setup lang="ts">
import api from "@/utils/api";
// assets
import facebookImg from "@/assets/images/icons/facebook.svg";
import githubImg from "@/assets/images/icons/github.svg";
import googleImg from "@/assets/images/icons/google.svg";
import telegramImg from "@/assets/images/icons/telegram.svg";

// Social login method
const socialLogin = async (provider: string) => {
  try {
    const response = await api.get(`/login/${provider}`);

    if (response.data && response.data.url) {
      window.location.href = response.data.url;
    }
  } catch (error) {
    console.error("Social login failed:", error);
  }
};
</script>

<template>
  <v-list aria-label="social list" aria-busy="true">
    <!-- Facebook Login -->
    <v-list-item
      color="secondary"
      variant="tonal"
      @click="socialLogin('facebook')"
      rounded="md"
      class="mb-2"
    >
      <v-img
        :src="facebookImg"
        alt="social icon"
        class="mr-2 d-inline-flex"
        style="vertical-align: text-top"
        width="9"
        height="16"
      />
      Sign in with Facebook
    </v-list-item>

    <!-- GitHub Login -->
    <v-list-item
      color="secondary"
      variant="tonal"
      @click="socialLogin('github')"
      rounded="md"
      class="mb-2"
    >
      <v-img
        :src="githubImg"
        alt="social icon"
        class="mr-2 d-inline-flex"
        style="vertical-align: text-top"
        width="16"
        height="16"
      />
      Sign in with GitHub
    </v-list-item>

    <!-- Google Login -->
    <v-list-item
      color="secondary"
      variant="tonal"
      @click="socialLogin('google')"
      rounded="md"
      class="mb-2"
    >
      <v-img
        :src="googleImg"
        alt="social icon"
        class="mr-2 d-inline-flex"
        style="vertical-align: text-top"
        width="16"
        height="16"
      />
      Sign in with Google
    </v-list-item>

    <!-- Telegram Login -->
    <v-list-item
      color="secondary"
      variant="tonal"
      @click="socialLogin('telegram')"
      rounded="md"
      class="mb-2"
    >
      <v-img
        :src="telegramImg"
        alt="social icon"
        class="mr-2 d-inline-flex"
        style="vertical-align: text-top"
        width="16"
        height="16"
      />
      Sign in with Telegram
    </v-list-item>
  </v-list>
</template>
