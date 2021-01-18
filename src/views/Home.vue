<template>
    <div>
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                                v-for="ad in ads"
                                :key="ad.id"
                                :src="ad.imgSrc"
                        >
                            <div class="ad-tran">
                                <v-btn :to="'/ad/' + ad.id" elevation="0" class="error" >{{ ad.title }}</v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container mt-5 grid-list-lg>
            <v-layout row>
                <v-flex
                        xs12
                        md6
                        lg4
                        v-for="ad in ads"
                        :key="ad.id"
                >
                    <v-card
                            class="mx-auto"
                    >
                        <v-img
                                :src="ad.imgSrc"
                                height="300px"
                        ></v-img>

                        <v-card-title>
                            {{ ad.title }}
                        </v-card-title>

                        <v-card-subtitle>
                            {{ ad.description }}
                        </v-card-subtitle>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    :to="'/ad/' + ad.id"
                                    elevation="1"
                            >
                                open
                            </v-btn>
                            <v-btn
                                    color="primary"
                                    raised
                            >
                                buy
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                ads: [
                    {
                        title: 'First ad',
                        description: 'Little squirrel eat nuts',
                        promo: false,
                        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                        id: '1'
                    },
                    {
                        title: 'Second ad',
                        description: 'Beautiful night sky in England',
                        promo: true,
                        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                        id: '2'
                    },
                    {
                        title: 'Third ad',
                        description: 'Sinister planet',
                        promo: true,
                        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                        id: '3'
                    },
                ]

            }
        }
    }
</script>

<style scoped>
    .ad-tran {
        position: absolute;
        left: 50%;
        bottom: 50px;
        transform: translate(-50%, 0);
        background: rgba(0, 0, 0, 0.3);
        padding: 10px 20px;

    }
</style>