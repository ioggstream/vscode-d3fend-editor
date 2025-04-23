export const iconPackConfig = [
    {
        prefix: 'logos',
        pack: '@iconify-json/logos',
    },
    {
        prefix: 'mdi',
        pack: '@iconify-json/mdi',
    },
    {
        prefix: 'material-symbols',
        pack: '@iconify-json/material-symbols',
    },
];

// Load the icon subfolders from the @iconify-json package.
export const requireIconPack = require.context(
    '@iconify-json',
    true,
    /^\.\/(logos|mdi|material-symbols)$/,
);