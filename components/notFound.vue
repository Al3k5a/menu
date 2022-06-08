<template>
  <v-layout class="fill-height" align-center justify-center>
    <div class="d-flex flex-column">
      <v-icon size="100">mdi-hammer-screwdriver</v-icon>
      <h2 class="text--secondary">{{ message }}</h2>
    </div>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { STATIC_TEXT } from "~/utils/constants";

export default Vue.extend({
  data() {
    return {
      message: STATIC_TEXT.PAGE_CONSTRUCTION,
    };
  },
});
</script>

<style scoped></style>
