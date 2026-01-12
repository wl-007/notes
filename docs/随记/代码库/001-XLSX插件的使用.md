## 导出 XLSX

```js
//import {utils,writeFile} from 'xlsx';
const {tableData=[],text="导出"}=props;
  const exportToExcel = () => {

    // 创建一个工作簿
    const workbook = utils.book_new();
    // 创建一个工作表
    const worksheet = utils.json_to_sheet(tableData);
    // 将工作表添加到工作簿
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // 将工作簿保存为 Excel 文件
    writeFile(workbook, 'table-data.xlsx');
  };
```

## 导入 XLSX

```js
//import * as xlsx from 'xlsx';
<Button icon={<UploadOutl//import * as xlsx from 'xlsx';ined />}>
                导入
                <input
                type="file"
                // 文件导入
                // style={{ display: 'none' }}
                className={styles.file}
                onChange={function (e) {
                    const file = e.target.files[0];
                    e.target.value="";//清除文件，保证下次选择同一文件还能触发事件
                    const reader = new FileReader();
                    //读取任意类型的文件，返回二进制字符串
                    reader.readAsArrayBuffer(file);
                    //文件读取成功时触发
                    reader.onload = function (e) {
                        const data = e.target.result;
                        //读取二进制的excel，转换为workbook对象,工作簿
                        const wb = xlsx.read(data, {
                            type: 'binary',
                        });
                        // console.log(wb, 'wb');
                        const excelJson = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                        console.log(excelJson);
                        // const excelHTML = xlsx.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]);
                        // console.log(excelHTML);
                    };
                }}
            /></Button>
```

```CSS
/*隐藏原生file*/
.file {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
}
```

