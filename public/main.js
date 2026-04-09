// モックDB（データベースの代わりとなる商品データの配列）
const products = [
    {
        id: 1,
        name: "ダージリン・ファーストフラッシュ",
        price: 1800,
        image: "https://placehold.co/400x300/e8f5e9/2e7d32?text=Darjeeling"
    },
    {
        id: 2,
        name: "アールグレイ・クラシック",
        price: 1200,
        image: "https://placehold.co/400x300/fff3e0/e65100?text=Earl+Grey"
    },
    {
        id: 3,
        name: "宇治抹茶・極み",
        price: 2500,
        image: "https://placehold.co/400x300/e8f5e9/1b5e20?text=Matcha"
    },
    {
        id: 4,
        name: "リラックス・カモミール",
        price: 980,
        image: "https://placehold.co/400x300/fff8e1/f57f17?text=Chamomile"
    }
];

// カートの点数を管理する変数
let cartCount = 0;
 
// 画面が読み込まれたら実行される処理
document.addEventListener("DOMContentLoaded", () => {
    const productListContainer = document.getElementById("product-list");
    
    // 読み込み中メッセージを消す
    productListContainer.innerHTML = "";

    // 商品データ（配列）を一つずつ取り出してHTMLを作成する
    products.forEach(product => {
        // カードの枠組みを作成
        const card = document.createElement("div");
        card.className = "product-card";
        // 中身（HTML）を組み立てる
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">¥${product.price.toLocaleString()}</p>
                <button class="add-cart-btn" data-id="${product.id}">カートに入れる</button>
            </div>
        `;
    // 組み立てた内容を画面に追加
        productListContainer.appendChild(card);
    });

    // 「カートに入れる」ボタンすべてにクリックイベントを設定
    const cartButtons = document.querySelectorAll(".add-cart-btn");
    cartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            // カートの数字を増やす
            cartCount++;
            document.getElementById("cart-count").textContent = cartCount;
            // ボタンの見た目を少し変える（アニメーション）
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = "追加しました！";
            btn.style.backgroundColor = "#2c3e50";
            
            // 1秒後に元のテキストに戻す
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = "#27ae60";
            }, 1000);
        });
    });
});