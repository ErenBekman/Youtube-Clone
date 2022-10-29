<template>
  <div id="channel-home">
    <v-parallax
      height="230"
      src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
    ></v-parallax>
    <div class="nav-bgcolor">
      <div id="channel-header">
        <v-container class="py-0">
          <v-row class="justify-space-between">
            <v-col cols="12" sm="5" md="5" lg="5" offset-md="1">
              <v-card class="transparent" flat>
                <v-list-item three-line>
                  <v-list-item-avatar size="80"
                    ><v-img
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                    ></v-img
                  ></v-list-item-avatar>
                  <v-list-item-content class="align-self-auto">
                    <v-list-item-title class="headline mb-1">
                      {{ channel.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                      >{{ channel.subscribers }} subscribers
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="12" sm="5" md="3" lg="3">
              <v-btn
                class="red white--text mt-6"
                tile
                large
                depressed
                @click.prevent="subs"
                :class="this.$auth.user._id === channel._id ? 'd-none' : ''"
                :disabled="disabledButton"
                >Subscribed</v-btn
              >
              <v-btn icon class="ml-5 mt-6"><v-icon>mdi-bell</v-icon></v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <v-card flat class="transparent">
        <v-tabs
          v-model="tab"
          background-color="transparent"
          show-arrows
          centered
          center-active
        >
          <v-tab>Home</v-tab>
          <v-tab>Videos</v-tab>
          <v-tab>Playlists</v-tab>
          <v-tab>Community</v-tab>
          <v-tab>Channels</v-tab>
          <v-tab>About</v-tab>
        </v-tabs>

        <v-container fluid>
          <v-tabs-items v-model="tab" class="transparent">
            <v-tab-item>
              <h3 class="headline font-weight-medium mt-3">Home</h3>
            </v-tab-item>

            <v-tab-item>
              <h3 class="headline font-weight-medium mt-3">Uploads</h3>

              <v-sheet max-width="1200" class="mx-auto transparent">
                <v-slide-group
                  v-model="model"
                  class="pa-4"
                  active-class="success"
                  show-arrows
                >
                  <v-slide-item
                    v-for="item in videos"
                    :key="item"
                    v-slot="{ active, toggle }"
                  >
                    <v-card
                      :color="active ? undefined : 'grey lighten-1'"
                      class="ma-4"
                      height="300"
                      width="300"
                      @click="toggle"
                    >
                      <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                      >
                        <v-col cols="12" class="mx-xs-auto">
                          <v-scale-transition>
                            <video-card
                              :card="{ maxWidth: 350 }"
                              :video="item"
                            ></video-card>
                          </v-scale-transition>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </v-tab-item>

            <v-tab-item>
              <h3 class="headline font-weight-medium mt-3">Playlist</h3>
            </v-tab-item>
            <v-tab-item>
              <h3 class="headline font-weight-medium mt-3">Community</h3>
            </v-tab-item>
            <v-tab-item>
              <h3 class="headline font-weight-medium mt-3">Channels</h3>
            </v-tab-item>
            <v-tab-item>
              <h3 class="headline font-weight-medium mt-3">About</h3>
            </v-tab-item>
          </v-tabs-items>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: null,
    loading: true,
    disabledButton: false,
    model: null,
    videos: {},
    channel: {},
  }),
  components: {
    videoCard: () => import("@/components/VideoCard"),
  },

  async mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    await this.getVideos();
    await this.getChannel();
  },
  methods: {
    async getVideos() {
      this.$axios
        .get(`/api/users/getVideo/${this.$route.params.id}`)
        .then((userVideo) => {
          this.videos = userVideo.data;
        });
    },
    async getChannel() {
      this.$axios
        .get(`/api/users/find/${this.$route.params.id}`)
        .then((channelInfo) => {
          console.log("response channel :>> ", channelInfo);
          this.channel = channelInfo.data;
        });
    },
    async subs() {
      this.$axios
        .put(`/api/users/sub/${this.$route.params.id}`)
        .then((subInfo) => {
          console.log("response sub :>> ", subInfo);
          this.disabledButton = true;
          this.channel.subscribers++;
        });
    },
  },
};
</script>

<style>
.nav-bgcolor {
  background: #f9f9f9;
}

.card {
  background: #f9f9f9 !important;
}

.v-tab {
  margin-right: 4em;
}

#channel-home .v-list-item--link:before {
  background-color: transparent;
}
</style>
x
