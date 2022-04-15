<template>
  <Layout>
    <div class="files">
      <h1>Sistema de registro de archivos</h1>

      <!-- Necesitamos componente para cargar un archivos -->
      <FileUpload />
      <!-- Mostrar los archivos -->
      
    </div>
  </Layout>
</template>

<script>
// @ is an alias to /src
import Layout from "../layout/Layout.vue";
import FileUpload from "@/components/files/FileUpload.vue";
export default {
  name: 'HomeView',
  components: {
    Layout,
    FileUpload
  },
  setup() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .files {
    width: 400px;
    margin: 50px auto;
  }
</style>