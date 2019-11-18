function tab(id) {
    return document.getElementById(id);
}
if (localStorage.getItem('user_name') && localStorage.getItem('user_pass_word')) {
    tab('login_btn').innerHTML = '账号：' + localStorage.getItem('user_name');
} 
tab('login_btn').onclick = function () {
    login_btn();
};
//登录设置
var oClose = document.getElementsByClassName('close');
var oTeach = document.getElementsByName('teach');
var aTeach_visited = tab('zhuce').getElementsByClassName('teach_visited');
function div_hide() {
    //清空提示框的值
    var allB = tab('login').getElementsByTagName('b');
    for (var i = 0; i < allB.length; i++) {
        allB[i].innerHTML = '';
    }
    //清空input值
    $('input').val('');
    //注册隐藏
    tab('zhuce').style.display = 'none';
    //重置密码隐藏
    tab('pass_change').style.display = 'none';
    //管理员登录隐藏
    tab('admin').style.display = "none";
    //登录隐藏
    tab('log').style.display = 'none';
    tab('login').style.display = 'block';
}
function login_btn() {
    div_hide();
    tab('log').style.display = 'block';
    //注册身份切换
    tab('registe').onclick = function () {
        registe();
    }
    tab('forget_pass').onclick = function () {
        div_hide();
        tab('pass_change').style.display = 'block';
    }
    tab('login_but').onclick = function () {
        loginIn();
    }
}
tab('pass_btn').onclick = function () {
    registe();
}
//注册信息切换
function registe() {
    div_hide();
    tab('zhuce').style.display = 'block';
    //老师注册
    //tab('zhuce').style.height = 598 + 'px';
    //tab('zhuce').style.marginTop = -598 / 2 + 'px';
    tab('zhuce').style.height = 428 + 'px';
    tab('zhuce').style.marginTop = -428 / 2 + 'px';
    aTeach_visited[0].style.display = 'block';
    oTeach[0].checked = true;
}
createCode();
var code ; //在全局 定义验证码
function createCode(){ 
    code = new Array();
    var codeLength = 4;//验证码的长度
    var checkCode = document.getElementById("checkCode");
    checkCode.innerHTML = "";

    var selectChar = new Array(2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');

    for(var i=0;i<codeLength;i++) {
    var charIndex = Math.floor(Math.random()*32);
        code +=selectChar[charIndex];
    }
    if(code.length != codeLength){
        createCode();
    }
    checkCode.innerHTML = code;
}
var myreg = /^1[3456789]\d{9}$/;
var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
var reg1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
var zcInput = tab('visited').getElementsByTagName('input');
var one = tab('visited').getElementsByTagName('b');
//注册点击事件
var code ; 
$('#but').click(function () {
    var phone = $('.sjh').val();
    var pass = document.getElementsByName('password')[0].value;
    var pass1 = $('#ipu').val();
    var pass2 = $('#ipu1').val();
    var getcode = document.getElementById("input1").value.toUpperCase();
    for (var i = 0; i < zcInput.length-2; i++) {
        if (zcInput[i].value == '') {
            one[i].innerHTML = '<span>*</span>必填';
            one[i].style.lineHeight = 34 + 'px';
            one[3].innerHTML = '';
        } else {
            one[i].innerHTML = '';
        }
    }
    var weekArray = []    
    console.log(getcode+":"+code)
    if (pass1 === pass2 && pass1.length >= 6 && pass1.length <= 16 && getcode == code) {
        $.ajax({
            url: 'http://192.168.1.167:325/api/Cour/Register',
            type: 'get',
            dataType: 'json',
            data: {Pass: pass1, User:phone},
            success: function (data) {
                console.log(data)
                if (data == false) {
                    alert('该账户已被注册');
                    tab('login').style.display = 'none';
                }
                if (data == true) {
                    alert('注册成功，等待审核');
                    weekArray.push(phone)
                    console.log(weekArray)
                    tab('login').style.display = 'none';
                    localStorage.setItem('s_name', JSON.stringify(weekArray));
                }
            }
        })
        
    } else if ($('.sjh').val() == '') {
        one[0].innerHTML = '<span>*</span>必填';
        return;
    } else  if (pass1 == '') {
        one[1].innerHTML = '<span>*</span>必填';
        return;
    } else if (pass2 == '') {
        one[2].innerHTML = '<span>*</span>必填';
        return;
    } else if (!reg1.test(pass1) || !reg1.test(pass2) || pass1.length <= 6 && pass1.length >= 17 || pass2.length <= 6 && pass2.length >= 17) {
        one[1].innerHTML = '<span>*</span>请输入6-16位字母、数字组成的密码';
        one[2].innerHTML = '<span>*</span>请输入6-16位字母、数字组成的密码';
        one[1].style.lineHeight = 20 + 'px';
        one[2].style.lineHeight = 20 + 'px';
        return;
    } else if (pass1 !== pass2) {
        one[2].style.lineHeight = 34 + 'px';
        one[2].innerHTML = '<span>*</span>两次密码不一致';
        return;
    } else if (getcode == '') {
        one[4].innerHTML = '<span>*</span>验证码不能为空';
        return;
    } else if (getcode != code)  {
        one[4].innerHTML = '<span>*</span>验证码输入错误！';
        createCode();
        return false;
    }
})
//注册页面返回登录
tab('zhuce_dl').onclick = function () {
    login_btn();
}
//管理员权限登录
$('#admin_but').click(function () {
    if (admin[0] == $('.admin').val() && admin_pass[0] == $('.admin_pass').val()) {
        alert('登录成功');
        setCookie('Admin', $('.admin').val());
        setCookie('Admin_pass', $('.admin_pass').val());
        function setCookie(k, v) {
            var date = new Date((new Date()).getTime() + 2 * 60 * 60000);
            document.cookie = k + '=' + escape(v) + ';expires=' + date + "; path=/;";
        }
        window.location.reload();
    } else if ($('.admin').val() == '') {
        alert('账号不能为空');
        return false;
    } else {
        alert('账号或密码输入错误');
        return false;
    }
})
//关闭按钮点击事件
for (var i = 0; i < oClose.length; i++) {
    oClose[i].index = i;
    oClose[i].onclick = function () {
        var aInput = document.getElementsByTagName('input');
        var abb = tab('login').getElementsByTagName('b');
        for (var i = 0; i < aInput.length; i++) {
            aInput[i].value = '';
        }
        for (var i = 0; i < abb.length; i++) {
            abb[i].innerHTML = '';
        }
        tab('login').style.display = 'none';
    }
}
//登录按钮点击事件
function loginIn() {
    if ($('.username').val()!=''&& $('.password_log').val()!='') {
        $.ajax({
            url: 'http://192.168.1.167:325/api/Cour/Login',
            type: 'get',
            dataType: 'json',
            data: { Pass: $('.password_log').val(), User: $('.username').val() },
            success: function (data) {
                console.log(data)
                if (data == 'false') {
                    alert('用户名不存在或密码错误');
                    return false;
                } else {
                    alert('登录成功');
                    localStorage.setItem('user_name', $('.username').val());
                    localStorage.setItem('user_pass_word', $('.password_log').val());
                    localStorage.setItem('state', data[0]);
                    localStorage.setItem('state_id', data[1]);
                    // function setCookie(k, v) {
                    //     var date = new Date((new Date()).getTime() + 2 * 60 * 60000);
                    //     document.cookie = k + '=' + escape(v) + ';expires=' + date + "; path=/;";
                    // }
                    tab('login').style.display = 'none';
                    tab('login_btn').innerHTML = '账号：' + localStorage.getItem('user_name');
                }
            }
        })
    } else if ($('.username').val() == '') {
        alert('用户名不能为空');
        return false;
    }  else if ($('.password_log').val() == '') {
        alert('密码不能为空');
        return false;
    } 
}
function getCookie(name) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].split('=')[0] == name) {
            return arr[i].split('=')[1].toString();
        }
    }
    return ''
}