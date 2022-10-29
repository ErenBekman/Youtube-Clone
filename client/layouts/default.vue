<template>
  <v-app dark>
    <v-main>
      <NavBar />
      <!-- <StudioNavBar /> -->
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  middleware: ["auth"],
  components: {
    NavBar: () => import("@/components/NavBar"),
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.content-bg {
  background-color: #f9f9f9;
}
.card {
  background: #f9f9f9 !important;
}
</style>
