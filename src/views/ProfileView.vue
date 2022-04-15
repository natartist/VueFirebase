<template>
  <div class="profile">
    <Layout>
      <h2>Bienvenido(a) al perfil de usuario</h2>
      <div class="profile__section">
        <p class="title"> Cambiar el nombre <span>Username</span> </p>
        <ChangeName />
      </div>

      <div class="profile__section">
        <p class="title">
          Cambiar email <span>{{ user.email }}</span>
        </p>
        <ChangeEmail />
      </div>

      <div class="profile__section">
        <p class="title">
          Cambiar contraseña
        </p>
        <ChangePassword/>
      </div>

    </Layout>
  </div>
</template>

<script>
import Layout from "../layout/Layout.vue";
import { useStore } from "vuex";
import { computed } from "vue";
// Componentes del profile
import ChangeName from "../components/profile/ChangeName.vue";
import ChangeEmail from "../components/profile/ChangeEmail.vue";
import ChangePassword from "@/components/profile/ChangePassword.vue";

export default {
  name: "Profile",
  components: {
    Layout,
    ChangeName,
    ChangeEmail,
    ChangePassword
  },
  setup() {

    const store = useStore();
    const user = computed(() => store.state.user);

    return {
      user
    }
  }
}
</script>

<style lang="scss" scoped>
  .profile {
    h2 {
      margin: 50px 0px;
      text-align: center;
    }
    &__section {
      position: relative;
      border: 1px solid #d4d4d4;
      padding: 25px 10px 10px 10px;
      border-radius: 10px;
      margin-top: 40px;
      .title {
        position: absolute;
        background: #343d46;
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        top: -12px;
      }
    }
  }
</style>
