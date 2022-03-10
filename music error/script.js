const elementById = (id) => {
  return document.getElementById(id);
};

const handleSearch = () => {
  const keyword = elementById("keyword");
  
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  // console.log(keyword.value);
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));
};

const showArtists = (data) => {
  const artistContainer = elementById("artists");
  // console.log(artistContainer);
  data?.artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb ? artist.strArtistThumb : "https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : "Not Available"}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : "Not Available"}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com//api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showAlbum(data));
  const artistContainer = elementById("artists");
  artistContainer.innerHTML = "";
};

const showAlbum = (data) => {
  const albumContainer = elementById("albums");
  console.log(data.album);
  console.log(data.album.strAlbumStripped);
  data.album.forEach((item) => {
    console.log(item);
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${item.strAlbumThumb ? item.strAlbumThumb : "https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${item.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
