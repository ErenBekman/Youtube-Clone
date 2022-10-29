<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" class="d-flex justify-center align-center">
        <v-alert prominent type="error">
          <p class="grow">404 Not Found</p>
          <p class="shrink">
            <v-btn>
              <nuxt-link to="/"> Home page </nuxt-link>
            </v-btn>
          </p>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style>
.paragraph-text {
  font-size: 18px;
}
</style>
