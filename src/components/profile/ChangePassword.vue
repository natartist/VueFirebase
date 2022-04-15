<template>
  <form class="ui form change-password" @submit.prevent="onChangePassword">

    <div class="field">
      <label for="currentPassword">Contraseña actual</label>
      <input 
        id="currentPassword" 
        type="password" 
        placeholder="Contraseña Actual"
        v-model="formData.password"
        :class="{error: formError.password}"
      />
    </div>

    <div class="field">
      <label for="newpassword">Nueva contraseña</label>
      <input 
        id="newpassword" 
        type="password" 
        placeholder="Nueva contraseña"
        v-model="formData.newPassword"
        :class="{error: formError.newPassword}"
      />
    </div>

    <div class="field">
      <label for="newpassword2">Repite la nueva contraseña</label>
      <input
        id="newpassword2"
        type="password"
        placeholder="Repite la nueva contraseña"
        v-model="formData.newPasswordRepeat"
        :class="{error: formError.newPasswordRepeat}"
      />
    </div>

    <span v-if="messageError"> {{ messageError }}</span>
    
    <div class="btn-block">
      <button class="ui button primary" type="submit" :class="{loading}">Actualizar</button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import * as Yup from "yup";
import { auth } from '@/utils/firebase';
import { reAuthenticate } from '@/utils/firebaseFunctions';
export default {
  name: "ChangePassword",
  setup() {
    const formData = {};
    const formError = ref({});
    const loading = ref(false);
    const messageError = ref("");
    // Reglas de validación
    const schemaForm = Yup.object().shape({
      password: Yup.string().required(true).min(6),
      newPassword: Yup.string().required(true).min(6),
      newPasswordRepeat: Yup.string().required(true).oneOf([Yup.ref("newPassword")], true),
    });
    const onChangePassword = async () => {
      formError.value = {};
      messageError.value = "";
      loading.value = true;
      try {
        await schemaForm.validate(formData, { abortEarly: false });
        console.log('Todo ok, paso las reglas de validación');
        // Llamar Firebase
        // RE-AUTENTIFICACION
        try {
          const { password, newPassword } = formData;
          await reAuthenticate(password);
          await auth.currentUser.updatePassword(newPassword);
          auth.signOut();
        } catch (error) {
          console.log(error);
          messageError.value = error.message;
        }
        // FIN DE LA RE-AUTENTIFICACION
      } catch (err) {
        console.log(err);
        err.inner.forEach( error => {
          formError.value[error.path] = error.message;
        });
      }
      loading.value = false;
    }
    return {
      formData,
      onChangePassword,
      formError,
      loading,
      messageError
    }
  }
};
</script>

<style lang="scss" scoped>
  .ui.form.change-password {
    margin: 5px 0px;
    .btn-block {
      display: flex;
      justify-content: center;
    }
    input.error{
      border-color: #faa;
      background-color: #ffeded;
    }
  }
</style>