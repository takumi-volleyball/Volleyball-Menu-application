  // ==============================
// 練習メニューのデータ
// ==============================

const menus = {

  "アップ": [
        "ストレッチ",
        "ランニング",
        "ラダー",
        "ダッシュ",
        "ラインダッシュ",
    ],

    "パス": [
        "肩慣らし",
        "アンダー",
        "オーバー",
        "9ｍパス",
        "壁パス",
        "直上パス",
        "低弾道パス",
        "対人",
        "ガチ対人",
        "ボールゲーム",
    ],

    "レセプション": [
        "対人キャッチ",
        "１枚キャッチ",
        "３枚キャッチ",
    ],

    "ディグ": [
        "地上ディグ",
        "対人ディグ",
        "１枚ディグ",
        "３枚ディグ",
        "６枚ディグ",
    ],

    "サーブ": [
        "サーブ",
        "プレッシャーサーブ",
    ],

    "スパイク": [
        "打ち込み",
        "バック打ち込み",
        "連続打ち込み",
        "１列スパイク",
        "クイック打ち込み",
        "２段打ち込み",
        "2段スパイク",
        "トス合わせ",
        "Ｂパスからトス合わせ",
        "レフトトス合わせ―Ａパスから",
        "レフトトス合わせ―Ｂパスから",
        "ライトトス合わせ―Ａパスから",
        "ライトトス合わせ―Ｂパスから",
        "コンビ",
    ],

    "ブロック": [
        "ブロックステップ",
        "空ブロック",
        "６ブロック",
        "その場左右",
        "１枚ブロック",
        "３枚ステップ",
        "ボールなし2枚",
        "２枚ブロック",
        "対クイックブロック",
        "生きたトスブロック",
    ],

     "複合練": [
        "キャッチからスパイク",
        "キャッチから切り返し",
        "ディグからの切り返し",
        "キャッチからの切り返し＋ディグからの切り返し",
        "ＡＢ戦",
        "紅白戦",
        "ＯＢ戦",
    ],
};
const savedMenus =
    localStorage.getItem("volleyballMenus");

if (savedMenus) {

    Object.assign(
        menus,
        JSON.parse(savedMenus)
    );

}

    // ==============================
// カテゴリーとメニューの選択
// ==============================

const categorySelect = document.getElementById("category");
const menuSelect = document.getElementById("menu");


// カテゴリーが変更されたとき
categorySelect.addEventListener("change", function() {

    const category = categorySelect.value;

    // メニュー欄を空にする
    menuSelect.innerHTML = "";


    // カテゴリーが選ばれていない場合
    if (category === "") {

        menuSelect.innerHTML =
            "<option value=''>カテゴリーを選択してください</option>";

        return;
    }


    // 「メニューを選択してください」を最初に表示
    const firstOption = document.createElement("option");

    firstOption.value = "";
    firstOption.textContent = "メニューを選択してください";

    menuSelect.appendChild(firstOption);


    // 選択したカテゴリーのメニューを表示
    menus[category].forEach(function(menu) {

        const option = document.createElement("option");

        option.value = menu;
        option.textContent = menu;

        menuSelect.appendChild(option);

    });

});


// ==============================
// 作成した練習メニューを保存
// ==============================

let trainingMenus =
    JSON.parse(
        localStorage.getItem("trainingMenus")
    ) || [];


// ==============================
// 「メニューを追加」ボタン
// ==============================

function addMenu() {

    const category = categorySelect.value;
    const menu = menuSelect.value;

    const time =
        Number(document.getElementById("time").value);

    const sets =
        Number(document.getElementById("sets").value);


    // カテゴリー・メニューが選ばれていない場合
    if (!category || !menu) {

        alert("カテゴリーとメニューを選択してください");

        return;
    }


    // 練習メニューを保存
    trainingMenus.push({

    id: Date.now().toString(),

    category: category,
    menu: menu,
    time: time,
    sets: sets

});
localStorage.setItem(
    "trainingMenus",
    JSON.stringify(trainingMenus)
);

    // 画面に表示
    displayMenus();

}


// ==============================
// 練習メニューを画面に表示
// ==============================

// ==============================
// 練習メニューを画面に表示
// ==============================

// ==============================
// 練習メニューをカテゴリーごとに表示
// ==============================

// ==============================
// 練習メニューをカテゴリーごとに表示
// ==============================

function displayMenus() {

    const list =
        document.getElementById("menuList");

    list.innerHTML = "";

    let totalTime = 0;


    Object.keys(menus).forEach(function(category) {

        const categoryMenus =
            trainingMenus.filter(function(item) {

                return item.category === category;

            });


        // メニューがないカテゴリーは表示しない
        if (categoryMenus.length === 0) {
            return;
        }


        // ==============================
        // カテゴリー
        // ==============================

        const categoryDiv =
            document.createElement("div");

        categoryDiv.className =
            "training-category";

        categoryDiv.draggable = true;

        categoryDiv.dataset.category =
            category;


        categoryDiv.innerHTML = `

            <div class="category-title">
                【${category}】
            </div>

            <div class="category-menus"></div>

        `;


        const menuArea =
            categoryDiv.querySelector(
                ".category-menus"
            );


        // ==============================
        // メニュー
        // ==============================

        categoryMenus.forEach(function(item) {

            totalTime += item.time;


            const menuDiv =
                document.createElement("div");

            menuDiv.className =
                "menu-item";

            menuDiv.draggable = true;


            // 詳細がある場合だけ表示
            let detailHTML = "";

            if (item.detail) {

                detailHTML = `

                    <div class="menu-detail-area">

                        <button
                            class="detail-button"
                            onclick="toggleDetail('${item.id}')">

                            詳細 ▾

                        </button>

                        <div
                            id="detail-${item.id}"
                            class="menu-detail"
                            style="display: none;">

                            ${item.detail}

                        </div>

                    </div>

                `;

            }


            // ==============================
            // 表示
            // ==============================

            menuDiv.innerHTML = `

                <div class="menu-main">

                    <strong>
                        ${item.menu}
                    </strong>

                    <span class="menu-time">

                        ${item.time}min
                        ${item.sets > 1
                            ? " × " + item.sets
                            : ""}

                    </span>

                </div>

                ${detailHTML}

                <div class="menu-buttons">

                    <button
                        onclick="editMenuById('${item.id}')">

                        ✏️

                    </button>

                    <button
                        class="delete-button"
                        onclick="deleteMenuById('${item.id}')">

                        🗑️

                    </button>

                </div>

            `;


            // ==============================
            // メニューのドラッグ
            // ==============================

            menuDiv.addEventListener(
                "dragstart",
                function() {

                    menuDiv.classList.add(
                        "dragging-menu"
                    );

                }
            );


            menuDiv.addEventListener(
                "dragend",
                function() {

                    menuDiv.classList.remove(
                        "dragging-menu"
                    );

                    updateTrainingOrder();

                }
            );


            menuArea.appendChild(menuDiv);

        });


        // ==============================
        // カテゴリーのドラッグ
        // ==============================

        categoryDiv.addEventListener(
            "dragstart",
            function() {

                categoryDiv.classList.add(
                    "dragging-category"
                );

            }
        );


        categoryDiv.addEventListener(
            "dragend",
            function() {

                categoryDiv.classList.remove(
                    "dragging-category"
                );

                saveCategoryOrder();

            }
        );


        categoryDiv.addEventListener(
            "dragover",
            function(e) {

                e.preventDefault();

            }
        );


        list.appendChild(categoryDiv);

    });


    // ==============================
    // 合計時間
    // ==============================

    document.getElementById("totalTime")
        .textContent = totalTime;


    // ==============================
    // 残り時間
    // ==============================

    const practiceTime =
        Number(
            document.getElementById(
                "practiceTime"
            ).value
        );


    const remainingTime =
        practiceTime - totalTime;


    document.getElementById(
        "remainingTime"
    ).textContent = remainingTime;
enableTouchMenuDrag();
enableTouchCategoryDrag();
}


// ==============================
// ==============================
// メニューを削除
// ==============================

function deleteMenuById(id) {

    const index =
        trainingMenus.findIndex(function(item) {

            return item.id === id;

        });

    if (index === -1) {
        return;
    }

    trainingMenus.splice(index, 1);

    localStorage.setItem(
        "trainingMenus",
        JSON.stringify(trainingMenus)
    );

    displayMenus();

}


// ==============================
// メニューを編集
// ==============================

function editMenuById(id) {

    const item =
        trainingMenus.find(function(item) {

            return item.id === id;

        });

    if (!item) {
        return;
    }


    const newTime = prompt(
        "時間を入力してください（分）",
        item.time
    );

    if (newTime === null) {
        return;
    }


    const newSets = prompt(
        "セット数を入力してください",
        item.sets
    );

    if (newSets === null) {
        return;
    }


    item.time = Number(newTime);

    item.sets = Number(newSets);

const newDetail = prompt(
    "詳細（必要な場合のみ入力）",
    item.detail || ""
);

if (newDetail === null) {
    return;
}

item.detail = newDetail;

    localStorage.setItem(
        "trainingMenus",
        JSON.stringify(trainingMenus)
    );


    displayMenus();

}

// 下に移動
function moveDown(index) {

    if (index === trainingMenus.length - 1) {
        return;
    }

    const temp = trainingMenus[index];

    trainingMenus[index] = trainingMenus[index + 1];

    trainingMenus[index + 1] = temp;

    displayMenus();

}


// ==============================
// 練習メニューをコピー
// ==============================

// ==============================
// 練習メニューをカテゴリーごとにコピー
// ==============================

function copyTrainingMenu() {

    let text = "【今日の練習メニュー】\n\n";


    // カテゴリーの順番で処理
    Object.keys(menus).forEach(function(category) {

        const categoryMenus =
            trainingMenus.filter(function(item) {

                return item.category === category;

            });


        // メニューがないカテゴリーはスキップ
        if (categoryMenus.length === 0) {
            return;
        }


        // カテゴリー名
        text += "【" + category + "】\n";


        // カテゴリー内のメニュー
        categoryMenus.forEach(function(item) {

            text +=
                item.menu +
                "　" +
                item.time +
                "min";


            // 2セット以上の場合だけ表示
            if (item.sets > 1) {

                text +=
                    " × " +
                    item.sets;

            }


            text += "\n";


            // 詳細がある場合
            if (item.detail) {

                text +=
                    "　└ " +
                    item.detail +
                    "\n";

            }

        });


        text += "\n";

    });


    // ==============================
    // 合計時間
    // ==============================

    const totalTime =
        trainingMenus.reduce(function(total, item) {

            return total + item.time;

        }, 0);


    // ==============================
    // 残り時間
    // ==============================

    const practiceTime =
        Number(
            document.getElementById(
                "practiceTime"
            ).value
        );


    const remainingTime =
        practiceTime - totalTime;


    text += "────────────\n";

    text +=
        "合計：" +
        totalTime +
        "分\n";

    text +=
        "残り：" +
        remainingTime +
        "分";


    navigator.clipboard.writeText(text);


    alert("練習メニューをコピーしました！");
}

// ==============================
// メニュー管理画面を開く
// ==============================

function openMenuManager() {

    const manager =
        document.getElementById("menuManager");

    if (manager.style.display === "none") {

        manager.style.display = "block";

    } else {

        manager.style.display = "none";

    }

}


// ==============================
// 新しいメニューを追加
// ==============================

function addNewMenu() {

    const category =
        document.getElementById("managerCategory").value;

    const newMenu =
        document.getElementById("newMenuName").value;


    // カテゴリーが選ばれていない
    if (!category) {

        alert("カテゴリーを選択してください");

        return;

    }


    // メニュー名が空
    if (!newMenu) {

        alert("メニュー名を入力してください");

        return;

    }


    // メニューを追加
    menus[category].push(newMenu);

    // メニューをブラウザに保存
    localStorage.setItem(
    "volleyballMenus",
    JSON.stringify(menus)
);

    // 入力欄を空にする
    document.getElementById("newMenuName").value = "";


    alert(
        "「" +
        newMenu +
        "」を追加しました！"
    );

}
// ==============================
// 登録メニューを表示
// ==============================

function displayManagerMenus() {

    const list =
        document.getElementById("managerMenuList");

    list.innerHTML = "";

    const category =
        document.getElementById("managerCategory").value;

    if (!category) {
        return;
    }

    menus[category].forEach(function(menu, index) {

        const div =
            document.createElement("div");

        div.innerHTML = `
            ${menu}
            <button onclick="deleteRegisteredMenu(${index})">
                🗑️ 削除
            </button>
        `;

        list.appendChild(div);

    });
}


// ==============================
// 登録メニューを削除
// ==============================

function deleteRegisteredMenu(index) {

    const category =
        document.getElementById("managerCategory").value;

    const answer =
        confirm(
            "「" +
            menus[category][index] +
            "」を削除しますか？"
        );

    if (!answer) {
        return;
    }

    menus[category].splice(index, 1);

    // 保存
    localStorage.setItem(
        "volleyballMenus",
        JSON.stringify(menus)
    );

    // 管理画面を更新
    displayManagerMenus();

    // 通常のメニュー選択欄も更新
    menuSelect.innerHTML =
        "<option value=''>メニューを選択してください</option>";

    menus[category].forEach(function(menu) {

        const option =
            document.createElement("option");

        option.value = menu;
        option.textContent = menu;

        menuSelect.appendChild(option);

    });

}
// ==============================
// 登録されているメニューを表示
// ==============================



// ==============================
// 登録されているメニューを削除
// ==============================


document.getElementById("managerCategory")
    .addEventListener("change", function() {

        displayManagerMenus();

    });

    
    // ==============================
// 練習メニューを全部クリア
// ==============================

function clearTrainingMenus() {

    const answer =
        confirm("作成した練習メニューを全部削除しますか？");

    if (!answer) {
        return;
    }

    trainingMenus = [];

    localStorage.removeItem(
        "trainingMenus"
    );

    displayMenus();

}

// ==============================
// メニューの並び順を更新
// ==============================

function updateTrainingOrder() {

    const newOrder = [];

    // 画面上のカテゴリーを順番に確認
    document
        .querySelectorAll(".training-category")
        .forEach(function(categoryDiv) {

            const category =
                categoryDiv.dataset.category;

            // そのカテゴリー内のメニューを確認
            categoryDiv
                .querySelectorAll(".menu-item")
                .forEach(function(menuDiv) {

                    const menuName =
                        menuDiv.querySelector("strong").textContent.trim();

                    // 元のメニューを探す
                    const item =
                        trainingMenus.find(function(item) {

                            return (
                                item.category === category &&
                                item.menu === menuName
                            );

                        });

                    if (item) {

                        newOrder.push(item);

                    }

                });

        });


    // 並び順を更新
    trainingMenus = newOrder;


    // もう一度表示
    displayMenus();

}
// ==============================
// メニューをドラッグ中
// ==============================

document.addEventListener(
    "dragover",
    function(e) {

        const dragging =
            document.querySelector(".dragging-menu");

        if (!dragging) {
            return;
        }


        const menuArea =
            dragging.parentElement;


        // 他のメニューを取得
        const menus =
            [
                ...menuArea.querySelectorAll(
                    ".menu-item:not(.dragging-menu)"
                )
            ];


        const afterElement =
            menus.find(function(menu) {

                const box =
                    menu.getBoundingClientRect();

                return (
                    e.clientY <
                    box.top + box.height / 2
                );

            });


        if (afterElement) {

            menuArea.insertBefore(
                dragging,
                afterElement
            );

        } else {

            menuArea.appendChild(
                dragging
            );

        }

    }
);
// ==============================
// カテゴリーをドラッグ中
// ==============================

document.addEventListener(
    "dragover",
    function(e) {

        const dragging =
            document.querySelector(".dragging-category");

        if (!dragging) {
            return;
        }


        const list =
            document.getElementById("menuList");


        const categories =
            [
                ...list.querySelectorAll(
                    ".training-category:not(.dragging-category)"
                )
            ];


        const afterElement =
            categories.find(function(category) {

                const box =
                    category.getBoundingClientRect();

                return (
                    e.clientY <
                    box.top + box.height / 2
                );

            });


        if (afterElement) {

            list.insertBefore(
                dragging,
                afterElement
            );

        } else {

            list.appendChild(
                dragging
            );

        }

    }
);
// ==============================
// カテゴリーの並び順を保存
// ==============================

function saveCategoryOrder() {

    const categoryOrder = [];

    document
        .querySelectorAll(".training-category")
        .forEach(function(categoryDiv) {

            categoryOrder.push(
                categoryDiv.dataset.category
            );

        });


    localStorage.setItem(
        "volleyballCategoryOrder",
        JSON.stringify(categoryOrder)
    );

}
// ==============================
// カテゴリーのドラッグ終了
// ==============================

document.addEventListener(
    "dragend",
    function(e) {

        if (
            e.target.classList.contains(
                "training-category"
            )
        ) {

            saveCategoryOrder();

        }

    }
);
// ==============================
// 詳細の表示・非表示
// ==============================

function toggleDetail(id) {

    const detail =
        document.getElementById(
            "detail-" + id
        );

    if (detail.style.display === "none") {

        detail.style.display = "block";

    } else {

        detail.style.display = "none";

    }

}
// ==============================
// 新しいカテゴリーを追加
// ==============================

function addNewCategory() {

    const input =
        document.getElementById("newCategoryName");

    const newCategory =
        input.value.trim();


    // 入力されていない場合
    if (!newCategory) {

        alert("カテゴリー名を入力してください");

        return;

    }


    // すでに存在する場合
    if (menus[newCategory]) {

        alert("そのカテゴリーはすでに存在します");

        return;

    }


    // 新しいカテゴリーを作成
    menus[newCategory] = [];


    // ブラウザに保存
    localStorage.setItem(
        "volleyballMenus",
        JSON.stringify(menus)
    );


    // 入力欄を空にする
    input.value = "";

// カテゴリー選択欄に追加
const option =
    document.createElement("option");

option.value = newCategory;
option.textContent = newCategory;

categorySelect.appendChild(option);


// メニュー管理のカテゴリー選択欄にも追加
const managerOption =
    document.createElement("option");

managerOption.value = newCategory;
managerOption.textContent = newCategory;

document
    .getElementById("managerCategory")
    .appendChild(managerOption);

    alert(
        "「" +
        newCategory +
        "」を追加しました！"
    );

}
// ==============================
// 保存されているカテゴリーを選択欄に表示
// ==============================

function loadCategories() {

    const categorySelect =
        document.getElementById("category");

    const managerCategory =
        document.getElementById("managerCategory");


    Object.keys(menus).forEach(function(category) {

        // 通常のカテゴリー選択欄
        if (
            ![...categorySelect.options]
                .some(option => option.value === category)
        ) {

            const option =
                document.createElement("option");

            option.value = category;
            option.textContent = category;

            categorySelect.appendChild(option);
        }


        // メニュー管理のカテゴリー選択欄
        if (
            ![...managerCategory.options]
                .some(option => option.value === category)
        ) {

            const option =
                document.createElement("option");

            option.value = category;
            option.textContent = category;

            managerCategory.appendChild(option);
        }

    });

}


// ページを開いたときに実行
loadCategories();
displaySavedMenus();
// ==============================
// 練習メニューを名前付きで保存
// ==============================

function saveTrainingMenu() {

    // 練習メニューがない場合
    if (trainingMenus.length === 0) {

        alert("保存する練習メニューがありません");

        return;

    }

    // 保存する名前を入力
    const name = prompt(
        "この練習メニューに名前を付けてください",
        "通常練習"
    );

    // キャンセル
    if (name === null) {
        return;
    }

    // 空欄
    if (!name.trim()) {

        alert("名前を入力してください");

        return;

    }

    // 現在の練習メニューをコピー
    const savedMenu = {

        id: Date.now().toString(),

        name: name.trim(),

        menus: JSON.parse(
            JSON.stringify(trainingMenus)
        )

    };

    // すでに保存されているメニューを取得
    let savedTrainingMenus =
        JSON.parse(
            localStorage.getItem("savedTrainingMenus")
        ) || [];


    // 保存
    savedTrainingMenus.push(savedMenu);


    localStorage.setItem(
        "savedTrainingMenus",
        JSON.stringify(savedTrainingMenus)
    );


    // 保存一覧を更新
    displaySavedMenus();


    alert(
        "「" +
        savedMenu.name +
        "」として保存しました！"
    );

}
// ==============================
// 練習メニューを名前付きで保存
// ==============================

function saveTrainingMenu() {

    // 練習メニューがない場合
    if (trainingMenus.length === 0) {

        alert("保存する練習メニューがありません");

        return;

    }


    // 名前を入力
    const name = prompt(
        "この練習メニューに名前を付けてください",
        "通常練習"
    );


    // キャンセル
    if (name === null) {
        return;
    }


    // 空欄
    if (!name.trim()) {

        alert("名前を入力してください");

        return;

    }


    // 現在の練習メニューをコピー
    const savedMenu = {

        id: Date.now().toString(),

        name: name.trim(),

        menus: JSON.parse(
            JSON.stringify(trainingMenus)
        )

    };


    // 保存済みメニューを取得
    let savedTrainingMenus =
        JSON.parse(
            localStorage.getItem("savedTrainingMenus")
        ) || [];


    // 追加
    savedTrainingMenus.push(savedMenu);


    // 保存
    localStorage.setItem(
        "savedTrainingMenus",
        JSON.stringify(savedTrainingMenus)
    );


    alert(
        "「" +
        savedMenu.name +
        "」として保存しました！"
    );

}
// ==============================
// 保存した練習メニューを表示
// ==============================

function displaySavedMenus() {

    const list =
        document.getElementById("savedMenuList");

    if (!list) {
        return;
    }

    list.innerHTML = "";

    const savedTrainingMenus =
        JSON.parse(
            localStorage.getItem("savedTrainingMenus")
        ) || [];


    // 保存されたメニューがない場合
    if (savedTrainingMenus.length === 0) {

        list.innerHTML =
            "<p>保存された練習メニューはありません</p>";

        return;

    }


    savedTrainingMenus.forEach(function(savedMenu) {

        const div =
            document.createElement("div");

        div.className = "saved-menu-item";


        div.innerHTML = `

            <strong>
                ${savedMenu.name}
            </strong>

            <button
                onclick="loadSavedMenu('${savedMenu.id}')">

                ▶ 読み込む

            </button>

            <button
                onclick="duplicateSavedMenu('${savedMenu.id}')">

                📋 複製

            </button>

            <button
                onclick="deleteSavedMenu('${savedMenu.id}')">

                🗑️ 削除

            </button>

        `;


        list.appendChild(div);

    });

}
// ==============================
// 保存した練習メニューを読み込む
// ==============================

function loadSavedMenu(id) {

    const savedTrainingMenus =
        JSON.parse(
            localStorage.getItem("savedTrainingMenus")
        ) || [];


    // 指定された保存メニューを探す
    const savedMenu =
        savedTrainingMenus.find(function(item) {

            return item.id === id;

        });


    if (!savedMenu) {

        alert("保存された練習メニューが見つかりません");

        return;

    }


    // 現在の練習メニューを置き換える
    trainingMenus =
        JSON.parse(
            JSON.stringify(savedMenu.menus)
        );


    // 現在の練習メニューを保存
    localStorage.setItem(
        "trainingMenus",
        JSON.stringify(trainingMenus)
    );


    // 画面を更新
    displayMenus();


    alert(
        "「" +
        savedMenu.name +
        "」を読み込みました！"
    );

}
// ==============================
// 保存した練習メニューを複製
// ==============================

function duplicateSavedMenu(id) {

    const savedTrainingMenus =
        JSON.parse(
            localStorage.getItem("savedTrainingMenus")
        ) || [];


    // 複製するメニューを探す
    const savedMenu =
        savedTrainingMenus.find(function(item) {

            return item.id === id;

        });


    if (!savedMenu) {

        alert("保存された練習メニューが見つかりません");

        return;

    }


    // 保存データをコピー
    trainingMenus =
        JSON.parse(
            JSON.stringify(savedMenu.menus)
        );


    // IDを全部作り直す
    trainingMenus.forEach(function(item) {

        item.id =
            Date.now().toString() +
            Math.random().toString(36).substring(2);

    });


    // 現在の練習メニューとして保存
    localStorage.setItem(
        "trainingMenus",
        JSON.stringify(trainingMenus)
    );


    // 画面を更新
    displayMenus();


    alert(
        "「" +
        savedMenu.name +
        "」を複製しました！\n\n" +
        "このメニューを自由に編集できます。"
    );

}
// ==============================
// 保存した練習メニューを削除
// ==============================

function deleteSavedMenu(id) {

    let savedTrainingMenus =
        JSON.parse(
            localStorage.getItem("savedTrainingMenus")
        ) || [];


    const savedMenu =
        savedTrainingMenus.find(function(item) {

            return item.id === id;

        });


    if (!savedMenu) {

        alert("保存された練習メニューが見つかりません");

        return;

    }


    const answer =
        confirm(
            "「" +
            savedMenu.name +
            "」を削除しますか？"
        );


    if (!answer) {
        return;
    }


    // 削除
    savedTrainingMenus =
        savedTrainingMenus.filter(function(item) {

            return item.id !== id;

        });


    // 保存
    localStorage.setItem(
        "savedTrainingMenus",
        JSON.stringify(savedTrainingMenus)
    );


    // 一覧を更新
    displaySavedMenus();

}
// ==============================
// 保存メニューの表示・非表示
// ==============================

function toggleSavedMenus() {

    const area =
        document.getElementById("savedMenuArea");

    if (area.style.display === "none") {

        area.style.display = "block";

        displaySavedMenus();

    } else {

        area.style.display = "none";

    }

}
// ==============================
// スマホ用：メニューの長押しドラッグ
// ==============================

function enableTouchMenuDrag() {

    const menuItems =
        document.querySelectorAll(".menu-item");

    menuItems.forEach(function(menuItem) {

        let timer = null;
        let isDragging = false;


        // 長押し開始
        menuItem.addEventListener(
            "touchstart",
            function(e) {

                timer = setTimeout(function() {

                    isDragging = true;

                    menuItem.classList.add(
                        "dragging-touch"
                    );

                }, 450);

            },
            { passive: true }
        );


        // 指を動かす
        menuItem.addEventListener(
            "touchmove",
            function(e) {

                if (!isDragging) {
                    return;
                }

                e.preventDefault();


                const touch =
                    e.touches[0];


                const menuArea =
                    menuItem.parentElement;


                const otherMenus =
                    [
                        ...menuArea.querySelectorAll(
                            ".menu-item:not(.dragging-touch)"
                        )
                    ];


                const afterElement =
                    otherMenus.find(function(menu) {

                        const box =
                            menu.getBoundingClientRect();

                        return (
                            touch.clientY <
                            box.top +
                            box.height / 2
                        );

                    });


                if (afterElement) {

                    menuArea.insertBefore(
                        menuItem,
                        afterElement
                    );

                } else {

                    menuArea.appendChild(
                        menuItem
                    );

                }

            },
            { passive: false }
        );


        // 指を離す
        menuItem.addEventListener(
            "touchend",
            function() {

                clearTimeout(timer);


                if (!isDragging) {
                    return;
                }


                isDragging = false;


                menuItem.classList.remove(
                    "dragging-touch"
                );


                updateTrainingOrder();

            }
        );


        // 長押しをキャンセル
        menuItem.addEventListener(
            "touchcancel",
            function() {

                clearTimeout(timer);

                isDragging = false;

                menuItem.classList.remove(
                    "dragging-touch"
                );

            }
        );

    });

}
// ==============================
// スマホ用：カテゴリーの長押しドラッグ
// ==============================

function enableTouchCategoryDrag() {

    const categories =
        document.querySelectorAll(".training-category");

    categories.forEach(function(categoryDiv) {

        let timer = null;
        let isDragging = false;


        // 長押し開始
        categoryDiv.addEventListener(
            "touchstart",
            function(e) {

                timer = setTimeout(function() {

                    isDragging = true;

                    categoryDiv.classList.add(
                        "dragging-touch"
                    );

                }, 450);

            },
            { passive: true }
        );


        // 指を動かす
        categoryDiv.addEventListener(
            "touchmove",
            function(e) {

                if (!isDragging) {
                    return;
                }

                e.preventDefault();


                const touch =
                    e.touches[0];


                const list =
                    document.getElementById(
                        "menuList"
                    );


                const otherCategories =
                    [
                        ...list.querySelectorAll(
                            ".training-category:not(.dragging-touch)"
                        )
                    ];


                const afterElement =
                    otherCategories.find(
                        function(category) {

                            const box =
                                category.getBoundingClientRect();

                            return (
                                touch.clientY <
                                box.top +
                                box.height / 2
                            );

                        }
                    );


                if (afterElement) {

                    list.insertBefore(
                        categoryDiv,
                        afterElement
                    );

                } else {

                    list.appendChild(
                        categoryDiv
                    );

                }

            },
            { passive: false }
        );


        // 指を離す
        categoryDiv.addEventListener(
            "touchend",
            function() {

                clearTimeout(timer);


                if (!isDragging) {
                    return;
                }


                isDragging = false;


                categoryDiv.classList.remove(
                    "dragging-touch"
                );


                saveCategoryOrder();

            }
        );


        // 長押しキャンセル
        categoryDiv.addEventListener(
            "touchcancel",
            function() {

                clearTimeout(timer);

                isDragging = false;

                categoryDiv.classList.remove(
                    "dragging-touch"
                );

            }
        );

    });

}
