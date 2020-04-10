---
id: laravel-jdf
title: Laravel JDF
sidebar_label: Persian Date / Time
keywords:
    - laravel
    - jdf
    - laravel date
    - persian date
    - laravel persian date
---

با استفاده از این کتابخانه به راحتی می توانید از تاریخ فارسی در پروژه لاراول خود استفاده کنید

## نصب

دستور زیر را اجرا نمایید

```
composer require hatamiarash7/jdf
```

در نسخه 5.5 به بعد لاراول کتابخانه ها به صورت خودکار تشخیص داده می شوند. در صورتی که از نسخه های قدیمی استفاده می کنید ، ServiceProvider را به صورت دستی به فایل `config/app.php` اضافه کنید

## استفاده

```php
use Hatamiarash7\JDF\Generator;

$jdf = new Generator();
```

جهت دریافت تاریخ فعلی از دستور زیر استفاده نمایید

```php
$date = $jdf->getTimestamp(); // Output : ۱۳۹۷/۱۱/۰۲ - ۰۰:۳۸
```

جهت تبدیل تاریخ عددی به متنی از دستور زیر استفاده نمایید

```php
$finalDate = $jdf->jdate_words(['ss'=>1390, 'mm'=>5, 'rr'=>20]);
// Output :
    [
        'ss' => 'هزار و سیصد و نود' ,
        'mm' => 'مرداد' ,
        'rr' => 'بیست'
    ]
```

توجه کنید که مقدار برگشتی به صورت آرایه می باشد
