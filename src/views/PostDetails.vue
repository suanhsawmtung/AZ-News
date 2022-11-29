<template>
    <div>
        <Header></Header>
        <main>
            <!-- About US Start -->
            <div class="about-area">
                <div class="container">
                        <!-- Hot Aimated News Tittle-->
                        <!-- <div class="row">
                            <div class="col-lg-12">
                                <div class="trending-tittle">
                                    <strong>Trending now</strong>
                                    <p>Rem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    <div class="trending-animated">
                                        <ul id="js-news" class="js-hidden">
                                            <li class="news-item">Bangladesh dolor sit amet, consectetur adipisicing elit.</li>
                                            <li class="news-item">Spondon IT sit amet, consectetur.......</li>
                                            <li class="news-item">Rem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                                        </ul>
                                    </div>
                                
                                </div>
                            </div>
                        </div> -->
                       <div class="row">
                            <div class="col-lg-8">
                                <!-- Trending Tittle -->
                                <div class="about-right mb-90">
                                    <div class="about-img mt-4" >
                                        <img :src="post.image" class=" img-thumbnail" style="max-height:500px;object-fit: contain;">
                                    </div>
                                    <div class="section-tittle mb-30 pt-30">
                                        <h3>{{ post.title }}</h3>
                                    </div>
                                    <div class="about-prea">
                                        <p class="about-pera1 mb-25">{{ post.description }}</p>
                                    </div> 
                                    <div class="d-flex justify-content-start align-items-center">
                                        <span class="fs-3 me-3 " @click="love()" style="cursor:pointer" v-if="!reactStatus"><i class="fa-regular fa-heart"></i></span>
                                        <span class="fs-3 me-3 text-danger" @click="love()" style="cursor:pointer" v-else><i class="fa-solid fa-heart"></i></span>    
                                        <span class="fs-4" @click="messageBox()" style="cursor:pointer"><i class="fa-regular fa-message"></i></span>
                                    </div>
                                    <div class="social-share pt-30">
                                        <div class="section-tittle">
                                            <h3 class="mr-20">INFO:</h3>
                                            <ul class="mt-1">
                                                <li>( <i class="fa-sharp fa-solid fa-eye"></i> - {{ viewCountNumber }} )</li>
                                                <li>( <i class="fa-regular fa-message"></i> - {{ commentCount }}  )</li>
                                                <li>( <i class="fa-regular fa-heart"></i> - {{ reactCount }} )</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!-- From -->
                                    <div class="row" v-show="messageStatus">
                                        <div class="col-lg-8">
                                            <div class="form-contact contact_form mb-80" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <textarea class="form-control w-100 error" name="message" id="message" cols="30" rows="9" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Write a comment'" placeholder="Write a comment" v-model="comment"></textarea>
                                                            <small class="text-danger" v-show="validatiionStatus">Comment field is required.</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group mt-3">
                                                    <button type="submit" class="button button-contactForm boxed-btn" @click="postComment()">Send</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4" v-show="commentCount!=0" >
                                <div style="max-height:100vh;border:1px solid white;overflow-y:scroll;">
                                    <h4 class="mt-4">Comments...</h4>
                                    <div class="card p-1 my-3" v-for="(ment,index) in postComments" :key="index">
                                        <div class="card-body">
                                            <div class="card-title d-flex justify-content-start ">
                                                <h5>{{ ment.user_name }}</h5>
                                                <small class="mt-1 ms-3">{{ ment.created_at }}</small>
                                            </div>
                                            <div class="card-text">
                                                <small>{{ ment.comment }}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       </div>
                </div>
            </div>
            <!-- About US End -->
        </main> 
        <Footer></Footer>
    </div>
</template>

<script src="../js/postDetails.js"></script>
