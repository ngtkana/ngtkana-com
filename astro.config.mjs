import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  site: "https://ngtkana.com",
  output: "static",
  integrations: [icon()],
  image: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
});
