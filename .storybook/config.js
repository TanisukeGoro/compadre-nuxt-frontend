import { configure } from '@storybook/vue';

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);

export default {
    head: {
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP|PT+Sans&display=swap' }
        ]
    }
};
