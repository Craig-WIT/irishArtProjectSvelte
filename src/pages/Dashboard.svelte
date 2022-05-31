<script>
    import Menu from "../components/Menu.svelte";
    import ListLocations from "../components/ListLocations.svelte";
    import LocationForm from "../components/LocationForm.svelte";
    import LocationMap from "../components/LocationMap.svelte";

    let listLocations = null;
    let locationMap = null;

    async function locationAdded(event) {
    listLocations.updateList();
    locationMap.addLocationMarker(event.detail.location);
  }

    async function locationDeleted(){
    locationMap.deleteLocationMarker();
    }
</script>

<Menu/>
<section class="section">
  <div class="container">
  <div class="columns is-4 is-variable is-multiline">

    <ListLocations bind:this={listLocations} on:message={locationDeleted}/>

  </div>
  </div>
</section>
<section>

     <LocationForm on:message={locationAdded}/>
     <LocationMap bind:this={locationMap}/>

</section>