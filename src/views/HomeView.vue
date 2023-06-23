<template>
  <v-container class="d-flex flex-start flex-wrap">
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      color="deep-purple accent-4"
    ></v-progress-linear>
    <v-card width="100%" cols="4" class="d-flex flex-wrap">
      <v-col
        :key="categoria.tituloCategoria"
        :cols="4"
        v-for="categoria in categorias"
      >
        <v-card :loading="loading">
          <v-card-title>{{ categoria.tituloCategoria }}</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-list-item>
            <v-autocomplete
              :items="moradores"
              :loading="loading"
              :search-input.sync="search"
              @change="onChange"
              color="black"
              item-text="Nome"
              item-value="Nome"
              label="Primeiro Colocado"
              placeholder="Primeiro Colocado"
              class="d-flex align-center mt-7"
              hide-no-data
              rounded
              clearable
              light
            ></v-autocomplete>
          </v-list-item>
          <v-list-item>
            <v-autocomplete
              :items="moradores"
              :loading="loading"
              :search-input.sync="search"
              @change="onChange"
              color="black"
              item-text="Nome"
              item-value="Nome"
              label="Segundo Colocado"
              placeholder="Segundo Colocado"
              class="d-flex align-center mt-7"
              hide-no-data
              rounded
              clearable
              light
            ></v-autocomplete>
          </v-list-item>
          <v-list-item>
            <v-autocomplete
              :items="moradores"
              :loading="loading"
              :search-input.sync="search"
              @change="onChange"
              color="black"
              item-text="Nome"
              item-value="Nome"
              label="Terceiro Colocado"
              placeholder="Terceiro Colocado"
              class="d-flex align-center mt-7"
              hide-no-data
              rounded
              clearable
              light
            ></v-autocomplete>
          </v-list-item>
          <v-spacer></v-spacer>
          <v-divider></v-divider>
        </v-card>
      </v-col>
      <v-card-actions> </v-card-actions>
    </v-card>
    <v-btn
      class="ma-2"
      :loading="loading"
      :disabled="loading"
      color="success"
      @click="loader = 'loading'"
    >
      Salvar Voto
      <template v-slot:loader>
        <span class="custom-loader">
          <v-icon light>mdi-cached</v-icon>
        </span>
      </template>
      <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
  name: "Home",

  data: () => ({
    categorias: [],
    moradores: [],
    loading: false,
  }),

  components: {
    HelloWorld,
  },

  mounted() {
    this.loading = true;
    this.$http.get("getCategorias.php").then(
      (categorias) => (this.categorias = categorias.data),
      (err) => console.log(err)
    );
    this.$http.get("getMoradores.php").then(
      (moradores) => (this.moradores = moradores.data),
      (err) => console.log(err)
    );
    this.loading = false;
  },
};
</script>
