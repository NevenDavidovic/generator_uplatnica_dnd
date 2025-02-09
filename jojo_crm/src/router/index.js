import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";

import HomeView from "@/views/HomeView.vue";
import SignIn from "@/views/SignIn.vue";
import DashboardView from "@/views/DashboardView.vue";
import InfoPage from "@/views/InfoPage.vue";
import SlipPreview from "@/views/SlipPreview.vue";
import TrialView from "@/views/TrialView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
  },
  {
    path: "/preview",
    name: "preview",
    component: SlipPreview,
  },
  {
    path: "/trial",
    name: "trial",
    component: TrialView,
  },

  {
    path: "/info",
    name: "info",
    component: InfoPage,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.isLoading) {
    await authStore.initializeAuth(); // Ensure the auth state is loaded
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "signin" });
  } else {
    next();
  }
});

export default router;
