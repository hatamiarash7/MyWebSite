@extends('auth.layout.base')

@section('content')
    <form role="form" method="POST" action="{{ route('login') }}">
        @csrf

        <div class="form-group mb-3">
            <div class="input-group input-group-alternative">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="ni ni-email-83"></i>
                    </span>
                </div>
                <input autocomplete="email" autofocus class="form-control" id="email" name="email"
                       placeholder="آدرس ایمیل" required type="email" value="{{ old('email') }}">
            </div>
        </div>
        <div class="form-group">
            <div class="input-group input-group-alternative">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="ni ni-lock-circle-open"></i>
                    </span>
                </div>
                <input autocomplete="current-password" class="form-control" id="password" name="password" placeholder="كلمه عبور"
                       required type="password">
            </div>
        </div>
        <div class="custom-control custom-control-alternative custom-checkbox">
            <input class="custom-control-input" name="remember" id="remember"
                   {{ old('remember') ? 'checked' : '' }} type="checkbox">
            <label class="custom-control-label" for="remember">
                <span class="text-muted">مرا به خاطر بسپار</span>
            </label>
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-primary my-4">ثبت</button>
        </div>
    </form>
@endsection
