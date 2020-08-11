const mix = require("laravel-mix");

mix.disableNotifications();

mix
    .sass(
        'resources/sass/vazir.scss',
        'public/dashboard-assets/css/vazir.css'
    )
    .sass(
        'resources/sass/dashboard/argon.scss',
        'public/dashboard-assets/css/main.css'
    )
    .sass(
        'resources/sass/dashboard/arash.scss',
        'public/dashboard-assets/css/arash.css'
    )
    .copyDirectory(
        'resources/fonts/nucleo',
        'public/dashboard-assets/fonts/nucleo'
    )
    .copyDirectory(
        'resources/vendor',
        'public/dashboard-assets/vendor'
    )
    .copyDirectory(
        'resources/img/dashboard',
        'public/dashboard-assets/img'
    )
    .copy(
        'resources/js/dashboard/argon.min.js',
        'public/dashboard-assets/js/argon.min.js'
    )
    .sourceMaps();

mix.options({
    postCss: [
        require("autoprefixer")({
            grid: "autoplace"
        })
    ]
});

if (mix.inProduction()) {
    mix.version();
} else {
    mix.browserSync({
        watch: true,
        open: true,
        proxy: "http://localhost:8000",
        files: [
            'app/**/*',
            'resources/views/**/*',
            'routes/**/*'
        ]
    });
}
