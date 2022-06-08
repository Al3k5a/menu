<template>
  <v-form ref="currencyModalForm">
    <v-card flat outlined>
      <v-row align="center" class="px-5 py-4" no-gutters>
        <v-btn @click="closeModal" icon><v-icon>mdi-close</v-icon></v-btn>
        <v-col
          ><h3>{{ actionString }} currency</h3></v-col
        >
        <v-col>
          <v-row justify="end" no-gutters>
            <v-btn @click="cancelModal" class="mr-3">
              <span class="text-capitalize">Cancel</span>
            </v-btn>
            <template v-if="isEdit">
              <v-btn color="primary" @click="editCurrency">
                <span class="text-capitalize">Edit</span>
              </v-btn>
            </template>
            <template v-else>
              <v-btn color="primary" @click="addCurrency">
                <span class="text-capitalize">Add</span>
              </v-btn>
            </template>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-row class="px-5 py-4" no-gutters>
      <v-col cols="12">
        <h4>Currency name</h4>
        <v-text-field
          v-model="name"
          :rules="[rules.required]"
          outlined
          clearable
          placeholder="Add name"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12">
        <h4>Currency code</h4>
        <v-text-field
          v-model="code"
          :rules="[rules.required, rules.hasThreeCharacters]"
          outlined
          clearable
          placeholder="e.g.USD"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12">
        <h4>Currency symbol</h4>
        <v-text-field
          v-model="symbol"
          :rules="[rules.required]"
          outlined
          clearable
          placeholder="Add symbol"
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { CurrencyStore } from "~/store/currency";
import { CurrencyObject } from "~/types/currency";
import { rules } from "~/utils/validation";
export default Vue.extend({
  props: {
    editItem: {
      type: Object,
      default: null,
      required: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    let name: string = "";
    let code: string = "";
    let symbol: string = "";
    let editedItem: CurrencyObject | null = null;
    return {
      name,
      code,
      symbol,
      editedItem,
      rules: rules,
    };
  },
  beforeMount() {
    if (this.isEdit) {
      const item = this.editItem;
      if (item) {
        this.fillEditModal();
      } else {
        this.$router.push("/currencies");
      }
    }
  },
  computed: {
    actionString(): string {
      return this.isEdit ? "Edit" : "Add";
    },
    confirmBtnString(): string {
      return this.isEdit ? "Save" : "Add";
    },
    isoCodes() {
      return CurrencyStore.currencyCodes;
    },
  },
  destroyed() {},
  methods: {
    isInvalidIsoCode(newIsoCode: string, currencyItem: CurrencyObject | null) {
      let existingIsoCodes: string[];
      if (currencyItem) {
        existingIsoCodes = this.isoCodes.filter(
          (item: string) => item !== currencyItem.code
        );
      } else {
        existingIsoCodes = this.isoCodes;
      }
      return existingIsoCodes.includes(newIsoCode);
    },
    validateIsoCode(newIsoCode: string, currencyItem: CurrencyObject | null) {
      if (this.isInvalidIsoCode(newIsoCode, currencyItem)) {
        this.$toast.show(
          "A currency already exists with the given ISO code. Please input a different ISO code"
        );
        return false;
      }
      return true;
    },
    fillEditModal() {
      const item = this.editItem;
      if (item) {
        this.editedItem = item;
        if (item.name) {
          this.name = item.name;
        }
        if (item.code) {
          this.code = item.code;
        }
        if (item.symbol) {
          this.symbol = item.symbol;
        }
      }
    },
    closeModal() {
      this.$router.push("/currencies");
    },
    cancelModal() {
      if (this.isEdit) {
        this.fillEditModal();
      } else {
        //@ts-ignore
        this.$refs.currencyModalForm.reset();
      }
    },
    async addCurrency() {
      //@ts-ignore
      if (this.$refs.currencyModalForm.validate()) {
        if (this.validateIsoCode(this.code, null)) {
          await CurrencyStore.add({
            name: this.name,
            symbol: this.symbol,
            code: this.code,
          });
          this.$toast.show("Successfully added currency");
          //@ts-ignore
          this.$refs.currencyModalForm.reset();
        }
      }
    },
    async editCurrency() {
      //@ts-ignore
      if (this.$refs.currencyModalForm.validate() && this.editedItem) {
        if (this.validateIsoCode(this.code, this.editedItem)) {
          const id = this.editItem.id;
          const editItem = {
            id: id,
            name: this.name,
            symbol: this.symbol,
            code: this.code,
          };
          await CurrencyStore.edit(editItem);
          this.$toast.show("Successfully updated currency");
          this.$router.push("/currencies");
        }
      }
    },
  },
  watch: {
    editItem(val) {
      if (val) {
        this.fillEditModal();
      }
    },
  },
});
</script>

<style scoped></style>
