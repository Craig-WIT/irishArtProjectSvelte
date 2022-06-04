<script>
    import Menu from "../components/Menu.svelte";
    import ListArtworks from "../components/ListArtworks.svelte";
    import ArtworkForm from "../components/ArtworkForm.svelte";
    import ArtworkMap from "../components/ArtworkMap.svelte";
    import {location} from "../stores.js"
    import {getContext} from 'svelte'

    const irishArtService = getContext("IrishArtService");
    let listArtworks = null;
    let artworkMap = null;
    let imageFile, fileinput;

    const onFileSelected =(e)=>{
    let image = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                 imageFile = e.target.result
            };
    console.log(image)
    uploadImage($location.id,image)
    }

    async function uploadImage(id,image){
      await irishArtService.uploadImage(id,image)
    }

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

  #icon{
      width: 80px;
      height: 80px;
  }
  </style>

<Menu/>
<section class="section columns is-vcentered">
  <div class="title column has-text-centered">
      <p>{$location.name}</p>
  </div>
    <div class="column">
        {#if imageFile}
        <img id="cardStyle" class="avatar" src="{imageFile}" alt="d" /><br>
        {:else}
        <img id="cardStyle" src= {$location.img} alt="Location Name"><br>
        {/if}
        <img id="icon" class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
        <div class="chan" on:click={()=>{fileinput.click();}}>Choose Image</div>
        <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
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