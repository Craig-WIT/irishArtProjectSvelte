<script>
  import {getContext, onMount} from 'svelte'
  import {location} from "../stores.js"

  const irishArtService = getContext("IrishArtService");
  let artworkList = [];
  let deleteHandler = null;

  onMount(async () => {
    const activeLocation = await irishArtService.getLocationById($location.id);
    artworkList = activeLocation.artworks;
  });

  export async function updateList(){
    const activeLocation = await irishArtService.getLocationById($location.id);
    artworkList = activeLocation.artworks;
    }

    async function deleteArtwork(id){
        await irishArtService.deleteArtwork(id);
        await updateList();
    }
</script>

{#each artworkList as artwork}
<div class="column is-one-quarter">
          <div class="card has-background-info-light">
            <div class="card-header has-text-centered">
                <p class="is-size-4">
                    <b>{artwork.title}</b>
                </p>
  
            </div>
            <div class="card-image">
                <figure class="image">
                  <img id="cardStyle" src= {artwork.img} alt="Artwork Name">
                </figure>
            </div>
            <div class="card-content has-text-weight-semibold">
                <p>{artwork.artist}</p>
                <p>{artwork.category}</p>
                <p>{artwork.year}</p>
                <p>{artwork.description}</p>
            </div>
  
            <div class="card-footer has-text-weight-semibold has-background-link-light">
                <button class="button card-footer-item has-text-black has-background-success-light">
                    Add Image
                </button>
                <button on:click={deleteHandler(deleteArtwork(artwork._id))} class="button card-footer-item has-text-black has-background-danger-light">
                    Delete
                </button>
            </div>
        </div>
</div>
{/each}