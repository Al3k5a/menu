<template>
  <v-container>
    <currency-table></currency-table>
    <v-navigation-drawer
      clipped
      :app="!isMobile"
      :absolute="isMobile"
      :width="450"
      right
      color="white"
      mobile-breakpoint="md"
    >
      <currency-modal></currency-modal>
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CurrencyModal from "../../components/currencies/currencyModal.vue";
import currencyTable from "../../components/currencies/currencyTable.vue";

export default Vue.extend({
  components: { currencyTable, CurrencyModal },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
  },
});
</script>

<style scoped></style>
