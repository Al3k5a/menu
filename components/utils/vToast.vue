<template>
  <v-snackbar
    :color="color"
    :timeout="timer"
    v-model="showSnackbar"
    bottom
    right
  >
    <v-icon left>
      {{ icon }}
    </v-icon>
    {{ message }}
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      showSnackbar: false,
      message: "",
      color: "secondary",
      icon: "mdi-exclamation-thick",
      timer: 3000,
    };
  },
  methods: {
    show(message: string = "", icon: string = "mdi-exclamation-thick") {
      this.message = message;
      this.icon = icon;
      this.showSnackbar = true;
    },
  },
});
</script>

<style scoped></style>
