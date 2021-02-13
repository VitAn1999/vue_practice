<template>
  <v-app>
    <v-navigation-drawer
            v-model="drawer"
            app
    >
        <v-list>
            <v-list-item v-for="link in links" :key="link.title" :to="link.url">
                <v-list-item-icon>
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ link.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="isUserLogin" @click="userLogout">
                <v-list-item-icon>
                    <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>logout</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar
            app
            color="primary"
            dark
            flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <router-link to="/" tag="h3" style="cursor: pointer">Ad App</router-link>
      <v-spacer></v-spacer>
      <v-container class="py-0 fill-height justify-end hidden-sm-and-down">
        <v-btn text v-for="link in links" :key="link.title" :to="link.url">
            <v-icon left dark medium>{{ link.icon }}</v-icon>
            {{ link.title }}
        </v-btn>
        <v-btn text v-if="isUserLogin" @click="userLogout">
            <v-icon left dark medium>mdi-exit-to-app</v-icon>
            Logout
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
        <router-view></router-view>
    </v-main>
      <template v-if="error">
          <v-snackbar
                  :timeout="5000"
                  :multi-line="true"
                  @input="closeError"
                  :value="true"
          >
              {{ error }}

              <v-btn
                      color="red"
                      text
                      @click.native="closeError"
              >
                  Close
              </v-btn>
          </v-snackbar>
      </template>

  </v-app>
</template>

<script>
  export default {
    data () {
        return {
            drawer: false
        }
    },
    computed: {
        error() {
            return this.$store.getters.error
        },
        isUserLogin() {
            return this.$store.getters.isUserLogin
        },
        links () {
            if (this.isUserLogin) {
                return [
                    {
                        title: 'orders',
                        icon: 'mdi-bookmark-outline',
                        url: '/orders'
                    },
                    {
                        title: 'new ad',
                        icon: 'mdi-bookmark-plus',
                        url: '/new-ad'
                    },
                    {
                        title: 'my ad',
                        icon: 'mdi-format-list-bulleted-square',
                        url: '/user-ad'
                    }
                ]
            } else {
                return [
                    {
                        title: 'login',
                        icon: 'mdi-account',
                        url: '/login'
                    },
                    {
                        title: 'sign in',
                        icon: 'mdi-login',
                        url: '/registration'
                    }
                ]
            }
        }
    },
    methods: {
        closeError() {
            this.$store.dispatch('clearError')
        },
        userLogout() {
            this.$store.dispatch('userLogout')
            if(this.$route.path !== '/') {
                this.$router.push('/')
            }
        }
    }
  }
</script>

<style>
    v-app-bar-title {
        text-overflow: initial;
    }
</style>
