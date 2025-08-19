/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: "/",
    src: "/dist",
  },
  devOptions: {
    tailwindConfig: "./tailwind.config.js",
    port: 3000,
  },
  plugins: [
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-postcss",
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
