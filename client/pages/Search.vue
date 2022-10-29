<template>
  <div id="search">
    <v-container fluid>
      <div v-if="videos?.length > 0">
        <v-row no-gutters align="center" justify="center">
          <v-col v-for="item in videos" :key="item" cols="12">
            <v-skeleton-loader type="card-avatar" :loading="loading">
              <video-card :card="{ maxWidth: 350 }" :video="item"></video-card>
            </v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <p>not result..</p>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    videos: {},
  }),
  methods: {
    async searchVideo() {
      await this.$axios
        .$get(`/api/videos/search?q=${this.$route.query.key}`)
        .then((videoInfo) => {
          console.log("searchVideo :>> ", videoInfo);
          this.videos = videoInfo;
        });
    },
  },
  async mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    await this.searchVideo();
    console.log("this.$route.query :>> ", this.$route.query);
  },
};
</script>

<style></style>
