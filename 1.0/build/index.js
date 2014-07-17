/*
combined files : 

gallery/prize-draw/1.0/index

*/
/**
 * @fileoverview 
 * @author 辰惬<chenqie.zc@alibaba-inc.com>
 * @module prize-draw
 **/
//KISSY.add('gallery/prize-draw/1.0/index',function (S, Node,Base) {
//    var EMPTY = '';
//    var $ = Node.all;
//    /**
//     *
//     * @class PrizeDraw
//     * @constructor
//     * @extends Base
//     */
//    function PrizeDraw(comConfig) {
//        var self = this;
//        //调用父类构造函数
//        PrizeDraw.superclass.constructor.call(self, comConfig);
//    }
//    S.extend(PrizeDraw, Base, /** @lends PrizeDraw.prototype*/{
//
//    }, {ATTRS : /** @lends PrizeDraw*/{
//
//    }});
//    return PrizeDraw;
//}, {requires:['node', 'base']});


/**
 * @fileoverview
 * @author 辰惬<chenqie.zc@alibaba-inc.com>
 * @module lucy-draw
 **/
KISSY.add(function (S, Node, Base) {
    var EMPTY = '';
    var $ = Node.all;
    var timer;
    var luckyArr=[];//已中奖的人

    function PrizeDraw(comConfig) {
        var self = this;
        //调用父类构造函数
        PrizeDraw.superclass.constructor.call(self, comConfig);
        this.init();
    }

    //获取随机数
    function getRnd(min, max) {
        return   parseInt(Math.random() * (max - min + 1));
    }

    S.extend(PrizeDraw, Base, {
        init: function () {
            this.peopSetCont = $(this.get('peopleSetCont'));
            this.prizeSetCont = $(this.get('prizeSetCont'));
            this.numSetCont = $(this.get('peopleNumSetCont'));
            this.confBtn = $(this.get('configBtn'));
            this.peopCont = $(this.get('peopleCont'));
            this.prizeCont = $(this.get('prizeCont'));
            this.resultCont=$(this.get('resultCont'));
            this.startBtn = $(this.get('startBtn'));
            this.endBtn = $(this.get('endBtn'));
            this.people = [];
            this.prize = [];
            this.timeInterval = $(this.get('timeInterval'));
            this.resetBtn=$(this.get('resetBtn'));
            this.configCont=$(this.get('configCont'));
            this.showDrawCont=$(this.get('showDrawCont'));
            this.bindEvent();
            this.initStyle();
            this.resetDraw();
        },
        initStyle:function(){
            this.showDrawCont.hide();
            var styleStr='<style type="text/css">';
            var choosedCss='.choosed{-webkit-animation: blink 2s ease 0 infinite;}';
            var blinkCss='@-webkit-keyframes blink { 0% {background: #00a651;} 25% {background: #00aeef;} 50% {background: #ffdc7b;} 100% {background: #00a651;}}';
            styleStr+=choosedCss;
            styleStr+=blinkCss;
            styleStr+='</style>';
            $(styleStr).appendTo('head');

        },
        bindEvent: function () {
            this.confBtn.length && this.confBtn.on('click', this._setConfig, this);
            this.startBtn.length && this.startBtn.on('click', this.startDraw, this);
            this.endBtn.length && this.endBtn.on('click', this.endDraw, this);
            this.resetBtn.length&&this.resetBtn.on('click',this.resetDraw,this);

        },

        _setConfig: function () {
            var people = this.peopSetCont.val(),
                prize = this.prizeSetCont.val(),
                peopleNum = this.numSetCont.val();
            localStorage.setItem('people', people);//参与抽奖人
            localStorage.setItem('prize', prize);//奖品
            localStorage.setItem('peopleNum', peopleNum);//单次中奖人数
            this.configCont.hide();
            this._showPeo();
            this._showPrize();

            this.showDrawCont.show();

        },

        _showPeo: function () {
            var peoStr = localStorage.getItem('people'),
                peoArr = [];
            if(S.trim(peoStr)==''){
                this.people=[];
            }else {
                peoStr=peoStr.replace(/，/g,',');
                this.people = peoStr.split(',');
            }
            peoArr.push('<ul id="J_userList">');
            for (var i = 0, len = this.people.length; i < len; i++) {
                peoArr.push('<li id="J_peo' + i + '">' + this.people[i] + '</li>');
            }
            peoArr.push('</ul>');
            this.peopCont && this.peopCont.html(peoArr.join(''));
        },

        _showPrize: function () {
            var prizeStr = localStorage.getItem('prize'),
                prizeArr = [];
            if(S.trim(prizeStr)==''){
                this.prize=[];
            }else {
                prizeStr=prizeStr.replace(/，/g,',');
                this.prize = prizeStr.split(',');
            }
            prizeArr.push('<ul id="J_prizeList">');
            for (var i = 0, len = this.prize.length; i < len; i++) {
                prizeArr.push('<li><input type="radio" name="prize" id="J_prize' + i + '" value="' + this.prize[i] + '"/>' + this.prize[i]+'</li>');
            }
            prizeArr.push('</ul>');
            this.prizeCont && this.prizeCont.html(prizeArr.join(''));
        },

        change: function (arr) {

            var index = getRnd(0, arr.length - 1);
            S.one("#J_userList") && S.one("#J_userList").all("li").each(function (n) {
                if (n.hasClass("choosed")) {
                    n.removeClass("choosed");
                }
                if (S.trim(n.html()) == S.trim(arr[index])) {
                    n.addClass("choosed");
                }

            });
            localStorage.setItem('luckyOne',arr[index]);
        },

        startDraw: function () {
            var people = this.people,
                change = this.change;
            var luckyArr=localStorage.getItem('luckyArr');
            if(luckyArr){
                for(var k= 0;k<luckyArr.length;k++){
                    for (var i = 0, len = people.length; i < len; i++) {
                        if (luckyArr[k] == S.trim(people[i])) {
                            people.splice(i, 1);
                        }
                    }
                }
            }

            clearInterval(timer);
            timer = setInterval(function () {
                change(people)
            }, this.timeInterval);

        },

        endDraw: function () {
            clearInterval(timer);
            var luckyone=localStorage.getItem('luckyOne');
            luckyArr.push(luckyone);
            localStorage.setItem('luckyArr',luckyArr);
            this.showResult();
        },

        showResult:function(){
            var luckyone = localStorage.getItem('luckyOne'),
                checkedPrize=this.prizeCont.one(":checked"),
                prize=checkedPrize&&checkedPrize.val(),
                resultStr='';
            if(prize){
                resultStr='<div>恭喜'+luckyone+'获得'+prize+'</div>';
            }else{
                resultStr='<div>恭喜'+luckyone+'</div>';
            }
            this.resultCont.append(resultStr);
        },

        resetDraw:function(){
            this.showDrawCont.hide();
            this.configCont.show();
            timer&& clearInterval(timer);
            luckyArr=[];
            localStorage.setItem('people',null);
            localStorage.setItem('prize',null);
            localStorage.setItem('luckyOne',null);
            localStorage.setItem('luckyArr',null);
            this.resultCont.html('');
        }



    }, {ATTRS: {
        configCont:{
            value:'#J_configCont'
        },
        showDrawCont:{
            value:'#J_showDraw'
        },
        peopleSetCont: {
            value: '#J_candidateInput'
        },
        prizeSetCont: {
            value: '#J_prizeInput'
        },
        peopleNumSetCont: {
            value: '#J_peopleNum'
        },
        configBtn: {
            value: '#J_config'
        },
        peopleCont: {
            value: '#J_candidate'
        },
        prizeCont: {
            value: '#J_prize'
        },
        timeInterval: {
            value: 400
        },
        resultCont:{
            value:'#J_result'
        },
        startBtn: {
            value: '#J_start'
        },
        endBtn: {
            value: '#J_end'
        },
        resetBtn:{
            value:'#J_reset'
        }


    }});
    return PrizeDraw;
}, {requires: ['node', 'base']});





