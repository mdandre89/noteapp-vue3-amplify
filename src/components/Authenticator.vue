<template>
  <div class="authenticator">
    <div class="update-message">
      {{ message }}
    </div>
    <div class="auth">
      <sign-up
        :toggle="toggle"
        v-if="formState === 'signUp'"
        @update-auth="toggle"
        @update-message="updateMessage"
      ></sign-up>
      <sign-in
        v-if="formState === 'signIn'"
        @update-auth="toggle"
        @update-message="updateMessage"
      ></sign-in>
    </div>
  </div>
</template>
<script>
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Auth } from "aws-amplify";

export default {
  name: "AuthPage",
  setup() {
    const router = useRouter();
    Auth.currentAuthenticatedUser()
      .then(() => {
        router.push("/profile");
      })
      .catch((e) => {
        console.log(e);
      });
    const formState = ref("signIn");
    const message = ref("");

    const toggle = () => {
      formState.value === "signUp"
        ? (formState.value = "signIn")
        : (formState.value = "signUp");
    };

    const updateMessage = (e) => {
      message.value = e;
      setTimeout(() => {
        message.value = "";
      }, 5000);
    };

    return {
      formState,
      toggle,
      message,
      updateMessage,
    };
  },
  components: {
    SignUp,
    SignIn,
  },
};
</script>
<style scoped>
:deep(form) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 40px;
  max-width: 380px;
  margin: 0 auto;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.19), 0 2px 4px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
}
:deep(input) {
  flex: 1;
  padding: 16px;
  margin: 0px 0px 20px 0;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgb(196, 196, 196);
  border-radius: 3px;
}
:deep(.input:focus) {
  outline: none;
  border-color: rgb(255, 153, 0);
}
:deep(.container-footer) {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  align-items: center;
}
:deep(.action) {
  color: rgb(255, 153, 0);
  cursor: pointer;
}
:deep(.action:hover) {
  text-decoration: underline;
}
:deep(button) {
  background-color: rgb(255, 153, 0);
  color: white;
  letter-spacing: 0.75px;
  padding: 16px;
  border: none;
  cursor: pointer;
  min-width: 120px;
  border-radius: 2px;
}
:deep(button:hover) {
  background-color: rgbA(245, 153, 0, 0.8);
}
:deep(.update-message) {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
