<template>
  <v-card class="px-9 py-10" :width="500">
    <div class="brand-icon mb-9"></div>
    <div class="mb-5">
      <h1>Sign In</h1>
      <div class="text--secondary">Please enter your email and password</div>
    </div>
    <v-form ref="loginForm">
      <v-text-field
        v-model="loginData.email"
        :rules="[rules.required, rules.email]"
        outlined
        placeholder="Your email address"
      >
      </v-text-field>
      <v-text-field
        v-model="loginData.password"
        :rules="[rules.required]"
        outlined
        placeholder="Password"
      >
      </v-text-field>
      <v-btn @click.prevent="login" color="primary" width="100%"
        ><span class="text-capitalize">Sign in</span></v-btn
      >
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { rules } from "~/utils/validation";
export default Vue.extend({
  //@ts-ignore
  layout: "login",
  data() {
    const email: string | null = null;
    const password: string | null = null;
    return {
      rules: rules,
      loginData: {
        email,
        password,
      },
    };
  },
  methods: {
    async login() {
      //@ts-ignore
      if (this.$refs.loginForm.validate()) {
        try {
          await this.$auth.setUserToken("12345");
        } finally {
          this.$router.push({ path: "/" });
        }
        // Todo implement backend strategy for nuxt auth
        // try {
        //   let response = await this.$auth.loginWith("local", {
        //     data: this.loginData,
        //   });
        //   console.log(response);
        // } catch (err) {
        //   console.log(err);
        // }
      }
    },
  },
});
</script>

<style scoped></style>
