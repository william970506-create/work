const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// 設定靜態檔案資料夾 (讓 public 裡面的 html/css/img 可以被讀取)
app.use(express.static('public'));

// 解析表單資料 (為了讓你能處理聯絡表單)
app.use(express.urlencoded({ extended: true }));

// 路由設定 (Routes)
// 當使用者連到首頁
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 模擬：接收預約表單的功能 (這是一個後端亮點)
app.post('/submit-booking', (req, res) => {
    const userBooking = req.body;
    console.log('收到新預約:', userBooking); // 這裡會在 VS Code 終端機顯示
    // 實際專案會存資料庫，這裡我們簡單回傳成功頁面
    res.send(`<h1>預約成功！謝謝 ${userBooking.name}，我們會盡快聯絡您。</h1><a href="/">回首頁</a>`);
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`美容店網站已啟動： http://localhost:${port}`);
});