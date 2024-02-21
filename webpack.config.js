// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
      // Add file-loader for audio files
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              name: '[name].[hash].[ext]',
            },
          },
        ],
      });
  
      // You might want to exclude audio files from server-side rendering
      if (isServer) {
        config.externals.push('react-audio-player');
      }
  
      return config;
    },
  };
  