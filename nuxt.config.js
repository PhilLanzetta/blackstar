import axios from 'axios'
import getAxiosConfig from './axiosConfig'

const sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

const dynamicRoutes = async () => {
  let routes = []

  const axiosConfig = getAxiosConfig(process.env.CMS_URL, process.env.BASE_URL)
  const settingsResponse = await axios.get(`${axiosConfig.cmsUrl}/wp-json/blackstar/v1/settings`)

  const settings = settingsResponse.data


  const postCategories = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/categories?per_page=99&hide_empty=true`, axiosConfig.config)
  const postCategoriesRoutes = postCategories.data.map((category) => {
    return {
      route: '/news/' + category.slug,
      payload: {
        category,
        settings
      }
    }
  })

  await sleep(1000)

  const postCategoryPageRoutes = []

  for (const category of postCategories.data) {
    const pagedCategoryPosts = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/posts?per_page=6&categories=${category.id}`, axiosConfig.config)

    await sleep(1000)

    const postCategoryPages = pagedCategoryPosts.headers['x-wp-totalpages']
    let postCategoryCurrentPage = 1

    while (postCategoryCurrentPage < postCategoryPages) {
      postCategoryCurrentPage++

      postCategoryPageRoutes.push({
        route: `/news/${category.slug}/page/${postCategoryCurrentPage}`,
        payload: {
          posts: pagedCategoryPosts.data,
          totalPages: postCategoryPages,
          settings
        }
      })
    }
  }
  await sleep(1000)

  const postTags = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/tags?per_page=99&hide_empty=true`, axiosConfig.config)
  const postTagsRoutes = postTags.data.map((tag) => {
    return {
      route: '/news/tagged/' + tag.slug,
      payload: {
        tag,
        settings
      }
    }
  })

  const postTagsPageRoutes = []

  for (const tag of postTags.data) {
    const postTagsPagePosts = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/posts?per_page=6&tags=${tag.id}`, axiosConfig.config)
    await sleep(1000)

    const postTagPages = postTagsPagePosts.headers['x-wp-totalpages']
    let postTagCurrentPage = 1

    while (postTagCurrentPage < postTagPages) {
      postTagCurrentPage++

      postTagsPageRoutes.push({
        route: `/news/tagged/${tag.slug}/page/${postTagCurrentPage}`,
        payload: {
          posts: postTagsPagePosts.data,
          totalPages: postTagPages,
          settings
        }
      })
    }
  }
  await sleep(1000)
  const posts = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/posts?routes&single`, axiosConfig.config)
  const postRoutes = posts.data.map((post) => {
    return {
      route: '/news/' + post.categories[0].slug + '/' + post.slug,
      payload: {
        post,
        settings
      }
    }
  })
  await sleep(1000)

  const pagedPosts = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/posts?per_page=6`, axiosConfig.config)

  const postPages = pagedPosts.headers['x-wp-totalpages']
  const postPageRoutes = []
  let currentPage = 1

  while (currentPage < postPages) {
    currentPage++

    postPageRoutes.push({
      route: `/news/page/${currentPage}`,
      payload: {
        posts: pagedPosts.data,
        totalPages: postPages,
        settings
      }
    })
  }
  await sleep(1000)

  const singleBios = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/biography?routes&has_single_page=1`, axiosConfig.config)
  const singleBioRoutes = singleBios.data.map((post) => {
    return {
      route: '/about/' + post.slug,
      payload: {
        post,
        settings
      }
    }
  })
  await sleep(1000)

  const flexiblePages = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/pages?routes&flexible=1`, axiosConfig.config)
  const flexiblePageRoutes = flexiblePages.data.map((post) => {
    return {
      route: (post.parent ? `/${post.parent_slug}/${post.slug}` : `/${post.slug}`),
      payload: {
        post,
        settings
      }
    }
  })
  await sleep(1000)

  let currentFestivalEventPage = 1
  const pagedFestivalEvents = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/festival-event?per_page=50&singular=1&page=${currentFestivalEventPage}`, axiosConfig.config)
  const totalFestivalEventPages = pagedFestivalEvents.headers['x-wp-totalpages']
  let festivalEventRoutes = pagedFestivalEvents.data.map((post) => {
    return {
      route: '/festival/events/' + post.slug,
      payload: {
        post,
        settings
      }
    }
  })
  currentFestivalEventPage++

  while (currentFestivalEventPage < totalFestivalEventPages) {
    currentFestivalEventPage++
    await sleep(1000)

    const festivalEvents = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/festival-event?per_page=50&singular=1&page=${currentFestivalEventPage}`, axiosConfig.config)
    const newFestivalEventRoutes = festivalEvents.data.map((post) => {
      return {
        route: '/festival/events/' + post.slug,
        payload: {
          post,
          settings
        }
      }
    })
    festivalEventRoutes = festivalEventRoutes.concat(newFestivalEventRoutes)
  }

  await sleep(1000)

  const festivalFilms = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/festival-film?routes&singular=1`, axiosConfig.config)
  const festivalFilmRoutes = festivalFilms.data.map((post) => {
    return {
      route: '/festival/films/' + post.slug,
      payload: {
        post,
        settings
      }
    }
  })
  await sleep(1000)

  const festivalVenues = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/festival-venues?per_page=99`, axiosConfig.config)
  const festivalVenueRoutes = festivalVenues.data.map((post) => {
    return {
      route: '/festival/venues/' + post.slug,
      payload: {
        post,
        settings
      }
    }
  })
  await sleep(1000)

  const festivalNews = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/festival-post/?routes`, axiosConfig.config)
  const festivalNewsRoutes = festivalNews.data.map((post) => {
    return {
      route: `/festival/news/${post.slug}`,
      payload: {
        post,
        settings
      }
    }
  }).filter((post) => {
    return !(post && post.acf && post.acf.redirect_to)
  })
  await sleep(1000)

  const pagedFestivalNews = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/festival-post?per_page=7&orderby=featured`, axiosConfig.config)

  const festivalNewsPages = pagedFestivalNews.headers['x-wp-totalpages']
  const festivalNewsPageRoutes = []
  let currentFestivalNewsPage = 1

  while (currentFestivalNewsPage < festivalNewsPages) {
    currentFestivalNewsPage++

    festivalNewsPageRoutes.push({
      route: `/festival/news/page/${currentFestivalNewsPage}`,
      payload: {
        settings
      }
    })
  }
  await sleep(1000)

  const opportunities = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/opportunity?routes&singular=1`, axiosConfig.config)
  const opportunitiesRoutes = opportunities.data.map((post) => {
    return {
      route: '/opportunities/' + post.slug,
      payload: {
        post,
        settings
      }
    }
  })
  await sleep(1000)

  const programEvents = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/program-event?routes&flexible=1`, axiosConfig.config)
  const programEventsRoutes = programEvents.data.map((post) => {
    return {
      route: `/events/${post.program_type.slug}` + (post.parent ? `/${post.parent_slug}/${post.slug}` : `/${post.slug}`),
      payload: {
        post,
        settings
      }
    }
  })

  const programEventsPageRoutes = []

  if (programEventsRoutes.length > 6) {
    await sleep(1000)

    const pagedProgramEvents = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/program-event?per_page=6&page=2`, axiosConfig.config)
    const programEventPages = pagedProgramEvents.headers['x-wp-totalpages']
    currentPage = 1

    while (currentPage < programEventPages) {
      currentPage++

      programEventsPageRoutes.push({
        route: `/events/page/${currentPage}`,
        payload: {
          settings
        }
      })
    }
  }
  await sleep(1000)

  const seenIssues = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/seen-issue?per_page=99`, axiosConfig.config)
  const seenIssueRoutes = seenIssues.data.map((issue) => {
    return {
      route: '/seen/read/' + issue.slug,
      payload: {
        issue,
        settings
      }
    }
  })

  const seenIssuePageRoutes = []
  for (const issue of seenIssues.data) {
    await sleep(1000)

    const pagedSeenIssueArticles = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/seen-article?per_page=6&seen-issue=${issue.id}`, axiosConfig.config)
    const seenArticleIssuePages = pagedSeenIssueArticles.headers['x-wp-totalpages']
    currentPage = 1

    while (currentPage < seenArticleIssuePages) {
      currentPage++

      seenIssuePageRoutes.push({
        route: `/seen/read/${issue.slug}/page/${currentPage}`,
        payload: {
          settings
        }
      })
    }
  }
  await sleep(1000)

  const seenCategories = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/seen-category?per_page=99`, axiosConfig.config)
  const seenCategoryRoutes = seenCategories.data.map((category) => {
    return {
      route: '/seen/category/' + category.slug,
      payload: {
        category,
        settings
      }
    }
  })

  const seenCategoryPageRoutes = []
  for (const category of seenCategories.data) {
    await sleep(1000)

    const pagedSeenCategoryArticles = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/seen-article?per_page=6&seen-category=${category.id}`, axiosConfig.config)
    const seenArticleCategoryPages = pagedSeenCategoryArticles.headers['x-wp-totalpages']
    currentPage = 1

    while (currentPage < seenArticleCategoryPages) {
      currentPage++

      seenCategoryPageRoutes.push({
        route: `/seen/category/${category.slug}/page/${currentPage}`,
        payload: {
          settings
        }
      })
    }
  }
  await sleep(1000)

  const seenAuthors = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/seen-author?per_page=99`, axiosConfig.config)
  const seenAuthorRoutes = seenAuthors.data.map((author) => {
    return {
      route: '/seen/author/' + author.slug,
      payload: {
        author,
        settings
      }
    }
  })

  const seenAuthorPageRoutes = []
  for (const author of seenAuthors.data) {
    await sleep(1000)

    const pagedSeenAuthorArticles = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/seen-article?per_page=6&seen-author=${author.id}`, axiosConfig.config)
    const seenArticleAuthorPages = pagedSeenAuthorArticles.headers['x-wp-totalpages']
    currentPage = 1

    while (currentPage < seenArticleAuthorPages) {
      currentPage++

      seenAuthorPageRoutes.push({
        route: `/seen/author/${author.slug}/page/${currentPage}`,
        payload: {
          settings
        }
      })
    }
  }

  await sleep(1000)

  const seenArticles = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/seen-article?routes&single`, axiosConfig.config)
  const seenArticleRoutes = seenArticles.data.map((post) => {
    return {
      route: '/seen/read/' + post.issue.slug + '/' + post.slug,
      payload: {
        post,
        settings
      }
    }
  })

  const seenArticlePageRoutes = []
  if (seenArticleRoutes.length > 6) {
    await sleep(1000)

    const pagedSeenArticles = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/seen-article?per_page=6&page=2`, axiosConfig.config)
    const seenArticlePages = pagedSeenArticles.headers['x-wp-totalpages']
    currentPage = 1

    while (currentPage < seenArticlePages) {
      currentPage++

      seenArticlePageRoutes.push({
        route: `/seen/read/page/${currentPage}`,
        payload: {
          settings
        }
      })
    }
  }

  await sleep(1000)

  const lumenSeasons = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/lumen-season?per_page=99`, axiosConfig.config)
  const lumenSeasonRoutes = lumenSeasons.data.map((post) => {
    return {
      route: '/manylumens/' + post.slug,
      payload: {
        post,
        settings
      }
    }
  })

  await sleep(1000)

  const lumenEpisodes = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/lumen-episode?routes&single`, axiosConfig.config)
  const lumenEpisodeRoutes = lumenEpisodes.data.map((post) => {
    return {
      route: '/manylumens/' + post.season.slug + '/' + post.slug,
      payload: {
        post,
        settings
      }
    }
  })
  await sleep(1000)

  const archiveItems = await axios.get(`${axiosConfig.cmsUrl}/wp-json/wp/v2/archive-item?routes&single`, axiosConfig.config)
  const archiveItemRoutes = archiveItems.data.map((post) => {
    return {
      route: '/archive/' + post.acf.year.slug + '/' + post.slug,
      payload: {
        post,
        settings
      }
    }
  })

  routes = routes.concat(flexiblePageRoutes)
  routes = routes.concat(postCategoriesRoutes)
  routes = routes.concat(postCategoryPageRoutes)
  routes = routes.concat(postTagsRoutes)
  routes = routes.concat(postTagsPageRoutes)
  routes = routes.concat(postRoutes)
  routes = routes.concat(singleBioRoutes)
  routes = routes.concat(postPageRoutes)
  routes = routes.concat(seenIssueRoutes)
  routes = routes.concat(seenIssuePageRoutes)
  routes = routes.concat(seenCategoryRoutes)
  routes = routes.concat(seenCategoryPageRoutes)
  routes = routes.concat(seenAuthorRoutes)
  routes = routes.concat(seenAuthorPageRoutes)
  routes = routes.concat(seenArticleRoutes)
  routes = routes.concat(seenArticlePageRoutes)
  routes = routes.concat(festivalEventRoutes)
  routes = routes.concat(festivalFilmRoutes)
  routes = routes.concat(festivalVenueRoutes)
  routes = routes.concat(festivalNewsRoutes)
  routes = routes.concat(festivalNewsPageRoutes)
  routes = routes.concat(opportunitiesRoutes)
  routes = routes.concat(programEventsRoutes)
  routes = routes.concat(programEventsPageRoutes)
  routes = routes.concat(lumenSeasonRoutes)
  routes = routes.concat(lumenEpisodeRoutes)
  routes = routes.concat(archiveItemRoutes)

  return routes
}

export default {
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
    cmsUrl: process.env.CMS_URL || "/",
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "BlackStar Film Festival",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "",
      },
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
    ],
    script: [
      {
        src: "https://js.stripe.com/v3/",
        body: false,
      },
      {
        src: "https://festival.blackstarfest.org/loader.js",
        body: false,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/global.css", "~/assets/css/components/sponsor.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~/plugins/v-visibility.client.js",
      ssr: false,
    },
    {
      src: "~/plugins/vue-awesome-swiper.client.js",
      ssr: false,
    },
    {
      src: "~plugins/rellax.client.js",
      ssr: false,
    },
    "~/plugins/axios-config.js",
    "~/plugins/filters.js",
    {
      src: "~plugins/directives.client.js",
      ssr: false,
    },
    {
      src: "~plugins/add-to-calendar.client.js",
      ssr: false,
    },
    {
      src: "~plugins/iframe-resizer.client.js",
      ssr: false,
    },
    {
      src: "~/plugins/lottie",
      mode: "client",
      ssr: false,
    },
    {
      src: "~/plugins/aos.client.js",
      mode: "client",
      ssr: false,
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    "~/components",
    "~/components/global",
    "~/components/animation",
    "~/components/layouts",
    "~/components/layouts/partials",
    "~/templates",
  ],
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/svg",
    [
      "nuxt-lazy-load",
      {
        images: true,
        videos: true,
        audios: true,
        iframes: false,
        native: true,
        polyfill: false,
        directiveOnly: false,
        defaultImage: "/images/default-image.jpg",
        loadingClass: "isLoading",
        loadedClass: "isLoaded",
        appendClass: "lazyLoad",
      },
    ],
    [
      "nuxt-mq",
      {
        defaultBreakpoint: "sm",
        breakpoints: {
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
          xxl: 1536,
        },
      },
    ],
    [
      "nuxt-gmaps",
      {
        key: process.env.GMAP,
      },
    ],
    "cookie-universal-nuxt",
    "@nuxtjs/sitemap",
    "@nuxtjs/gtm",
  ],

  gtm: {
    enabled: true,
    id: "GTM-5HXVR9J",
  },

  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.resolve.alias.vue = "vue/dist/vue.common";
    },
    extractCSS: true,
  },
  generate: {
    dir: "dist",
    routes: dynamicRoutes,
    fallback: true,
    interval: 1000,
  },
  sitemap: {
    hostname: process.env.BASE_URL,
  },
  hooks: {
    sitemap: {
      generate: {
        async before(nuxt, sitemapOptions) {
          const axiosConfig = getAxiosConfig(
            process.env.CMS_URL,
            process.env.BASE_URL
          );

          const redirects = await axios.get(
            `${axiosConfig.cmsUrl}/wp-json/blackstar/v1/redirects`,
            axiosConfig.config
          );

          let excludedRoutes = redirects.data
            .filter((redirect) => {
              return redirect.enabled;
            })
            .map((redirect) => {
              return redirect.match_url;
            });

          excludedRoutes = excludedRoutes.concat([
            "/preview/archive-item",
            "/preview/festival-event",
            "/preview/gallery",
            "/preview/lumen-episode",
            "/preview/opportunity",
            "/preview/page",
            "/preview/post",
            "/festival/films",
            "/preview/program-event",
            "/preview/seen-article",
            "/preview/festival-film",
            "/preview/festival-post",
            "/festival/events/suppressed",
          ]);

          sitemapOptions[0].filter = ({ routes }) => {
            return routes.filter(
              (route) => !excludedRoutes.includes(route.url)
            );
          };
        },
      },
    },
  },
};
