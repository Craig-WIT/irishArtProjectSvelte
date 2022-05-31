<script>
    import {createEventDispatcher, getContext} from "svelte";
    import {user} from "../stores.js"

    const dispatch = createEventDispatcher();

    const irishArtService = getContext("IrishArtService");
  
    let name = "";
    let lat = "";
    let lng = "";

    let message = "Feel free to add a new location"

    export async function addLocation() {
      const loggedInUser = await irishArtService.getUserByEmail($user.email)
      const userid = loggedInUser._id;
        const location = {
        name: name,
        lat: lat,
        lng: lng,
        img: "https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647904016/placeholder_opkxn0.jpg",
        userid: userid,
        artworks: [],
      };
        const success = await irishArtService.addLocation(location);
        const locationList = await irishArtService.getLocations(userid);
        if (!success) {
          message = "Location not added - some error occurred";
          return;
        }
        message = `Thanks! You added ${name} to list of locations`;
        dispatch("message",{location: location});
        name = "";
        lat = "";
        lng = "";
      }
  </script>

<form on:submit|preventDefault={addLocation}>
    <div class="box box-link-hover-shadow has-background-info-light">
    <strong>Enter Location Details:</strong>
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <input bind:value={name} class="input" type="text" placeholder="Enter Title" name="name" id="name">
          </div>
          <div class="field">
            <input bind:value={lat} class="input" type="number" placeholder="Enter Latitude" name="lat" id="lat" min="-90" max="90" step=".000001">
          </div>
          <div class="field">
            <input bind:value={lng} class="input" type="number" placeholder="Enter Longitude" name="lng" id="lng" min="-180" max="180" step=".000001">
          </div>
        </div>
      </div>
      <button class="button is-primary">Add Location</button>
      <strong>{message}</strong>
    </div>
</form>
