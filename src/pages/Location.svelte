<script>
    import Menu from "../components/Menu.svelte";
    import ListArtworks from "../components/ListArtworks.svelte";
    import ArtworkForm from "../components/ArtworkForm.svelte";
    import ArtworkMap from "../components/ArtworkMap.svelte";
    import {location} from "../stores.js"

    let listArtworks = null;
    let artworkMap = null;

    async function artworkAdded(event) {
    listArtworks.updateList();
    artworkMap.addArtworkMarker(event.detail.artwork);
    }

    async function moveMap(event){
      artworkMap.moveMap(event.detail.artwork.lat,event.detail.artwork.lng)
    }

</script>

<style>  
  #cardStyle{
      width: 300px;
      height: 270px;
      border-radius: 10px;
      border: 2px solid black;
  }
  </style>

<Menu/>
<section class="section columns is-vcentered">
  <div class="title column has-text-centered">
      <p>{$location.name}</p>
  </div>
    <div class="column">
        <img id="cardStyle" src= {$location.img} alt="Location Name">
    </div>
</section>
<section class="section">
  <div class="container">
  <div class="columns is-4 is-variable is-multiline">
    <ListArtworks bind:this={listArtworks}  on:message={moveMap}/>
  </div>
  </div>
</section>
<section>
  <div class="#mapid" id="mapid"></div>
  <ArtworkForm on:message={artworkAdded}/>
  <ArtworkMap bind:this={artworkMap}/>
</section>