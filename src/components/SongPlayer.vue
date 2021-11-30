<template>
  <div class="text-white">
    <!-- Common Audio plugin-->
    <audio
      v-bind:src="song.url_high"
      preload="auto"
      autoplay
      ref="audioPlayer"
    />
    <div class="flex flex-row justify-between">
      <button @click="goback">Back</button>
      <div class="text-yellow-300 font-bold text-center text-1xl">
        Regiocast MusiQ
      </div>
    </div>
    <!--Song Information  -->
    <div>
      <img class="rounded mt-8 mb-4" :src="updatedSong.covers" />
      <div class="text-center">
        <p class="text-yellow-300 font-bold">{{ updatedSong.song_title }}</p>
        <p class="text-gray-200">{{ updatedSong.artist_name }}</p>
        <p class="text-gray-400">{{ song.stream }}</p>
      </div>
    </div>
    <div class="grid mt-10">
      <div class="flex items-center justify-center">
        <button
          class="rounded-full bg-yellow-300 h-24 w-24 text-black font-bold"
          @click="togglePlay"
        >
          {{ isPlaying ? "Pause" : "Play" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import endpoints from "../config"

export default {
  name: "SongPlayer",
  data() {
    return {
      isPlaying: true,
      connection: null,
      updatedSong: {},
    };
  },
  props: {
    song: {
      stream: String,
      artist_name: String,
      song_title: String,
      station_id: Number,
      covers: Object,
    },
  },

  /**
   * created life cycle hook
   * connects with the web socket server and waits for the 'UPDATE' message
   * When there is a update message, the updatedsong object is asynchronusly loaded.
   */
  created() {
    this.connection = new WebSocket(
      `${endpoints.wss}/${this.song.station_id}`
    );
    this.connection.onmessage = async() => {
      const updatedSongTask = this.fetchNewSong(this.song.station_id);
      this.updatedSong = await updatedSongTask
    };
  },

  emits: ["goback"],

  methods: {
    ...mapActions("streamData", ["fetchNewSong", "fetchChannelsList"]),

    /**
     * togglePlay method
     * toggles the audio plugin state
     */
    togglePlay() {
      if (this.isPlaying) {
        this.$refs.audioPlayer.pause();
      } else {
        this.$refs.audioPlayer.play();
      }
      this.isPlaying = !this.isPlaying;
    },

    /**
     * Click event method for Back button
     * Navigates back to the Stream list
     * re-renders the channel list
     */
    goback() {
      this.fetchChannelsList();
      this.$emit("goback");
    },
  },
};
</script>