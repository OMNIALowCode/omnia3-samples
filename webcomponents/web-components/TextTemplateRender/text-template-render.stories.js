import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { text, object } from '@storybook/addon-knobs';
import { ContextMock } from '../_mocks/context';
import { HttpClientMock } from '../_mocks/http-client';
import Mocks from '../_mocks/mocks.extensions';
// import component
import './text-template-render';
import readme from './readme.md';
// context
const context = ContextMock();
const httpClient = HttpClientMock();
httpClient.doPost = Mocks.Function(
    Promise.resolve({
        data: new Blob([`
        <div>
            <div class="jumbotron">
                <h1 class="display-4">Hello, world!</h1>
                <p class="lead">Suspendisse potenti. Fusce scelerisque orci lorem, in volutpat leo vehicula et. Nam bibendum eros nec semper tempor.</p>
                <hr class="my-4">
                <p class="text-warning">
                    This is only for demonstration purpose.<br />
                    Note: Text template parameters won't be rendered.
                </p>
                <a class="btn btn-primary btn-lg" href="#" role="button">Proin vel</a>
            </div>
        </div>
    `], { type: 'text/html' })
    })
);
context.createApiHttpClient = Mocks.Function(httpClient);

storiesOf('Text Template render', module)
    .add('default', () => {
        const component = createElement();

        component.context = context;
        component.identifier = text('Identifier', 'MyTextTemplate');
        component.parameters = object('Parameters', initialValue);

        return component;

    }, { notes: readme });


function createElement() {
    const element = document.createElement('omnia-text-template-render');
    return element;
}

const initialValue = {
    parameter1: '',
    parameter2: ''
}