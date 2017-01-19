/*!  
 * 表单验证 validator
 * verson 1.0.0
 * 参考 mobileValidate
 */
(function (factory) {
	// 支持cmd、amd
	if (typeof define === 'function' && define.amd ) {
		define(['Zepto'], function(zepto){
			factory(zepto); 
		});
	}else if(typeof define === 'function' && define.cmd){
		define(['Zepto'], function(require,exports,moudles){
			factory(require('Zepto')); 
		})
	}else{
		factory(Zepto);
	}
})(function($){
	"use strict";
	var addDescriptions = function(descriptions, errorMsg){
		var desc = (descriptions !== 'undefined' && descriptions !== '') ? (descriptions + ',') : ''; 
		return (desc + errorMsg);
	};
	// 验证表单控件类型
	// type[0] 普通input
	// type[1] select
	// type[2] checkbox&radio
	
	var type = ['input:not([type]),input[type="color"],input[type="date"],input[type="datetime"],input[type="datetime-local"],input[type="email"],input[type="file"],input[type="hidden"],input[type="month"],input[type="number"],input[type="password"],input[type="range"],input[type="search"],input[type="tel"],input[type="text"],input[type="time"],input[type="url"],input[type="week"],textarea', 'select', 'input[type="checkbox"],input[type="radio"]'],
		allTypes=type.join(",");

	var Validator = function( $form, settings){
		var $fields = $form.find(allTypes); 
		var settings = $.extend(true, Validator.defaults, settings);
		var self = this;

		this.$form = $form;

		$fields.each(function(){
			var $this=$(this);
			if($this.is(allTypes)){
				// 绑定onchange
				$(this).on('change', function(event) {
					self.checkFiled($this, settings);
				});
				// 绑定blur
			};
		});
		// 表单提交
		$form.on('submit',function(event){
			var formValid = true; 
			settings.isFirstTime = true;
			$fields.each(function() {
				var $this = $(this);
				var status = self.checkFiled($this, settings);
				if(!status) {
					formValid = false;
				}
			});
			// 
			if(formValid){  
				settings.valid.call($form,settings);
			}else{
				settings.invalid.call($form,settings)
			};
			event.preventDefault();
			event.stopImmediatePropagation();
		});
		// 检查表单验证是否通过
		this.checkForm = function(){
			var self = this;
			var formValid = true; 

			settings.isFirstTime = true;
			$fields.each(function() {
				var $this = $(this);
				var status = self.checkFiled($this, settings);
				if(!status) {
					formValid = false;
				}
			});
			return formValid;
		};
	};
	// 默认设置
	Validator.defaults = {
		valid:$.noop,
		invalid:$.noop
	};
	// 规则
	Validator.rules = {
		"required":function(val){
			// 必填
			return (val === '' ? false : true);
		},
		"unique":function( val){
			// 唯一
		},
		"money":function( val){
			// 金额
		},
		"key":function( val){
			// 关键字
			var reg = /^[a-zA-Z0-9_]+$/;
			return reg.test(val);
		},
		"shxydm":function( val){
			// 社会信用代码
			var reg = /^[a-zA-Z0-9]{2}[0-9]{6}[a-zA-Z0-9]{10}$/;
			return reg.test(val);
		},
		"telephone":function(val){
			// 电话号码
			var reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
            return reg.test(val);
		},
		"mobile":function(val){
			// 手机号码
			var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            return reg.test(val);
		},
		"email":function(val){
			// 邮箱
			var reg = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
            return reg.test(val);
		},
		"url":function(val){
			// 网址
			var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
			return reg.test(val)
		},
		"postcode":function(val){
			// 邮编
			var re = /^[1-9][0-9]{5}$/;
            return re.test(val);
		},
		"idcard":function(val){
			// 身份证
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            return reg.test(val);
		},
		"zmhsz":function(val){
			// 字母或数字
			var reg = /(^[A-Za-z]{1,}$)|(^[0-9]{1,}$)/;
            return reg.test(val);
		},
		"zw":function(val){
			// 中文
			var reg = /[\u4e00-\u9fa5]/;
            return reg.test(val);
		},
		"zm":function(val){
			// 纯英文
			var reg = /^[A-Za-z]+$/;
            return reg.test(val);
		},
		"n":function(val){
            // 整数
            var reg = /^-?[1-9]\d*$/;
            return reg.test(val);
		},
		"zss":function(val){
			// 正整数
			var reg = /^[1-9]\d*$/;
            return reg.test(val);
		},
		"fss":function(val){
			// 负整数
			var reg = /^-[1-9]\d*$/;
            return reg.test(val);
		},
		"min":function(val,len){
			return (val.length < len) ? true : false; 
		}
	};
	// 提示信息
	Validator.messages = {
		"required":"该项为必填/必选",
		"unique":"必须唯一值",
		"money":"请输入金额",
		"key":"请输入关键字",
		"shxydm":"请输入有效的社会信用代码",
		"telephone":"请输入有效的电话号码",
		"mobile":"请输入有效的手机号码",
		"email":"请输入有效的E-mail",
		"url":"请输入有效的网址",
		"postcode":"邮编必须是5位数字",
		"idcard":"请输入有效的身份证",
		"zmhsz":"请输入字母或数字",
		"zw":"请输入中文",
		"zm":"请输入英文",
		"n":"请输入整数",
		"zss":"请输入正整数",
		"fss":"请输入负整数"
	};
	// 方法
	Validator.prototype = {
		checkFiled : function($field, settings){	
			var status = true;
			var errorMsgArg = [];
			var fieldValue = $.trim($field.val()) || "";     	// value值
			var rules = $field.attr("data-rules");				// 规则
			var descriptions = $field.attr('data-descriptions');// value描述
			var self = this;
			// 验证规则验证
			if(rules !== 'undefined' && typeof rules !== 'undefined' && rules !== '' && rules !== 'null'  && typeof rules !== 'null') {
				var rulesAry = rules.split(';');
				var isRequired = rulesAry.indexOf('required') >= 0; // 是否必填
				rulesAry.forEach(function(currentRule,index,ary){

					if($field.is(type[2])){
						if(self.$form.find('[name="'+$field.prop('name')+'"]:checked').length==0){
							status = false;
							errorMsgArg.push(Validator.messages[currentRule]);

						}else{
							status = $field.is(':checked');
						};
					}else{
						// value 值为空且不必填，不进行规则验证
						if($field.is(type[0]) && !isRequired && fieldValue === ''){
							return status;
						};

						// 当没有定义规则时，返回true
						if(typeof Validator.rules[currentRule] === 'undefined'){
							
							console.error('没有配置规则'+currentRule);
							return status;
						};
						// 验证规则
						var currentStatus = Validator.rules[currentRule](fieldValue, $field);
						var errorMsg = Validator.messages[currentRule];
						if(!currentStatus){
							status = false;
							errorMsgArg.push(errorMsg);
						};
					};
				});
			};
			console.log(errorMsgArg);
			// 提示信息
			if(!status && settings.isFirstTime){
				// 提示信息
				self.showMsg(addDescriptions(descriptions,errorMsgArg[0]));
				// 获取焦点
				$field.focus();
				settings.isFirstTime = false;
			};
			// 红框显示
			self.borderColor($field, status);
			return status;
		},
		showMsg : function(msg){
			$.toast(msg);
		},
		borderColor : function($field, status){
		 	// radio & checkbox
			if($field.prop("type")=="radio" || $field.prop("type")=="checkbox"){
				var $fields = this.$form.find('[name="'+$field.prop('name')+'"]');
				var $tagBox =  $fields.next('.item-media').find('.icon');
				if($fields.filter(":checked").length > 0){
					$tagBox.removeClass('color-error')
				}else{
					$tagBox.addClass('color-error')
				};
			}else{
				if(status) {
					$field.removeClass('color-error');
				}else{
					$field.addClass('color-error');
				};
			};
		}
	};
	$.fn.mdvalidate = function(settings ){
		var $form = $(this);
		var vt = $form.data("validator");
		// 检测是否已经创建
		if( vt ){
			return vt
		};

		var validator = new Validator($form, settings);
		$form.data("validator", validator);
		return validator;
	};
	// 拓展
	$.extend($,{
		mdvalidateExtend:function(options){
			$.extend(Validator.rules,options.rules);
			$.extend(Validator.messages,options.messages);
		}
	});  
});