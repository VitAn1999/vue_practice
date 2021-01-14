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
        </v-list>
    </v-navigation-drawer>

    <v-app-bar
            app
            color="primary"
            dark
            flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-app-bar-title>Ad App</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-container class="py-0 fill-height justify-end hidden-sm-and-down">
        <v-btn text v-for="link in links" :key="link.title" :to="link.url">
            <v-icon left dark medium>{{ link.icon }}</v-icon>
            {{ link.title }}
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
  export default {
    data () {
        return {
            drawer: false,
            links: [
                {
                  title: 'login',
                  icon: 'mdi-account',
                  url: '/login'
                },
                {
                    title: 'sign in',
                    icon: 'mdi-login',
                    url: '/registration'
                },
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
                },
            ]
        }
    }
  }
</script>

<style>
    v-app-bar-title {
        text-overflow: initial;
    }
</style>
