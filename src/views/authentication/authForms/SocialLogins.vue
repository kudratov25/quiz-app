<script setup lang="ts">
// assets
import facebookImg from "@/assets/images/icons/facebook.svg";
import githubImg from "@/assets/images/icons/github.svg";
import googleImg from "@/assets/images/icons/google.svg";
import telegramImg from "@/assets/images/icons/telegram.svg";
</script>
<template>
  <v-list aria-label="social list" aria-busy="true">
    <v-list-item color="secondary" variant="tonal" href="#" rounded="md" class="mb-2">
      <v-img
        :src="facebookImg"
        alt="social icon"
        class="mr-2 d-inline-flex"
        style="vertical-align: text-top"
        width="9"
        height="16"
      />
      Sign in with facebook
    </v-list-item>

    <v-list-item color="secondary" variant="tonal" href="#" rounded="md" class="mb-2">
      <v-img
        :src="githubImg"
        alt="social icon"
        class="mr-2 d-inline-flex"
        style="vertical-align: text-top"
        width="16"
        height="16"
      />
      Sign in with github
    </v-list-item>

    <v-list-item color="secondary" variant="tonal" href="#" rounded="md" class="mb-2">
      <v-img
        :src="googleImg"
        alt="social icon"
        class="mr-2 d-inline-flex"
        style="vertical-align: text-top"
        width="16"
        height="16"
      />
      Sign in with google
    </v-list-item>
    <v-list-item color="secondary" variant="tonal" href="#" rounded="md" class="mb-2">
      <v-img
        :src="telegramImg"
        alt="social icon"
        class="mr-2 d-inline-flex"
        style="vertical-align: text-top"
        width="16"
        height="16"
      />
      Sign in with telegram
    </v-list-item>
  </v-list>
</template>
