<!doctype html>
<html lang="fa">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Arash Hatami">
    <title>Arash Hatami - Login</title>
    <link href="{{ asset('dashboard-assets/img/brand/favicon.png') }}" rel="icon" type="image/png">
    <link href="{{ asset('dashboard-assets/vendor/nucleo/css/nucleo.css') }}" rel="stylesheet">
    <link href="{{ asset('dashboard-assets/vendor/@fortawesome/fontawesome-free/css/all.min.css') }}" rel="stylesheet">
    <link href="{{ mix('dashboard-assets/css/vazir.css') }}" rel="stylesheet">
    <link href="{{ mix('dashboard-assets/css/main.css') }}" rel="stylesheet">
    <link href="{{ mix('dashboard-assets/css/arash.css') }}" rel="stylesheet">
</head>
<body class="bg-default">
<div class="main-content">
    <div class="header py-7 py-lg-8">
        <div class="container">
        </div>
    </div>
    <div class="container pb-5">
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-header bg-transparent pb-4">
                        <div class="text-muted text-center mt-2">
                            ورود به پنل مدیریت
                        </div>
                    </div>
                    <div class="card-body px-lg-5 py-lg-5">
                        @yield('content')
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('dashboard-assets/vendor/jquery/dist/jquery.min.js') }}"></script>
<script src="{{ asset('dashboard-assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js') }}"></script>
<script src="{{ mix('dashboard-assets/js/argon.min.js') }}"></script>
</body>
</html>
