import { document } from 'global';
import { boolean } from '@storybook/addon-knobs';
import { ContextMock } from '../_mocks/context';
import { HttpClientMock } from '../_mocks/http-client';
import Mocks from '../_mocks/mocks.extensions';

// import component
import './thumbnail';
import mdx from './thumbnail.mdx';

const context = ContextMock();
const httpClient = HttpClientMock();
context.createApiHttpClient = Mocks.Function(httpClient);

httpClient.doGetFile = Mocks.Function(
  GetFile('https://atlas-content-cdn.pixelsquid.com/stock-images/armchair-arm-chair-6360XZ2-600.jpg'),
);
httpClient.doPostFile = Mocks.Function(UploadFile());
httpClient.doDelete = Mocks.Function(Delete());

function Delete() {
  return Promise.resolve();
}

function UploadFile() {
  Promise.resolve({});
}

function GetFile(url) {
  return new Promise(function (resolve, reject) {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(function (blob) {
        resolve({ data: blob });
        canvas = null;
      }, 'image/png');
    };
    img.src = url;
  });
}

export default {
  title: 'Data Input/Thumbnail',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const component = createElement();

  component.isReadOnly = boolean('Is read only', true);

  component.rootMetadata = Mocks.Object({ entity: 'Thumbnail' });
  component.context = context;

  component.state = Mocks.Object({ _code: 'A1', RefreshElements: true });
  component.value = 'Thumbnail/A1/image.png';
  return component;
};

Default.story = {
  name: 'default',
};

function createElement() {
  const element = document.createElement('omnia-thumbnail');
  return element;
}
