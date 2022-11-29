import axios from "axios";
import Header from "../components/header_footer/HeaderPage.vue";
import Footer from "../components/header_footer/FooterPage.vue";
import { mapGetters } from "vuex";
export default {
    name: 'PostDetails',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            postId: 0,
            post: {},
            postComments: [],
            commentCount: 0,
            viewCountNumber: 0,
            reactCount: 0,
            reactStatus: false,
            messageStatus: false,
            validatiionStatus: false,
            comment: "",
        }
    },
    computed: {
        ...mapGetters(["storageToken", "storageUser"]),
    },
    methods: {
        viewCount(postId) {
            let data = {
                userId: this.storageUser.id,
                postId: postId
            }
            axios.post("http://localhost:8000/api/viewCount", data).then((response) => {
                this.viewCountNumber = response.data.view.length;
            });
        },
        messageBox() {
            if (!this.messageStatus) {
                this.messageStatus = true;
            } else {
                this.messageStatus = false;
            }
        },
        postComment() {
            if (this.comment == "") {
                this.validatiionStatus = true;
                return;
            }
            let myComment = {
                userId: this.storageUser.id,
                postId: this.postId,
                comment: this.comment
            }
            axios.post("http://localhost:8000/api/postComment", myComment).then((response) => {
                this.postComments = response.data.comments;
                this.commentCount = response.data.comments.length;
                this.comment = "";
                this.validatiionStatus = false;
            });
        },
        love() {
            let myLove = {
                userId: this.storageUser.id,
                postId: this.postId,
            }
            axios.post("http://localhost:8000/api/reactLove", myLove).then((response) => {
                this.reactCount = response.data.react.length;
                this.reactStatus = response.data.reactStatus
            });
        },
    },
    mounted() {
        this.postId = this.$route.params.id;
        if (this.storageToken == "") {
            this.$router.push({
                path: "/homePage"
            });
            return;
        }

        axios.get(`http://localhost:8000/api/postDetails/${this.postId}`).then((response) => {
            response.data.postDetails.image = "http://localhost:8000/storage/" + response.data.postDetails.image;
            this.post = response.data.postDetails;
            this.postComments = response.data.comments;
            this.commentCount = response.data.comments.length;
            this.reactCount = response.data.react.length;
            let checkLoveReact = response.data.react;
            let myLoveReact = checkLoveReact.filter(love => {
                return love.user_id == this.storageUser.id;
            });

            if (myLoveReact.length != 0) {
                this.reactStatus = true;
            }
        });
        this.viewCount(this.postId);
    }

}