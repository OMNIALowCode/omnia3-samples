import Mocks from './mocks.extensions';

export default class RequestHandler {
    constructor(endpointSettings) {
        this.settings = endpointSettings;

        this.doGet = this.doGet.bind(this);
        this.doPost = this.doPost.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.doPatch = this.doPatch.bind(this);
        this.doGetFile = this.doGetFile.bind(this);
        this.doPostFile = this.doPostFile.bind(this);
    }

    doGet(url, prefer = PreferHeader.MINIMAL, additionalHeaders = {}) {
        return Mocks.Function();
    }

    doPost(url, requestObject, etag, prefer = PreferHeader.MINIMAL, additionalHeaders = {}) {
        return Mocks.Function();
    }

    doDelete(url, etag, additionalHeaders = {}) {
        return Mocks.Function();
    }

    doPatch(url, requestObject, etag, prefer = PreferHeader.MINIMAL, additionalHeaders = {}) {
        return Mocks.Function();
    }

    doGetFile(url, contentType, additionalHeaders = {}) {
        return Mocks.Function();
    }

    doPostFile(url, file, additionalHeaders = {}) {
        return Mocks.Function();
    }
}

export const PreferHeader = {
    FULL: 'representation',
    MINIMAL: 'minimal',
}


export const HttpClientMock = () => new RequestHandler(Mocks.Object());