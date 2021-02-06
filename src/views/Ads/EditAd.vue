<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm8 offset-sm4 md6 offset-md3 mt-7>
                <h2 class="text--secondary" mb-5>Edit ad</h2>
                <v-form
                        ref="form"
                        lazy-validation
                >
                    <v-text-field
                            prepend-icon="mdi-book-plus"
                            name="title"
                            label="Ad title"
                            type="text"
                            :rules="titleRules"
                            mb-10
                            v-model="title"
                    >

                    </v-text-field>
                    <v-textarea
                            prepend-icon="mdi-grease-pencil"
                            rows="2"
                            name="description"
                            label="Description"
                            :rules="descriptionRules"
                            v-model="description"
                    >
                        {{ adId.description }}
                    </v-textarea>
                </v-form>
                <v-layout row mt-7>
                    <v-flex xs12>
                        <v-btn
                                color="blue-grey"
                                class="ma-2 white--text"
                        >
                            Reload File
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
                        <img :src="adId.imgSrc" height="200px">
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
                                @click="editAd"
                        >
                            Edit Ad
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
                title: this.$store.getters.adById(this.id).title,
                description: this.$store.getters.adById(this.id).description,
                promo: this.$store.getters.adById(this.id).promo,
                titleRules: [
                    value => !!value || 'Title is required'
                ],
                descriptionRules: [
                    value => !!value || 'Description is required'
                ]
            }
        },
        props: ['id'],
        methods: {
            editAd() {
                if (this.$refs.form.validate()) {
                    const ad = {
                        id: this.id,
                        title: this.title,
                        description: this.description,
                        promo: this.promo,
                        imgSrc: this.$store.getters.adById(this.id).imgSrc,
                        userId: this.$store.getters.adById(this.id).userId
                    }
                    this.$store.dispatch('editAd', {
                        newAd: ad,
                        oldAd: this.$store.getters.myAds.findIndex(item => item.id === this.id)
                    })
                        .then(() => {
                            this.$router.push('/')
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            },
        },
        computed: {
            adId() {
                const id = this.id
                return this.$store.getters.adById(id)
            },
            myAds() {
                return this.$store.getters.myAds
            },
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

<style scoped>

</style>