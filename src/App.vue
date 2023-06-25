<template>
  <v-app>
    <v-app-bar app color="secondary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://ww1.freelogovectors.net/wp-content/uploads/2023/01/oscar_logo-freelogovectors.net_.png?lossy=1&w=2560&ssl=1"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mr-2 hidden-sm-and-down"
          contain
          min-width="100"
          :src="require('.//assets/Logo-Oscars.svg')"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
