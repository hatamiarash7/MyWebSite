---
layout: post
title: "مفهوم انتزاع (Abstraction) در شی‌گرایی"
date: 2019-11-15 12:17
excerpt: "توی شی‌گرایی دونستن انتزاع یا Abstraction کافی نیست. بلکه باید اون رو درک کنیم و با درک صحیح اون، دیدمون به دنیای شی‌گرایی وسیع‌تر و باز تر میشه. اینکه ویژگی کلاس‌های Abstract و اینترفیس‌ها چیه به تنهایی مهم نیست. مهم اینه که درک کنیم اینها کجا به کار ما میان و چه مشکلاتی رو حل میکن."
tags: [abstraction, abstract, abstract class, انتزاع, انتزاع در برنامه نویسی, شی گرایی, انتزاع در شی گرایی]
comments: false
---

توی شی‌گرایی دونستن انتزاع یا Abstraction کافی نیست. بلکه باید اون رو درک کنیم و با درک صحیح اون، دیدمون به دنیای شی‌گرایی وسیع‌تر و باز تر میشه. اینکه ویژگی کلاس‌های Abstract و اینترفیس‌ها چیه به تنهایی مهم نیست. مهم اینه که درک کنیم اینها کجا به کار ما میان و چه مشکلاتی رو حل میکن.

![tooltip](/assets/img/posts/55.webp)

با گفتن کلمه "خودرو" آیا خودروی خاصی به ذهنتون میاد؟ کلمه "حیوان" چطور؟ آیا حیوون خاصی به ذهنتون میاد؟ قاعدتا جواب باید خیر باشه. کلمات "خودرو" و "حیوان" انتزاعی هستن. یعنی مفاهیم و مدل‌های ذهنی هستن و به خودی خود توی دنیای واقعی وجود ندارن و قابل پیاده‌سازی نیستن.

توی دنیای واقعی و چیزی که با چشم میبینیم نوع‌های خاصی از حیوان یا خودرو هستن. مثلا گربه، زرافه و پنگوئن همه نوعی از حیوان هستن. همچنین دوچرخه و کامیون حالت‌های عینی و پیاده‌سازی شده‌ی یک خودرو هستن. خودرو یک طرح و الگو برای دوچرخه هست. حیوان یک طرح و الگو برای گربه هست.

توی این مثال، خودرو و حیوان مفاهیم انتزاعی (Abstract) هستن که قابل پیاده‌سازی نیستن. بلکه فقط الگو و طرحی هستن برای چیزهای عینی و قابل پیاده‌سازی. به گربه و دوچرخه و هر چیزی توی دنیای واقعی وجود دارن و ما اونها رو می‌بینیم، میگن Concrete یعنی واقعی.

مفاهیم انتزاعی، یک طرح کلی و "الگو" هستن برای چیزهای عینی. چند تا مثال از الگو، و چیزهای عینی از اون الگو:


* حیوان برای گربه
* خودرو برای دوچرخه
* نوشیدنی برای چایی
* غذا برای آبگوشت
* ورزش برای پیاده‌روی
* میوه برای موز
* آجیل برای پسته


اگه بریم مغازه خشکبار و بگیم آجیل میخوایم، مطمئنا فروشنده میگه چه نوع آجیلی! (اگه خواستید دفعه بعد رفتید خشکبار فروشی امتحان کنین :)) ). چون آجیل یک مفهموم کلی و انتزاعی هست.

اینترفیس‌ها و کلاس‌های Abstract ابزاری هستن برای مفاهیم انتزاعی. همونطور که احتمالا تا الان باید متوجه شده باشید، میدونید که موارد انتزاعی قابل پیاده سازی نیستن. توی برنامه‌نویسی شی‌گرا هم همینه. از اینترفیس‌ها و کلاس‌های Abstract نمیشه مثل زیر نمونه ساخت:

```typescript
abstract class Animal {
    abstract makeSound();
 
    move() {
        // Moving
    }
}
 
new Animal; // Error Cannot create an instance of an abstract
```

همونطور که دیدید توی خط آخر، کامپایلر به ما خطا داد که نمیشه از کلاس انتزاعی نمونه ساخت. در واقع از کلاس Animal تنها در صورتی میشه استفاده کرد که توسط کلاس‌های دیگه Extend بشه:

```typescript
class Penguin extends Animal {
    makeSound() {
        // Ghizhzhzh
    }
}
```

### چرا از Abstraction استفاده کنیم؟

مثال زیر رو در نظر بگیرید که توی اون از Abstraction استفاده نشده:

```typescript
class Orange {}
class Apple {}
 
// ... Rest of fruits
 
class FruitsBasket {
    private items;
 
    public add(items) {
        items.forEach (item => {
            if (
                item instanceof Orange 
                || item instanceof Apple 
                || item instanceof Banana 
                ) {
                    this.items.push(item);
                }
        });
    }
}
 
let fruits = new FruitsBasket;
fruits.add([orange, apple, banana, umbrella, meat, wall, glass, book]);
```

متد add یک سری اشیا رو بررسی میکنه که اگه از نوع پرتقال، سیب، موز و هر نوع میوه‌ی دیگه بودن، به سبد میوه اضافه کنه. همونطور که دیدید اگه هر نوع میوه دیگه‌ای رو بخوایم اضافه کنیم باید متد add رو دستکاری کنیم:

```typescript
public add(items) {
    items.forEach (item => {
        if (
            item instanceof Orange 
            || item instanceof Apple 
            || item instanceof Banana 
            || item instanceof Peach
            || item instanceof Khiar // Cucumbers :)
            || item instanceof Melon
            ) {
                this.items.push(item);
            }
    });
}
```

خب این اصلا خوب نیست. علاوه‌بر اینکه ما داریم کد رو دائما دستکاری میکنیم، کد ما زشت هست و زیبا و تمیز نیست. همچنین [قانون دوم SOLID](https://arash-hatami.ir/solid-principles/) هم داره نقض میشه.

با استفاده از یک اینترفیس یا کلاس Abstract خیال خودمون رو راحت میکنیم:

```typescript
abstract class Fruit {}
 
class Orange extends Fruit {}
class Apple extends Fruit {}
 
// ... Rest of fruits
 
class FruitsBasket {
    private items;
 
    public add(items) {
        items.forEach (item => {
            if (item instanceof Fruit) {
                this.items.push(item);
            }
        });
    }
}
 
let fruits = new FruitsBasket;
fruits.add([orange, apple, banana, umbrella, meat, wall, glass, book]);
```

در واقع ما اینجا به قول معروف یک لایه انتزاعی (Abstraction Layer) اضافه کردیم. اینطوری متد add وابسته به کلاس‌های بی‌نهایت Concrete نیست. بلکه وابسته به انتزاع هست. پس میتونیم هر چقدر که دلمون میخواد کلاس میوه اضافه کنیم؛ بدون اینکه کلاس FruitsBasket و متد add رو دستکاری کنیم.

هر چقدر که بتونیم این موارد رو تمرین کنیم و وابستگی‌های موجود توی برنامه‌مون رو کمتر کنیم، برنامه‌ی ما با کیفیت‌تر و قابل توسعه‌تر خواهد بود.
