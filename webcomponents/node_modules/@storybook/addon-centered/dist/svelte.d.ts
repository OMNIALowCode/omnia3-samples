/**
 * This functionality works by passing the svelte story component into another
 * svelte component that has the single purpose of centering the story component
 * using a wrapper and container.
 *
 * We use the special element <svelte:component /> to achieve this.
 *
 * @see https://svelte.technology/guide#svelte-component
 */
export default function (storyFn: () => any): {
    Component: any;
    props: any;
    on: any;
    Wrapper: any;
    WrapperData: {
        /** @type {string} */
        style: string;
        /** @type {string} */
        innerStyle: string;
    };
};
