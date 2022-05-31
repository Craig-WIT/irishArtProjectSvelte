<script>
  import WelcomeMenu from "../components/WelcomeMenu.svelte";
  import {getContext} from "svelte";

  const irishArtService = getContext("IrishArtService");
  irishArtService.logout();
</script>

<WelcomeMenu/>

<div class="columns is-vcentered ">
  <div class="column has-text-centered is-size-3">
    <h> Welcome to the Irish Art Project!</h><br>
    <h> Sign up or Log in...</h>
  </div>
  <div class="column">
    <img alt="locationImage" id="locationImage" src="https://res.cloudinary.com/dtf6gxvaq/image/upload/v1647901390/x8japkecd7txleryvg9t.jpg">
  </div>
</div>

