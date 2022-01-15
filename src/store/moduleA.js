
export default {
    state:{
        userName:'admin',
        userPassword:'123',
        loginIng:false
    },
    mutations:{
        userLogin(state,loginForm){
            if(state.userName == loginForm.userName && state.userPassword == loginForm.password) {
                state.loginIng = true
            }else{
                state.loginIng = false
            }
        }
    },
    getters:{
        loginGo(state){
            return state.loginIng
        }
    }
}