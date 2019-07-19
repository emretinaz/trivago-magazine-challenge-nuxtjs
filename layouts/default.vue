<template>
  <v-app>
    <v-toolbar flat dense app color="grey lighten-4">
      <v-spacer></v-spacer>
      <nuxt-link to="/">
        <v-toolbar-title class="headline">
          <span class="blue--text text--darken-3 left">tri</span>
          <span class="orange--text left">va</span>
          <span class="red--text left">go</span>
          <span class="font-weight-light ml-2">magazine</span>
        </v-toolbar-title>
      </nuxt-link>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content fluid>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>