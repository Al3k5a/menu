import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { CurrencyObject, CurrencyBaseObject } from "~/types/currency";
import Vuex from 'vuex'
import { addCurrency, deleteCurrency, editCurrency, getCurrency } from '~/api/currencies';

interface StoreType {
  mm: CurrencyModule
}
const CURRENCIES_CONST : string = 'currencies';
// Declare empty store first
const store = new Vuex.Store<StoreType>({})
@Module({
  name: 'currency',
  stateFactory: true,
  namespaced: true,
  dynamic: true,
  store
})
export default class CurrencyModule extends VuexModule {
  currencies: CurrencyObject[] = [];
  editCurrency: CurrencyObject | null = null;

  get currencyCodes(): string[]{
    return this.currencies.map((item:CurrencyObject)=> item.code);
  }
  @Mutation
  setEditCurrency(currency: CurrencyObject | null) {
    this.editCurrency = currency;
  }

  @Mutation
  updateCurrencies(currencies: CurrencyObject[] | []) {
    this.currencies = currencies;
    localStorage.setItem(CURRENCIES_CONST, JSON.stringify(currencies));
  }


  @Action
  async get() {
    const data = await getCurrency();
    //Todo remove after api integration
    let existingCurrencies : any = localStorage.getItem(CURRENCIES_CONST);
    if(existingCurrencies){
      existingCurrencies = JSON.parse(existingCurrencies ? existingCurrencies : '');
      existingCurrencies = existingCurrencies != '' ? existingCurrencies : [];
    }else{
      existingCurrencies = []
    }
    this.updateCurrencies(existingCurrencies);
  }
  @Action
  async add(newItem:CurrencyBaseObject) {
    try{  
      // This is the simplest ID implementation 
      // Another way would have been to use uuid 
      //or a random number generator(requires checking for existing ID)
      let newId = this.currencies.length;
      let newCurrency = {...newItem, id: newId}
      await addCurrency(newCurrency);
      //todo remove after api integration
      this.updateCurrencies([...this.currencies, newCurrency]);
    }catch(err){
      console.log(err);
    }
  }
  @Action
  async edit(item:CurrencyObject) {
    try{
      await editCurrency(item);
      //todo remove after api integration
      let currenciesCopy = JSON.parse(JSON.stringify(this.currencies));
      let existingIndex = this.currencies.findIndex((currency : CurrencyObject) => currency.id == item.id);
      if(existingIndex != -1){
          currenciesCopy[existingIndex] = item;
          this.updateCurrencies(currenciesCopy);
      }
    }catch(err){
      console.log(err);
    }
  }
  @Action
  async delete(item:CurrencyObject) {
    try{
      await deleteCurrency(item.id);
      //todo remove after api integration
      this.updateCurrencies(
        this.currencies.filter((currency : CurrencyObject) => currency.id != item.id)
      );
    }catch(err){
      console.log(err);
    }
  }
}
export const CurrencyStore = getModule(CurrencyModule);