<template>
  <header class="bg-white px-6 shadow-md z-50">
    <nav class="container flex py-6">
      <div class="flex items-center">
        <router-link
          class="font-semibold text-2xl text-black no-underline"
          :to="{ name: 'Home' }"
          >FireBlogs</router-link
        >
      </div>
      <div class="relative flex items-center justify-end flex-1">
        <ul class="mr-8 last:mr-0" v-show="!mobile">
          <router-link
            class="font-medium px-2 transition hover:text-blue-400"
            :to="{ name: 'Home' }"
            >Home</router-link
          >
          <router-link
            class="font-medium px-2 transition hover:text-blue-400"
            :to="{ name: 'Blogs' }"
            >Blogs</router-link
          >
          <router-link
            class="font-medium px-2 transition hover:text-blue-400"
            to="#"
            >Create Post</router-link
          >
          <router-link
            class="font-medium px-2 transition hover:text-blue-400"
            :to="{ name: 'Login' }"
            >Login/Register</router-link
          >
        </ul>
      </div>
    </nav>
    <menuIcon
      @click="toggleMobileNav"
      class="cursor-pointer absolute top-8 right-6 h-6 w-auto"
      v-show="mobile"
    />
    <transition name="mobile-nav">
      <ul
        v-show="mobileNav"
        class="p-5 w-3/6 max-w-xs flex flex-col fixed h-full bg-gray-800 top-0 left-0"
      >
        <router-link class="py-1 text-white" :to="{ name: 'Home' }"
          >Home</router-link
        >
        <router-link class="py-1 text-white" :to="{ name: 'Blogs' }"
          >Blogs</router-link
        >
        <router-link class="py-1 text-white" to="#">Create Post</router-link>
        <router-link class="py-1 text-white" :to="{ name: 'Login' }"
          >Login/Register</router-link
        >
      </ul>
    </transition>
  </header>
</template>

<script>
import menuIcon from "../assets/Icons/bars-regular.svg";
export default {
  name: "navigation",
  components: { menuIcon },
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
    },

    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 1s ease;
}
.mobile-nav-enter {
  transform: translateX(-250px);
}
.mobile-nav-enter-to {
  transform: translateX(0);
}
.mobile-nav-leave-to {
  transform: translateX(-250px);
}
</style>
