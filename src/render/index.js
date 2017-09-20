import Vue from 'vue'
import app from './app.vue'
import router from './routes/router'
require('./services/base')
new Vue({
  el : '#all',
  router: router,
  mounted () {
    var holder = document.getElementById('app')
    holder.ondragover = function () {
      return false
    }
    holder.ondragleave = holder.ondragend = function () {
      return false
    }
    holder.ondrop = function (e) {
      e.preventDefault()
    }
  }
})
