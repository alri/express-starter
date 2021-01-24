/* Import and Use Libraries */

//window.Vue = require('vue');
import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
import router from './routes';
import Metro from 'metro4-dist/js/metro.min'


Vue.use(VueAxios, axios);



/*
/* Components */
import App from './components/App.vue'



//------------------
/*  Init   */
//------------------

// app1
const spa = new Vue({
    mounted: function () {
        Metro.init();
        console.log("Metro Vue SPA Is OK");
    },
    router,
    render: h => h(App),
}).$mount("#spa");




//console.log('laravel mix work done !');
