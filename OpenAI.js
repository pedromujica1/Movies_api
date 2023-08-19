// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQBtApAcpA_kDAXBnCKoTkQeEBgDaWwnjlKxgtFls0URmLHtTM3m_fnto4evHv97FSar7DuIJhBSuOCgfx1o7WHOmk6Dohc4O8AphB0nm8sw3wjg5BOCp_2PKNQz8CzfM5PJsiPg2NJOA7C1qVXD1gpeBeoGVwWx0yHTL5FMrtfiQFZWkY0JpoFjM5haydk5aqSvUoEtCMAhM9q0gfSJ7XQrcHsQkeilT2TY8rtyjLCyR6hIck4stJ02MMtKCig08TDEceTC-on42lbS8sGm5mS0';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);