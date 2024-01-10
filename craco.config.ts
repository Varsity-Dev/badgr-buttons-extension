import type { CracoConfig, Configure, WebpackContext } from "@craco/types";
import type { Configuration } from "webpack";

const cracoConfig: CracoConfig = {
  webpack: {
    configure(config, context) {
      const extendedConfig: Configure<Configuration, WebpackContext> = {
        ...config,
        entry: {
          main: [
            context.env === "development" &&
              require.resolve("react-dev-utils/webpackHotDevClient"),
            context.paths?.appIndexJs,
          ]
            .filter(Boolean)
            .toString(),

          /**
           *  Chrome Content Scripts
           */
          content: "./src/chromeServices/DOMEvaluator.ts",
        },
        output: {
          ...config.output,
          filename: "static/js/[name].js",
        },
        optimization: {
          ...config.optimization,
          runtimeChunk: false,
        },
      };
      return extendedConfig;
    },
  },
};

export default cracoConfig;
