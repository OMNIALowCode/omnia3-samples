module.exports = {
  stories: ['../**/*.@(mdx|stories.@(js))'],

  addons: [
    '@storybook/addon-knobs',
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true },
    },
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-webpack5-compiler-swc',
    '@chromatic-com/storybook',
  ],

  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },

  docs: {},
};
