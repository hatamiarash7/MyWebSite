---
layout: post
project: true
title: "کتابخانه Toast برای اندروید"
date: 2019-05-17
excerpt: "توضیحات"
tags: [android,ui,اندروید,رابط کاربری]
comments: false
source: "https://github.com/hatamiarash7/RTL-Toast"
website: "https://github.com/hatamiarash7/RTL-Toast"
---

با استفاده از این کتابخانه می توانید از Toast هایی شخصی سازی شده با قالب های پیشفرض در برنامه خود استفاده کنید.

![image](/assets/img/projects/1.jpg)

## روش نصب

ابتدا مخزن jitpack را در فایل build.gradle پروژه خود قرار دهید

```groovy
allprojects {
    repositories {
        ...
	maven {
	    url 'https://jitpack.io'
	}
    }
}
```

سپس کتابخانه را در build.gradle ماژول خود وارد کنید

```groovy
dependencies {
    implementation 'com.github.hatamiarash7:RTL-Toast:1.2'
}
```

## روش استفاده

با استفاده از توابع آماده می توانید Toast های گوناگون با توجه به نیاز خود نمایش دهید

```java
RTLToast.error(context, message, length, withIcon);
RTLToast.success(context, message, length, withIcon);
RTLToast.info(context, message, length, withIcon);
RTLToast.warning(context, message, length, withIcon);
RTLToast.normal(context, message, length, withIcon);
```

همچنین می توانید متن Toast خود را شخصی سازی کنید

```java
RTLToast.info(context, getFormattedMessage())

private CharSequence getFormattedMessage() {  
    final String prefix = "متن ";  
    final String highlight = "با فرمت ";  
    final String suffix = " مخصوص";  
    SpannableStringBuilder ssb = new SpannableStringBuilder(prefix).append(highlight).append(suffix);  
    int prefixLen = prefix.length();  
    ssb.setSpan(new StyleSpan(BOLD_ITALIC), prefixLen, prefixLen + highlight.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);  
    return ssb;  
}
```

با استفاده از تابع `RTLToast.Config` می توانید Toast را مدیریت کنید

```java
RTLToast.Config.getInstance()  
    .setTextColor(Color.GREEN)  
    .setToastTypeface(Typeface.createFromAsset(getAssets(), "IRANSans.ttf"))  
    .apply();  
RTLToast.custom(context, message, getResources().getDrawable(R.drawable.laptop512), Color.BLACK, length, withIcon, shouldTint).show();
RTLToast.Config.reset();
```
