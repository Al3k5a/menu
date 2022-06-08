<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" clipped fixed app color="secondary">
      <v-list nav>
        <v-list-item
          v-for="(item, i) in sidebar"
          :key="i"
          :to="item.to"
          router
          class="mx-1"
          active-class="deep-orange lighten-5 primary--text font-weight-bold"
        >
          <v-list-item-action class="m-0 ml-1 mr-5">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left clipped-right fixed app>
      <v-hover v-slot="{ hover }">
        <v-avatar
          color="primary"
          size="40"
          :class="{ 'cursor-pointer': hover }"
          @click="toggleDrawer"
          ><span class="white--text font-weight-bold">A</span></v-avatar
        >
      </v-hover>
      <div class="ml-3">
        <div>
          <h5 class="text-uppercase text--secondary text-small">BRAND NAME</h5>
        </div>
        <div><span class="font-weight-bold">All Stores</span></div>
      </div>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-outline</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn @click="logout">Logout</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <div class="px-7 py-8 fill-height">
        <Nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { sidebar } from "~/static/sidebar";
export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: true,
      sidebar,
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      try {
        this.$router.push("/login");
      } catch (err) {}
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>
