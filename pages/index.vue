<template>
  <v-container fluid>
    <v-layout class="text-xs-center">
      <v-flex>
        <p class="headline">Latest Articles</p>
      </v-flex>
    </v-layout>
    <v-layout mt-3 row wrap justify-center>
      <v-flex d-flex xs12 sm5 md5 lg3 class="ma-2" v-for="data in dataList" :key="data.name">
        <v-card
          nuxt
          :to="{name:'latest-articles-id', params: { articleID:data.id, uri:data.uri } }"
          hover
        >
          <v-img :src="data.thumbnail_url" aspect-ratio="1.7"></v-img>
          <v-card-title class="subheading">{{ data.card_title }}</v-card-title>
          <v-card-text class="grey--text text--darken-1">{{data.excerpt}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      dataList: []
    };
  },
  mounted() {
    axios
      .get(
        "http://trivago-magazine-work-sample-server.s3-website.eu-central-1.amazonaws.com/latest_posts.json"
      )
      .then(response => {
        this.dataList = response.data;
      });
  }
};
</script>