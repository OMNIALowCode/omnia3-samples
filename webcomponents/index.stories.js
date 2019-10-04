import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

storiesOf('Introduction', module)
    .addParameters({ info: { disable: true } })
    .add('About', () => {
        return `
            <h1>OMNIA Platform</h1>
            <h3>Welcome to our Web Component playground!</h3>
            <div>
                <br />
                <p>Test all available web components.</p>
                <p>Get creative with configurations.</p>
                <p>Grab the source code and add them to your applications!</p>
                <br />
                <p>If you have any questions or need any sort of assistance, feel free to email us at <a href="mailto:support@numbersbelieve.com">support@numbersbelieve.com</a>.</p>
            </div>
        `;
    });