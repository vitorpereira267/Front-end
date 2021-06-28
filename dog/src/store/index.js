import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from "axios"
export default new Vuex.Store({
  state: {
    info:[],
    favoritos: [],
    venda: [{
      'nome': 'akita',
      'preco': 800,
      'foto': 'https://images.dog.ceo/breeds/akita/Akita_Inu_dog.jpg'
    },
    {
      'nome': 'husky',
      'preco': 600,
      'foto': 'https://images.dog.ceo/breeds/akita/Akita_Inu_in_Riga_1.jpg',
    },
    {
      'nome': 'akita',
      'preco': 800,
      'foto': 'https://images.dog.ceo/breeds/akita/Akita_Inu_dog.jpg',
    },
    {
      'nome': 'akita',
      'preco': 800,
      'foto': 'https://images.dog.ceo/breeds/akita/Akita_Inu_dog.jpg',
    },
    {
      'nome': 'boxer',
      'preco': 800,
      'foto': 'https://images.dog.ceo/breeds/akita/Akita_Inu_dog.jpg',
    }
    ]
  },
  mutations: {
    marcaFavorito(state, item) {
      state.favoritos = [item, ...state.favoritos]
    },
    desmarcaFavorito(state, index) {
      state.favoritos.splice(index, 1)
    },
    carregaInfo(state, item){
      state.info=item
    }
  },
  actions: {
    carregaInfo({ commit }) {
      let resultados = []
      let breeds = []
      let carregaBreed = (breed) => {
        return axios.get("https://dog.ceo/api/breed/" + breed + "/images/random")
          .then((res) => res.data.message);
      }
      let infoLocalStorage = localStorage.getItem('infoLocal')
      
      if(!infoLocalStorage){
        axios
        .get("https://dog.ceo/api/breeds/list/all")
        .then((res) => {
          return res.data.message;
        })
        .then((res) => {
          breeds = [...Object.keys(res)];
          return [...Object.keys(res)];
        })
        .then((res) => {
          return axios.all([...res.map((x) => carregaBreed(x))]);
        })
        .then((res) => {
          for (let [index, item] of res.entries()) {
            resultados.push({
              'name': breeds[index],
              'photo': item,
            });
          }
          return resultados
        })
        .then(
          res => commit('carregaInfo',resultados)
        )
        .then(
          res =>{
            commit('carregaInfo', resultados)
            localStorage.setItem('infoLocal', JSON.stringify(res))
          }
        )
      }else{
        commit('carregaInfo', JSON.parse(infoLocalStorage))
      }
      
    },
  },
  getters: {
    racavenda: state => {
      return [...new Set(state.venda.map(x => x.nome))]
    }
  }
})