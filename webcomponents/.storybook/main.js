module.exports = {
  stories: ['../**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-knobs',
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true },
    },
  ],
};
