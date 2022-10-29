<template>
  <v-card
    class="content-bg card"
    :max-width="card.maxWidth"
    flat
    tile
    router
    :to="`/watch/${video._id}`"
  >
    <!-- <v-img :src="video.thumb" height="200px"></v-img> -->
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>
    <v-row no-gutters>
      <v-col cols="2" v-if="card.type != 'noAvatar'">
        <v-list-item
          class="pl-0 pt-3"
          router
          :to="`/Channels/${video.user_id._id}`"
        >
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              src="https://randomuser.me/api/portraits/men/1.jpg"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-col>
      <v-col>
        <v-card-title class="pl-2 pt-3 subtitle-1 font-weight-bold">
          {{ video.title }}
        </v-card-title>

        <v-card-subtitle class="pl-2 pb-0">
          {{ video.user_id.name }}
        </v-card-subtitle>
        <v-card-subtitle class="pl-2 pt-0">
          {{ video.views }} views<v-icon>mdi-circle-small</v-icon
          >{{ video.createdAt | formatDateHoursAgo }}
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ["video", "card"],
  // props: {
  //   video: {
  //     type: [Object, Array],
  //     required: true,
  //   },
  //   card: Object,
  // },
};
</script>

<style></style>
