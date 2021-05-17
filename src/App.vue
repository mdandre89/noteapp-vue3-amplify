<template>
  <Header>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/profile" v-if="status === 'signIn'">
      Profile |</router-link
    >

    <a @click="logout" v-if="status === 'signIn'">Sign Out</a>
    <router-link to="/auth" v-else>Sign In</router-link>
  </Header>
  <router-view />
</template>
<script>
import Header from "./components/Header";
import { Hub, Auth } from "aws-amplify";
import { ref } from "vue";
export default {
  components: { Header },
  setup() {
    const status = ref("");
    Auth.currentAuthenticatedUser().then(() => {
      status.value = "signIn";
    });
    Hub.listen("auth", (data) => {
      status.value = data?.payload?.event;
    });
    return {
      status,
    };
  },
  methods: {
    async logout() {
      try {
        await Auth.signOut();
      } catch (error) {
        console.log("error signing out: ", error);
      }
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
body {
  margin: 0px;
  padding: 0px;
  width: 100%;
}
p {
  margin: 0px;
}
a {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
  text-decoration: underline;
}
a.router-link-exact-active {
  color: #42b983;
}
</style>
