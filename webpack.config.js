const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    // Configuration React
    .enableReactPreset()
    .addEntry('app', './assets/app.js')

    // Configuration Babel
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // Configuration CSS/Sass
    .enableSassLoader()
    .enablePostCssLoader()

    // Optimisations
    .enableSingleRuntimeChunk()
    .splitEntryChunks()

    // Configuration des assets
    .configureImageRule({
        type: 'asset',
        maxSize: 4 * 1024 // 4kb
    })
    .configureDefinePlugin(options => {
        options['process.env'] = {
            NODE_ENV: JSON.stringify(Encore.isProduction() ? 'production' : 'development'),
            REACT_APP_API_URL: JSON.stringify(Encore.isProduction() ? 'https://votre-domaine.com/api' : 'http://localhost:8000/api')
        };
    })
    .addPlugin(new webpack.ProvidePlugin({
        process: 'process/browser',
    }))
    .configureFontRule({
        type: 'asset',
        maxSize: 4 * 1024 // 4kb
    })
    .configureDevServerOptions(options => {
        options.server = {
            type: 'https',
            options: {
                key: './localhost-key.pem',
                cert: './localhost.pem'
            }
        };
        options.allowedHosts = 'all';
    })
;

const config = Encore.getWebpackConfig();

// Ajout du fallback pour "process"
config.resolve = config.resolve || {};
config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    process: require.resolve('process/browser')
};

// Ajout explicite d'un alias pour "process/browser"
config.resolve.alias = {
    ...(config.resolve.alias || {}),
    'process/browser': require.resolve('process/browser')
};

module.exports = config;
