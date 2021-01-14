<template>
  <v-app>
    <v-navigation-drawer
            v-model="drawer"
            app
    >
    </v-navigation-drawer>

    <v-app-bar
            app
            color="primary"
            dark
            flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Ad application</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-container class="py-0 fill-height justify-end">
        <v-btn text>
            <v-icon left>g_translate</v-icon>
            Link
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
    data: () => ({ drawer: null }),
  }
</script>

<style>
</style>
