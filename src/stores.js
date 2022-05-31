import {writable} from "svelte/store";

export const user = writable({
  email: "",
  token: "",
});

export const location = writable({
  id: "",
  name: "",
  img: "",
  lat: "",
  lng: "",
});
