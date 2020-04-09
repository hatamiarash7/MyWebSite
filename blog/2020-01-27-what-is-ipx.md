---
id: ipx
author: آرش حاتمی
author_title: DevOps - Network Eng
author_url: https://github.com/hatamiarash7
author_image_url: https://avatars1.githubusercontent.com/u/16325641?v=4
title: "پروتکل IPX چیست ؟"
tags: [network, ipx, spx, ipx/spx, novell, شبکه, پروتکل, مسیر یابی شبکه]
---

![tooltip](/img/blog/66.webp)

تبادل بسته بین‌ شبکه‌ ای ( Internetwork Packet Exchange ) یا IPX یک پروتکل لایه شبکه بر اساس مدل OSI در پشته پروتکل آی‌ پی‌ اکس / اس‌ پی‌ اکس می باشد. پشته پروتکل IPX/SPX در سیستم‌ عامل نت‌ ویر شرکت ناول پشتیبانی می‌ گردد.

<!--truncate-->

### پروتکل IPC/SPX

پروتکل IPC/SPX یکی از قدرتمند ترین ها در شبکه می باشد و در مقایسه با پروتکل NetBOIS، هیچ کدام از نقاظ ضعف آن را ندارد ولی وجود قابلیت TCP/IP، میزان استفاده از پروتکل IPX/SPX را کمتر کرده است. قابل ذکر است که در نسخه های ۴ و ۵ سیستم های Novell می توان از پروتکل TCP/IP نیز استفاده کرد. پرتکل IPX/SPX جزء پرتکل های مسیر پذیر می باشد و از آن در نسخه های اولیه نت وار استفاده شده است. پیکربندی پروتکل مسیر پذیر IPX/SPX در مقایسه با پیکربندی پروتکل NetBEUI، دشوار تر می باشد و باید برای پیکربندی آن با موضوعات پیکربندی مانند نوع فریم و شماره شبکه آشنا باشید.

![tooltip](/img/blog/67.webp)

### شماره شبکه

به شماره ایی گفته می شود که به سگمنت شبکه ناول اختصاص می یابد و یک شماره با ارز عددی مبنای ۱۶ یا حداکثر هشت رقم است.

### نوع فریم

به نوعی قالب بندی از بسته که در شبکه مورد استفاده قرار می گیرد گفته می شود. اطمینان حاصل کردن از این موضوع مهم است که پیکربندی تمامی سیستم های شبکه برای فریم همسان می باشد؛ برای نمونه هنگام وصل شدن به سروی شماره یک که از فریم نوع ۸۰۲/۲ می باشد، لازم است تا از پیاده سازی تنظیمات خود بر مبنای فریم نوع ۸۰۲/۲ مطمئن شویم، در غیر این صورت امکان برقراری ارتباط با سرور شماره یک را نخواهیم داشت.

در سال های اخیر پیکربندی و تنظیمات پروتکل IPX/SPX آسان تر شده است و دلیل آن هم این است که سیستم عامل های شرکت مایکروسافت به صورت خودکار با نوع فریم تنظیم می شوند از این رو امکان شناسایی نوع فریم استفاده شده در شبکه توسط پروتکل IPX/SPX فراهم می شود و این پروتکل خود را بر مبنای آن پیکربندی می کند.

![tooltip](/img/blog/68.webp)

با وجود پاسخگو بودن پروتکل IPX در مقابل مسیردهی بسته ها، انتقالی است که نمی توان به آن اتکا کرد و بدون ارتباط می باشد. منظور از غیر قابل اتکا بودن یعنی این که بسته های IPX بدون این که درخواستی از مقصد معلوم برای تایید دریافت صورت گیرد، به آن مقصد فرستاده می شوند. منظور از بودن ارتباط نیز یعنی این که هیچ گونه نشستی بین ارسال کننده و دریافت کننده، قبل از ارسال داده ها برگزار نمی گردد. پروتکل SPX در مقابل تحول مطمئن بسته ها مسولیت پذیر می باشد به گونه ایی که اگر بسته ها از سوی مقصد مشخص شده دریافت نشوند، آن ها مجددا بفرستد.

### مهم ترین ویژگی های IPX/SPX

-   پیکربندی نسبتا ساده Simple Configuration
-   در هر ابعادی از شبکه، کوچک یا بزرگ قابل استفاده می باشد
-   Any Scale of Network دارای قابلیت مسیریابی می باشد
-   حق انتخاب در انتقال اطلاعات به طور عادی (CL) یا سفارشی (CO) می باشد
-   (Connection Oriented (SPX) & Connection less Services (IPX
-   اغلب در محیط هایی که سیستم‌ عامل های قدیمی Novell یافت می‌ شوند، مورد استفاده قرار می گیرند
-   Old Novell Netware Networks

![tooltip](/img/blog/69.webp)

## پروتکل هایی که در این مجموعه فعالیت می کنند

### پروتکل SAP

پروتکل SAP یا Service Advertisement Protocol به منظور انجام پروسه های مختلفی از جمله عمومی کردن سرویس های IPX و همچنین File and Print Server ها مورد استفاده قرار می گیرد.

### پروتکل NCP

پروتکل NCP یا Netware Core Protocol برای عملکرد و فعالیت سرور ها استفاده می شود، در نتیجه هنگامی که سرویسی را ارائه کنیم با استفاده از این پروتکل ارائه می دهیم و از پروتکل SAP به منظور فهماندن این موضوع به کلاینت که این سرویس ها وجود دارند استفاده می شود که در حقیقت کار تبلیغ را انجام می دهد و سرویس بوسیله NCP ارائه می گردد.

### پروتکل IPX

پروتکل IPX یا Internetwork Packet Exchange به منظور برقراری ارتباط سریع و ارتباط غیراتصال گرا یا Connectionless مورد استفاده قرار می گیرد. به این معنی که در هنگام قطع شدن اتصال دوباره متصل نمی شود و وضعیت اتصال پایداری ندارد. به عنوان نمونه در حال ارسال ۱۰ بسته از داده ها هستید ولی در هنگام ارسال بسته شماره ۹ اتصال قطع می شود، در این وضعیت اگر دوباره متصل شوید ارسال بسته ها از ۱ شروع خواهد شد.

### پروتکل SPX

پروتکل SPX یا Sequential Packet Exchange پروتکلی است که وظیفه تضمین ارسال و دریافت بسته های اطلاعات را همانند پروتکل TCP بر عهده دارد. عملکرد این پروتکل برعکس پروتکل IPX می باشد یعنی اگر هنگام ارسال بسته ها اتصال قطع گردد، زمانی که دوباره اتصال برقرار شود از همان بسته ایی که اتصال در زمان فرستادن آن قطع شده است شروع به ارسال می کند.

### پروتکل NLSP

پروتکل NLSP یا Netware Link Service Protocol مانند پروتکل OSPF و پروتکل RIP در مجموعه پروتکل های TCP/IP می باشد که وظیفه آن پیدا کردن مناسب ترین مسیر برقراری ارتباط است.

### پروتکل RIP

پروتکل RIP یا Routing Information Protocol هماههند پروتکل قبلی مورد استفاده قرار می گیرد.

### پروتکل LSL

پروتکل LSL یا Link Support Laye به منظور برقراری ارتباط در میان پروتکل های لایه های بالاتر OSI و کارت شبکه استفاده می شود. در حقیقت یک میانجی و رابط می باشد.

### پروتکل MLID

پروتکل MLID یا Multiple Link Interface Driver نیز به منظور ایجاد یکپارچگی پروتکل LSL با لایه های بالاتر استفاده می شود.