/*!
 * =====================================================
 * SUI Mobile - http://m.sui.taobao.org/
 *
 * =====================================================
 */
// jshint ignore: start
+function($){



}(Zepto);
// jshint ignore: end

/* jshint unused:false*/

+ function($) {
    "use strict";
    var format = function(data,tagCode) {
        var name = [];
        var code = [];
        var result = {};
        for(var i=0;i<data.length;i++) {
            var d = data[i];
            name.push(d.name);
            code.push(d.code);
            if(tagCode && d.code === tagCode){
              return d;
            }
        };
        result.code = code;
        result.name = name;
        if(name.length) return result;
        return [""];
    };

    var sub = function(data,level,tagCode) {
        if(!data[level]) return [""];
        return format(data[level],tagCode);
    };

    var getPorvinces = function(tagPorvinceCode){
        var porvinceList = format(raw,tagPorvinceCode);
        return porvinceList;
    };
    var getCities = function(porvinceCode, tagCityCode) {
        var porvince = getPorvinces(porvinceCode);
        return sub(porvince,'city',tagCityCode)
    };

    var getDistricts = function(porvinceCode, tagCityCode, tagDistrictCode) {
        var city = getCities(porvinceCode,tagCityCode);
        return sub(city,'country',tagDistrictCode)
    };

    var getStreet = function(porvinceCode, tagCityCode, tagDistrictCode, tagStreetCode) {
       
        var district = getDistricts(porvinceCode, tagCityCode, tagDistrictCode);
        return sub(district,'town',tagStreetCode);
    };

    //var raw = $.smConfig.rawCitiesData;
    var raw = area;
    //console.log(getPorvinces('110000'));
    //console.log(getCities(raw[0].code));
    //console.log(getDistricts(raw[1].code,'120100'));
    //console.log(getStreet(raw[1].code, '120100', '120101'))

    var provinceValues = getPorvinces().code;
    var provinceDisplayValues = getPorvinces().name;

    var initCityValues = getCities(raw[0].code).code;
    var initCityDisplayValues = getCities(raw[0].code).name;

    var initDistrictValues = getDistricts(raw[0].code, raw[0].city[0].code).code;
    var initDistrictDisplayValues = getDistricts(raw[0].code, raw[0].city[0].code).name;

    var currentProvinceValue = provinceValues[0];
    var currentCityValue = initCityValues[0];
    var currentDistrictValue = initDistrictValues[0];

    var t,dt;

    var streetDefault = {
         toolbarTemplate: '<header class="bar bar-nav">\
          <button class="button button-link pull-right close-picker">确定</button>\
          <h1 class="title">请选择街道</h1>\
          </header>',
          cols: [{
              textAlign: 'center',
              values: [],
              displayValues: []
            }]
    };
    function setStreet(streetId,street){
        //$('#'+streetId).unbind();
        $('#'+streetId).val('');
        var options = $.extend(streetDefault, street);
        var streets = getStreet(currentProvinceValue,currentCityValue,currentDistrictValue).code;
        var streetsDisplayValue = getStreet(currentProvinceValue,currentCityValue,currentDistrictValue).name;
        options.cols[0].values = streets;
        options.cols[0].displayValues = streetsDisplayValue;
        $("#"+streetId).picker(options);
    };

    var defaults = {

        cssClass: "city-picker",
        rotateEffect: false,  //为了性能

        onChange: function (picker, values, displayValues) {
            var level = picker.params.level;
            var newProvinceValue = picker.cols[0].value;
            var newProvinceDisplay = picker.cols[0].displayValue;
            var newCityValue;
            if(newProvinceValue !== currentProvinceValue) {
                // 如果Province变化，节流以提高reRender性能
                clearTimeout(t);

                t = setTimeout(function(){
                    var newCityObj = getCities(newProvinceValue);
                    var newCityValues = newCityObj.code;
                    var newCityDisplayValues = newCityObj.name;

                    newCityValue = newCityValues[0];
                    var newDistrictObj = getDistricts(newProvinceValue, newCityValue);
                    var newDistrictValues = newDistrictObj.code;
                    var newDistrictDisplayValues = newDistrictObj.name;


                    if(level > 1){ picker.cols[1].replaceValues(newCityValues,newCityDisplayValues) }
                    if(level > 2){ picker.cols[2].replaceValues(newDistrictValues,newDistrictDisplayValues) }

                    currentProvinceValue = newProvinceValue;
                    currentCityValue = newCityValue;
                    picker.updateValue();
                    
                }, 200);
                return;
            }
            newCityValue = level > 1 ? picker.cols[1].value : '';

            var newDistrictValue =  level > 2 ? picker.cols[2].value : '';
            if(newCityValue !== currentCityValue && level > 1) {
                if(level > 2){
                  var newDistrictObj = getDistricts(newProvinceValue, newCityValue);
                  picker.cols[2].replaceValues(newDistrictObj.code,newDistrictObj.name);
                }
                currentCityValue = newCityValue;
                picker.updateValue();
            };
            if(newDistrictValue !== currentDistrictValue && level > 2){
                currentDistrictValue = newDistrictValue;
                if(picker.params.streetId){
                    clearTimeout(dt);
                    dt = setTimeout(function(){
                        setStreet(picker.params.streetId,picker.params.street);
                    }, 500);
                }
            };
        },

        cols: [
        {
            textAlign: 'center',
            values: provinceValues,
            displayValues:provinceDisplayValues,
            cssClass: "col-province"
        },
        {
            textAlign: 'center',
            values: initCityValues,
            displayValues: initCityDisplayValues,
            cssClass: "col-city"
        },
        {
            textAlign: 'center',
            values: initDistrictValues,
            displayValues:initDistrictDisplayValues,
            cssClass: "col-district"
        }
        ]
    };
    $.fn.cityPicker = function(params) {
        return this.each(function() {
            if(!this) return;
            defaults.cols.length = params.level;
            var p = $.extend(defaults, params);
            //计算value
            if (p.value) {
                $(this).val(p.value.join(' '));
            } else {
                var val = $(this).val();
                val && (p.value = val.split(' '));
            }

            if (p.value) {
                //p.value = val.split(" ");
                if(p.value[0]) {
                    currentProvinceValue = p.value[0];
                    p.cols[1].values = getCities(p.value[0]).code;
                }
                if(p.value[1]) {
                    currentCityValue = p.value[1];
                    p.cols[2].values = getDistricts(p.value[0], p.value[1]).code;
                } else {
                    p.cols[2].values = getDistricts(p.value[0], p.cols[1].values[0]).code;
                }
                !p.value[2] && (p.value[2] = '');
                currentDistrictValue = p.value[2];

            }
            if(p.streetId){
                setStreet(p.streetId,p.street);
            };
            $(this).picker(p);
        });
    };

}(Zepto);
