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
      <div class="nav-links relative flex items-center justify-end flex-1">
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
            :to="{ name: 'CreatePost' }"
            >Create Post</router-link
          >
          <router-link
            v-if="!user"
            class="font-medium px-2 transition hover:text-blue-400"
            :to="{ name: 'Login' }"
            >Login/Register</router-link
          >
        </ul>
        <div
          class="profile"
          ref="profile"
          @click="toggleProfileMenu"
          v-if="user"
        >
          <span>{{ this.$store.state.profileInitials }}</span>
          <div class="profile-menu" v-show="profileMenu">
            <div class="info">
              <p class="initials">{{ this.$store.state.profileInitials }}</p>
              <div class="right">
                <p>
                  {{
                    this.$store.state.profileFirstName +
                      " " +
                      this.$store.state.profileLastName
                  }}
                </p>
                <p>{{ this.$store.state.profileUsername }}</p>
                <p>{{ this.$store.state.profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <userIcon class="icon" />
                  <p>profile</p>
                </router-link>
              </div>
              <div @click="signOut" class="option">
                <signOutIcon class="icon" />
                <p>Sign Out</p>
              </div>
            </div>
          </div>
        </div>
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
        <router-link class="py-1 text-white" :to="{ name: 'CreatePost' }"
          >Create Post</router-link
        >
        <router-link
          v-if="!user"
          class="py-1 text-white"
          :to="{ name: 'Login' }"
          >Login/Register</router-link
        >
      </ul>
    </transition>
  </header>
</template>

<script>
import menuIcon from "../assets/Icons/bars-regular.svg";
import userIcon from "../assets/Icons/user-alt-light.svg";
import signOutIcon from "../assets/Icons/sign-out-alt-regular.svg";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "navigation",
  components: { menuIcon, userIcon, signOutIcon },
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      profileMenu: false,
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
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) this.profileMenu = !this.profileMenu;
    },
    signOut() {
      firebase.auth().signOut();
      // window.location.reload();
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  nav {
    .nav-links {
      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;
        span {
          pointer-events: none;
        }
        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;
            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }
            .right {
              flex: 1;
              margin-left: 24px;
              p:nth-child(1) {
                font-size: 14px;
              }
              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }
          .options {
            padding: 15px;
            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              .icon {
                width: 18px;
                height: auto;
              }
              p {
                font-size: 14px;
                margin-left: 12px;
              }
              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
    }
    .mobile-user-menu {
      margin-right: 40px;
    }
  }
  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }
  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;
    .link {
      padding: 15px 0;
      color: #fff;
    }
  }
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
}
</style>
