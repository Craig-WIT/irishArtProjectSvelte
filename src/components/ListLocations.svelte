<script>
    import {createEventDispatcher,getContext, onMount} from 'svelte'
    import {user} from "../stores.js"
    import {push} from "svelte-spa-router"; 
  
    const irishArtService = getContext("IrishArtService");
    const dispatch = createEventDispatcher();

    let locationList = [];
    let errorMessage = "";
    let deleteHandler = null;
    let clickHandler = null;
    let loggedInUser = null;
  
    onMount(async () => {
      loggedInUser = await irishArtService.getUserByEmail($user.email)
      const userid = loggedInUser._id;
      locationList = await irishArtService.getUserLocations(userid);
    });

    export async function updateList(){
      const loggedInUser = await irishArtService.getUserByEmail($user.email)
      const userid = loggedInUser._id;
      locationList = await irishArtService.getUserLocations(userid);
    }

    async function deleteLocation(id){
        await irishArtService.deleteLocation(id);
        await updateList();
        dispatch("message");
    }

    async function openLocation(id){
        let location = await irishArtService.getLocationById(id)
    if (location) {
      push("/location");
    } else {
      errorMessage = "Error viewing artworks";
    }
    }

    async function openAnalytics(id){
      let location = await irishArtService.getLocationById(id)
    if (location) {
      push("/locationAnalytics");
    } else {
      errorMessage = "Error viewing analyics";
    }
    }

  </script>

<style>
.card {
    max-width: 300px;
    margin: 0 auto;
    margin-top: 25px;
    border-radius: 10px;
    border: 2px solid black;
}

#cardStyle{
        width: 300px;
        height: 270px;
        border-radius: 10px;
        border: 2px solid black;
    }

.card-header {
    justify-content: center;
    padding: 10px 0px;
}
</style>

{#if errorMessage}
  <div class="section">
    {errorMessage}
  </div>
{/if}
{#each locationList as location}
<div class="column is-one-quarter">
<div class="card has-background-info-light">
            <div class="card-header">
                <p class="is-size-3">
                    <b>{location.name}</b>
                </p>
  
            </div>
            <div class="card-image">
                <figure class="image">
                    <img id="cardStyle" src= {location.img} alt="Location Name">
                </figure>
            </div>
            <div class="card-content is-size-6 has-text-weight-semibold">
                <p>New Artwork: {location.title}</p>
                <p>Category: {location.category}</p>
                <p>Sculptures: {location.sculptures}</p>
                <p>Murals: {location.murals}</p>
                <p>Street Art: {location.streetArt}</p>
                <p>Added by: {loggedInUser.firstName} {loggedInUser.lastName}</p>
            </div>
  
            <div class="card-footer has-text-weight-semibold has-background-link-light">
                <button on:click={clickHandler(openLocation(location._id))} class="button card-footer-item has-text-black has-background-success-light">
                    Open
                </button>
                <button on:click={clickHandler(openAnalytics(location._id))} class="button card-footer-item has-text-black has-background-info-light">
                  Analytics
                </button>
                <button on:click={deleteHandler(deleteLocation(location._id))} class="button card-footer-item has-text-black has-background-danger-light">
                    Delete
                </button>
            </div>
        </div>
</div>
{/each}