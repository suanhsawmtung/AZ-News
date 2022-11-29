<template>
    <div>
        <Header></Header>
        <div class="d-flex justify-content-center">
            <div class="card col-5 mt-5 shadow" style="background: #ffffff;">
                <div class="card-title text-center my-2 border-bottom border-muted font-weight-bolder fs-3">Log In Form</div>
                <div class="card-body">
                    <div class="d-flex justify-content-start align-items-center">
                        <label for="email" class="col-2">Email</label>
                        <div id="email" class="mb-3 ms-5 col-9 pe-1">
                            <input type="text" placeholder="Enter your email..." id="email" class="form-control " v-model="userData.email">
                            <small class="text-danger" v-if="emailMessage != ''">{{ emailMessage }}</small>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <label for="password" class="col-2">Password</label>
                        <div id="password" class="mb-3 ms-5 col-9 pe-1">
                            <input type="password" placeholder="Enter password" id="password" class="form-control" v-model="userData.password">
                            <small class="text-danger" v-if="passwordMessage != ''">{{ passwordMessage }}</small>
                        </div>
                    </div>
                    <div class="text-end">
                        <router-link to="/registerPage" class="col-5 text-dark">Create Account</router-link>
                        <button class="px-3 py-1 rounded bg-dark text-white col-3 offset-1" type="button" id="btn-log-in" @click="accountLogIn()">Log In</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Header from "../components/header_footer/HeaderPage.vue";
    import { mapGetters } from 'vuex';
    export default {
        name:'LogInPage',
        components : {Header},
        data () {
            return {
                userData: {
                    email : "",
                    password : ""
                },
                emailMessage : " ",
                passwordMessage : " "
            }
        },
        computed: {
           ...mapGetters (["storageToken","storageUser"]),
        },
        methods: {
            accountLogIn () {
                if(this.userData.email != "" && this.userData.password != ""){
                    this.clear();
                    axios.post('http://localhost:8000/api/user/login',this.userData).then((response)=>{
                        if(response.data.token != null ){
                            this.$store.dispatch('setToken',response.data.token);
                            this.$store.dispatch('setUser',response.data.user);
                            this.$router.push("/");
                        }else{
                            if(response.data.status == "email"){
                                this.emailMessage = response.data.message;
                            }else {
                                this.passwordMessage = response.data.message;
                            }
                        }
                    })
                }else {
                    if(this.userData.email == ""){
                        this.emailMessage = "The email field is required.";
                    }else {
                        this.emailMessage = "";
                    }

                    if(this.userData.password == ""){
                        this.passwordMessage = "The password field is required.";
                    }else{
                        this.passwordMessage = "";
                    }
                }
            },
            clear(){
                this.emailMessage = "";
                this.passwordMessage = "";
            }
        }
    }
</script>

<style >
#btn-log-in:active {
    opacity: 0.9;
    padding:0;
}

</style>
