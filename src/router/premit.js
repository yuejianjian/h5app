import router from "./index"

router.beforeEach((to, from, next) => {
    console.log(from);
    console.log(to);
    next();
    
})