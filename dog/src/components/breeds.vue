<template>
  <div class="breeds">
    <div v-for="(item, index) in $store.state.info" :key="index">
      <app-card largura="200px">
        <img :src="item.photo" height="120" alt="" />
        <br>
        <router-link :to="'/breeds/' + item.name">{{ item.name }}</router-link>
        <button @click="navega(item.name)">{{ item.name }}</button>
      </app-card>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import appCard from "@/components/app-card.vue";
export default {
  components: {
    appCard,
  },
  data() {
    return {
      pesquisa: "",
      resultados: "",
      breeds: [],
    };
  },
  methods: {
    navega(breed) {
      this.$router.push("/breeds/" + breed);
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.breeds{
  display: flex;
  flex-flow: row wrap;
}
</style>