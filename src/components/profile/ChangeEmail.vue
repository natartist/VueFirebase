<template>
  <form class="ui form change-email" @submit.prevent="onChangeEmail">
    <div class="field">
      <label for="email"> Nuevo Email </label>
      <input
        id="email"
        type="text"
        placeholder="Nuevo email"
        v-model="formData.email"
        :class="{error: formError.email}"
      />
    </div>

    <div class="field">
      <label for="password">Contraseña Actual </label>
      <input
        id="password"
        type="password"
        placeholder="Contraseña Actual"
        v-model="formData.password"
        :class="{error: formError.password}"
      />
    </div>
    <span v-if="messageError"> {{  messageError }} </span>

    <div class="btn-block">
      <button class="ui button primary" type="submit" :class="{loading}">Actualizar</button>
    </div>

  </form>
</template>

<script>
import { ref } from "vue";
import * as Yup from "yup";
// import { auth } from '../../utils/firebase';
// FIREBASE IMPORTACIONES
import { auth } from "@/utils/firebase";
// import {} from "../../utils/firebaseFunctions";
import { reAuthenticate } from "@/utils/firebaseFunctions";
export default {
  name: "ChangeEmail",
  setup() {
    let formData = {};
    const formError = ref({});
    const messageError = ref("");
    const loading = ref(false);
    // Reglas de validación
    const schemaForm = Yup.object().shape({
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
    });
    const onChangeEmail = async () => {
      formError.value = {};
      messageError.value = "";
      loading.value = true;
      try {
        await schemaForm.validate(formData, { abortEarly: false });
        console.log("Todo salio bien, paso las reglas de validación");
        // RE-AUTENTIFICACIÓN CON FIREBASE
        try {
          // el nuevo que deseamos "email"
          const { email, password } = formData;
          await reAuthenticate(password);
          // vamos actualizar el email
          await auth.currentUser.updateEmail(email);
          // Cerrar la sesión
          auth.signOut();
        } catch (error) {
          // el error de la re autentificación
          console.log(error);
          messageError.value = error.message;
        }
        // FIN DE LA RE-AUTENTIFICACION FIREBASE
      } catch (err) {
        console.log(err); // en caso de haya un error
        err.inner.forEach( error => {
          formError.value[error.path] = error.message;
        })
      }
      // el loading a falso
      loading.value = false;
    };
    return {
      formData,
      onChangeEmail,
      messageError,
      loading,
      formError
    };
  },
};
</script>

<style lang="scss" scoped>
.ui.form.change-email {
  margin: 5px 0px;
  .btn-block {
    display: flex;
    justify-content: center;
  }
  input.error {
    border-color: #faa;
    background-color: #ffeded;
  }
}
</style>