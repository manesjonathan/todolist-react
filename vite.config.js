import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Todo App',
                short_name: 'Todo list Web App',
                start_url: './',
                display: 'standalone',
                background_color: '#ffffff',
                lang: 'fr',
                scope: './',
                icons: [
                    {
                        src: '/android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: '/android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: '/apple-touch-icon.png',
                        sizes: '180x180',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: '/favicon-16x16.png',
                        sizes: '16x16',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: '/favicon-32x32.png',
                        sizes: '32x32',
                        type: 'image/png',
                        purpose: 'any maskable',
                    }
                ],
                theme_color: '#ffffff',
            },
        }),
    ],
})
