<template>
  <div class="container">
    <form v-if="formState === 'signUp'" @submit.prevent="signUp">
      <h3>Create a new account</h3>
      <div>Username *</div>
      <input
        type="email"
        v-model="email"
        placeholder="Enter your username..."
      />
      <div>Password *</div>
      <input
        type="password"
        v-model="password"
        placeholder="Enter your password..."
      />
      <div class="container-footer">
        <p>
          Have an account?
          <span @click="toggle" class="action">Sign in</span>
        </p>
        <button>CONFIRM</button>
      </div>
    </form>
    <form v-else @submit.prevent="confirmSignUp">
      <h2>Confirm Sign Up</h2>
      <input type="text" v-model="code" placeholder="Enter the code..." />
      <button>Confirm</button>
    </form>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import { ref } from "vue";

export default {
  name: "SignUp",
  setup() {
    const email = ref("");
    const password = ref("");
    const formState = ref("signUp");
    const code = ref("");

    return {
      email,
      password,
      formState,
      code,
    };
  },

  emits: ["update-auth", "update-message"],

  methods: {
    toggle() {
      this.$emit("update-auth");
    },
    async signUp() {
      try {
        const result = await Auth.signUp({
          username: this.email,
          email: this.email,
          password: this.password,
        });
        this.formState = "confirm";
      } catch (error) {
        this.$emit("update-message", error);
      }
    },
    async confirmSignUp() {
      try {
        await Auth.confirmSignUp(this.email, this.code);
        this.$emit("update-auth");
        this.$emit(
          "update-message",
          "successfully signed up! Sign in to view the app."
        );
      } catch (error) {
        this.$emit("update-message", error);
      }
    },
  },
};
</script>