<template>
  <v-container>
    <currency-table></currency-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import currencyTable from "../../components/currencies/currencyTable.vue";

export default Vue.extend({
  components: { currencyTable },
  data() {
    return {};
  },
  computed: {
    // currencyIsos(): string[] {
    //   return this.currencies.map((item: CurrencyObject) => item.code);
    // },
  },
});
</script>

<style></style>
