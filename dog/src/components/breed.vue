<template>
<div style="display: flex">
    <div class="breed">
      <div v-for="(item, index) in resultados" :key="index">
        <app-card largura="520px">
          {{item}} &emsp;<button @click="marcaFavorito(item)">&#9829;</button>
          <br /><br />
        <img :src="item" width="500" alt="">
        </app-card>
      </div>
    </div>
    <app-card class="favoritos" cor="grey">
      <p>FAVORITOS</p>
      <div v-for="(item, index) in $store.state.favoritos" :key="index">
        <app-card cor="white" alt="">
          <img :src="item" width="90" alt="" v-on:click="desmarcaFavorito(index)">
        </app-card>
      </div>
    </app-card>
</div>
</template>

<script>
import axios from "axios"
import appCard from './app-card.vue'


export default {
  components: { appCard },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      resultados: "",
      pesquisa:"",
      favoritos:[]
    }
  },
  methods:{
    marcaFavorito(item){
      //this.favoritos.unshift(item)
      this.$store.commit("marcaFavorito", item)
    },
    desmarcaFavorito(index){
      //this.favoritos.splice(index,1)
      this.$store.commit('desmarcaFavorito', index)
    },
    carregaInfo(query){
      //axios.get('https://images-api.nasa.gov/search?q='+query+'&media_type=image')
      axios.get("https://dog.ceo/api/breed/" + query + "/images")
        .then(
          res => {
            this.resultados = res.data.message
            console.log(this.resultados)
          }
        )
    },
    carregaBreed(breed){
      axios.get("https://dog.ceo/api/breed/" + breed + "/images")
        .then(
          res => {
            this.resultados = res.data.message
            console.log(this.resultados)
          }
        )
    }

  },
  created (){
      this.carregaInfo(this.$route.params.id)
  }
}
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
.breed{
  display: flex;
  flex-flow: row wrap;
}

.favoritos{
  max-width: 130px;
  font-weight: 700;
  color: white;
}

</style>
