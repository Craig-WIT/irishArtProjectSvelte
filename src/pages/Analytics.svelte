<script>
// @ts-nocheck

    import Menu from "../components/Menu.svelte";
    import Chart from "svelte-frappe-charts";
    import {getContext, onMount} from "svelte";
    import {user} from "../stores.js"

    const irishArtService = getContext("IrishArtService");
  
    let data = {
    labels: ["Mural","Sculpture","Graffiti","Dublin Canvas Box","Waterford Walls"],
    datasets: [
      {
        values: [0, 0, 0, 0, 0]
      }
    ]
  };

  onMount(async () => {
    const loggedInUser = await irishArtService.getUserByEmail($user.email)
    const userid = loggedInUser._id;
    const locationList = await irishArtService.getUserLocations(userid);
    locationList.forEach(location => {
        console.log(location)
        let artworkList = location.artworks;
        artworkList.forEach(artwork => {
            if (artwork.category == "Mural") {
        data.datasets[0].values[0] += 1
      } else if (artwork.category == "Sculpture") {
        data.datasets[0].values[1] += 1
      } else if (artwork.category == "Graffiti") {
        data.datasets[0].values[2] += 1
      } else if (artwork.category == "Dublin Canvas Box") {
        data.datasets[0].values[3] += 1
      } else if (artwork.category == "Waterford Walls") {
        data.datasets[0].values[4] += 1
      }
    })
    })
  });
  </script>
  
  <Menu/>
  
  <div class="columns">
    <div class="column box has-text-centered">
      <h1 class="title is-4">All Locations: Number of Artworks by Category</h1>
      <Chart data={data} type="pie" />
    </div>
  </div>

  <div class="columns">
    <div class="column box has-text-centered">
      <h1 class="title is-4">All Locations: Number of Artworks by Category</h1>
      <Chart data={data} type="line" />
    </div>
  </div>