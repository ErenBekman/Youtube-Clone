<template>
  <div id="home" class="pa-4">
    <v-container fluid>
      <h3 class="headline font-weight-medium">Recommended</h3>
      <v-row>
        <v-col
          v-for="item in videos"
          :key="item"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="mx-xs-auto"
        >
          <v-skeleton-loader type="card-avatar" :loading="loading">
            <video-card :card="{ maxWidth: 350 }" :video="item"></video-card>
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    videos: {},
  }),
  components: {
    videoCard: () => import("@/components/VideoCard"),
  },
  methods: {
    async getVideos() {
      this.$axios.get("/api/videos/trend").then((response) => {
        this.videos = response.data;
      });
    },
  },
  async mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    await this.getVideos();
  },
};
</script>

<style lang="scss">
.card {
  background: #f9f9f9 !important;
}
</style>
