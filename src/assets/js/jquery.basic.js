//页面加载等待
function startLoading() {
    var loading = '<div class="sk-spinner sk-spinner-three-bounce">' +
                      '<div class="sk-bounce1"></div>' +
                      '<div class="sk-bounce2"></div>' +
                      '<div class="sk-bounce3"></div>' +
                  '</div>';
    $('body').append(loading);
    $('body').toggleClass("stop-scrolling");
    $('body').toggleClass("sk-loading");
}

//页面结束等待
function endLoading() {
    $('body').find(".sk-spinner-three-bounce").remove();
    $('body').toggleClass("stop-scrolling");
    $('body').toggleClass("sk-loading");
}

//初始化空栈
function Stack() {
    this._elements = [];
}

//是否为空
Stack.prototype.isEmpty = function () {
    return this.getSize() === 0;
};

//返回栈顶元素，若为空，则抛出异常
Stack.prototype.peek = function () {
    if (this.isEmpty()) throw new Error('Stack is empty');

    return this._elements[this.getSize() - 1];
};

//出栈，若为空，则抛出异常
Stack.prototype.pop = function () {
    if (this.isEmpty()) throw new Error('Stack is empty');

    return this._elements.pop();
};

//入栈，并返回新的栈长度
Stack.prototype.push = function (element) {
    return this._elements.push(element);
};

//返回栈长度
Stack.prototype.getSize = function () {
    return this._elements.length;
};

//获取文件扩展名
function getExtension(fileName) {
    var index = fileName.lastIndexOf(".");
    var len = fileName.length;
    var extension = fileName.substring(index, len);//后缀名
    return extension;
}

function isIE() {
    if (/msie/.test(navigator.userAgent.toLowerCase()))
        return true;
    else
        return false;
}

//只允许数字，包括小数
function onlyNum(target, maxlength) {
    $(target).each(function () {
        //禁止右键
        $(this).on('contextmenu', function () {
            return false;
        });
        //禁止粘贴
        $(this).on("paste", function (e) {
            e.preventDefault();
        });
        $(this).keydown(function (e) {
            return checkKeyCode(e, this);
        });
        if (maxlength == undefined)
            $(this).attr("maxlength", "10");
        else
            $(this).attr("maxlength", maxlength);
    });

    function checkKeyCode(e, tag) {
        //48到57位数字，96到105也是数字，8位退格键，9位tab键，110和190为小数点
        if ((e.keyCode < 48 && e.keyCode != 8 && e.keyCode != 9) || (e.keyCode > 57 && e.keyCode < 96) || (e.keyCode > 105 && e.keyCode != 110 && e.keyCode != 190)) {
            if (isIE())
                window.event.returnValue = false;
            else
                return false;
        }
        else {
            //不允许第一位是小数点，不允许第二位开始出现两个小数点
            var value = $(tag).val();
            var len = value.length;
            var flag = true;
            if (len == 0 && (e.keyCode == 110 || e.keyCode == 190))
                flag = false;

            if (len > 0 && value.indexOf('.') > -1 && (e.keyCode == 110 || e.keyCode == 190))
                flag = false;

            if (!flag) {
                if (isIE())
                    window.event.returnValue = false;
                else
                    return false;
            }
        }
    }
}

//只允许整数
function onlyDigits(target, maxlength) {
    $(target).each(function () {
        //禁止右键
        $(this).on('contextmenu', function () {
            return false;
        });
        //禁止粘贴
        $(this).on("paste", function (e) {
            e.preventDefault();
        });
        $(this).keydown(function (e) {
            return checkKeyCode(e, this);
        });
        if (maxlength == undefined)
            $(this).attr("maxlength", "10");
        else
            $(this).attr("maxlength", maxlength);
    });

    function checkKeyCode(e, tag) {
        //48到57位数字，96到105也是数字，8位退格键，9位tab键
        if ((e.keyCode < 48 && e.keyCode != 8 && e.keyCode != 9) || (e.keyCode > 57 && e.keyCode < 96) || e.keyCode > 105) {
            if (isIE())
                window.event.returnValue = false;
            else
                return false;
        }
    }
}

function checkValue(target) {
    $(target).val($(target).val().replace(/\D/g, ''));
}

//重新加载js
function reloadLocalScripts() {
    //重新加载js
    var js = $("#local_scripts").html();
    $("#local_scripts").html('');
    $("#local_scripts").html(js);
}

export function getJqGridHeight() {
    var h = 0;
    var top_navbar = $(".navbar-fixed-top").outerHeight(true) ? $(".navbar-fixed-top").outerHeight(true) : 60;
    var page_heading = $(".page-heading").outerHeight(true);
    var top_content = parseInt($(".wrapper-content").css("padding-top"));
    //var bottom_content = parseInt($(".wrapper-content").css("padding-bottom"));
    var bottom_ibox = parseInt($(".ibox").css("margin-bottom"));
    var ibox_title = $(".ibox-title").length > 0 ? parseInt($(".ibox-title").outerHeight()) : 0;
    var top_iboxContent = parseInt($(".ibox-content").css("padding-top"));
    var bottom_iboxContent = parseInt($(".ibox-content").css("padding-bottom"));
    var footer = $(".footer").outerHeight(true) ? $(".footer").outerHeight(true) : 0;

    //var jqgrid_aption = $(".ui-jqgrid-caption").outerHeight();
    //var jqgrid_hdiv = $(".ui-jqgrid-hdiv").outerHeight();
    //var jqgrid_pager = $(".ui-jqgrid-pager").outerHeight();
    var jqgrid_aption = 40;
    var jqgrid_hdiv = 23;
    var jqgrid_pager = 32;

    h = top_navbar + page_heading + top_content + bottom_ibox + ibox_title + top_iboxContent + bottom_iboxContent + footer + jqgrid_aption + jqgrid_hdiv + jqgrid_pager;
    h = $(window).height() - h;

    return parseInt(h - 5);
}

//图片链接转成base64
function getDataUriThumb(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = 120; // or 'width' if you want a special/scaled size
        canvas.height = 120; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0, 120, 120);

        // Get raw image data
        //callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
}

function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
}

//增加身份证验证
function isIdCardNo(num) {
    var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
    var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
    var varArray = new Array();
    var intValue;
    var lngProduct = 0;
    var intCheckDigit;
    var intStrLen = num.length;
    var idNumber = num;
    // initialize
    if ((intStrLen != 15) && (intStrLen != 18)) {
        return false;
    }
    // check and set value
    for (i = 0; i < intStrLen; i++) {
        varArray[i] = idNumber.charAt(i);
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
            return false;
        } else if (i < 17) {
            varArray[i] = varArray[i] * factorArr[i];
        }
    }
    if (intStrLen == 18) {
        //check date
        var date8 = idNumber.substring(6, 14);
        if (isDate8(date8) == false) {
            return false;
        }
        // calculate the sum of the products
        for (i = 0; i < 17; i++) {
            lngProduct = lngProduct + varArray[i];
        }
        // calculate the check digit
        intCheckDigit = parityBit[lngProduct % 11];
        // check last digit
        if (varArray[17] != intCheckDigit) {
            return false;
        }
    }
    else {        //length is 15
        //check date
        var date6 = idNumber.substring(6, 12);
        if (isDate6(date6) == false) {
            return false;
        }
    }
    return true;
}

function phone(date) {
    var r = /^((0\d{2,3}-\d{7,8})|(1\d{10}))$/;
    if ((r.test(date)))
        return true;
    else
        return false;
}

function isDate6(sDate) {
    if (!/^[0-9]{6}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    if (year < 1700 || year > 2500) return false
    if (month < 1 || month > 12) return false
    return true
}

function isDate8(sDate) {
    if (!/^[0-9]{8}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    day = sDate.substring(6, 8);
    var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (year < 1700 || year > 2500) return false
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
    if (month < 1 || month > 12) return false
    if (day < 1 || day > iaMonthDays[month - 1]) return false
    return true
}

function GetAge(identityCard) {
    var len = (identityCard + "").length;
    if (len == 0) {
        return 0;
    } else {
        if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
        {
            return 0;
        }
    }
    var strBirthday = "";
    if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
    {
        strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
    }
    if (len == 15) {
        strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
    }
    //时间字符串里，必须是“/”
    var birthDate = new Date(strBirthday);
    var nowDateTime = new Date();
    var age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//身份证
jQuery.validator.addMethod("isIdCardNo", function (value, element) {
    return this.optional(element) || isIdCardNo(value);//    && isIdCardNo(value) 验证身份证是否正确部分  (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) 验证位数
}, "请输入有效的身份证");

//手机号
jQuery.validator.addMethod("isPhone", function (value, element) {
    return this.optional(element) || phone(value);//    && isIdCardNo(value) 验证身份证是否正确部分  (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) 验证位数
}, "请输入正确手机号");

////图片加载失败的替换图片
//$("img").one("error", function (e) {
//    $(this).attr("src", "/Images/error-image.png");
//})


//将url参数转化为json
function urlpara2json(data) {
    var dataArray = data.split('&');
    var result = {};
    for (var i = 0; i < dataArray.length; i++) {
        var str = dataArray[i].split('=');
        result[str[0]] = str[1];
    }
    return result;
}
