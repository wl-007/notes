# IndexDB的简单使用

## 原博客地址

http://t.csdn.cn/ZOCSV

## 封装源码

```js
/**
 * 封装的方法以及用法  version = 1
 * 打开数据库
 */
export function openDB(dbName, storeName, version = 1) {
    return new Promise((resolve, reject) => {
        let indexedDB = window.indexedDB;
        let db;
        const request = indexedDB.open(dbName, version);
        request.onsuccess = function (event) {
            db = event.target.result ;// 数据库对象
            console.log("数据库打开成功");
            resolve(db);
        };
        request.onerror = function (event) {
            reject(event);
        };
        request.onupgradeneeded = function (event) {
            // 数据库创建或升级的时候会触发
            console.log('onupgradeneeded');
            db = event.target.result; // 数据库对象
            let objectStore;
            if (!db.objectStoreNames.contains(storeName)) {
                // keyPath 主键 保证数据不重复
                objectStore = db.createObjectStore(storeName, { keyPath: 'id' }) // 创建表
                // objectStore.createIndex('name', 'name', { unique: true }) // 创建索引 可以让你搜索任意字段
            };
        };
    });
}
/**
 * 新增数据   data {} 对象，且必须有id属性， id作为key ，亦可在初始化数据库的时候使用其他属性名作为key
 */
export function addData(db, storeName, data) {
    return new Promise((resolve, reject) => {
        let request = db.transaction([storeName], 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
            .objectStore(storeName) // 仓库对象
            .add(data);
        request.onsuccess = function (event) {
            resolve(event);
        };
        request.onerror = function (event) {
            throw new Error(event.target.error);
            reject(event);
        };
    })
}
/**
 * 更新数据
 */
export function updateDB(db, storeName, data) {
    let request = db.transaction([storeName], 'readwrite') // 事务对象
        .objectStore(storeName) // 仓库对象
        .put(data);
    return new Promise((resolve, reject) => {
        request.onsuccess = function (ev) {
            resolve(ev);
        };

        request.onerror = function (ev) {
            resolve(ev);
        };
    })
}

/**
 * 删除数据
 */
export function deleteDB(db, storeName, id) {
    let request = db.transaction([storeName], 'readwrite').objectStore(storeName).delete(id);
    return new Promise((resolve, reject) => {
        request.onsuccess = function (ev) {
            resolve(ev);
        }

        request.onerror = function (ev) {
            resolve(ev);
        }
    })
}
/**
 * 通过主键获取数据
 */
export function getDataByKey(db, storeName, key) {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction([storeName]); // 事务
        let objectStore = transaction.objectStore(storeName) ;// 仓库对象
        let request = objectStore.get(key);

        request.onerror = function (event) {
            reject(event)
        };
        request.onsuccess = function (event) {
            resolve(request.result)
        };
    })
}

/**
 * 通过游标读取数据
 */
export function cursorGetData(db, storeName) {
    let list = [];
    let store = db.transaction(storeName, 'readwrite') // 事务
        .objectStore(storeName); // 仓库对象
    let request = store.openCursor(); // 指针对象
    return new Promise((resolve, reject) => {
        request.onsuccess = function (e) {
            let cursor = e.target.result;
            if (cursor) {
                // 必须要检查
                list.push(cursor.value);
                cursor.continue() // 遍历了存储对象中的所有内容
            } else {
                resolve(list);
            }
        }
        request.onerror = function (e) {
            reject(e);
        }
    })
}

/**
 * 通过索引读取数据
 */
export function getDataByIndex(db, storeName, indexName, indexValue) {
    let store = db.transaction(storeName, 'readwrite').objectStore(storeName);
    let request = store.index(indexName).get(indexValue);
    return new Promise((resolve, reject) => {
        request.onerror = function (e) {
            reject(e);
        }
        request.onsuccess = function (e) {
            resolve(e.target.result);
        }
    })
}

/**
 * 通过索引和游标查询记录
 */
export function cursorGetDataByIndex(db, storeName, indexName, indexValue) {
    let list = []
    let store = db.transaction(storeName, 'readwrite').objectStore(storeName); // 仓库对象
    let request = store.index(indexName) // 索引对象
        .openCursor(IDBKeyRange.only(indexValue)) // 指针对象
    return new Promise((resolve, reject) => {
        request.onsuccess = function (e) {
            let cursor = e.target.result;
            if (cursor) {
                list.push(cursor.value);
                cursor.continue() // 遍历了存储对象中的所有内容
            } else {
                resolve(list);
            }
        }
        request.onerror = function (ev) {
            reject(ev);
        }
    })
}



/**
 * 删除数据库
 */
export function deleteDBAll(dbName) {
    console.log(dbName);
    let deleteRequest = window.indexedDB.deleteDatabase(dbName);
    return new Promise((resolve, reject) => {
        deleteRequest.onerror = function (event) {
            console.log('删除失败')
        }
        deleteRequest.onsuccess = function (event) {
            console.log('删除成功')
        }
    });
}

/**
 * 关闭数据库
 */
export function closeDB(db) {
    db.close()
    console.log('数据库已关闭')
}

export default {
    openDB,
    addData,
    getDataByKey,
    cursorGetData,
    getDataByIndex,
    cursorGetDataByIndex,
    updateDB,
    deleteDB,
    deleteDBAll,
    closeDB
}
```

## 使用案例

```js
import IndexDB from "./indexDB.js";

usingIndxDB();
async function usingIndxDB() {
    // 打开数据库
    let dbName = 'helloIndexDB', version = 1, storeName = 'helloStore';
    const db = await IndexDB.openDB(dbName, storeName, version);
    let id=1;
    // 存储数据
    const data = {
        id: id, name: '李四', code: 'ls'
    };
    IndexDB.addData(db, storeName, data)
    // 获取数据
    console.log(await IndexDB.getDataByKey(db, storeName, id));
    const data2 = {
        id: id, name: '王五', code: 'ww'
    };
    // 更改数据
    IndexDB.updateDB(db, storeName, data2)
    console.log(await IndexDB.getDataByKey(db, storeName, id));

    // 删除数据
    IndexDB.deleteDB(db, storeName, id)
    console.log(await IndexDB.getDataByKey(db, storeName, id));
}
```

