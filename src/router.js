import Vue from 'vue'
import Router from 'vue-router'
import fillData from './components/fillData'
import app from './app.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: app
        }, {
            path: '/fillData',
            component: fillData
        },

    ]

})