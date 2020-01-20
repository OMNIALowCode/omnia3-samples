# OMNIA 3 Samples

Samples repository for the OMNIA Platform version 3.

**Themes**: [Click here to get the available themes](https://github.com/OMNIALowCode/omnia3-samples/tree/master/themes)

**Languages**: [Click here to get the available languages](https://github.com/OMNIALowCode/omnia3-samples/tree/master/languages)

**Web Components**: [Click here to see the samples in action](https://omnialowcode.github.io/omnia3-samples/webcomponents/docs)

## Themes

### Adding new themes

In order to add a new theme to a tenant you need to do the following:

- Open theme's .scss file (Example: Dark Theme .scss);
- Copy all styles;
- Create a new theme in the Modeler and paste styles;
- Clean & Build, and that's it.
 
## Web Components

### Using storybook

We are using [Storybook](https://storybook.js.org/docs/basics/introduction/) to create a gallery of ready-to-use Web Components.

**If you want to develop your own Web Component** using this environment, you should:

- Clone or download the [repository](https://github.com/OMNIALowCode/omnia3-samples);
- Install the packages (inside the _webcomponents_ folder, run the command _npm install_);
- Open the _webcomponents_ folder in your code editor;
- Inside the _web-components_ folder you have all the available Web Components;
- To try it in your local machine, run the command _npm run storybook_.

**If you want to add and test a new Web Component**, you should:

- Add a new folder to the _web-components_ folder;
- Inside the Web Components's folder you must have three files:
  - \*.js: Contains the Web Component code;
  - \*.stories.js: Contains the Storybook's [stories](https://storybook.js.org/docs/guides/guide-html/#step-4-write-your-stories);
  - readme.md: The Web Component's documentation.

**Build static storybook site**

Run In the command line `npm run build-storybook`

## Documentation

You can find documentation at [https://docs.omnialowcode.com/](https://docs.omnialowcode.com/omnia3_modeler_webcomponents.html).

## Contributing

See contribution Guidelines [here](CONTRIBUTING.md).

Information about creating Web Components can be found [here](https://github.com/OMNIALowCode/omnia3-samples#web-components).

## License

OMNIA 3 Samples are available under the [MIT license](http://opensource.org/licenses/MIT).
