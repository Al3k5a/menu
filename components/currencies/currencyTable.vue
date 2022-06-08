<template>
  <div>
    <v-row align="center" no-gutters>
      <v-col><h2>Currencies</h2></v-col>
      <v-col>
        <v-row justify="end" no-gutters>
          <v-btn color="primary" @click="addCurrency">
            <v-icon>mdi-plus</v-icon>
            <span class="text-capitalize">Add Currency</span>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xl="5" lg="6">
        <v-text-field
          v-model="search"
          outlined
          clearable
          prepend-inner-icon="mdi-magnify"
          placeholder="Search"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="currencyHeaders"
          :items="currencies"
          disable-pagination
          disable-sort
          :search="search"
          hide-default-footer
          no-data-text="There are no currencies added"
          @click:row="editCurrency"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn @click.stop="deleteCurrency(item)" icon
              ><v-icon>mdi-delete</v-icon></v-btn
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CurrencyStore } from "~/store/currency";
import { CurrencyObject } from "~/types/currency";
export default Vue.extend({
  data() {
    const currencyHeaders: Object[] = [
      {
        value: "name",
        text: "Currency name",
        class: "text-uppercase",
        cellClass: " font-weight-bold",
      },
      { value: "code", text: "Currency code", class: "text-uppercase" },
      { value: "symbol", text: "Currency symbol", class: "text-uppercase" },
      { value: "actions", text: "" },
    ];
    const search: string | null = null;
    return {
      search,
      currencyHeaders,
    };
  },
  async created() {
    await CurrencyStore.get();
  },
  computed: {
    currencies() {
      return CurrencyStore.currencies;
    },
    edit() {
      return CurrencyStore.editCurrency;
    },
  },
  methods: {
    addCurrency() {
      this.$router.push("/currencies/add");
    },
    editCurrency(item: CurrencyObject) {
      CurrencyStore.setEditCurrency(null);
      CurrencyStore.setEditCurrency(item);
      this.$router.push("/currencies/edit");
    },
    deleteCurrency(item: CurrencyObject) {
      CurrencyStore.delete(item);
      this.$router.push("/currencies");
    },
  },
});
</script>

<style scoped></style>
