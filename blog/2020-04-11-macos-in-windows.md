---
id: macos-in-windows
author: آرش حاتمی
author_title: DevOps - Network Eng
author_url: https://github.com/hatamiarash7
author_image_url: https://avatars1.githubusercontent.com/u/16325641?v=4
title: "مجازی سازی MacOS در ویندوز"
tags:
    [
        macos,
        windows,
        windows 10,
        virtual,
        virtualization,
        virtual macos,
        مجازی سازی,
        مک او اس,
        ویندوز,
    ]
---

در این پست در مورد نحوه نصب سیستم عامل MacOS به صورت مجازی صحبت می کنیم. اگر قصد تجربه کردن این سیستم عامل روی لپ تاپ غیر Apple را دارید ، این مطلب براتون خیلی مفیده.

![tooltip](/img/blog/77.webp)

<!--truncate-->

سیستم عامل MacOS به طور انحصاری برای دیوایس های کمپانی اپل طراحی شده است و مسلما تنها از همان سخت افزار های تعریف شده پشتیبانی می کند. از این رو نصب این سیستم عامل روی دستگاه های دیگه اصلا کار راحتی نیست و در خیلی موارد امر محالی به نظر میاد. با مراجعه به فروم ها و سایت های مختلف مشاهده می کنید که حتی اگر موفق به نصب این سیستم عامل هم بشید مواردی از قبیل وای فای ، کارت صدا ، خروجی های تصویر و ... از کار می افتند.

تنها روش معقولی که برای این کار باقی مانده است نصب به صورت مجازی است. همانند خیلی از سیستم عامل های دیگر که روی سرور ها یا حتی ورک استیشن ها و سیستم های معمولی نصب می شوند می توانید MacOS را نیز از طریق مجازی ساز های محبوبی مانند VMware یا VirtualBox نصب کنید.

## پیش نیاز ها

قبل از اینکه به توضیح روش نصب بپردازیم ، لازمه که فایل های مربوطه رو دانلود کنید. مسلما در اولین مرحله نیاز به خود سیستم عامل دارید. جهت تهیه فایل اصلی سیستم عامل 2 راه پیش روی شما قرار داره :

-   با استفاده از یک دستگاه Apple که سیستم عامل MacOS هم روش نصبه فایل رو از AppStore دانلود کنید و اونو به صورتی قابل استفاده برای مجازی سازی تبدیل کنید.

-   فایل از پیش آماده شده رو دانلود کنید !

شکی نیست که فایل آماده ساده تر و سریع تره ولی همونطور که خودتون هم حدس زدید ، این فایل ها به ازای هر سیستم عامل یک بار ساخته و منتشر شده ان و زیاد به روز نیستن ! توی این مطلب هم فعلا از همین روش استفاده می کنیم و در آینده شاید به توضیح روش اول هم پرداختم.

:::danger
هنگام دانلود ، حتما نسخه مربوط به پردازنده خودتون رو استفاده کنید

Intel HFS / APFS
:::

## دانلود فایل ها

-   [Mojave 10.14.4](https://drive.google.com/drive/folders/1fygnTmfvRDLg_V3naDIa1Ko-EQc1rVBV)
-   [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
-   [VirtualBox Extension Pack](https://download.virtualbox.org/virtualbox/6.0.6/Oracle_VM_VirtualBox_Extension_Pack-6.0.6.vbox-extpack)

## ساخت ماشین مجازی

پس از دریافت فایل ها ابتدا VirtualBox را نصب کنید و حتما Extension Pack مربوطه هم روی اون نصب کنید. یکی از مشکلات رایجی که به وجود میاد کار نکردن موس و کیبورده که با نصب این بسته مشکل کاملا حل میشه.

خب ... VirtualBox رو باز کنید و یک ماشین جدید بسازید. حالت Expert رو فعال کنید.

-   برای ماشین یک نام انتخاب کنید ( این نام خیلی مهمه چون بعدا باهاش کار داریم ).
-   از لیست های بعدی Mac OS X و macOS 10.13< or 14 > High Sierra (64-bit) رو انتخاب کنید.
-   با استفاده از نوار کشویی میزان RAM رو تخصیص بدید. پیشنهاد میکنم حداقل 4 گیگابایت رم تنظیم کنید تا سیستم عامل با مشکل سرعت مواجه نشه.

![tooltip](/img/blog/70.webp)

-   در قسمت بعد گزینه Use an existing virtual hard disk file انتخاب کنید و فایل سیستم عاملی که در قبل دانلود کردید رو بهش بدید ( با فرمت vmdk )

![tooltip](/img/blog/71.webp)

## تنظیمات

پس از اینکه ماشین ساخته شد به تنظیمات مراجعه کنید و مراحل زیر رو انجام بدید :

-   در قسمت System و Motherboard گزینه Floppy رو غیرفعال کنید :)) این سیستم عامل مسلما فلاپی نداره

![tooltip](/img/blog/73.webp)

-   در قسمت System و Processor تعداد هسته مورد نظر رو برای پردازنده تنظیم کنید. اگر پردازنده قوی مثل i7 یا i9 دارید پیشنهاد میکنم تعداد هسته بیشتری هم برای سیستم عامل تنظیم کنید تا پردازش و کار راحت تر باشه. در این بخش حتما تیک Enable PAE/NX باید فعال باشه.

![tooltip](/img/blog/72.webp)

-   در قسمت Display و Screen حافظه گرافیکی رو روی بیشتری حد بذارید

![tooltip](/img/blog/74.webp)

-   در قسمت Storage گزینه Use Host I/O Cache رو فعال کنید.

تا اینجا تنظیمکات ماشین مجازی انجام شده ولی لازمه تا یه سری تغییرات دیگه هم ایجاد کنیم که متاسفانه از طریق رابط کاربری پیشفرض VirtualBox امکان پذیر نیست. برای این منظور ترمینال جدیدی باز کنید و دستورات زیر رو به ترتیب اجرا کنید ( ترجیحا ترمینال به حالت Administrator باز کنید ) :

:::caution
برای دستورات باید زیر از نامی که به ماشین مجازی اختصاص دادید استفاده کنید ( در اینجا macos تنظیم شده )
:::

```bash
cd "C:\Program Files\Oracle\VirtualBox\"

VBoxManage.exe modifyvm "macos" --cpuidset 00000001 000106e5 00100800 0098e3fd bfebfbff

VBoxManage setextradata "macos" "VBoxInternal/Devices/efi/0/Config/DmiSystemProduct" "iMac11,3"

VBoxManage setextradata "macos" "VBoxInternal/Devices/efi/0/Config/DmiSystemVersion" "1.0"

VBoxManage setextradata "macos" "VBoxInternal/Devices/efi/0/Config/DmiBoardProduct" "Iloveapple"

VBoxManage setextradata "macos" "VBoxInternal/Devices/smc/0/Config/DeviceKey" "ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc"

VBoxManage setextradata "macos" "VBoxInternal/Devices/smc/0/Config/GetKeyFromRealSMC" 1
```

توجه کنید که دستورات زیر در صورت اجرای موفق هیچ خروجی خاصی ندارند.

![tooltip](/img/blog/75.webp)

حالا ترمینال رو ببندید و ماشین مجازی مربوطه رو روشن کنید و از سیستم عامل Mac OS لذت ببرید.

![tooltip](/img/blog/76.webp)

مراحل نصب MacOS رو تا پایان ادامه بدید.

## نکات مهم !!!

در حال حاضر این روش هنوز برای پردازنده های AMD زیاد بهینه نیست و خوب جواب نمیده. حداقلش من نتونستم روی سیستم خودم با AMD Ryzen 3800X بالا بیارم سیستم رو و تمام جستجوها هم به این موضوع ختم شد که هنوز به طور 100 درصد قابل اجرا نیست روی این پردازنده ها.

اکثر برنامه نویس ها ، DevOps دوست ها و ... ممکنه روی سیستم ویندوزی خودشون از Docker استفاده کنند. اگر Docker رو با ترکیب مجازی سازی پیشفرض ویندوز یعنی Hyper-V نصب کردید متاسفانه باید بگم که به مشکل میخورید و موقع روشن کردن ماشین با چنین پیغامی مواجه خواهید شد :

> Call to WHvSetupPartition failed: ERROR_SUCCESS (Last=0xc000000d/87) (VERR_NEM_VM_CREATE_FAILED)

جهت رفع مشکل دستور زیر رو اجرا کنید و سیستم خودتون رو یکبار ریبوت کنید.

```bash
bcdedit /set hypervisorlaunchtype off
```

البته با این روش هربار که بخواید از MacOS استفاده کنید باید HyperVisor روشن خاموش کنید و سیستم ریبوت بشه و خلاصه اینکه درگیری زیاد داره. بهترین راهش اینه که Docker رو با مجازی ساز دیگه ای مثل همین VirtualBox نصب کنید.

هر سوال یا مشکلی داشتید میتونید در [تماس باشید](/contact)

---
