// JavaScript Document

// Tooplate 2148 Bistro Elegance

// https://www.tooplate.com/view/2148-bistro-elegance

// Mobile menu toggle
// --- 1. 導覽列與捲動效果 (維持原樣，僅修改陰影顏色) ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 平滑捲動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if(navLinks) navLinks.classList.remove('active');
        }
    });
});

// 捲動監聽 (更新導覽列顏色與 Active 狀態)
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(253, 250, 247, 0.98)'; // 奶白背景
            nav.style.boxShadow = '0 2px 20px rgba(177, 148, 112, 0.15)'; // 改成金棕色陰影
        } else {
            nav.style.background = 'rgba(253, 250, 247, 0.95)';
            nav.style.boxShadow = 'none';
        }
    }
    updateActiveNavItem();
});

function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksItems = document.querySelectorAll('.nav-links a[href^="#"]');
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}


// --- 2. 視覺裝飾 (顏色改為金棕色與藕粉色) ---

// 左下角：改成極淺的金棕色
function createDiagonalGrid() {
    const grid = document.querySelector('.diagonal-grid');
    if (!grid) return;

    const blocks = [
        { width: 80, bottom: -400, left: -100, delay: 0, duration: 22 },
        { width: 60, bottom: -300, left: 100, delay: 2, duration: 20 },
        { width: 100, bottom: -370, left: 350, delay: 1, duration: 24 },
        { width: 70, bottom: -230, left: 200, delay: 1.5, duration: 21 },
        { width: 90, bottom: -170, left: 500, delay: 0.5, duration: 23 },
        { width: 50, bottom: -270, left: 400, delay: 3, duration: 25 }
    ];

    blocks.forEach(block => {
        const element = document.createElement('div');
        element.className = 'soft-block';
        // 強制改色
        element.style.background = 'rgba(177, 148, 112, 0.05)'; 
        element.style.width = `${block.width}px`;
        element.style.bottom = `${block.bottom}px`;
        element.style.left = `${block.left}px`;
        element.style.animationDelay = `${block.delay}s`;
        element.style.animationDuration = `${block.duration}s`;
        grid.appendChild(element);
    });
}

// 右上角：改成金棕色 (#b19470)
function createStaticDecoration() {
    const decoration = document.querySelector('.static-decoration');
    if (!decoration) return;

    const staticBlocks = [
        { size: 85, top: '20px', right: '30px', outline: true },
        { size: 120, top: '80px', right: '120px', outline: false },
        { size: 100, top: '140px', right: '50px', outline: true },
        { size: 40, top: '50px', right: '180px', outline: true },
        { size: 95, top: '200px', right: '150px', outline: false },
        { size: 60, top: '100px', right: '280px', outline: true }
    ];

    staticBlocks.forEach(block => {
        const element = document.createElement('div');
        element.className = block.outline ? 'static-block-outline' : 'static-block';
        element.style.width = `${block.size}px`;
        element.style.height = `${block.size}px`;
        element.style.top = block.top;
        element.style.right = block.right;
        
        // 強制改色
        if (block.outline) {
            element.style.border = '2px solid #b19470'; // 金棕色邊框
            element.style.backgroundColor = 'transparent';
        } else {
            element.style.backgroundColor = '#b19470'; // 金棕色實心
            element.style.opacity = '0.15';
        }
        decoration.appendChild(element);
    });
}

// 右下角：原本是紅色，改成藕粉色 (#d98c8c)
function createBottomRightDecoration() {
    const decoration = document.querySelector('.bottom-right-decoration');
    if (!decoration) return;

    const redBlocks = [
        { size: 65, bottom: '20px', right: '40px', outline: false },
        { size: 45, bottom: '60px', right: '120px', outline: false },
        { size: 85, bottom: '120px', right: '60px', outline: false },
        { size: 55, bottom: '40px', right: '200px', outline: true },
        { size: 70, bottom: '160px', right: '140px', outline: true }
    ];

    redBlocks.forEach(block => {
        const element = document.createElement('div');
        element.className = block.outline ? 'red-block-outline' : 'red-block';
        element.style.width = `${block.size}px`;
        element.style.height = `${block.size}px`;
        element.style.bottom = block.bottom;
        element.style.right = block.right;

        // 強制改色
        if (block.outline) {
            element.style.border = '2px solid #d98c8c'; // 藕粉色邊框
            element.style.backgroundColor = 'transparent';
        } else {
            element.style.backgroundColor = '#d98c8c'; // 藕粉色實心
            element.style.opacity = '0.2';
        }
        decoration.appendChild(element);
    });
}

// --- 3. 表單處理 (改成連接後端，不使用假資料) ---
window.handle線上預約 = async function(event) {
    event.preventDefault(); 
    
    // 按鈕變更狀態
    const btn = event.target.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "處理中...";
    btn.disabled = true;

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        // 連接你的 server.js
        const response = await fetch('http://localhost:3000/api/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        if (response.ok) {
            alert("✨ 預約成功！\n我們已收到您的資訊。");
            event.target.reset(); 
        } else {
            alert("❌ 預約失敗：" + result.message);
        }
    } catch (error) {
        console.error(error);
        alert("無法連線到伺服器，請確認後台已開啟 (node server.js)");
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
};

// --- 4. 初始化 ---
document.addEventListener('DOMContentLoaded', () => {
    // 日期限制今天以後
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    createDiagonalGrid();
    createStaticDecoration();
    createBottomRightDecoration();

    const homeLink = document.querySelector('.nav-links a[href="#home"]');
    if (homeLink) homeLink.classList.add('active');
});