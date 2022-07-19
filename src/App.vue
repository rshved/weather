<template>
  <v-app>
    <div class="wrap container">
      <div class="mb-5 form">
        <v-text-field v-model="latitude" placeholder="Latitude"></v-text-field>
        <v-text-field v-model="longitude" placeholder="Longitude"></v-text-field>
        <v-btn @click="addNewCity(+latitude, +longitude)">Add</v-btn>
      </div>

      <div class="mb-5">
        <v-btn class="mr-5" v-if="startIndex" @click="page = page - 1">Prev</v-btn>
        <v-btn v-if="hasNextPage" @click="page = page + 1">Next</v-btn>
      </div>

      <v-row class="cards-wrap d-flex">
        <v-col v-for="city in paginatedCitiesCards" :key="city.id" col="12" class="col-sm-6">
          <CityCard :current-city="city" @delete="deleteCity"/>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import { getWeatherInfoInTheCity } from "@/api";
import { getItemFromLocalStorage, saveItemToLocalStorage } from "@/localStorageHelpers";
import CityCard from "@/components/CityCard";

export default {
  name: 'App',

  components: {
    CityCard
  },

  data: () => ({
    mainCity: {
      latitude: 35,
      longitude: 139
    },
    cities: null,
    citiesData: [],
    selectedCities: null,
    longitude: '',
    latitude: '',
    page: 1
  }),

  async mounted() {
    const windowData = Object.fromEntries(
        new URL(window.location).searchParams.entries()
    );

    if (windowData.page) {
      this.page = +windowData.page
    }

    this.cities = getItemFromLocalStorage('selected-cities')

    if (!this.cities || !this.cities.length) {
      this.cities = []
      await this.updateCitiesData(this.mainCity.latitude, this.mainCity.longitude)
      this.cities.push({
        latitude: this.mainCity.latitude,
        longitude: this.mainCity.longitude
      })
      return
    }
    for (const c of this.cities) {
      await this.updateCitiesData(c.latitude, c.longitude)
    }
  },

  computed: {
    startIndex() {
      return (this.page - 1) * 5
    },
    endIndex() {
      return this.page * 5
    },
    paginatedCitiesCards() {
      return this.citiesData.slice(this.startIndex, this.endIndex)
    },
    hasNextPage() {
      return this.citiesData.length > this.endIndex
    }
  },
  watch: {
    cities() {
      saveItemToLocalStorage('selected-cities', this.cities)
      this.longitude = ''
      this.latitude= ''
    },
    page(v) {
      window.history.pushState(
          null,
          document.title,
          `${window.location.pathname}?page=${v}`
      );
    }
  },
  methods: {
    async addNewCity(lat, long) {
      const newCity = {
        latitude: lat,
        longitude: long
      }
      this.cities.push(newCity)
      await this.updateCitiesData(lat, long)
    },
    deleteCity(e) {
      this.citiesData = this.citiesData.filter(c => c !== e)
      this.cities = this.cities.filter(c => {
        return c.latitude !== e.coord.lat && c.longitude !== e.coord.lon
      })
    },
    async updateCitiesData(lat, lon) {
      const currentCity = await getWeatherInfoInTheCity(lat, lon)
      this.citiesData.push(currentCity)
    }
  }
};
</script>

<style scoped>
.wrap {
  margin: 0 auto;
  padding: 20px;
}
.form {
  max-width: 300px;
}

</style>
