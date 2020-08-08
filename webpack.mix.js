const mix = require("laravel-mix");

mix.disableNotifications();

mix.js("resources/js/app.js", "public/js")
    .sass("resources/sass/app.scss", "public/css")
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
}

mix.browserSync("http://localhost:8000");
