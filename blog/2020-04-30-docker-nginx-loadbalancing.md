---
id: nginx-loadbalancing
author: آرش حاتمی
author_title: DevOps - Network Eng
author_url: https://github.com/hatamiarash7
author_image_url: https://avatars1.githubusercontent.com/u/16325641?v=4
title: "پیاده سازی Load Balancer با استفاده از Nginx"
tags: [nginx, load balancer, load balancing, لودبالانسر]
---

وظیفه یک Load balancer توزیع بهینه ی ترافیک ورودی بین سرور های مختلف Backend بوده که در دنیای واقعی میتونید اونو به یک پلیس راهنمایی رانندگی تشبیه کنید که سعی میکنه ماشین ها رو به بهترین نحو ممکن به خیابون های مختلف راهنمایی کنه.  
در این پست پیاده سازی یک Load balancer را با استقاده از Nginx بررسی می کنیم.

![tooltip](/img/blog/94.png)

<!--truncate-->

همانطور که گفتمLoad Balancer ترافیک ورودی به شبکه رو مدیریت میکنه و تمامی درخواست ها رو به صورت بهینه به سمت سرور ها میفرسته و به این صورت هیچ سروری بار اضافی متحمل نمیشه و به Down شدن کل سیستم ختم نمیشه.

در ادامه یک پروژه ساده را با Node.js پیاده سازی کرده و بعدش از Nginx برای Load balancing پروژه استفاده می کنیم. توجه کنید که در این مثال از Docker هم استفاده میکنیم.

توی این سناریو ما دوتا Container با پورت های مختلف داریم که یه اپلیکیشن یکسان رو اجرا میکنن. در کنار این دوتا ما یک کانتینتر Nginx هم داریم که قراره نقش یک Load balancer رو ایفا کنه.

![tooltip](/img/blog/95.png)

اول از همه به یک اپلیکیشن ساده نیاز داریم که با Express اونو مینویسیم :

```js
const express = require("express");
const app = express();
const port = 5000;
const name = process.env.name || "World";

app.get("/", (req, res) => {
    res.send(`Hello ${name} !`);
});
app.listen(port, () => {
    console.log(`Server Started on Port  ${port}`);
});
```

این برنامه ساده با دستور `node app.js` اجرا میشه و میتونید اونو تست کنید. در ادامه همین پروژه را dockerize میکنیم. اگر با داکر آشنایی ندارید ، قبل از ادامه مطلب کمی در موردش مطالعه کنید. می تونید از [اینجا](https://docs.docker.com/get-started/) شروع کنید.

برای پروژه یک dockerfile ایجاد می کنیم :

```dockerfile
FROM node:11.15.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD node app.js
EXPOSE 5000
```

حالا با استفاده از دستور زیر آن را build کرده و یک image میسازیم :

```bash
docker build -t nodeapp:v1 .
```

این image اپلیکیشن مارو روی پورت 5000 اجرا میکنه و با توجه به برنامه ای که در بالا نوشتیم ، یک متن در خروجی نمایش میده. حالا باید از این ایمیج دو کانتینر بسازیم. این کانتینتر ها هر کدوم باید روی پورت های مختلفی کار کنن. برای این منظور از دو پورت 5001 و 5002 استفاده می کنیم.

اگر به کد اپلیکیشن دقت کنیم یک متغییر به اسم name از Environments دریافت میکنیم. از این روش برای ایجاد تمایز بین کانتینر ها استفاده میشه. برای ساخت کانتینر ها دو دستور زیر را اجرا کنید :

```bash
docker container run -p 5001:5000 --name container1 -d nodeapp:v1

docker container run -p 5002:5000 --name container2 -e "name=arash" -d nodeapp:v1
```

حالا دو کانتینر داریم که روی پورت های مختلفی کار می کنند

![tooltip](/img/blog/96.jpg#notround)

اگر همین کانتینر ها رو توی مرورگر هم تست کنیم ، می تونیم خروجی اون ها رو ببینیم :

![tooltip](/img/blog/97.png#notround)

حالا سرویس های ما آماده است و در مرحله بعد به سراغ Nginx می رویم

### Load Balancing

تا اینجا با موفقیت دو سرویس ساختیم و حالا از Nginx به عنوان یک Load Balancer در جلوی آن ها استقاده می کنیم. برای این کار به یک کانتینر جدید نیاز داریم تا Nginx را اجرا نماید. در پوشه ای جدید یک فایل Dockerfile با محتوای زیر درست کنید :

```dockerfile
FROM nginx:1.17.9-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

سپس در همان پوشه یک فایل با نام `nginx.cong` جهت اعمال تنظیمات ایجاد کنید :

```
upstream loadbalance {
    least_conn;
    server 127.0.0.1:5001;
    server 127.0.0.1:5002;
}

server {
    location / {
        proxy_pass http://loadbalance;
    }
}
```

در این فایل باید آدرس IP سرویس های خودمون رو وارد کنیم. در این مثال چون کانتینر ها به صورت مستقل ساخته می شوند باید از آدرس IP داخلی داکر استفاده کنید ( Gateway ). برای این منظور با استفاده از Container ID دستور زیر رو اجرا کنید :

```bash
docker container inspect <CONTAINER-ID>
```

در خروجی این دستور دنبال بخش `NetworkSettings` بگردید و اونجا میتونید آدرس Gateway رو مشاهده کنید :

![tooltip](/img/blog/98.jpg)

حالا یک ایمیج ساخته و کانتینری از روی آن درست می کنیم :

```bash
docker build -t nginxbalancer:v1 .

docker container run -p 5000:80 -d nginxbalancer:v1
```

حالا همه چیز به درستی کار میکنه و Nginx هر درخواست رو به طور مدیریت شده به سمت یکی از سرویس ها منتقل میکنه. برای اطمینان از این مورد می تونید به http://localhost:5000 مراجعه کنید و با هربار refresh کردن ببینید که چه خروجی دریافت می کنید.

در این پست به پیاده سازی خیلی ساده یک Load balancer پرداخیتم. البته همه چیز به همین جا ختم نمیشه و مسلما شرایط و تنظیمات مختلفی هم در پروژه های Production وجود داره که پس از تمرین زیاد می تونید در این مورد موفق بشید و مثال های پیچیده تری هم پیاده سازی کنید

---

کد های کامل این پست رو میتونید از آدرس زیر مشاهده کنید :

https://github.com/hatamiarash7/MyWebSite_Projects/tree/master/loadbalancing-nginx

موفق باشید
