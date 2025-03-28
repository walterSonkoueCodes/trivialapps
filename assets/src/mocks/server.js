// src/mocks/server.js
import { createServer, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
    return createServer({
        environment,

        routes() {
            this.namespace = '/api'; // Toutes les routes commenceront par /api

            // Mock pour la page d'accueil
            this.get('/home-data', () => {
                return {
                    featuredProjects: [
                        { id: 1, name: 'Site e-commerce', progress: 75 },
                        { id: 2, name: 'Application mobile', progress: 40 }
                    ],
                    services: [
                        { id: 1, name: 'Développement web', category: 'web' },
                        { id: 2, name: 'Design UI/UX', category: 'design' }
                    ]
                };
            });

            // Si aucune route ne correspond
            this.passthrough((request) => {
                return !request.url.startsWith('/api');
            });
        }
    });
}