<template>
    <v-row justify="end" class="buy-btn">
        <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
        >

            <template  v-slot:activator="{ on, attrs }">
                <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                >
                    Buy
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Do you want to purchase this product? </span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-text-field
                                        label="Legal first name*"
                                        v-model="firstName"
                                        required
                                ></v-text-field>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-text-field
                                        label="Legal last name*"
                                        v-model="lastName"
                                        required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                        label="Phone*"
                                        type="tel"
                                        v-model="phone"
                                        required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="blue darken-1"
                            text
                            :disabled="localLoading"
                            @click="onClose"
                    >
                        Close
                    </v-btn>
                    <v-btn
                            color="primary"
                            :disabled="requireBtn"
                            :loading="localLoading"
                            @click="onBuy"
                    >
                        Buy
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        data() {
            return {
                dialog: false,
                firstName: '',
                lastName: '',
                phone: '',
                localLoading: false
            }
        },
        props: ['ad'],
        computed: {
            requireBtn() {
                if (this.firstName === '' || this.lastName === '' || this.phone === '') {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            onClose() {
                this.firstName = ''
                this.lastName = ''
                this.phone = ''
                this.dialog = false
            },
            onBuy() {
                if (this.firstName !== '' || this.lastName !== '' || this.phone !== '') {
                    const order = {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        phone: this.phone,
                        adId: this.ad.id,
                        userId: this.ad.userId
                    }
                    this.$store.dispatch('createOrder', order)
                        .finally(() => {
                            this.firstName = ''
                            this.lastName = ''
                            this.phone = ''
                            this.dialog = false
                        })
                }

            }
        }
    }

</script>

<style>
    .buy-btn {
        padding-right: 15px;
    }
</style>