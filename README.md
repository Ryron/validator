# mdvalidate 说明

## 更新说明
版本 | 时间 | 更新内容
---|---|---
v1.0.0 | 2017-02-05 |  初始化


## 1.引入validator.js
```
<script src="../dist/javascript/validator-1.0.0.js"></script>
```
**validator 依赖jquery或zepto（建议zepto）**

## 2.表单使用
```
<input class="" type="text" value="" name="url" data-rules="required;url" data-descriptions="url" placeholder="">
```
**验证规则写在data-rules,用 ; 隔开。验证顺序从左到右依次进行，建议将必填（required）写在最前**

属性 | 说明 | 备注
---|---|---
data-rules    | 验证规则 ,验证顺序从左到右依次进行
data-descriptions | 描述 ,用于验证错误是提示 | 

## 3.调用

表单submit
```
var testForm = $('#test_form').mdvalidate({
    valid:function(){
    	alert('验证通过');
    	var data = $(this).serializeArray();
    	console.log(data);
    },
    invalid:function(){
    	console.warn("验证失败");
    }
});
```
直接onclick
```
function sub(){
	// status Boolean true/false
	// true 验证成功
	// false 验证错误
	var status = testForm.checkForm();
	console.log(status);
};
```

 参数 | 说明 | 备注
---|---|---
valid  | 验证通过回调方法
invalid   | 验证失败回调方法

**test_form 必须是表单**

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
