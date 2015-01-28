# grunt-rs-merge

提供js中的内容嵌入机制, 可以将页面结构或样式资源独立于js进行维护   
如果你每次看到js里出现大段大段的html代码或者样式就菊紧的话, 那么不妨一试

## 安装
``npm install git://github.com/gouflv/grunt-rs-merge --save-dev``

在 ``grunt.js`` 中添加如下代码:

```javascript
grunt.loadNpmTasks('grunt-rs-merge');
```

## 配置
在 ``Gruntfile.js`` 中添加该行代码用于任务定义

```javascript
  rs_merge: {
  	//子任务1
		task_a: {
			files: {
				'test/expected/main.js': [
					'test/fixtures/main.js'
				]
			}
		}
	}
```

###文件匹配规则	
``files``为grunt内置的文件选择器之一, 详细参考[Gruntjs Files Object Format](http://gruntjs.com/configuring-tasks#files-object-format)

其中key值为目标地址, value为源文件数组

rs_merge将扫描源文件(test/fixtures/main.js)中的**资源描述符**, 并将资源编入目标文件(test/expected/main)中, 如果指定多个源文件, 则会合并目标文件后编入资源

##资源描述符
grunt-rs-merge支持html和css的引入, 并内置`格式压缩` `特殊字符转义` `中文转ascii`功能

描述符采用字符串形式声明``'<%include "path/foo.html" %>'``, 

## 代码实例

### 源文件
`test/fixtures/main.js`

```javascript
var tmpl = '<%include "path/foo.html" %>';

$(tmpl).appendTo(document.body);
```

### 被引入页面的内容
`path/foo.html`

```html
<h1>testing something</h1>
```

### 执行结果: html文件的页面内容编入到main.js的tmpl变量中

目标文件`test/expected/main.js`

```javascript
var tmpl = '<h1>testing something</h1>';

$(tmpl).appendTo(document.body);
```


##测试
``clone``本工程到本地后, 执行``npm install``安装相关依赖, 最后执行``grunt``即可运行测试

详细代码见[Gruntfile.js](Gruntfile.js) 

