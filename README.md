# mdvalidate 说明

## 更新说明
版本 | 时间 | 更新内容
---|---|---
v1.1.0 | 2017-01-12 |  1、添加默认验证提示 2、修改拓展规则 3、alert 提示改成 toast 4、修改拓展方法

## 1.引入mdvalidate.js
```
<script src="./mdvalidate-1.0.0.js"></script>
```
**mdvalidate 依赖jquery或zepto（建议zepto）**

## 2.表单使用
```
<input class="" type="text" value="" name="url" data-required="true" data-rules="url" data-descriptions="url" placeholder="">
```

属性 | 说明 | 备注
---|---|---
data-required | true/false 是否必填 
data-rules    | 验证规则 ,暂时只支持一种验证规则
data-descriptions | 描述，用于验证错误是提示 | 
placeholder   | 如果placeholder有值，当该输入框为空（必填项），则弹出placeholder 

## 3.调用

```
$('#test_form').mdvalidate({
		    valid:function(){
		    	alert('验证通过');
		    	var data = $(this).serializeArray();
		    	console.log(data);
		    },
		    invalid:function(){
		    	alert('验证失败');
		    }
		});
```

 参数 | 说明 | 备注
---|---|---
valid  | 验证通过回调方法
invalid   | 验证失败回调方法

ps：test_form 必须是表单

## 4.拓展
<small>为了方法复用，独立拓展模块/small>

```
$.mdvalidateExtend({
		rules:{
			test1:function(val,$field){
				var reg = /^[1-9]\d*$/;
        		return reg.test(val);
			}
		},
		messages:{
			test1:"test1必须为正整数",
			url:"拓展url message"
		}
    });

```
### 4.1 rules 规则拓展说明
 名称 | 说明 | 备注
---|---|---
 test1 | 方法名称
 val   | input 值
 $field| input 对象

### 4.2 messages 提示信息拓展说明

 名称 | 说明 | 备注
---|---|---
 test1 | 需要拓展提示信息的规则




## 5.现有验证规则

 名称 | 说明 | 备注
---|---|---
key   	   | 关键字
shxydm	   | 社会信用代码
telephone  | 电话号码
mobile     | 手机号码
email 	   | 电子邮箱
url		   | 网址
postcode   | 邮政编码
idcard	   | 身份证号码
zmhsz      | 数字或字母
zw		   | 中文
zm		   | 纯英文
n		   | 整数
zss		   | 正整数
fss    	   | 负整数

## 6.现有规则提示

 名称 | 提示信息 | 备注
---|---|---
"required" | "该项为必填/必选",
"unique" | "必须唯一值",
"money" | "请输入金额",
"key" | "请输入关键字",
"shxydm" | "请输入有效的社会信用代码",
"telephone" | "请输入有效的电话号码",
"mobile" | "请输入有效的手机号码",
"email" | "请输入有效的E-mail",
"url" | "请输入有效的网址",
"postcode" | "邮编必须是5位数字",
"idcard" | "请输入有效的身份证",
"zmhsz" | "请输入字母或数字",
"zw" | "请输入中文",
"zm" | "请输入英文",
"n" | "请输入整数",
"zss" | "请输入正整数",
"fss" | "请输入负整数"
