---
id: kubernetes-dashboard
author: آرش حاتمی
author_title: DevOps - Network Eng
author_url: https://github.com/hatamiarash7
author_image_url: https://avatars1.githubusercontent.com/u/16325641?v=4
title: "نصب و استفاده از Kubernetes Dashboard"
tags: [kubernetes, dashboard, kubernetes dashboard, کوبرنتیس, داشبورد کوبرنتیس]
---

یکی از بهترین ابزارهایی که میتونید برای کوبرنتیس استفاده کنید ، داشبورد مدیریتی خیلی خوبیه که خودشون توسعه دادن. تقریبا شامل تمام کارهایی که با خط فرمان انجام میدید میشه و کار کردن باهاش ساده است. تو این پست روش نصبش رو باهم مرور می کنیم.

![tooltip](/img/blog/103.png)

<!--truncate-->

مشکلی که این روزهای برای ابزارهای در دست توسعه وجود داره ، آپدیت های سریع و نبود مستندات به روزه. یه چیزی مثل Laravel که الان تند تند داره نسخه منتشر میکنه و در آخر هم میبینید که حتی مستندات رسمی خودشون هم قدیمیه !!!

برای Kubernetes Dashboard هم این قضیه صدق میکنه. اگر جستجوی کوتاهی انجام بدید نوشته های زیادی رو مشاهده می کنید که از نسخه های مختلف 0.1 شروع میشه و یه عالمه مثال در مورد نسخه \*.1 و تک و توک نسخه های آخر یعنی 2.0

در حال حاضر که این پست رو مینویسم چند روز از انتشار نسخه Stable و نهایی Kubernetes Dashboard 2.0.0 میگذره و قصد دارم که روش نصب و استفاده ازش رو باهاتون به اشتراک بذارم.

برای نصب Kubernetes دو فایل در اختیار شما قرار داره. نسخه اول که تنظیمات کامل و پیشفرض و البته پیشنهاد شده ی خودشونه و برای استفاده تو محیط های Production آماده است ( البته با یکم اضافه کاری تو حوزه امنیت ). نسخه دوم اما برای تست و استفاده تو محیط های توسعه است. تفاوت هایی هم دارن از جمله :

-   اجرا بر بستر HTTPS
-   وجود Authentication
-   و ...

در اینجا با فایل اصلی نصب رو انجام میدیم. اگر خواستید می تونید از فایل [Alternative](https://raw.githubusercontent.com/kubernetes/dashboard/master/aio/deploy/alternative.yaml) هم استفاده کنید.

### نصب

برای شروع کافیه دستور زیر رو اجرا کنید تا مراحل نصب انجام بشه :

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
```

:::info
با اعمال فایل بالا ، یک Namespace پیشفرض برای داشبورد ساخته میشه. از این به بعد تمام بخش های مربوطه در kubernetes-dashboard قرار میگیره
:::

صبر کنید تا Pod ها ساخته بشه و نصب کامل بشه. می تونید از دستور زیر برای بررسی روند نصب استفاده کنید :

```bash
kubectl -n kubernetes-dashboard get pods -w
```

داشبورد ما شامل 2 عدد Pod میشه :

1. Dashboard
2. Metric Scraper

وقتی که هر دو پاد آماده شد داشبورد با موفقیت نصب شده و میتونید ازش استفاده کنید :

```bash
$ kubectl -n kubernetes-dashboard get pods -w
NAME                           READY    STATUS       RESTARTS     AGE
dashboard-metrics-scraper      1/1      Running      0            1m
kubernetes-dashboard           1/1      Running      0            1m
```

### استفاده

به صورت پیشفرض سرویسی که برای داشبورد در نظر گرفته میشه از ClusterIP استفاده میکنه. در نتیجه برای دسترسی به داشبورد باید از Proxy استفاده کنیم. برای این منظور ابتدا دستور زیر را اجرا کنید :

```bash
kubectl proxy
```

حالا میتونید از آدرس زیر به داشبورد دسترسی داشته باشید :

[http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/](http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/)

![tooltip](/img/blog/104.png)

### ساخت حساب کاربری

همونطور که مشاهده می کنید اعتبارسنجی از دو طریق انجام میشه. روش اول بسیار ساده است. به این صورت که Kubernetes Dashboard از RBAC پشتیبانی میکنه و خیلی راحت با ساخت یه اکانت می تونیم به داشبورد دسترسی داشته باشیم.

برای ساخت حساب کاربری به دو چیز نیاز داریم :

-   ServiceAccount
-   ClusterRoleBinding

برای این منظور یک فایل با نام `user.yml` ایجاد کنید و محتواش رو به این صورت تغییر بدید :

```yml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard

apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
```

در اینجا یک کاربر با نام `admin-user` ایجاد می کنیم و توی فضانام `kubernetes-dashboard` اون رو به عنوان مدیر کلاستر استفاده می کنیم. با دستور زیر تغییرات رو اعمال کنید :

```bash
kubectl apply -f user.yml
```

حالا کاربر ساخته شده و کافیه Token مربوط به این حساب رو به دست بیاریم. برای این منظور اگر با لینوکس کار میکنید از دستور زیر استفاده کنید :

```bash
kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')
```

اگر هم در ویندوز هستید می تونید از دستور زیر استفاده کنید :

```bash
kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | sls admin-user | ForEach-Object { $_ -Split '\s+' } | Select -First 1)
```

خروجی دستور بالا چیزی شبیه این میشه :

```bash
Name:         admin-user-token-v57nw
Namespace:    kubernetes-dashboard
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: admin-user
              kubernetes.io/service-account.uid: 0303243c-4040-4a58-8a47

Type:  kubernetes.io/service-account-token

Data
====
ca.crt:     1066 bytes
namespace:  20 bytes
token:      eyJhbGceyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50I ........
```

از مقدار چاپ شده با عنوان token می تونید برای ورود به داشبورد استفاده کنید.

### کمی ساده تر کمی سریع تر

تا اینجا داشبورد نصب شد و راه استفاده ازش هم فهمیدیم. اگه رو محیط توسعه هستید ، یکم سخت و طولانی میشه که هر سری از proxy استفاده کنیم و اون آدرس طولانی رو وارد کنیم برای دسترسی به داشبورد. خوبه که بتونیم مثل یک سرویس عادی ازش استفاده کنیم.

به صورت پیشفرض سرویسی که برای داشبورد ایجاد میشه در حالت [ClusterIP](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types) فعالیت میکنه و باید برای دسترسی به این سرویس از proxy استفاده کرد. راه ساده ای که وجود داره اینه که بیایم از [NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#nodeport) استفاده کنیم.

برای این منظور باید سرویس مورد نظرمون رو ویرایش کنیم. دستور زیر را اجرا کنید :

```bash
kubectl -n kubernetes-dashboard edit svc/kubernetes-dashboard
```

یک ویرایشگر باز میشه و Manifest مربوط به سرویس قابل ویرایشه. در قسمت `spec` گزینه `type` رو به `NodePort` تغییر بدید و فایل رو ذخیره کرده و ببندید. کمی صبر کنید تا تغییرات اعمال بشه و Pod مربوط به داشبورد مجددا ساخته بشه.

حالا داشبورد شما همانند یک سرویس عادی در دسترسه و می تونید با یک Port خاص بهش متصل بشید. برای به دست آوردن این پورت راه های زیادی وجود داره. میتونید جزئیات سرویس رو چاپ کنید یا خیلی راحت کل سرویس ها رو توی فضانام مربوطه لیست کنید :

```bash
kubectl -n kubernetes-dashboard get svc
NAME                        TYPE        CLUSTER-IP      PORT(S)         AGE
dashboard-metrics-scraper   ClusterIP   10.98.195.160   8000/TCP        3m
kubernetes-dashboard        NodePort    10.108.34.126   443:30207/TCP   3m
```

همونطور که مشاهده می کنید سرویس داشبورد از نوع NodePort بوده و از طریق پورت 30207 در دسترسه. حالا خیلی ساده می تونیم از طریق آدرس زیر بهش دسترسی داشته باشیم :

[https://127.0.0.1:30207](https://127.0.0.1:30207)

![tooltip](/img/blog/105.png)

حتی می تونید از Ingress استفاده کنید و یک دامنه محلی برای داشبورد قرار بدید. دیگه همه چیز دست خودتونه :))
