<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
                <h1>Ad List</h1>
                <v-card v-for="ad in myAds" :key="ad.id" mt-7  class="mx-auto elevation-12" >
                    <v-layout row mt-7>
                        <v-flex xs4>
                            <v-img :src="ad.imgSrc" height="160px"></v-img>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-title>
                                {{ ad.title }}
                            </v-card-title>

                            <v-card-subtitle>
                                {{ ad.description }}
                            </v-card-subtitle>

                            <v-card-actions class="d-flex justify-end">
                                <v-btn
                                        class="openBtn"
                                        :to="'/ad/' + ad.id"
                                        elevation="1"
                                >
                                    open
                                </v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed: {
            myAds() {
                return this.$store.getters.myAds
            }
        }
    }
</script>

<style scoped>
    .openBtn {
        margin-right: 15px;
    }
</style>