<template>
  <div>
    <!-- Stream list visualization block -->
    <div v-if="!isPlayerVisible">
      <div class="text-yellow-300 font-bold text-center text-2xl mb-7 mt-3">
        Regiocast MusiQ
      </div>
      <div
        v-for="(song, index) in channelsList"
        :key="song.station_id"
        class="flex flex-row justify-between mb-4 cursor-pointer"
        @click="playSong(index)"
      >
        <div>
          <span class="text-yellow-300">{{ song.stream }}</span>
          <br />
          <span class="text-gray-200 text-xs">{{ song.song_title }}</span>
        </div>
        <div>
          <img
            class="max-h-12 rounded"
            :src="song.stream_logo"
            alt="songImage"
          />
        </div>
      </div>
    </div>

    <!-- Song player component -->
    <div v-if="isPlayerVisible">
      <SongPlayer
        :song="channelsList[currentSongIndex]"
        @goback="isPlayerVisible = !isPlayerVisible"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import SongPlayer from "./SongPlayer.vue";
export default {
  name: "StreamList",
  data() {
    return {
      isPlayerVisible: false,
      currentSongIndex: 0,
      channelsList: [],
    };
  },
  components: {
    SongPlayer,
  },
  /**
   * beforemount life cycle hook
   * asynchronusly fetches the channels list
   */
  async beforeMount() {
    const channelsTask = this.fetchChannelsList();
    this.channelsList = Object.values(await channelsTask);
  },

  methods: {
    ...mapActions("streamData", ["fetchChannelsList"]),

    /**
     * Plays the song using a common audio plugin
     * Method gets called on button click event
     */
    playSong(index) {
      this.currentSongIndex = index;
      this.isPlayerVisible = true;
    },
  },
};
</script>