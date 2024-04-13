import { getAccessToken } from './auth';

interface Track {
  track: {
    name: string;
    artist: string;
  };
}

interface PlaylistTracks {
  items: Track[];
}

const doApiCall = (url: string, accessToken: string): Promise<Response> => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).catch((error: any) => {
    console.error('doApiCall error', error);
    return Promise.reject(error);
  });
};

const getPlaylistTracksFromId = async (id: string): Promise<Response> => {
  const accessToken = await getAccessToken();
  console.log({ accessToken });

  const result = await doApiCall(
    `https://api.spotify.com/v1/playlists/${id}/tracks`,
    accessToken,
  );
  const tracks = await result.json();
  return tracks;
};

const getPlaylistFromId = async (id: string): Promise<Response> => {
  const accessToken = await getAccessToken();
  console.log({ accessToken });

  const result = await doApiCall(
    `https://api.spotify.com/v1/playlists/${id}?fields=name,images(url),tracks(total)`,
    accessToken,
  );
  return await result.json();
};

export const getPlaylistTracksFromUrl = (
  playlistUrl: string,
): Promise<Response> => {
  const playlistId = getPlaylistIdFromUrl(playlistUrl);
  return getPlaylistTracksFromId(playlistId);
};

export const getPlaylistFromUrl = (playlistUrl: string): Promise<Response> => {
  const playlistId = getPlaylistIdFromUrl(playlistUrl);
  return getPlaylistFromId(playlistId);
};

const getPlaylistIdFromUrl = (playlistUrl: string): string => {
  const url = new URL(playlistUrl);
  const pathnameParts = url?.pathname?.split('/');
  if (pathnameParts.length === 3 && pathnameParts[1] === 'playlist') {
    return pathnameParts[2];
  }
  throw new Error('Invalid Spotify Playlist url');
};
