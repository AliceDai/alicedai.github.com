// JavaScript Document
var $self;
function _scroll_background(index) {
          var _x = '50% ';                  
          var bpos = _x + (-($.distancefromfold($self,{threshold:-900,i:index})) * 0.25) + 'px';
          $self.css({'background-position':bpos});
}
		
$.distancefromfold = function($element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $('#body').height() + $('#body').scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }        
        return (fold + settings.threshold)-$('#body').height()*(settings.i+1);
};
$(function(){
	Alice.initDot();
	Alice.initDotClick();
	window.onresize = function() {
		if(!Alice.isIE6()){
			Alice.initDot();
		}
	}
	$('#body').scroll(function(){
		var st = parseInt($('#body').attr('scrollTop'));
		$('.bg2,.bg3,.bg4').each(function(index){
			$self = $(this);
			_scroll_background(index);
		})
		$('.content').each(function(index){
			$(this).attr('dot',index);
			if((st+$('#body').height()/2) >= (st+$(this).offset().top)){
				$('#dot a').each(function(i){$(this).removeClass('active'+(i+1));})
				$('#dot a:eq('+$(this).attr('dot')+')').addClass('active'+(parseInt($(this).attr('dot'))+1));					
			}
		})		
								   
	})
	$('.item1,.item2,.item3,.item4').each(function(){
		$(this).css('margin-top',(900-$(this).height())/2+'px');	
	})
	$('#body').trigger('scroll');
	$('.submit').hover(function(){$(this).removeClass('submit').addClass('submitred')},function(){$(this).removeClass('submitred').addClass('submit')})
})
var Alice = {};
Alice.isIE6 = function(){
	var browser_ver = $.browser.version;
	var accurate_value = browser_ver.substr(0,1);
	return $.browser.msie && (accurate_value == '6');
}
function getIE6Left(){return ($('.content:eq(0)').offset().left+10)+'px'}

function getInfoIE6Left(){return ($('.content:eq(0)').offset().left+$('.content:eq(0)').width()-$('#information').width()-35)+'px';}

//初始化右侧分页dot位置
Alice.initDot = function(){
	var parentPos = $('.content:eq(0)').offset().left+$('.content:eq(0)').width();
	var dot = $('#dot'),dotie6 = document.getElementById("dot");	
	if(!Alice.isIE6()){
		dot.css('position','fixed').css('top',($(window).height()-dot.height())/2+'px').css('right','18px');
	}else{
		dot.css('position','absolute');
		var bch = '$("#body").height()',ch = 'document.getElementById("body").offsetHeight',bst = '$("#body").scrollTop()',st='document.getElementById("body").scrollTop';
		var top = '((' + ch + ') - (this.offsetHeight))/2 + (' + st + ') + "px"';
		dotie6.style.setExpression('top',top);
		dotie6.style.right = '0px';
		
	}
}
var prevClick = 0;
Alice.initDotClick = function(){
	$('#dot a').each(function(index){
		$(this)	.attr('handleTarget','.content:eq('+index+')')
		$(this)	.attr('num',index)
		$(this).click(function() {
			var easing = 'easeInOutExpo'
			if(parseInt($(this).attr('num'))<prevClick)easing = 'easeInOutExpo';
			prevClick = parseInt($(this).attr('num'));
			var targetOffset = $('#body').scrollTop()+$($(this).attr('handleTarget')).offset().top;
			if($('#body').height()<900){
				targetOffset += (900-$('#body').height())/2;
			}
			$('#body').animate({scrollTop: targetOffset},1000,easing);
		});
	});
}
