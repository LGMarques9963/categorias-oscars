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
        :cols="12"
        :sm="4"
        :md="4"
        :lg="4"
        :loading="loading"
        :key="categoria.tituloCategoria"
        v-for="categoria in categorias"
      >
        <v-card>
          <v-card-title>{{ categoria.tituloCategoria }}</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-list-item>
            <v-autocomplete
              :items="moradores"
              :loading="loading"
              :search-input.sync="search"
              @blur="onBlur"
              :id="categoria.tituloCategoria + ',3'"
              color="black"
              item-text="Nome"
              item-value="Nome"
              return-object
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
              @blur="onBlur"
              :id="categoria.tituloCategoria + ',2'"
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
              @blur="onBlur"
              :id="categoria.tituloCategoria + ',1'"
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
      @click="button()"
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
export default {
  name: "Home",

  data: () => ({
    categorias: [],
    moradores: [],
    loading: false,
    votos: [],
  }),

  methods: {
    button() {
      this.loading = true;
      this.$http
        .post(
          "insertVoto.php",
          {
            data: this.votos,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(
          (e) => console.log(e),
          (err) => console.log(err)
        )
        .finally((this.loading = false), alert("Voto salvo!"));
    },
    onChange(itemValue, cat, pts) {
      console.log(itemValue, cat, pts);
      console.log(this);
    },
    onBlur(value) {
      let id = value.originalTarget.id;
      const voto = value.originalTarget.value;
      const idArray = id.split(",");
      const cat = idArray[0];
      const posicao = idArray[1];
      if (this.votos.length == 0) {
        this.votos.push({ voto: voto, categoria: cat, posicao: posicao });
        return;
      }
      for (let v in this.votos) {
        if (
          cat === this.votos[v].categoria &&
          posicao === this.votos[v].posicao
        ) {
          console.log("Já votou!");
          this.votos.splice(v, 1);
          this.votos.push({ voto: voto, categoria: cat, posicao: posicao });
          return;
        }
      }
      this.votos.push({ voto: voto, categoria: cat, posicao: posicao });
    },
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
