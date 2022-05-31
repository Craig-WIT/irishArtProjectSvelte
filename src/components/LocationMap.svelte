<script>
    import 'leaflet/dist/leaflet.css';
    import {LeafletMap} from '../services/leaflet-map';
    import {getContext, onMount} from "svelte";
    import {user} from "../stores.js"

    const irishArtService = getContext("IrishArtService");

    const mapConfig = {
      location: {lat: 53.160858, lng: -7.152420},
      zoom: 7,
      minZoom: 1,
    };
    
    let map = null;

    onMount(async () => {
    map = new LeafletMap("location-map", mapConfig);
    map.showZoomControl();
    map.addLayerGroup('Locations');
    map.showLayerControl();

    const loggedInUser = await irishArtService.getUserByEmail($user.email)
    const userid = loggedInUser._id;
    const locationList = await irishArtService.getUserLocations(userid);
    locationList.forEach(location => {
    addLocationMarker(location);
  });
  });

  export function addLocationMarker(location) {
    const locationStr = location.name + "<br>Latitude: " + location.lat + "<br>Longitude: " + location.lng + "<br><img src=" + location.img + ">";
    map.addMarker({lat:location.lat, lng: location.lng}, locationStr, "Locations");
    }

  export function deleteLocationMarker() {
    map.removeLayerGroup('Locations');
    }
  </script>
  
  <div class="box" id="location-map" style="height:600px">
  </div>