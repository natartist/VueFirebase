<template>
  <form class="ui form change-name" @submit.prevent="onChangeName">
    <input type="text" placeholder="Nombre y Apellido" v-model="name" :class="{ error: formError}">
    <button type="submit" class="ui button primary" :class="{loading: loading}">Actualizar</button>
  </form>
</template>
<script>
import { useStore } from "vuex";
import { ref } from "vue";
import * as Yup from "yup";
import { auth } from "../../utils/firebase";
export default {
  name: "ChangeName",
  setup() {
    const store = useStore();
    const name = ref("");
    const formError = ref(false);
    const loading = ref(false);
    // Las validaciones
    const schemaForm = Yup.object().shape({
      name: Yup.string().required(true).min(5, true),
    });
    const onChangeName = async () => {
      formError.value = false;
      loading.value = true;
      try {
        await schemaForm.validate({name: name.value}, {abortEarly: false});
        console.log("TODO SALIO BIEN LISTOS PARA CAMBIAR EL NOMBRE");
        try {
          await auth.currentUser.updateProfile({
            // donde ingresamos nombre al perfil de usuario
            displayName: name.value
          })
          store.dispatch("realoadUser");
        } catch (error) {
          console.log(error);
        }
      } catch (err) {
       err.inner.forEach(error => {
         // path = name  , message = true
         formError.value = error.message
         // name: true
       })
      }
      loading.value = false;
    }
    return {
      name,
      onChangeName,
      formError,
      loading
    }
  }
}
</script>

<style lang="scss" scoped>
  .ui.form.change-name {
    text-align: center;
    input.error {
      border-color: #faa;
      background-color: #ffeded;
    }
    .ui.button {
      margin: 20px 0 0 0;
    }
  }
</style>