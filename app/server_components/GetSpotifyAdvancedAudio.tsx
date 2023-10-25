import { keyConvert, tempoRound, valuetext } from "../utils";
import { AdvancedAudioItem } from "../types/serverTypes";

const GetSpotifyAdvancedAudio = async (token: string, ids: string[]) => {
  const res = await fetch(`https://api.spotify.com/v1/audio-features/?ids=${ids}`, {
    headers: {
      'Authorization': 'Bearer ' + token
    },
    // cache: 'no-store',
  });

  const data = await res.json();
  const audioData = data.audio_features.map((item: AdvancedAudioItem) => {
    if (item) {
      const key = keyConvert(item.key, item.mode);
      const tempo = tempoRound(item.tempo);
      const { loudness, energy, acousticness, analysis_url, danceability, duration_ms, instrumentalness, liveness, time_signature, track_href, uri, valence } = item
      return {
        key,
        tempo,
        loudness,
        energy,
        acousticness,
        analysis_url,
        danceability,
        duration_ms,
        instrumentalness,
        liveness,
        time_signature,
        track_href,
        uri,
        valence,
      };
    } else {
      return {};
    }
  });
  return audioData;
}

export default GetSpotifyAdvancedAudio;