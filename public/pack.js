var form1 = document.querySelector('[id="s1"]'), 
result1 = document.querySelector('[id="result1"]'),
items1 = form1.querySelectorAll('[type="time"]');

function f1() {
    result1.value = [].reduce.call(items1, function(s,a) {
    x = a.value;
    if(x.length > 4) return s + x[0] + x[1] + x[3] + x[4];
    return s + "9999"
    },'')
}  


var form2 = document.querySelector('[id="s2"]'), 
result2 = document.querySelector('[id="result2"]'),
items2 = form2.querySelectorAll('[type="time"]');

function f2() {
    result2.value = [].reduce.call(items2, function(s,a) {
    x = a.value;
    if(x.length > 4) return s + x[0] + x[1] + x[3] + x[4];
    return s + "9999"
    },'')
}  


var form3 = document.querySelector('[id="s3"]'), 
result3 = document.querySelector('[id="result3"]'),
items3 = form3.querySelectorAll('[type="time"]');

function f3() {
    result3.value = [].reduce.call(items3, function(s,a) {
    x = a.value;
    if(x.length > 4) return s + x[0] + x[1] + x[3] + x[4];
    return s + "9999"
    },'')
}  


var form4 = document.querySelector('[id="s4"]'), 
result4 = document.querySelector('[id="result4"]'),
items4 = form4.querySelectorAll('[type="time"]');

function f4() {
    result4.value = [].reduce.call(items4, function(s,a) {
    x = a.value;
    if(x.length > 4) return s + x[0] + x[1] + x[3] + x[4];
    return s + "9999"
    },'')
}  


itemsW = document.querySelectorAll('[class="weekSch"]');

function packW() {
    res = [].reduce.call(itemsW, function(s,a) {
    if(a.value != "") return s + a.value;
    return s + "0";
    },'')
    return res;
}  


function show() {
    var x = document.getElementById("pass");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
} 