---
layout: post
title: "مدیریت خطاهای Laravel برای Restful API"
date: 2019-11-10 20:16
excerpt: "اگر با استفاده از فریموورک لاراول یک Restful API پیاده سازی می کنید ، نیازمند خطاهایی از همین جنس هم هستید ! یعنی Json"
tags: []
comments: false
---

یکی از کاربرد های فریموورک لاراول طراحی Restful API های بسیار کاربردی می باشد. در این بین همیشه احتمال رخ دادن خطاهای گوناگون وجود دارد. مشکل اینجاست که به صورت پیشفرض با یک صفحه ای گرافیکی مواجه خواهید شد. می توانیم به راحتی این صفحه را با یک مقدار JSON جایگزین کنیم.

![tooltip](/assets/img/posts/54.webp)

فرض کنید چنین تابعی را در کنترلر خود تعریف کرده اید :

```php
public function show(Request $request, $id) {
    return Article::query()->findOrFail($id);
}
```

تابع ```findOrFail``` باعث می شود که در صورت وجود خطا پروسه را متوقف کرده و مشکل نمایش داده شود.
حال باید خطاهای فریموورک را مدیریت کنیم تا به جای نمایش صفحه HTML داده ها به صورت JSON نمایش داده شوند. برای این کار باید فایل ```app/Exceptions/Handler.php``` را ویرایش کنیم : 

```php
public function render($request, Exception $exception) {
   if ($request->wantsJson()) {
       $exception = $this->prepareException($exception);
       $code = method_exists($exception, 'getStatusCode') ? $exception->getStatusCode() : $exception->getCode();
       $code = empty($code) ? 500 : $code;
       return response([
           'message' => $exception->getMessage()
       ], $code);
   }
   
   return parent::render($request, $exception);
}
```

با استفاده از عبارت ```()request->wantsJson$``` می توانیم تشخیص دهیم درخواست ارسال شده برای سرویس ما به صورت Restful API می باشد یا حالت عادی دارد.
پس از تشخیص ، خطا را مدیریت کرده و آن را در قالب یک response ساده و JSON بر می گردانیم. در غیر این صورت روند مدیریت خطا به صورت عادی انجام خواهد شد و همان صفحه HTML ساده نمایش داده می شود.
