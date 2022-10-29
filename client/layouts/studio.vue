<template>
  <v-app>
    <v-main>
      <StudioNavBar />
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "StudioLayout",
  middleware: ["auth"],
  components: {
    StudioNavBar: () => import("@/components/StudioNavBar"),
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
