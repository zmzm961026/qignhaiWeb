onload = function () {
    addScript('/js/js.js')
    function addScript(url) {
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    var html_name = '';
    var sort_list = '';
    var html_logo = '';
    var sort_box = document.getElementById('sort_box');
    var arr = name.split(',');
    for (var i = 0; i < arr.length; i++) {
        html_name = '<div class="num_name">' + arr[i] + '</div>';
        html_logo = '<div class="num_logo"><img src="' + images[i] + '"/></div>';
        sort_list += '<div class="sort_list"><a target="_blank" href="' + addree[i] + '">' + html_name + html_logo + '</a></div>';
    }
    sort_box.innerHTML = sort_list;
    //导航显示隐藏
    $('.nav>li:eq(12)').addClass('active').siblings().removeClass('active');
    $('.nav>li:eq(4)').addClass('active').siblings().removeClass('active');
    $('.nav>li').hover(function () {
        $(".nav > li").find('ul.nav-list').hide();
        $(this).find('ul').show();
        $(this).addClass('active').siblings().removeClass('active')
    }, function () {
        $(".nav > li:eq(12)").addClass('active').siblings().removeClass('active');
        $(".nav > li:eq(4)").addClass('active').siblings().removeClass('active');
        $(this).find('ul').hide();
    })
    function back() {
        $('[class*="-two"]').css('display', 'none');
        $('.sort_box').css('display', 'block');
        $('.initials').css('display', 'block');
        $('.header1').css('display', 'block');
    }
    $(function () {
        var LetterTop1 = 0;
        window.onresize = function () {
            if ($(window).height() < 400) {
                $('.nav').hide();
            } else {
                $('.nav').show();
            }
        }
        $('[class*="-two"]').css('display', 'none');
        $('#gosearch').click(function () {
            $('[class*="-two"]').css('display', 'block');
            $('.sort_box').css('display', 'none');
            $('.header1').css('display', 'none');
            $('.initials').css('display', 'none');
            $('#search').focus();
        });
        $('#search').bind('input propertychange', function () {
            $('.sort_box-two').html('');
            //进行相关操作
            var val = $(this).val();
            if (val == "") {
                return;
            }
            var str = "";
            //去查找原字符串及其拼音首字母是否包含此字符，若包含就把它加进去
            $(".sort_list").each(function () {
                var name = $(this).find('.num_name').text();
                if (name.toLowerCase().indexOf(val.toLowerCase()) != -1) {//包含
                    str += "<div class='sort_list-two' id='" + $(this).attr('id') + "'> " + $(this).html() + "</div>";
                } else {
                    var PYarr = makePy(name);
                    for (var i = 0; i < PYarr.length; i++) {
                        if (PYarr[i].toLowerCase().indexOf(val.toLowerCase()) != -1) {//包含
                            str += "<div class='sort_list-two' id='" + $(this).attr('id') + "'> " + $(this).html() + "</div>";
                        } else {//不包含
                        }
                    }
                }
            });
            $('.sort_box-two').html(str);
        });
        var defaults = {
            items: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
            debug: false,
            height: null,
            arrows: true
        };
        $(document).ready(function () {
            $('#list').sliderNav();
        });
        $.fn.sliderNav = function (options) {
            var opts = $.extend(defaults, options);
            var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
            $('.initials').find('ul').append('<li>A</li><li>B</li><li>C</li><li>D</li><li>E</li><li>F</li><li>G</li><li>H</li><li>I</li><li>J</li><li>K</li><li>L</li><li>M</li><li>N</li><li>O</li><li>P</li><li>Q</li><li>R</li><li>S</li><li>T</li><li>U</li><li>V</li><li>W</li><li>X</li><li>Y</li><li>Z</li>');
            initials();
            var slider = $(this);
            $('.initials ul li', slider).click(function (event) {
                var letter = '#' + $(this).text();
                //var target = $('#'+letter);
                var cOffset = $('.list_box', slider).offset().top;
                var tOffset = $('.list_box ' + letter, slider).offset().top;
                var height = $('.initials', slider).height();
                if (o.height) height = o.height;
                var pScroll = (tOffset - cOffset) - height / 8;
                $('.sort_letter', slider).removeClass('selected');
                //$(target).addClass('selected');
                $('.list_box', slider).stop().animate({
                    scrollTop: '+=' + pScroll + 'px'
                });
                if (o.debug) $('#debug span', slider).html(tOffset);
            });
        }
    })
    var Initials = document.getElementsByClassName('initials')[0];
    var Initials_li = document.getElementsByTagName('li');
    for (var i = 0; i < Initials_li.length; i++) {
        Initials_li[i].height = Initials.height / 26;
    }
    function initials() {//公众号排序
        var SortList = $(".sort_list");
        var SortBox = $(".sort_box");
        SortList.sort(asc_sort).appendTo('.sort_box');//按首字母排序
        function asc_sort(a, b) {
            return makePy($(b).find('.num_name').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name').text().charAt(0))[0].toUpperCase() ? 1 : -1;
        }
        var initials = [];
        var num = 0;
        SortList.each(function (i) {
            var initial = makePy($(this).find('.num_name').text().charAt(0))[0].toUpperCase();
            if (initial >= 'A' && initial <= 'Z') {
                if (initials.indexOf(initial) === -1)
                    initials.push(initial);
            } else {
                num++;
            }
        });
        $.each(initials, function (index, value) {//添加首字母标签
            SortBox.append('<div class="sort_letter" id="' + value + '">' + value + '</div>');
        });
        if (num != 0) { SortBox.append('<div class="sort_letter" id="default">#</div>'); }
        for (var i = 0; i < SortList.length; i++) {//插入到对应的首字母后面
            var letter = makePy(SortList.eq(i).find('.num_name').text().charAt(0))[0].toUpperCase();
            switch (letter) {
                case "A": $('#A').after(SortList.eq(i)); break;
                case "B": $('#B').after(SortList.eq(i)); break;
                case "C": $('#C').after(SortList.eq(i)); break;
                case "D": $('#D').after(SortList.eq(i)); break;
                case "E": $('#E').after(SortList.eq(i)); break;
                case "F": $('#F').after(SortList.eq(i)); break;
                case "G": $('#G').after(SortList.eq(i)); break;
                case "H": $('#H').after(SortList.eq(i)); break;
                case "I": $('#I').after(SortList.eq(i)); break;
                case "J": $('#J').after(SortList.eq(i)); break;
                case "K": $('#K').after(SortList.eq(i)); break;
                case "L": $('#L').after(SortList.eq(i)); break;
                case "M": $('#M').after(SortList.eq(i)); break;
                case "N": $('#N').after(SortList.eq(i)); break;
                case "O": $('#O').after(SortList.eq(i)); break;
                case "P": $('#P').after(SortList.eq(i)); break;
                case "Q": $('#Q').after(SortList.eq(i)); break;
                case "R": $('#R').after(SortList.eq(i)); break;
                case "S": $('#S').after(SortList.eq(i)); break;
                case "T": $('#T').after(SortList.eq(i)); break;
                case "U": $('#U').after(SortList.eq(i)); break;
                case "V": $('#V').after(SortList.eq(i)); break;
                case "W": $('#W').after(SortList.eq(i)); break;
                case "X": $('#X').after(SortList.eq(i)); break;
                case "Y": $('#Y').after(SortList.eq(i)); break;
                case "Z": $('#Z').after(SortList.eq(i)); break;
                default: $('#default').after(SortList.eq(i)); break;
            }
        }
    }
    var arr_html = '';
    var arr_x = [];
    var arr_y = [];
    for (var i = 0; i < nes.length; i++) {
        arr_html = nes[i].Item1.split(',')[0] + nes[i].Item1.split(',')[1];
        arr_x.push(nes[i].Item1.split(',')[0]);
        arr_y.push(nes[i].Item1.split(',')[1]);
    }
    var opts = {
        width: 200,     // 信息窗口宽度
        height: 100,     // 信息窗口高度
        title: "海底捞王府井店", // 信息窗口标题
        enableMessage: true,//设置允许信息窗发送短息
        message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
    }
    var map = new BMap.Map("map");
    var data = [];
    map.enableScrollWheelZoom(true);
    addMarker(points, arr_x, arr_y);
    function addMarker(points, arr_x, arr_y) {  // 创建图标对象
        // 创建标注对象并添加到地图
        for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
            var point = new BMap.Point(arr_x[i], arr_y[i]);
            data.push({ mapx: arr_x[i], mapy: arr_y[i], name: arr[i], src: addree[i] });
        }
    }
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 9);
    var markers = new Array();
    $.each(data, function (i, item) {
        var point = new BMap.Point(item.mapx, item.mapy);
        var marker = new BMap.Marker(point);
        var content = item.name;
        var src = item.src;
        addClickHandler(content, marker, src); //添加点击事件
        markers.push(marker);
    });
    //添加聚合效果。
    var markerClusterer = new BMapLib.MarkerClusterer(map, { markers: markers });
    var opts = {
        width: 250, // 信息窗口宽度
        height: 80, // 信息窗口高度
        title: "", // 信息窗口标题
        enableMessage: true//设置允许信息窗发送短息
    };
    function addClickHandler(content, marker, src) {
        marker.addEventListener("click", function (e) {
            openInfo(content, e, src)
        }
        );
    }
    function openInfo(content, e, src) {
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        // 创建信息窗口对象
        var infoWindow = new BMap.InfoWindow("大学名称：" + content + '<br/>' + "<a target='_blank' href=" + src + ">进入管理系统</a>", opts);
        map.openInfoWindow(infoWindow, point); //开启信息窗口
    }
}