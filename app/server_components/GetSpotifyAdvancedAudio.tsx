interface KeyMapping {
  [key: number]: [string, string];
}
type KeyConvertFunction = (num: number, mode: number) => string;
const keyConvert: KeyConvertFunction = (num: number, mode: number): string => {
  const chart: KeyMapping = {
    '0': ['C', 'Am'],
    '1': ['D♭', 'B♭m'],
    '2': ['D', 'Bm'],
    '3': ['E♭', 'Cm'],
    '4': ['E', 'C♯m'],
    '5': ['F', 'Dm'],
    '6': ['G♭', 'E♭m'],
    '7': ['G', 'Em'],
    '8': ['A♭', 'Fm'],
    '9': ['A', 'F♯m'],
    '10': ['B♭', 'Gm'],
    '11': ['B', 'G♯m'],
  }


  if (mode === 1) {
    return chart[num][0];
  } else if (mode === 0) {
    return chart[num][1];
  } else {
    return "Unknown";
  }
}
function tempoRound(num: number): number {
  return Math.round(num * 2) / 2;
}
const valuetext = (value) => {
  return `${value} bpm`;
}

const GetSpotifyAdvancedAudio = async (token, ids) => {
  const res = await fetch(`https://api.spotify.com/v1/audio-features/?ids=${ids}`, {
    headers: {
      'Authorization': 'Bearer ' + token
    },
    cache: 'no-store',
  });

  const data = await res.json();
  const audioData = data.audio_features.map((item) => {
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