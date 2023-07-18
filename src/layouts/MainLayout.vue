<template>
  <q-layout view="hhh lpR fFf">
    <q-header class="bg-transparent q-py-lg">
      <q-toolbar style="max-width: 1200px" class="center">
        <q-toolbar-title style="max-width: 1600px" class="center text-h5">
          <a style="width: 25%" @click="goHome()" class="logo" href="/">
            <q-avatar>
              <img src="book.png" alt="BookWise Logo" />
            </q-avatar>
            BookWise
          </a>
        </q-toolbar-title>
        <!-- <a href="#/feedback" class="feedbackBtn">
          <q-chip
            clickable
            no-caps
            rounded
            label="Feedback"
            class="feedbackBtn"
            outline
            color="secondary"
          />
        </a> -->
        <!-- light mode dark mode toggle -->
        <q-toggle
          v-model="dark"
          checked-icon="dark_mode"
          color="accent"
          unchecked-icon="light_mode"
          keep-color
          @click="toggleMode"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { useQuasar } from "quasar";

export default {
  data() {
    return {
      dark: true,
    };
  },
  mounted() {
    const $q = useQuasar();
    this.dark = this.getModeFromStorage();
    if (this.dark) {
      this.$q.dark.set(true);
    } else {
      this.$q.dark.set(false);
    }
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    toggleMode() {
      this.$q.dark.toggle();
      this.dark = this.$q.dark.isActive;
      this.storeModeInStorage();
    },
    storeModeInStorage() {
      window.localStorage.setItem("darkMode", JSON.stringify(this.dark));
    },
    getModeFromStorage() {
      const storedMode = window.localStorage.getItem("darkMode");
      return storedMode ? JSON.parse(storedMode) : false;
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@500&family=Golos+Text&display=swap");
body {
  font-family: "Golos Text", sans-serif;
}
.center {
  margin: 0 auto;
}
.logo {
  cursor: pointer;
  font-family: "Fira Sans", sans-serif;
  color: var(--q-accent);
  text-decoration: none;
}
.bigFont {
  font-family: "Fira Sans", sans-serif;
  text-decoration: none;
}
.signinBtn {
  font-family: "Fira Sans", sans-serif;
  text-decoration: none;
}
.premiumChip {
  background: linear-gradient(90deg, #4084e6, #ff0970);
  color: white;
  font-family: "Fira Sans", sans-serif;
}
.feedbackBtn {
  font-family: "Fira Sans", sans-serif;
  text-decoration: none;
}
.nodecor {
  text-decoration: none;
}
</style>
