<template>
  <v-container style="margin:0; padding:0;" fluid>
    <v-layout>
      <v-flex>
        <v-img :src="thumbnail_url" aspect-ratio="3"></v-img>
      </v-flex>
    </v-layout>
    <v-layout px-3 pt-4>
      <v-flex>
        <p class="headline">{{title}}</p>
      </v-flex>
    </v-layout>
    <v-layout px-3>
      <v-flex class="grey--text text--darken-1 body-1">
        <span class="blockquote" v-html="firstContent"></span>
      </v-flex>
    </v-layout>
    <v-layout class="text-xs-center" py-5 row wrap justify-center>
      <v-flex xs8 sm4 md4 lg3>
        <p class="grey--text">Would you like to rate this article?</p>
        <div>
          <v-rating
            @click.native="ratePlaced"
            v-model="rating"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$vuetify.icons.ratingFull"
            half-increments
            hover
            dense
            size="28"
          ></v-rating>
        </div>
      </v-flex>
    </v-layout>

    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
    >
      {{ text }}
      <div>🙏🌷🥰</div>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
import { fireDB } from "@/plugins/firebase.js";
export default {
  data() {
    return {
      thumbnail_url: "",
      articleID: null,
      title: "",
      firstContent: null,
      uri: null,
      metadesc: "",
      snackbar: false,
      y: "bottom",
      x: "left",
      timeout: 3000,
      text: "Thank you",
      ratingList: [],
      rating: 0
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "metadesc", name: "metadesc", content: this.metadesc },
        { hid: "description", name: "description", content: this.firstContent }
      ]
    };
  },
  created() {
    return axios
      .get(this.$route.params.uri)
      .then(response => {
        this.thumbnail_url = response.data.thumbnail_url;
        this.title = response.data.title;
        this.metadesc = response.data.seo_meta.metadesc;
        this.articleID = response.data.id;
        this.firstContent = response.data.content[0].text;
        this.uri = response.data.uri;
      })
      .then(() => {
        let docID = this.articleID.toString();
        console.log("Article ID: ", docID);
        let li = [];
        return fireDB
          .collection("articles")
          .doc(docID)
          .get()
          .then(function(doc) {
            if (doc.exists) {
              li = doc.data().ratings;
              return li;
            } else {
              console.log("No such document!");
            }
          })
          .then(res => {
            this.ratingList = res;
            const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
            const result = average(this.ratingList);
            this.rating = result;
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          });
      });
  },
  methods: {
    ratePlaced() {
      let docID = this.articleID.toString();
      let newGivenRate = this.rating;
      let article = {
        card_title: this.title,
        articleID: this.articleID,
        uri: this.uri,
        ratings: [this.rating]
      };

      fireDB
        .collection("articles")
        .doc(docID)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let comingArray = doc.data().ratings;
            let newArray = [...comingArray];
            newArray.push(newGivenRate);

            return fireDB
              .collection("articles")
              .doc(docID)
              .update({
                ratings: newArray
              })
              .then(function() {
                console.log("Document successfully updated!");
              });
          } else {
            console.log("No such document!");
            fireDB
              .collection("articles")
              .doc(docID)
              .set(article);
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });

      this.snackbar = true;
    }
  }
};
</script>

