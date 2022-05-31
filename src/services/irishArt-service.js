import axios from "axios";
import {user,location} from "../stores";

export class IrishArtService {
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    const irishArtCredentials = localStorage.irishArt;
    if (irishArtCredentials) {
      const savedUser = JSON.parse(irishArtCredentials);
      user.set({
        email: savedUser.email,
        token: savedUser.token,
      });
      axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) {
        user.set({
          email: email,
          token: response.data.token,
        });
        localStorage.irishArt = JSON.stringify({email: email, token: response.data.token});
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async logout() {
    user.set({
      email: "",
      token: "",
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("irishArt");
  }

  async signup(firstName, lastName, email, password) {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      await axios.post(this.baseUrl + "/api/users", userDetails);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getUserById(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getUserByEmail(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/userByEmail/" + id);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getLocations() {
    try {
      const response = await axios.get(this.baseUrl + "/api/locations");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getLocationById(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/locations/" + id);
        location.set({
          id: id,
          name: response.data.name,
          img: response.data.img,
          lat: response.data.lat,
          lng: response.data.lng,
        });
        console.log(response.data)
        return response.data;
      }
    catch (error) {
      return [];
    }
  }

  async getUserLocations(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/locations/" + id + "/user");
      location.set({
        id: id,
        name: response.data.name,
        img: response.data.img,
        lat: response.data.lat,
        lng: response.data.lng,
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async addLocation(location) {
    try {
      const response = await axios.post(this.baseUrl + "/api/locations", location);
      return response.status == 201;
    } catch (error) {
      return [];
    }
  }

  async deleteLocation(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/locations/" + id);
      return response.status == 204;
    } catch (error) {
      return [];
    }
  }

  async addArtwork(id, artwork) {
    try {
      const response = await axios.post(this.baseUrl + "/api/locations/" + id + "/artworks", artwork);
      return response.status == 201;
    } catch (error) {
      return [];
    }
  }

  async deleteArtwork(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/artworks/" + id);
      return response.status == 204;
    } catch (error) {
      return [];
    }
  }
}
