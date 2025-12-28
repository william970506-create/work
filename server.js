const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// 允許跨網域連線
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 設定靜態檔案資料夾 (讓 CSS/JS 讀得到)
app.use(express.static(__dirname));

// 暫存預約資料
let bookings = [];

// --- 🔥 關鍵修改：強制指定首頁路徑 ---
app.get('/', (req, res) => {
    // 強制送出 index.html
    const indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error("找不到 index.html，請確認檔案在:", indexPath);
            res.status(500).send("錯誤：找不到 index.html 檔案，請檢查終端機的錯誤訊息。");
        }
    });
});

// --- 1. 接收預約 (API) ---
app.post('/api/booking', (req, res) => {
    const newBooking = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        ...req.body
    };
    console.log('收到新預約:', newBooking);
    bookings.push(newBooking);
    res.json({ success: true, message: "預約已確認" });
});

// --- 2. 管理後台頁面 ---
app.get('/view-bookings', (req, res) => {
    let html = `
    <html>
    <head>
        <title>預約管理後台</title>
        <style>
            body { font-family: sans-serif; padding: 20px; background: #fdfaf7; }
            .card { background: white; padding: 20px; margin-bottom: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-left: 5px solid #b19470; }
            h1 { color: #5a4b3c; }
            .time { color: #888; font-size: 0.9em; }
            .btn { background: #b19470; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-bottom: 20px;}
        </style>
    </head>
    <body>
        <h1>📋 客戶預約清單</h1>
        <a href="javascript:location.reload()" class="btn">重新整理資料</a>
        <hr>
    `;
    if (bookings.length === 0) {
        html += `<p>目前還沒有任何預約...</p>`;
    } else {
        bookings.slice().reverse().forEach(b => {
            html += `
            <div class="card">
                <div class="time">紀錄時間：${b.date}</div>
                <h3>客戶姓名：${b.name || '未填寫'}</h3>
                <p>聯絡電話：${b.phone || '未填寫'}</p>
                <p>預約日期：${b.dateInput || b.date} </p>
                <p>預約時段：${b.time || '未填寫'}</p>
                <p>備註內容：${b.special || '無'}</p>
            </div>
            `;
        });
    }
    html += `</body></html>`;
    res.send(html);
});

// --- 3. 啟動伺服器 ---
app.listen(port, () => {
    console.log(`🚀 珈彩美容系統啟動：http://localhost:${port}`);
    console.log(`📂 伺服器正在讀取的資料夾：${__dirname}`);
});