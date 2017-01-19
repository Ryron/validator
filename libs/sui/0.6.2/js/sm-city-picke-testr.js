/*!
 * =====================================================
 * SUI Mobile - http://m.sui.taobao.org/
 *
 * =====================================================
 */
// jshint ignore: start
+function($){

$.smConfig.rawCitiesData = [
    {
        "name":"广东",
        "value":"111111",
        "sub":[
            {
                "name":"请选择",
                "sub":[

                ]
            },
            {
                "name":"广州",
                "sub":[
                    {
                        "name":"请选择"
                    },
                    {
                        "name":"越秀区",
                    },
                    {
                        "name":"荔湾区"
                    },
                    {
                        "name":"海珠区"
                    },
                    {
                        "name":"天河区"
                    },
                    {
                        "name":"白云区"
                    },
                    {
                        "name":"黄埔区"
                    },
                    {
                        "name":"番禺区"
                    },
                    {
                        "name":"花都区"
                    },
                    {
                        "name":"南沙区"
                    },
                    {
                        "name":"萝岗区"
                    },
                    {
                        "name":"增城市"
                    },
                    {
                        "name":"从化市"
                    },
                    {
                        "name":"其他"
                    }
                ],
                "type":0
            },
            {
                "name":"深圳",
                "sub":[
                    {
                        "name":"请选择"
                    },
                    {
                        "name":"福田区"
                    },
                    {
                        "name":"罗湖区"
                    },
                    {
                        "name":"南山区"
                    },
                    {
                        "name":"宝安区"
                    },
                    {
                        "name":"龙岗区"
                    },
                    {
                        "name":"盐田区"
                    },
                    {
                        "name":"其他"
                    }
                ],
                "type":0
            }
        ],
        "type":1
    }
];

}(Zepto);
// jshint ignore: end

/* jshint unused:false*/

+ function($) {
    "use strict";
    var format = function(data,type) {
        var result = [];
        for(var i=0;i<data.length;i++) {
            var d = data[i];
            if(d.name === "请选择") continue;
            result.push(d[type]);
        }
        if(result.length) return result;
        return [""];
    };

    var sub = function(data,type) {
        if(!data.sub) return [""];
        return format(data.sub,type);
    };

    var getCities = function(d) {
        for(var i=0;i< raw.length;i++) {
            if(raw[i].name === d) return sub(raw[i]);
        }
        return [""];
    };

    var getDistricts = function(p, c) {
        for(var i=0;i< raw.length;i++) {
            if(raw[i].name === p) {
                for(var j=0;j< raw[i].sub.length;j++) {
                    if(raw[i].sub[j].name === c) {
                        return sub(raw[i].sub[j]);
                    }
                }
            }
        }
        return [""];
    };

    var raw = $.smConfig.rawCitiesData;
    var provinces = raw.map(function(d) {
        return d.name;
    });
    var displayProvinces = raw.map(function(d){
        return d.value;
    });
    console.log(displayProvinces);
    var initCities = sub(raw[0]);
    console.log(initCities);
    var initDistricts = [""];

    var currentProvince = provinces[0];
    var currentCity = initCities[0];
    var currentDistrict = initDistricts[0];

    // var t;
    // var defaults = {

    //     cssClass: "city-picker",
    //     rotateEffect: false,  //为了性能

    //     onChange: function (picker, values, displayValues) {
    //         var newProvince = picker.cols[0].value;
    //         var newCity;
    //         if(newProvince !== currentProvince) {
    //             // 如果Province变化，节流以提高reRender性能
    //             clearTimeout(t);

    //             t = setTimeout(function(){
    //                 var newCities = getCities(newProvince);
    //                 newCity = newCities[0];
    //                 var newDistricts = getDistricts(newProvince, newCity);
    //                 picker.cols[1].replaceValues(newCities);
    //                 picker.cols[2].replaceValues(newDistricts);
    //                 currentProvince = newProvince;
    //                 currentCity = newCity;
    //                 picker.updateValue();
    //             }, 200);
    //             return;
    //         }
    //         newCity = picker.cols[1].value;
    //         if(newCity !== currentCity) {
    //             picker.cols[2].replaceValues(getDistricts(newProvince, newCity));
    //             currentCity = newCity;
    //             picker.updateValue();
    //         }
    //     },

    //     cols: [
    //     {
    //         textAlign: 'center',
    //         values: provinces,
    //         displayValue:displayProvinces,
    //         cssClass: "col-province"
    //     },
    //     {
    //         textAlign: 'center',
    //         values: initCities,
    //         displayValue:displayCities,
    //         cssClass: "col-city"
    //     },
    //     {
    //         textAlign: 'center',
    //         values: initDistricts,
    //         displayValue:displayDistricts,
    //         cssClass: "col-district"
    //     }
    //     ]
    // };

    // $.fn.cityPicker = function(params) {
    //     return this.each(function() {
    //         if(!this) return;
    //         var p = $.extend(defaults, params);
    //         console.log(p);
    //         //计算value
    //         if (p.value) {
    //             $(this).val(p.value.join(' '));
    //         } else {
    //             var val = $(this).val();
    //             val && (p.value = val.split(' '));
    //         }

    //         if (p.value) {
    //             //p.value = val.split(" ");
    //             if(p.value[0]) {
    //                 currentProvince = p.value[0];
    //                 p.cols[1].values = getCities(p.value[0]);
    //             }
    //             if(p.value[1]) {
    //                 currentCity = p.value[1];
    //                 p.cols[2].values = getDistricts(p.value[0], p.value[1]);
    //             } else {
    //                 p.cols[2].values = getDistricts(p.value[0], p.cols[1].values[0]);
    //             }
    //             !p.value[2] && (p.value[2] = '');
    //             currentDistrict = p.value[2];
    //         }
    //         $(this).picker(p);
    //     });
    // };

}(Zepto);
