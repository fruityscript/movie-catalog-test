const vueRouter = require("vue-router");
const MovieDetailsView = require("@/views/MovieDetailsView");
const MovieCatalogView = require("@/views/MovieCatalogView");

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "movie-catalog",
      component: MovieCatalogView,
    },
    {
      path: "/movie/:id",
      name: "movie-details",
      component: MovieDetailsView,
      props: true,
    },
  ],
});

export default router;