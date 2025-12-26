const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs'); 
const app = express();
const port = 3000;

// 中間件設定
app.use(cors()); 
app.use(express.static('public')); 
app.use(express.json()); 

// 1. 處理前端預約送出
app.post('/api/booking', (req, res) => {
    const { name, phone, date, time, note } = req.body;
    const timestamp = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
    
    // 格式化存檔內容，確保「日期：」字樣存在以便後續刪除功能判斷
    const bookingEntry = `------------------------------------------\n紀錄時間：${timestamp}\n客戶姓名：${name}\n聯絡電話：${phone}\n日期：${date}\n預約時段：${time}\n備註內容：${note || '無'}\n------------------------------------------\n`;

    fs.appendFile(path.join(__dirname, 'bookings.txt'), bookingEntry, (err) => {
        if (err) return res.status(500).json({ message: '存檔失敗' });
        res.status(200).json({ message: '預約成功！' });
    });
});

// 2. 管理頁面：顯示清單與刪除過期功能
app.get('/view-bookings', (req, res) => {
    const filePath = path.join(__dirname, 'bookings.txt');

    // 處理「刪除過期預約」的動作
    if (req.query.action === 'clear_old') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return res.send("讀取檔案失敗");
            
            const now = new Date();
            now.setHours(0, 0, 0, 0); 

            const bookings = data.split('------------------------------------------');
            
            const updatedBookings = bookings.filter(entry => {
                const trimmedEntry = entry.trim();
                if (!trimmedEntry) return false;

                const dateMatch = trimmedEntry.match(/日期：(\d{4}-\d{2}-\d{2})/);
                if (dateMatch) {
                    const bookingDate = new Date(dateMatch[1]);
                    return bookingDate >= now; 
                }
                return true; 
            });

            const newData = updatedBookings.length > 0 ? updatedBookings.join('------------------------------------------\n') : "";
            
            fs.writeFile(filePath, newData, (err) => {
                if (err) return res.send("更新檔案失敗");
                res.redirect('/view-bookings');
            });
        });
        return;
    }

    // 顯示美化後的 SPA 風格管理頁面
    fs.readFile(filePath, 'utf8', (err, data) => {
        const content = (err || !data.trim()) ? "<h3 style='color:#a89b91;'>目前沒有預約紀錄</h3>" : data.replace(/\n/g, '<br>');
        
        res.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>珈彩美容管理後台</title>
                    <style>
                        body { 
                            font-family: "PingFang TC", "Microsoft JhengHei", sans-serif; 
                            background: #fdfaf7; 
                            padding: 20px; 
                            color: #5a4a42; 
                        }
                        .container { 
                            max-width: 800px; 
                            margin: 40px auto; 
                            background: white; 
                            padding: 40px; 
                            border-radius: 20px; 
                            box-shadow: 0 15px 35px rgba(177, 148, 112, 0.1); 
                        }
                        h1 { 
                            color: #b19470; 
                            border-bottom: 2px solid #f0e6db; 
                            padding-bottom: 15px; 
                            font-size: 24px;
                            letter-spacing: 1px;
                        }
                        .button-group { margin-bottom: 30px; }
                        .btn-refresh { 
                            background: #b19470; 
                            color: white; 
                            border: none; 
                            padding: 12px 25px; 
                            border-radius: 8px; 
                            cursor: pointer; 
                            transition: 0.3s;
                            font-weight: bold;
                        }
                        .btn-refresh:hover { background: #967d5e; transform: translateY(-2px); }
                        .btn-delete { 
                            background: #d98c8c; 
                            color: white; 
                            border: none; 
                            padding: 12px 25px; 
                            border-radius: 8px; 
                            cursor: pointer; 
                            margin-left: 10px; 
                            transition: 0.3s;
                            font-weight: bold;
                        }
                        .btn-delete:hover { background: #c66f6f; transform: translateY(-2px); }
                        .booking-list { 
                            line-height: 2; 
                            color: #6d5d54; 
                            background: #fcfbf9; 
                            padding: 25px; 
                            border: 1px solid #f0e6db; 
                            border-radius: 12px; 
                            font-size: 15px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>📋 珈彩美容預約管理</h1>
                        <div class="button-group">
                            <button class="btn-refresh" onclick="location.reload()">🔄 重新整理</button>
                            <button class="btn-delete" onclick="if(confirm('確定要刪除「今天以前」的所有舊預約嗎？')){ location.href='/view-bookings?action=clear_old'; }">🗑️ 清理過期預約</button>
                        </div>
                        <div class="booking-list">
                            ${content}
                        </div>
                    </div>
                </body>
            </html>
        `);
    });
});