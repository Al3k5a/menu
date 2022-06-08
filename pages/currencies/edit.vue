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
      <currency-modal :isEdit="true" :editItem="editItem"></currency-modal>
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { CurrencyStore } from "~/store/currency";
import { CurrencyObject } from "~/types/currency";
import CurrencyModal from "../../components/currencies/currencyModal.vue";
import currencyTable from "../../components/currencies/currencyTable.vue";

export default Vue.extend({
  components: { currencyTable, CurrencyModal },
  data() {
    const editItem: CurrencyObject | null = null as any;
    return {
      editItem,
    };
  },
  beforeMount() {
    this.editItem = CurrencyStore.editCurrency;
  },
  computed: {
    currencyEditItem() {
      return CurrencyStore.editCurrency;
    },
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
  },
  watch: {
    currencyEditItem(val) {
      if (val) {
        this.editItem = val;
      }
    },
  },
});
</script>

<style scoped></style>
