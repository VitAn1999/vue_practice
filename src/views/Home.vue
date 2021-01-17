<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item
                            v-for="ad in ads"
                            :key="ad.id"
                            :src="ad.imgSrc"
                    >
                        <v-btn :to="'/ad/' + ad.id" elevation="0" class="ad-tran">{{ ad.title }}</v-btn>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
    </v-container>
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
        right: 47%;
        bottom: 50px;
        opacity: 0.5;
        color: white;

    }
</style>