<template>
    <v-container mt-10>
        <v-layout row>
            <v-flex xs12>
                <v-card
                        class="mx-auto"
                        max-width="600px"
                        elevation="12"
                >
                    <v-img
                            class="white--text align-end"
                            :src=adId.imgSrc
                    >
                    </v-img>

                    <v-card-subtitle class="pb-0">
                        {{ adId.title }}
                    </v-card-subtitle>

                    <v-card-text class="text--primary">
                        {{ adId.description }}
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="orange"
                                depressed
                                :to="'/edit-ad/' + adId.id"
                                v-if="isUser"
                        >
                            Edit
                        </v-btn>
                        <buy-modal :ad="adId"></buy-modal>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: ['id'],
        computed: {
            adId() {
                const id = this.id
                return this.$store.getters.adById(id)
            },
            isUser() {
                return this.adId.userId === this.$store.getters.user.id
            }
        }
    }
</script>