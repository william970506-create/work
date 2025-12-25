const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 1. 設定靜態檔案路徑：這行會讓瀏覽器找得到 public 裡的 HTML, CSS 和圖片
app.use(express.static('public'));

// 2. 解析表單資料：這能讓你之後處理預約表單的內容
app.use(express.urlencoded({ extended: true }));

// 3. 設定首頁路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 4. 啟動伺服器
app.listen(port, () => {
    console.log(`====================================`);
    console.log(`🚀 美容店網站已成功啟動！`);
    console.log(`🔗 請在瀏覽器輸入： http://localhost:${port}`);
    console.log(`====================================`);
});