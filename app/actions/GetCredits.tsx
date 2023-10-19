'use server'
import React from 'react'
function getStringBeforeParenthesis(str) {
    const indexOfParenthesis = str.indexOf('(');
    if (indexOfParenthesis !== -1) {
        return str.substring(0, indexOfParenthesis).trim();
    }
    return str;
}
function normalizeString(str) {
    return str.replace(/’/g, "'");
}
function prepQuery(query) {
    return query.replace(/[^\w\s]/g, '').toLowerCase();
}
function isSongMatch(trackTitle, song) {
    const normalizedTrackTitle = prepQuery(trackTitle)
    const normalizedSong = prepQuery(song)
    const noFeatSong = normalizedSong.replace(/\(.*\)/, "").trim();
    return normalizedTrackTitle === normalizedSong ||
        normalizedTrackTitle === noFeatSong ||
        getStringBeforeParenthesis(normalizedSong) === getStringBeforeParenthesis(normalizedTrackTitle);
}

export async function GetCredits(album, artist, song) {
    album = decodeURIComponent(album);
    artist = decodeURIComponent(artist);
    song = decodeURIComponent(song)
    console.log(album, artist, song)
    const discogsToken = process.env.discogsToken;
    const discogsKey = process.env.discogsKey;
    const discogsSecret = process.env.discogsSecret;
    if (artist === 'Travis Scott') artist = 'Travis Scott(2)';
    // Get search results and any master ids
    const res = await fetch(`https://api.discogs.com/database/search?release_title=${encodeURIComponent(album)}&artist=${encodeURIComponent(artist)}`, {
        cache: 'no-store',
        headers: {
            'User-Agent': 'BpmKeyDev/1.0 +http://bpmkey.com',
            'Authorization': `Discogs key=${discogsKey}, secret=${discogsSecret}`,
        }
    });
    const result = await res.json();
    const searchResults = result.results;

    function getReleaseIds(arr, query) {
        const preppedQuery = prepQuery(query).replace(/\s+/g, '');
        return arr
            .filter(item =>
                item.uri &&
                item.uri.toLowerCase().startsWith('/release')
            )
            .map(item => {
                const parts = item.uri.split('/');
                const idPart = parts[2].split('-')[0];
                return Number(idPart);
            });
    }
    const versionsIds = getReleaseIds(searchResults, album)

    if (!versionsIds) {
        return ['no credits'];
    } else {
        //search masters 
        let found = false;
        const creditsArr = [];

        // Loop through up to 5 versionIds or until credits are found
        for (let i = 0; i < 5; i++) {

            const masterRes = await fetch(`https://api.discogs.com/releases/${versionsIds[i]}`, {
                cache: 'no-store',
                headers: {
                    'User-Agent': 'BpmKeyDev/1.0 +http://bpmkey.com',
                    'Authorization': `Discogs key=${discogsKey}, secret=${discogsSecret}`,
                }
            });
            console.log('X-Discogs-Ratelimit:', masterRes.headers.get('X-Discogs-Ratelimit'));
            console.log('X-Discogs-Ratelimit-Used:', masterRes.headers.get('X-Discogs-Ratelimit-Used'));
            console.log('X-Discogs-Ratelimit-Remaining:', masterRes.headers.get('X-Discogs-Ratelimit-Remaining'));
            const masterData = await masterRes.json();
            console.log(masterData.tracklist);
            // if (masterData.message = 'You are making requests too quickly.') {
            //   console.log(masterData.message)
            //   return ['try again soon'];
            //   // break;
            // }
            for (const track of masterData.tracklist) {
                if (track.hasOwnProperty('extraartists') && isSongMatch(track.title, song)) {
                    const crew = track.extraartists;
                    // Build the credits array
                    for (const per of crew) {
                        creditsArr.push(per.role, per.name);
                    }
                    found = true;
                    // break;  // break the inner loop
                }
            }
        }
        // Check if creditsArr is empty after all fetch attempts
        if (creditsArr.length === 0) {
            creditsArr.push('no credits');
        }
        function processCredits(credits) {
            const result = {};

            for (let i = 0; i < credits.length; i += 2) {
                const role = credits[i];
                const artist = credits[i + 1];

                // Check if artist already exists in result
                if (result[artist]) {
                    // Check if the role is not already recorded for the artist
                    if (!result[artist].role.includes(role)) {
                        result[artist].role += `, ${role}`;
                    }
                } else {
                    // Create new artist with their role
                    result[artist] = { role: role, artist_name: artist };
                }
            }

            // Convert the result object back to an array of objects
            return Object.values(result);
        }

        const processedCredits = processCredits(creditsArr);
        return processedCredits
    }
}
