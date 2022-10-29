<template>
  <div id="video-details" class="pa-4">
    <v-container>
      <!-- <div class="d-flex justify-space-between mb-5"> -->
      <v-btn text small class="pl-0" @click="$router.go(-1)"
        ><v-icon left>mdi-arrow-left</v-icon> Channel videos</v-btn
      >
      <h2 class="mt-5">Video details</h2>
      <v-row>
        <v-col cols="8">
          <form @submit.prevent="submit" @reset.prevent="reset">
            <!-- <ValidationProvider
                v-slot="{ errors }"
                name="Title"
                rules="required|min:3"
              > -->

            <v-text-field
              v-model="formData.title"
              label="Title (required)"
              class="mb-3"
              filled
              dense
              counter="100"
              max-length="100"
            ></v-text-field>
            <!-- </ValidationProvider> -->

            <v-textarea
              filled
              auto-grow
              label="Description"
              placeholder="Tell viewers about your video"
              rows="5"
              counter="5000"
              max-length="5000"
              v-model="formData.description"
              row-height="20"
            ></v-textarea>

            <v-select
              :items="visibilty"
              filled
              label="Visibilty"
              v-model="formData.visibilty"
            ></v-select>

            <v-text-field
              v-model="formData.tags"
              label="Tags"
              class="mb-3"
              filled
              dense
              counter="100"
              max-length="100"
            ></v-text-field>

            <div class="mt-6 d-flex justify-space-between">
              <v-btn type="submit" class="primary" depressed>Submit</v-btn>
            </div>
          </form>
        </v-col>
        <v-col cols="4" class="text-center">
          <v-btn text @click="toggleShow">Upload Thumbnails</v-btn>

          <v-responsive style="max-width: 100%">
            <div v-if="!imgDataUrl" class="px-12" id="image-placeholder">
              <v-icon>mdi-image-plus</v-icon>
            </div>
            <v-img v-else height="350" :src="imgDataUrl"></v-img>
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import myUpload from "vue-image-crop-upload";
export default {
  layout: "studio",
  name: "Details",

  data() {
    return {
      // dialog: this.openDialog ? this.openDialog : false,
      valid: false,
      uploaded: false,
      uploading: false,
      interval: {},
      value: 0,
      show: false,
      rules: [
        (value) =>
          !value ||
          value.size < 5000000 ||
          "Video size should be less than 5 MB!",
      ],
      categories: ["People", "Technology", "Fashion"],
      visibilty: ["Public", "Private"],
      formData: {
        title: "",
        description: "",
        tags: "",
        visibilty: "",
      },
      imgDataUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
      params: {
        token: "123456798",
        name: "avatar",
      },
      headers: {
        smail: "*_~",
      },
    };
  },
  methods: {
    async submit() {
      await this.$axios
        .$put(`/api/videos/${this.$route.params.id}`, this.formData)
        .then(() => {
          console.log("submittied");
          this.$router.push({ name: "Studio-Videos" });
        });
    },
    async getVideoData() {
      await this.$axios
        .$get(`/api/videos/find/${this.$route.params.id}`)
        .then((response) => {
          console.log("response :>> ", response);
          this.formData = response;
        });
    },
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      console.log(field);
      this.imgDataUrl = imgDataUrl;
    },
  },

  async mounted() {
    await this.getVideoData();
  },
};
</script>

<style lang="scss">
.card {
  background: #f9f9f9 !important;
}
</style>
