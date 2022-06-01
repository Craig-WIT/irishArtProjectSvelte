<script>
  import {setContext} from "svelte";
  import {IrishArtService} from "./services/irishArt-service";
  import Main from "./pages/Main.svelte"
  import About from "./pages/About.svelte"
  import Analytics from "./pages/Analytics.svelte"
  import Login from "./pages/Login.svelte"
  import Signup from "./pages/Signup.svelte"
  import Dashboard from "./pages/Dashboard.svelte";
  import Location from "./pages/Location.svelte";
  import LocationAnalytics from "./pages/LocationAnalytics.svelte";
  import Router from "svelte-spa-router";
  

  setContext("IrishArtService", new IrishArtService("https://arcane-journey-33772.herokuapp.com"));

  let routes = {
    "/": Main,
    "/login": Login,
    "/signup": Signup,
    "/logout": Main,
    "/dashboard": Dashboard,
    "/location": Location,
    "/about": About,
    "/analytics": Analytics,
    "/locationAnalytics": LocationAnalytics,

  }
</script>

<div class="container">
  <Router {routes}/>
</div>
