<template>
  <div id="trending" class="pt-7 px-sm-10">
    <v-container fluid>
      <v-row>
        <v-col
          cols="8"
          sm="7"
          md="10"
          lg="10"
          v-for="i in videoData"
          :key="i._id"
          class="mx-lg-0 mx-md-0 mx-sm-auto mx-auto"
        >
          <!-- <v-container> -->
          <v-skeleton-loader
            class="mx-auto"
            type="list-item-avatar-three-line"
            :loading="loading"
            tile
            large
          >
            <v-card class="card" tile flat router :to="`/watch/${i._id}`">
              <v-row no-gutters>
                <v-col class="mx-auto" cols="12" sm="8" md="5" lg="4">
                  <!-- <v-responsive max-height="100%"> -->
                  <v-img
                    class="align-center"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                  >
                  </v-img>
                  <!-- </v-responsive> -->
                </v-col>
                <v-col class="hidden-sm-and-down">
                  <div class="ml-4">
                    <v-card-title class="pl-2 pt-0 subtitle-1 font-weight-bold">
                      {{ i.title }}
                    </v-card-title>

                    <v-card-subtitle class="pl-2 pb-0">
                      1,000 miles of wonder
                      <v-icon>mdi-circle-small</v-icon
                      >{{ i.views }} views<v-icon>mdi-circle-small</v-icon>
                      {{ i.createdAt | formatDateHoursAgo }}
                    </v-card-subtitle>
                    <v-card-subtitle class="pl-2 pt-0">
                      {{ i.description }}
                    </v-card-subtitle>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-skeleton-loader>
          <!-- </v-container> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    loading: true,
    videoData: {},
  }),
  methods: {
    async getTrendVideos() {
      await this.$axios.$get("api/videos/trend").then((response) => {
        console.log("response :>> ", response);
        this.videoData = response;
      });
    },
  },
  async mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    await this.getTrendVideos();
  },
};
</script>

<style lang="scss">
.v-skeleton-loader__list-item-avatar-three-line {
  height: 250px;
  .v-skeleton-loader__paragraph.v-skeleton-loader__bone {
    margin-top: -125px;
    @media (max-width: 700px) {
      display: none;
      margin-top: inherit;
    }
  }
  .v-skeleton-loader__avatar {
    height: 200px !important;
    width: 300px !important;
  }
  .v-skeleton-loader__text {
    height: 20px;
  }
}
</style>
