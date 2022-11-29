import axios from "axios";
import Header from "../components/header_footer/HeaderPage.vue";
import Footer from "../components/header_footer/FooterPage.vue";
import { mapGetters } from "vuex";

export default {
    name: 'HomePage',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            allPost: [],
            allCategory: [],
            searchBoxStatus: false,
            alertStatus: false,
            searchKey: " ",
        }
    },
    computed: {
        ...mapGetters(["storageToken", "storageUser"]),
    },
    methods: {
        getAllPost() {
            axios.get('http://localhost:8000/api/allPost').then((response) => {

                for (let i = 0; i < response.data.posts.length; i++) {
                    response.data.posts[i].image = 'http://localhost:8000/storage/' + response.data.posts[i].image;
                }

                this.allPost = response.data.posts;
            });
        },
        displaySearchBox() {
            this.searchBoxStatus = true;
        },
        getAllCategory() {
            axios.get('http://localhost:8000/api/category').then((response) => {
                this.allCategory = response.data.categories;
            }).catch((error) => {
                console.log(error);
            })
        },
        searchCategory(searchCategoryId) {
            let categoryId = {
                id: searchCategoryId
            }

            axios.post('http://localhost:8000/api/searchCategory', categoryId).then((response) => {
                for (let i = 0; i < response.data.searchCategoryData.length; i++) {
                    response.data.searchCategoryData[i].image = 'http://localhost:8000/storage/' + response.data.searchCategoryData[i].image;
                }

                this.allPost = response.data.searchCategoryData;
            }).catch((error) => {
                console.log(error);
            });
        },
        searchData() {
            this.searchBoxStatus = false;
            let searchDataKey = {
                key: this.searchKey
            }
            axios.post('http://localhost:8000/api/search', searchDataKey).then((response) => {

                for (let i = 0; i < response.data.searchData.length; i++) {
                    response.data.searchData[i].image = 'http://localhost:8000/storage/' + response.data.searchData[i].image;
                }

                this.allPost = response.data.searchData;
                this.searchKey = " ";

            }).catch((error) => {
                console.log(error);
            });
        },
        details(id) {
            if (this.storageToken != "") {
                this.$router.push({
                    path: `postDetails/${id}`,
                });
            } else {
                this.alertStatus = true;
            }

        },
        changeAlertStatus() {
            this.alertStatus = false;
        }

    },
    mounted() {
        this.getAllPost();
        this.getAllCategory();
    }
}