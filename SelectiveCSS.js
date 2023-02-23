class AutoStyle {
    constructor(name, url, id, start, end, priority) {
        this.name = name;
        this.url = url;
        this.id = id;
        this.startDate = new Date(start);
        this.endDate = new Date(end);

        if (this.startDate > this.endDate) {
            throw new Error('开始日期不能晚于结束日期！');
        }

        this.priority = priority;
    }
}

// 創建一個工廠函數
class StyleFactory {
    constructor() { }

    // 在工廠函數的原型上定義 createAutoStyle 方法
    createAutoStyle(name, url, id, start, end, priority = 0) {

        //創建一個 AutoStyle 實例
        var autoStyle = new AutoStyle(name, url, id, start, end, priority);

        // 判斷是否有相同id的自動樣式
        if (!document.querySelector('#' + id)) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.id = id;

            document.head.appendChild(link);
        }else{
            alert("已存在該id的自動樣式！")
        }

        // 返回 autoStyle 實例
        return autoStyle;
    }
}

new StyleFactory().createAutoStyle('name', 'url', 'id', '2023-02-20', '2023-02-25', 1);


// 導出工廠函數
module.exports = StyleFactory;