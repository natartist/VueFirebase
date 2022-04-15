<template>
  <div class="ui secondary menu">
    <div class="ui container">

      <div class="menu left">
        <router-link class="item" to="/">Sistema Archivos</router-link>
      </div>

      <router-link class="menu center" to="/">
        <img
          class="ui small image"
          src="../assets/archivos.png"
          alt="imagen del menu"
        />
      </router-link>

      <div class="menu right">

        <router-link class="item" to="/profile">
         {{ user.displayName || user.email }}
        </router-link>

        <!-- Icono para cerrar la sesión -->
        <span class="ui item logout" @click="logout">
          <i class="fa-solid fa-right-from-bracket"></i>
        </span>

      </div>

    </div>
  </div>
</template>

<script>
import { auth } from "../utils/firebase.js";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "Navbar",
  setup() {
    // methods
    const logout = () => auth.signOut();
  
    // Vuex
    const store = useStore();
    const user = computed( () => store.state.user);
    // console.log(user.value);
    return {
      user,
      logout
    }
  }
};
</script>

<style lang="scss" scoped>
  .ui.menu.secondary {
    font-size: 1.2rem;
    background-color: #16202b;
    .item {
      color: #fff;
      &:hover {
        color: #6effa6;
      }
    }
    .menu.left {
      width: 50%;
    }
    .menu.right {
      display: flex;
      justify-content: flex-end;
      width: 50%;
      .logout {
        &:hover {
          cursor: pointer;
          i {
            color: tomato;
          }
        }
      }
    }
    .menu.center {
      background-color: #343d46;
      position: relative;
      top: 15px;
      border-radius: 50%;
      padding: 20px;
      margin: -15px;
      &:hover {
        box-shadow: 0px 7px 40px -4px rgba(0,0,0,0.3);
      }
    }
    .ui.image {
      width: 60px;
    }
  }
</style>
