export const iconPacks = [
    {
        name: 'logos',
        loader: () => import('@iconify-json/logos').then(m => m.icons),
    },
    {
        name: 'mdi',
        loader: () => import('@iconify-json/mdi').then(m => m.icons),
    },
    {
        name: 'symbols',
        loader: () => import('@iconify-json/material-symbols').then(m => m.icons),
    },
    {
        name: 'carbon',
        loader: () => import('@iconify-json/carbon').then(m => m.icons),
    },
];  
