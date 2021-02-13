<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm8 offset-sm2 md6 offset-md3 v-if="!loading && myOrders.length !== 0">
                <h1 class="text--secondary" mb-3>Orders</h1>
                <v-list
                        flat
                        subheader
                        three-line
                >
                    <v-list-item v-for="order in myOrders" :key="order.id">
                            <v-list-item-action>
                                <v-checkbox :input-value="order.done" :disabled="order.done" @click="changeDone(order, $event)"></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>{{ order.firstName }} {{ order.lastName}}</v-list-item-title>
                                <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn :to="'/ad/' + order.adId" class="primary">open</v-btn>
                            </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-flex>
            <v-flex xs12 class="text-center" pt-10 v-else-if="!loading && myOrders.length === 0">
                <h1>You have not an orders </h1>
            </v-flex>
            <v-flex xs12 class="text-center" v-else>
                <v-progress-circular
                        :size="100"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        methods: {
            changeDone (order, event) {
                this.$store.dispatch('changeDone', order.id)
                    .then(() => {
                        order.done = true;
                    })
                    .catch(() =>{})
                event.target.disabled
            }
        },
        computed: {
            myOrders() {
                return this.$store.getters.myOrders
            },
            loading() {
                return this.$store.getters.loading
            }
        },
        created() {
            this.$store.dispatch('fetchOrders')
        }
    }
</script>