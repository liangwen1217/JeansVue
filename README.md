# 電商網站 —— 牛仔牛仔 Jeans

> 獻上最優質的牛仔系列商品，這是一份 Vue CLI 2 前端電商練習。

![牛仔牛仔首頁]https://i.imgur.com/m4kD7th.jpg

## DEMO
<https://liangwen1217.github.io/JeansVue/dist>

## 簡介

此作品為 Vue.js 前端練習，功能包含：

- 前台：
  - 電商展示（商品分類、單一商品介紹）
  - 商品收藏功能
  - 購物車
  - 優惠碼套用
  - 下單 / 結帳
- 後台：
  - 管理者登入
  - 商品管理（建立、更新、刪除）
  - 優惠碼管理（建立、更新、刪除）
  - 訂單列表

  ## 使用技術

- Vue Cli 2
- Vue Router
- Vue Components
- Vuex
- RESTful APIs
- RWD
- Bootstrap 4
- JavaScript（ES6、LocalStorage 等）
- SCSS

## 使用 Vue-Plugin

- [Vue-axios](https://www.npmjs.com/package/vue-axios)
- [VeeValidate](https://logaretm.github.io/vee-validate/guide/basics.html#validation-provider)
- [Vue-loading-overlay](https://www.npmjs.com/package/vue-loading-overlay)

## 前端介紹

### 首頁畫面

進場時跳出優惠訊息視窗。

![首頁 Modal](https://i.imgur.com/cQep5ah.jpg)

![首頁畫面](https://i.imgur.com/m4kD7th.jpg)

點擊商品類別方格，畫面會往下滑動並顯示相對應的商品，此時畫面右下角會出現「回到最上方」按鈕。
![首頁商品卡片](https://i.imgur.com/dj4aSnn.jpg)

### 商品列表

![商品列表](https://i.imgur.com/oglt435.jpg)

點擊整張商品卡片或是點擊「查看更多」，可跳轉至單一商品介紹頁。

![收藏清單](https://i.imgur.com/m65juP9.jpg)

點擊商品卡片右上角的愛心可加入收藏清單，再點擊一次則移除。收藏清單顯示於頁面最上方的 Navbar，收藏清單 dropdown 內的品項可按下購物車按鈕以加入購物車。

### 單一商品介紹頁

![單一商品介紹](https://i.imgur.com/XBvt6TR.jpg)

「熱銷商品」區塊為隨機推薦，從所有商品中亂數抓取不重複之三個商品予以展示，點擊該區塊中的商品可跳轉至該商品介紹頁。

### 購物車

![購物車畫面](https://i.imgur.com/6Xqtkq8.jpg)

此頁面可調整欲購買之商品數量，並可輸入優惠碼進行折扣，按下「下一步」即開始結帳程序。

![收件資訊頁](https://i.imgur.com/OszFYHe.jpg)

![付款資訊頁](https://i.imgur.com/hwAx6wr.jpg)

![付款成功頁](https://i.imgur.com/sydeL70.jpg)

### 後台登入介面

![登入頁](https://i.imgur.com/HIUyBKa.jpg)

### 後台管理介面

![後台產品列表](https://i.imgur.com/z7tZJly.jpg)

![後台新增商品](https://i.imgur.com/Zx9qO6y.jpg)

### 其餘更多細節部分，歡迎至 Demo 網站觀看

<https://liangwen1217.github.io/JeansVue/dist>