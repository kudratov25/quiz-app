<script setup lang="ts">
import { ref } from "vue";
import SvgSprite from "@/components/shared/SvgSprite.vue";
import { Form, Field } from "vee-validate";
import api from "@/utils/api";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

// Form state variables
const show1 = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");
const apiError = ref("");
const emailError = ref("");
const passwordError = ref("");
const auth = useAuthStore();
const router = useRouter();

// Field validation rules
const passwordRules = ref([
  (v: string) => !!v || "Password is required",
  (v: string) => (v && v.length <= 32) || "Password must be less than 32 characters",
]);
const nameRules = ref([(v: string) => !!v || "Name is required"]);
const emailRules = ref([
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);

// Form submission function
async function submitForm(values) {
  // Reset error messages
  apiError.value = "";
  emailError.value = "";
  passwordError.value = "";

  try {
    const response = await api.post("/register", {
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data));
      auth.user = response.data.user; // Update to store only user data if necessary
      await router.push("/dashboard/default");
    }

    // Optionally reset form values
    name.value = "";
    email.value = "";
    password.value = "";
  } catch (error) {
    // Capture and display specific field errors if they exist
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors;
      emailError.value = errors.email ? errors.email[0] : "";
      passwordError.value = errors.password ? errors.password[0] : "";
    } else {
      apiError.value = error.response?.data?.message || "An unexpected error occurred.";
    }
  }
}
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <h3 class="text-h3 text-center mb-0">Sign up</h3>
    <router-link to="/auth/login" class="text-primary text-decoration-none">
      Already have an account?
    </router-link>
  </div>

  <!-- Vee-validate form with custom validation and error handling -->
  <Form @submit="submitForm" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <v-row class="my-0">
      <v-col cols="12" sm="6" class="py-0">
        <div class="mb-6">
          <v-label>Name*</v-label>
          <Field
            name="name"
            as="v-text-field"
            v-model="name"
            :rules="nameRules"
            hide-details="auto"
            required
            variant="outlined"
            class="mt-2"
            color="primary"
            placeholder="John Doe"
          />
          <span class="error-text">{{ errors.name }}</span>
        </div>
      </v-col>
      <v-col cols="12" sm="6" class="py-0">
        <div class="mb-6">
          <v-label>Email*</v-label>
          <Field
            name="email"
            as="v-text-field"
            v-model="email"
            :rules="emailRules"
            hide-details="auto"
            required
            variant="outlined"
            class="mt-2"
            color="primary"
            placeholder="example@mail.com"
          />
          <span class="error-text">{{ errors.email || emailError }}</span>
        </div>
      </v-col>
    </v-row>
    <div class="mb-6">
      <v-label>Password*</v-label>
      <Field
        name="password"
        as="v-text-field"
        v-model="password"
        :rules="passwordRules"
        hide-details="auto"
        required
        variant="outlined"
        class="mt-2"
        color="primary"
        :type="show1 ? 'text' : 'password'"
        placeholder="*****"
      >
        <template #append-inner>
          <v-btn
            color="secondary"
            aria-label="icon"
            icon
            rounded
            variant="text"
            @click="show1 = !show1"
          >
            <SvgSprite
              name="custom-eye-invisible"
              style="width: 20px; height: 20px"
              v-if="!show1"
            />
            <SvgSprite name="custom-eye" style="width: 20px; height: 20px" v-if="show1" />
          </v-btn>
        </template>
      </Field>
      <span class="error-text">{{ errors.password || passwordError }}</span>
      <!-- Display backend password error -->
    </div>

    <div v-if="apiError" class="mb-2">
      <v-alert type="error" dense>{{ apiError }}</v-alert>
    </div>

    <div class="d-sm-inline-flex align-center mt-2 mb-7 mb-sm-0 font-weight-bold">
      <h6 class="text-caption">
        By signing up, you agree to our
        <router-link
          to="/terms-and-conditions"
          class="text-primary link-hover font-weight-medium"
        >
          Terms of Service
        </router-link>
        and
        <router-link to="/privacy" class="text-primary link-hover font-weight-medium">
          Privacy Policy
        </router-link>
      </h6>
    </div>

    <v-btn
      color="primary"
      block
      class="mt-4"
      variant="flat"
      rounded="md"
      size="large"
      :loading="isSubmitting"
      type="submit"
    >
      Create Account
    </v-btn>
  </Form>
</template>

<style scoped>
.error-text {
  color: red;
  font-size: 0.875rem;
}
</style>
