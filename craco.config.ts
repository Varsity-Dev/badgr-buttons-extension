import type {
  CracoConfig,
  Configure,
  WebpackContext,
  CracoDevServerConfig,
} from "@craco/types";
import type { Configuration } from "webpack";

const cracoConfig: CracoConfig = {
  webpack: {
    configure(config, context) {
      const extendedConfig: Configure<Configuration, WebpackContext> = {
        ...config,
        entry: {
          // TODO: configure package 'react-dev-utils/webpackHotDevClient'
          main: [context.paths?.appIndexJs].filter(Boolean).toString(),

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
  devServer(config, context) {
    const devServerConfig: CracoDevServerConfig = {
      ...config,
      // hot: "only",
    };
    return devServerConfig;
  },
};

export default cracoConfig;
