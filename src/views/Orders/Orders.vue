<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
                <h1 class="text--secondary" mb-3>Orders</h1>
                <v-list
                        flat
                        subheader
                        three-line
                >
                    <v-list-item v-for="order in orders" :key="order.id">
                            <v-list-item-action>
                                <v-checkbox :input-value="order.done" :disabled="order.done" @click="changeDone(order, $event)"></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>{{ order.name }}</v-list-item-title>
                                <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn :to="'/ad/' + order.adId" class="primary">open</v-btn>
                            </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                orders: [
                    {
                        id: 'n1',
                        name: 'Vitan',
                        phone: '+375255552288',
                        adId: '1',
                        done: false
                    }
                ]
            }
        },
        methods: {
            changeDone (order, event) {
                order.done = true;
                event.target.disabled
            }
        }
    }
</script>