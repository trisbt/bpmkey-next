const GetAccessToken = async () => {
  const client_id = process.env.client_id;
  const client_secret = process.env.client_secret;
  const authOptions = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials'
  };

  const res = await fetch(authOptions.url, {
    method: authOptions.method,
    headers: authOptions.headers,
    body: authOptions.body,
    next:{
      revalidate: 3600,
    }
  });

  if (!res.ok) {
    throw new Error('Spotify API access token not valid');
  }
  const data = await res.json();
  return data.access_token;
}

export default GetAccessToken;