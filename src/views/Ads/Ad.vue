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
                            height="300px"
                            src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
                    >
                    </v-img>

                    <v-card-subtitle class="pb-0">
                        Lorem
                    </v-card-subtitle>

                    <v-card-text class="text--primary">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, sint?
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="orange"
                                depressed
                        >
                            Edit
                        </v-btn>

                        <v-btn
                                color="success"

                        >
                            Buy
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>