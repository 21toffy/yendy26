// next.config.js
module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              name: 'audio/[name].[hash].[ext]',
            },
          },
        ],
      });
  
      return config;
    },
  };
  