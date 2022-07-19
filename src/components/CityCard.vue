<template>
  <v-card v-if="currentCity" min-width="300px" class="pa-4">
    <header class="text-center font-weight-bold">
      <h3>{{ currentCity.weather[0]?.main }}</h3>
      <img :src="currentCity.weather[0]?.icon" :alt="currentCity.weather[0]?.description" height="70px">

      <p>{{ currentCity.name }}</p>
      <p>{{ currentCity.sys.country }}</p>
    </header>
    <main class="font-weight-medium">
      <p>Wind:</p>
      <p>Speed: {{ currentCity.wind.speed }}</p>
      <p>Degree: {{ currentCity.wind.deg }}</p>
      <p>Gust: {{ currentCity.wind.gust }}</p>
    </main>
    <footer class="d-flex justify-end">
      <v-btn @click="$emit('delete', currentCity)"><v-icon>mdi-trash-can-outline</v-icon>Delete</v-btn>
    </footer>
  </v-card>
</template>

<script>
export default {
  name: 'CityCard',
  props: {
    currentCity: {
      type: Object
    }
  }
}
</script>