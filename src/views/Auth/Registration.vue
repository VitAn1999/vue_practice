<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Registration form</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                        >
                            <v-text-field
                                    prepend-icon="mdi-account"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    :rules="emailRules"
                                    v-model="email"
                            ></v-text-field>
                            <v-text-field
                                    id="password"
                                    prepend-icon="mdi-lock"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    :rules="passwordRules"
                                    v-model="password"
                                    :counter="6"
                            ></v-text-field>
                            <v-text-field
                                    id="confirmPassword"
                                    prepend-icon="mdi-lock"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    :rules="confirmPasswordRules"
                                    v-model="confirmPassword"
                                    :counter="6"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="primary"
                                :disabled="!valid"
                                @click="onSubmit"
                        >
                            Login</v-btn>
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
                email: '',
                password: '',
                confirmPassword: '',
                valid: false,
                emailRules: [
                    value => !!value || 'Required.',
                    value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    }
                ],
                passwordRules: [
                    value => !!value || 'Required',
                    value => (value && value.length >= 6) || 'Password must be more than 6 characters'
                ],
                confirmPasswordRules: [
                    value => !!value || 'Required',
                    value => value === this.password || 'Confirm password must be equal password'
                ]
            }
        },
        methods: {
            onSubmit () {
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password
                    }
                    console.log(user)
                }
            }
        }
    }
</script>