var VueRouter = require('vue-router');




Vue.use(VueRouter);
var router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/homePage'
    },
    {
      path: '/homePage',
      name:"homePage",
      component:require("../app.vue")
    }
  ]
});



//
module.exports = router;
