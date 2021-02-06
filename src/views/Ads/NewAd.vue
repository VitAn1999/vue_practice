<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm8 offset-sm4 md6 offset-md3 mt-7>
                <h2 class="text--secondary" mb-5>Create new ad</h2>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-text-field
                        prepend-icon="mdi-book-plus"
                        name="title"
                        label="Ad title"
                        type="text"
                        :rules="titleRules"
                        v-model="title"
                        mb-10
                    ></v-text-field>
                    <v-textarea
                        prepend-icon="mdi-grease-pencil"
                        rows="2"
                        name="description"
                        label="Description"
                        :rules="descriptionRules"
                        v-model="description"
                    ></v-textarea>
                </v-form>
                <v-layout row mt-7>
                    <v-flex xs12>
                        <v-btn
                            color="blue-grey"
                            class="ma-2 white--text"
                        >
                        Upload File
                            <v-icon
                                    right
                                    dark
                            >
                                mdi-cloud-upload
                            </v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row mt-7>
                    <v-flex xs12>
                        <img src="" height="">
                    </v-flex>
                </v-layout>
                <v-layout row mt-7>
                    <v-flex xs12>
                        <v-switch
                                v-model="promo"
                                label="Add promo to homepage"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout row mt-7>
                    <v-flex xs12 >
                        <v-btn
                                :loading="loading"
                                :disabled="requiredForm || loading"
                                class="ma-2 white--text success"
                                @click="createAd"
                        >
                            Create Ad
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                description: '',
                promo: false,
                valid: false,
                titleRules: [
                    value => !!value || 'Title is required'
                ],
                descriptionRules: [
                    value => !!value || 'Description is required'
                ]

            }
        },
        methods: {
            createAd() {
                if (this.$refs.form.validate()) {
                    const ad = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo,
                        imgSrc: 'https://www.valuecoders.com/blog/wp-content/uploads/2017/07/vuejs.png'
                    }
                    this.$store.dispatch('createAd', ad)
                        .then(() => {
                            this.$router.push('/user-ad')
                        })
                        .catch(() => {})
                }

            },
        },
        computed: {
            requiredForm() {
                if (this.title === '' || this.description === '') {
                    return !this.value
                } else {
                    return this.value
                }
            },
            loading() {
                return this.$store.getters.loading
            }
        },
    }
</script>