<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Arash Hatami">
    <title>Arash Hatami - Dashboard</title>
    <link href="{{ asset('dashboard-assets/img/brand/favicon.png') }}" rel="icon" type="image/png">
    <link href="{{ asset('dashboard-assets/vendor/nucleo/css/nucleo.css') }}" rel="stylesheet">
    <link href="{{ asset('dashboard-assets/vendor/@fortawesome/fontawesome-free/css/all.min.css') }}" rel="stylesheet">
    <link href="{{ mix('dashboard-assets/css/vazir.css') }}" rel="stylesheet">
    <link href="{{ mix('dashboard-assets/css/main.css') }}" rel="stylesheet">
    <link href="{{ mix('dashboard-assets/css/custom.css') }}" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main"
                aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand pt-0" href="#">
            <img src="{{ asset('dashboard-assets/img/brand/blue.png') }}" class="navbar-brand-img" alt="...">
        </a>
        <ul class="nav align-items-center d-md-none">
            <li class="nav-item dropdown">
                <a class="nav-link nav-link-icon" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
                   aria-expanded="false">
                    <i class="ni ni-bell-55"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right"
                     aria-labelledby="navbar-default_dropdown_1">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
                   aria-expanded="false">
                    <div class="media align-items-center">
                        <span class="avatar avatar-sm rounded-circle">
                            <img alt="Image placeholder" src="{{ asset('dashboard-assets/img/theme/team-1-800x800.jpg') }}">
                        </span>
                    </div>
                </a>
                <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                    <div class=" dropdown-header noti-title">
                        <h6 class="text-overflow m-0">صباح الخير اويس</h6>
                    </div>
                    <a href="./examples/profile.html" class="dropdown-item">
                        <i class="ni ni-single-02"></i>
                        <span>الصفحة الشحصية</span>
                    </a>
                    <a href="./examples/profile.html" class="dropdown-item">
                        <i class="ni ni-settings-gear-65"></i>
                        <span>الأعدادات</span>
                    </a>
                    <a href="./examples/profile.html" class="dropdown-item">
                        <i class="ni ni-calendar-grid-58"></i>
                        <span>أخر الأخبار</span>
                    </a>
                    <a href="./examples/profile.html" class="dropdown-item">
                        <i class="ni ni-support-16"></i>
                        <span>مساعده</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#!" class="dropdown-item">
                        <i class="ni ni-user-run"></i>
                        <span>تسجيل خروج</span>
                    </a>
                </div>
            </li>
        </ul>
        <div class="collapse navbar-collapse" id="sidenav-collapse-main">
            <div class="navbar-collapse-header d-md-none">
                <div class="row">
                    <div class="col-6 collapse-brand">
                        <a href="./index.html">
                            <img src="{{ asset('dashboard-assets/img/brand/blue.png') }}">
                        </a>
                    </div>
                    <div class="col-6 collapse-close">
                        <button type="button" class="navbar-toggler" data-toggle="collapse"
                                data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false"
                                aria-label="Toggle sidenav">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="./index.html">
                        <i class="ni ni-tv-2 text-primary"></i>
                        داشبورد
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./examples/icons.html">
                        <i class="ni ni-planet text-blue"></i>
                        دسته بندی ها
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./examples/maps.html">
                        <i class="ni ni-pin-3 text-orange"></i>
                        پست ها
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./examples/profile.html">
                        <i class="ni ni-single-02 text-yellow"></i> الصفحه الشحصية
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./examples/tables.html">
                        <i class="ni ni-bullet-list-67 text-red"></i> الجداول
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./examples/login.html">
                        <i class="ni ni-key-25 text-info"></i> تسجيل الدخول
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./examples/register.html">
                        <i class="ni ni-circle-08 text-pink"></i> التسجيل
                    </a>
                </li>
            </ul>
            <hr class="my-3">
            <h6 class="navbar-heading text-muted">الوثائق</h6>
            <ul class="navbar-nav mb-md-3">
                <li class="nav-item">
                    <a class="nav-link"
                       href="https://demos.creative-tim.com/argon-dashboard/docs/getting-started/overview.html">
                        <i class="ni ni-spaceship"></i> إبدا الأن
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"
                       href="https://demos.creative-tim.com/argon-dashboard/docs/foundation/colors.html">
                        <i class="ni ni-palette"></i> الاساسيات
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"
                       href="https://demos.creative-tim.com/argon-dashboard/docs/components/alerts.html">
                        <i class="ni ni-ui-04"></i> الأجزاء
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div class="main-content">
    <nav class="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
        <div class="container-fluid">
            <ul class="navbar-nav align-items-center d-none d-md-flex">
                <li class="nav-item dropdown">
                    <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
                       aria-expanded="false">
                        <div class="media align-items-center">
                            <span class="avatar avatar-sm rounded-circle">
                                <img alt="Image placeholder"
                                     src="{{ asset('dashboard-assets/img/theme/team-2-800x800.jpg') }}">
                            </span>
                        </div>
                    </a>
                    <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">آرش حاتمی</h6>
                        </div>
                        <a href="./examples/profile.html" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>الحساب الشخصي</span>
                        </a>
                        <a href="./examples/profile.html" class="dropdown-item">
                            <i class="ni ni-settings-gear-65"></i>
                            <span>الأعدادات</span>
                        </a>
                        <a href="./examples/profile.html" class="dropdown-item">
                            <i class="ni ni-calendar-grid-58"></i>
                            <span>اخر الاخبار</span>
                        </a>
                        <a href="./examples/profile.html" class="dropdown-item">
                            <i class="ni ni-support-16"></i>
                            <span>مساعده</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>تسجيل خروج</span>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
    <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
        <div class="container-fluid">
            <div class="header-body">

            </div>
        </div>
    </div>
</div>
<script src="{{ asset('dashboard-assets/vendor/jquery/dist/jquery.min.js') }}"></script>
<script src="{{ asset('dashboard-assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js') }}"></script>
<script src="{{ asset('dashboard-assets/vendor/chart.js/dist/Chart.min.js') }}"></script>
<script src="{{ asset('dashboard-assets/vendor/chart.js/dist/Chart.extension.js') }}"></script>
<script src="{{ mix('dashboard-assets/js/argon.min.js') }}"></script>
</body>
</html>
