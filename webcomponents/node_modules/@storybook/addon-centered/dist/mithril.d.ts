/** @jsx m */
import { ComponentTypes } from 'mithril';
export default function (storyFn: () => ComponentTypes): {
    view: () => JSX.Element;
};
