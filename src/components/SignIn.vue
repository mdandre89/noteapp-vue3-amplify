<template>
  <div class="container">
    <form @submit.prevent="login">
      <h3>Sign in to your account</h3>
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
          No account? <span @click="toggle" class="action">Create account</span>
        </p>
        <button>SIGN IN</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import { ref } from "vue";

export default {
  name: "SignIn",
  setup() {
    const email = ref("");
    const password = ref("");

    return {
      email,
      password,
    };
  },

  emits: ["update-auth", "update-message"],

  methods: {
    toggle() {
      this.$emit("update-auth");
    },
    async login() {
      try {
        await Auth.signIn(this.email, this.password);
        this.$emit("update-message", "Successfully logged in");
        this.$router.push("/profile");
      } catch (error) {
        this.$emit("update-message", error.message);
      }
    },
  },
};
</script>
