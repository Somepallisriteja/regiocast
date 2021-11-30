import axios from 'axios'
import endpoints from '../../config'
export default {
    
  /**
  * Fetches all the channels
  * @returns Array of Channels
  * error handled as an alert
  */
  fetchChannelsList: async () => {
    let channels = []
    await axios
      .get(`${endpoints.streamService}`)
      .then((res) => {
        channels = res.data
      })
      .catch((error) => alert(error))
    return channels
  },

  /**
  * Fetches New song after an Update message
  * @param streamId - new id for fetching specific song information
  * @returns updatedSong Object.
  * error handled as an alert
  */
  fetchNewSong: async (_, streamId) => {
    let updatedSong = {}
    await axios
      .get(
        `${endpoints.irisFlow}station=${streamId}&offset=1&count=1`
      )
      .then((res) => {
        const songPrototype = res.data.result.entry[0].song.entry[0];
        updatedSong = {
          song_title: songPrototype.title,
          covers: songPrototype.cover_art_url_xl,
          artist_name: songPrototype.artist.entry[0].name,
        };
      })
      .catch((error) => alert(error))
    return updatedSong
  },
}
