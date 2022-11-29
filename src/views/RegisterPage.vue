<template>
    <div>
        <Header></Header>
        <div class="d-flex justify-content-center">
            <div class="card col-5 mt-3 shadow" style="background: #ffffff;">
                <div class="card-title text-center my-2 border-bottom border-muted font-weight-bolder fs-3">Register Form</div>
                <div class="card-body">
                    <div class="d-flex justify-content-start align-items-center">
                        <label for="name" class="col-2">Name</label>
                        <div id="name" class="mb-3 ms-5 col-9 pe-1">
                            <input type="text" placeholder="Enter your name..." id="name" class="form-control " v-model="userData.name">
                            <small class="text-danger" v-if="validation.nameMessage">The user name field is required.</small>
                        </div>
                    </div>
                    <div class="d-flex justify-content-start align-items-center">
                        <label for="email" class="col-2">Email</label>
                        <div id="email" class="mb-3 ms-5 col-9 pe-1">
                            <input type="text" placeholder="Enter your email..." id="email" class="form-control " v-model="userData.email">
                            <small class="text-danger" v-if="validation.emailMessage">The email field is required.</small>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <label for="password" class="col-2">Password</label>
                        <div id="password" class="mb-3 ms-5 col-9 pe-1">
                            <input type="password" placeholder="Enter password" id="password" class="form-control" v-model="userData.password">
                            <small class="text-danger" v-if="validation.passwordMessage">The password field is required.</small>
                            <small class="text-danger" v-if="validation.characterMessage">The password much has at least 5 characters.</small>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <label for="confirmPassword" class="col-2">Confirm Password</label>
                        <div id="confirmPassword" class="mb-3 ms-5 col-9 pe-1">
                            <input type="password" placeholder="Enter confirm password" id="confirmPassword" class="form-control" v-model="userData.confirmPassword">
                            <small class="text-danger" v-if="validation.confirmPasswordMessage">The confirm password is not matched.</small>
                        </div>
                    </div>
                    <div class="text-end">
                        <button class="px-3 py-1 rounded bg-dark text-white" type="button" id="btn-log-in" @click="registerUserData()" >Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Header from '../components/header_footer/HeaderPage.vue';
    export default {
        name : 'RegisterPage',
        components : { Header },
        data () {
            return {
                userData: {
                    name : "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                },
                validation : {
                    nameMessage : false,
                    emailMessage : false,
                    passwordMessage : false,
                    characterMessage : false,
                    confirmPasswordMessage : false
                }
            }
        },
        methods: {
            async registerUserData () {
                if(this.userData.name != "" && this.userData.email != "" && this.userData.password != "" && this.userData.password.length >= 5 && this.userData.password == this.userData.confirmPassword){
                    let response = await axios.post('http://localhost:8000/api/user/register',this.userData);
                    // console.log(response);
                    this.$store.dispatch('setToken',response.data.token);
                    this.$store.dispatch('setUser',response.data.user);
                    this.$router.push("/");
                }else {
                    this.clear();
                    this.checkValidation();
                }
            },
            checkValidation(){
                if(this.userData.name == ""){
                    this.validation.nameMessage = true;
                    return;
                }
                if(this.userData.email == ""){
                    this.validation.emailMessage = true;
                    return;
                }
                if(this.userData.password == ""){
                    this.validation.passwordMessage = true;
                    return;
                }
                if(this.userData.password.length < 5){
                    this.validation.characterMessage = true;
                    return;
                }
                if(this.userData.password != this.userData.confirmPassword){
                    this.validation.confirmPasswordMessage = true;
                    return;
                }
            },
            clear(){
                this.validation.nameMessage = false;
                this.validation.emailMessage = false;
                this.validation.passwordMessage = false;
                this.validation.characterMessage = false;
                this.validation.confirmPasswordMessage = false;
            }
        }
        
    }
</script>

<style lang="stylus" scoped>

</style>
