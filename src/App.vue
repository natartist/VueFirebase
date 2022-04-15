<template>
  <template v-if="user"> 
     <router-view/>
  </template>

  <AuthView v-if="!user && user !== undefined" />
</template>

<script>
import { computed, onMounted } from "vue";
// Vuex
import { useStore } from "vuex";
// Firebase
import { auth } from "./utils/firebase.js";
// Componentes
import AuthView from "./views/AuthView.vue";
export default {
  name: "App",
  components: {
    AuthView
  },
  setup() {
    const store = useStore();
    const user = computed(()=> store.state.user);
    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        // Nos devuelve null
        // user es que el viene de firebase
        // store.commit("setUser", { name: "Miguel"})
        store.commit("setUser", user);
      })
    })
    return {
      user,
    }
  },
}
</script>

<style lang="scss">
</style>
