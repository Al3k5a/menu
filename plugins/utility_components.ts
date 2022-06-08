import Vue from 'vue'
import vToast from '~/components/utils/vToast.vue';
    
const components = { vToast}
   
Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
})