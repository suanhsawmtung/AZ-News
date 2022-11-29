<template>
    <div>
        <header>
            <!-- Header Start -->
            <div class="header-area">
                <div class="main-header">
                    <div class="header-top black-bg d-none d-md-block">
                        <div class="container">
                            <div class="row d-flex justify-content-between align-items-center">
                                <div class="col-xl-1 text-white" v-if="backArrow != '/' && backArrow != '/homePage'">
                                        <i class="fa-solid fa-arrow-left" @click="goBack()"></i>
                                    </div>
                                    <div class="col-xl-10">
                                        <div class="row d-flex justify-content-between align-items-center">
                                            <div class="header-info-left">
                                                <ul>
                                                    <li>
                                                        <img src="../../../public/assets/img/icon/header_icon1.png" alt="" />34ºc, Sunny
                                                    </li>
                                                    <li>
                                                        <img src="../../../public/assets/img/icon/header_icon1.png" alt="" />Tuesday, 18th June, 2019
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="header-info-right">
                                                <ul class="header-social">
                                                    <li>
                                                        <a href="details.html"><i class="fab fa-twitter"></i
                                  ></a>
                                                    </li>
                                                    <li>
                                                        <a href="details.html"><i class="fab fa-instagram"></i
                                  ></a>
                                                    </li>
                                                    <li>
                                                        <a href="details.html"><i class="fab fa-pinterest-p"></i
                                  ></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="header-mid d-none d-md-block">
                        <div class="container">
                            <div class="row d-flex align-items-center">
                                <!-- Logo -->
                                <div class="col-xl-3 col-lg-3 col-md-3">
                                    <div class="logo">
                                        <a href="index.html"><img src="../../../public/assets/img/logo/logo.png" alt="" /></a>
                                    </div>
                                </div>
                                <div class="col-xl-9 col-lg-9 col-md-9">
                                    <div class="header-banner f-right">
                                        <img src="../../../public/assets/img/hero/header_card.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="header-bottom header-sticky">
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-xl-10 col-lg-10 col-md-12 header-flex">
                                    <!-- sticky -->
                                    <div class="sticky-logo">
                                        <a href="index.html"><img src="../../../public/assets/img/logo/logo.png" alt="" /></a>
                                    </div>
                                    <!-- Main-menu -->
                                    <div class="main-menu d-none d-md-block">
                                        <nav>
                                            <ul id="navigation">
                                                <li><a href="index.html">Home</a></li>
                                                <li><a href="categori.html">Category</a></li>
                                                <li><a href="about.html">About</a></li>
                                                <li><a href="latest_news.html">Latest News</a></li>
                                                <li><a href="contact.html">Contact</a></li>
                                                <li>
                                                    <a href="#">Pages</a>
                                                    <ul class="submenu">
                                                        <li><a href="elements.html">Element</a></li>
                                                        <li><a href="blog.html">Blog</a></li>
                                                        <li><a href="single-blog.html">Blog Details</a></li>
                                                        <li><a href="details.html">Categori Details</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div class="col-xl-2 col-lg-2 col-md-4" v-if="!tokenStatus">
                                    <div class="main-menu d-none d-md-block">
                                        <ul>
                                            <li class="col-7 "><router-link to="/logInPage" class=" nav-auth ">Log In</router-link></li>
                                            <li class="col-5 "><router-link to="/registerPage" class="nav-auth">Register</router-link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-xl-2 col-lg-2 col-md-4" v-if="tokenStatus">
                                    <div class="main-menu d-none d-md-block">
                                        <ul>
                                            <li class="col-8 offset-4 nav-auth" @click="accountLogOut()">Log Out</li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- Mobile Menu -->
                                <!-- <div class="col-12">
                                    <div class="mobile_menu d-block d-md-none"></div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Header End -->
        </header>
    </div>
</template>

<script>
    // import axios from "axios";
    import {mapGetters} from 'vuex';
    export default {
        name : 'HeaderPage',
        data () {
            return {
                tokenStatus: false,
            }
        },
        computed: {
            ...mapGetters(["storageToken","storageUser"]),
        },
        methods: {
            backArrow () {
                return window.location.pathname;
            },
            goBack() {
                history.back();
            },
            checkTokenStatus(){
                if(this.storageToken != ""){
                    this.tokenStatus = true;
                }else{
                    this.tokenStatus = false;
                }
            },
            accountLogOut(){
                this.$store.dispatch("setToken","");
                this.checkTokenStatus();
                this.$router.push("/");
            },
        },
        mounted () {
            this.checkTokenStatus();
        }
    }
</script>

<style>
    .nav-auth{
        font-size : 15px;
        cursor:pointer;
        transition:0.3s;
        font-weight: 550;
    }

    .nav-auth:hover{
        color:#FF0000;
    }

    .fa-arrow-left{
        cursor:pointer
    }

    .fa-arrow-left:hover{
        color:#FF0000;
    }
</style>
