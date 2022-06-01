<script>
    import {LeafletMap} from '../services/leaflet-map';
    import {getContext, onMount} from 'svelte'
    import {location} from "../stores.js"

    const irishArtService = getContext("IrishArtService");
    let artworkList = [];

    const mapConfig = {
      location: {lat: $location.lat, lng: $location.lng},
      zoom: 12,
      minZoom: 1,
    };
    
    let map = null;

    onMount(async () => {
    map = new LeafletMap("artwork-map", mapConfig);
    map.showZoomControl();
    map.addLayerGroup('Artworks');
    map.showLayerControl();
    

    const activeLocation = await irishArtService.getLocationById($location.id);
    artworkList = activeLocation.artworks;
    artworkList.forEach(artwork => {
    addArtworkMarker(artwork);
  });
  });

  export function addArtworkMarker(artwork) {
    const artworkStr = artwork.title + "<br>Lat: " + artwork.lat + "<br>Lng: " + artwork.lng + "<br>Artist: " + artwork.artist + "<br>Year: " + artwork.year + "<br><img src=" + artwork.img + ">";
    map.addMarker({lat:artwork.lat, lng: artwork.lng}, artworkStr, "Artworks");
    }

  export function deleteArtworkMarker() {
    map.removeLayerGroup('Locations');
    }

  export function moveMap(lat,lng) {
    map.moveTo(17, {lat: lat, lng: lng});
    }
    
  </script>
  
  <div class="box" id="artwork-map" style="height:600px">
  </div>