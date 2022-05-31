<script>
    import {createEventDispatcher, getContext} from "svelte";
    import {location} from "../stores.js"

    const dispatch = createEventDispatcher();

    const irishArtService = getContext("IrishArtService");
  
    let title = "";
    let artist = "";
    let year = "";
    let lat = "";
    let lng = "";
    let description = "";
    let selectedCategory = "";

    let message = "Feel free to add a new artwork"

    export async function addArtwork() {
        const artworkLocation = await irishArtService.getLocationById($location.id);
        let artwork = {
        title: title,
        artist: artist,
        year: year,
        lat: lat,
        lng: lng,
        description: description,
        category: selectedCategory,
        locationid: $location.id,
        img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647904016/placeholder_opkxn0.jpg",
      };
      const success = await irishArtService.addArtwork($location.id, artwork);
        const artworkList = artworkLocation.artworks;
        if (!success) {
          message = "Artwork not added - some error occurred";
          return;
        }
        message = `Thanks! You added ${title} to list of artworks`;
        dispatch("message",{artwork: artwork});
        title = "";
        artist = "";
        year = "";
        lat = "";
        lng = "";
        description = "";
        selectedCategory = "";
      }
  </script>

<form on:submit|preventDefault={addArtwork}>
    <strong>Enter Artwork Details:</strong>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <input bind:value={title} class="input" type="text" placeholder="Enter Title" name="title" id="title">
        </div>
        <div class="field">
          <input bind:value={artist} class="input" type="text" placeholder="Enter Artist" name="artist" id="artist">
        </div>
        <div class="field">
          <input bind:value={year} class="input" type="text" placeholder="Enter Year" name="year" id="year">
        </div>
        <div class="field">
          <input bind:value={lat} class="input" type="number" placeholder="Enter Latitude" name="lat" id="lat" min="-90" max="90" step=".000001">
        </div>
        <div class="field">
          <input bind:value={lng} class="input" type="number" placeholder="Enter Longitude" name="lng" id="lng" min="-180" max="180" step=".000001">
        </div>
        <div class="field">
          <input bind:value={selectedCategory} class="input" type="text" placeholder="Select Category" list="categories" name="category" id="category">
            <datalist id="categories">
              <option value="Mural">
              <option value="Sculpture">
              <option value="Graffiti">
              <option value="Dublin Canvas Box">
              <option value="Waterford Walls">
            </datalist>
        </div>
        <div class="field">
          <input bind:value={description} class="input" type="text" placeholder="Enter Description" name="description" id="description">
        </div>
      </div>
    </div>
    <button class="button is-primary">Add Artwork</button>
    <strong>{message}</strong>
  </form>