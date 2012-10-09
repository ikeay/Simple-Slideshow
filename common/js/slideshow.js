$(function() {
	//Add HTML and CSS Elements
	$('.xd-slideshow').css({'position': 'relative'});
	$('.pic-images').css({'width': '100%'});
	$('.xd-slideshow img').css({'position': 'absolute', 'top': '0', 'left': '0', 'max-width': '600px', 'height': 'auto'});
	
	var imgNum = $('.xd-slideshow img').length-1;
	var slideshowHTML = $('.xd-slideshow').html();
	slideshowHTML = '<div class="pic-images">' + slideshowHTML + '</div><div class="caption"></div><ul class="circle"></ul>';
	$('.xd-slideshow').empty().html(slideshowHTML);
	for(var i=0; i<=imgNum; i++){
		$('.circle').append('<li></li>');
	}
		
	$('ul.circle').css({'text-align': 'center', 'list-style': 'none'});
	$('ul.circle li').css({'display': 'inline-block', 'margin': '15px 4px', 'width': '8px', 'height': '8px', 'background': '#909090', '-moz-border-radius': '4px', '-webkit-border-radius': '4px', 'border-radius': '4px'});
	
	//-------Inital Setting--------
	var id = 0;
	var prevId= imgNum;	
	var images = $('.pic-images img');
	var autoPlayTimer;
	
	//-------functions--------
	function showImage(id, prevId) {
		var imgLoader = new Image();
		var fileName = $(images[id]).attr('data-original');
		var fileCaption = $(images[id]).attr('data-caption');
		if(autoPlayTimer) clearTimeout(autoPlayTimer);
		
		$(imgLoader).load(function() {
			var liIndex = id+1;
			$('ul.circle li').css({'background':'#909090'});
			$('ul.circle li:nth-child('+liIndex+')').css({'background':'#000'});
			$(images[prevId]).fadeTo(1000, 0, function () {
				$(images[prevId]).hide();
			});
			$(images[id]).attr('src', fileName).fadeTo(0,0).show().fadeTo(1000, 1);
			var imgHeight = $(images[id]).height();
			var halfImgWidth = $(images[id]).width()/2;
			$('.pic-images').css({'height':imgHeight});
			$('.caption').empty().html(fileCaption);
			$('.caption').css({'margin': '20px 0 0 0'});
			
			//For clicking picture action
			$('.prev-picture').remove();
			$('.next-picture').remove();
			$('.pic-images').append('<div class="prev-picture"></div><div class="next-picture"></div>');
			$('.prev-picture').css({'position':'absolute', 'top':'0', 'left':'0', 'width':halfImgWidth, 'height':imgHeight});
			$('.next-picture').css({'position':'absolute', 'top':'0', 'right':'0', 'width':halfImgWidth, 'height':imgHeight});
		});		
		imgLoader.src = fileName;
		setAutoPlay();
	}
	
	function addId() {
		prevId = id;
		id++;
		if(id > imgNum){
			id = 0;
		}
	}
	
	function minusId() {
		prevId = id;
		id--;
		if(id < 0){
			id = imgNum;
		}
	}


	//-------Actions--------
	showImage(0);
	
	//Auto Play Action
	function setAutoPlay(){
		if(autoPlayTimer) clearTimeout(autoPlayTimer);
		autoPlayTimer = setTimeout(function () {
			addId();
			showImage(id, prevId);
		},8000);
	};
	
	//Click Action
	$('ul.circle li').click(function () {
		var index = $('ul.circle li').index(this);
		prevId = id;
		id = index;
		showImage(id, prevId);
	});
	
	//Key Action
	$(window).keydown(function(e) {
		if(e.keyCode == 37){
			minusId();
			showImage(id, prevId);
		}else if(e.keyCode == 39){
			addId();
			showImage(id, prevId);
		}
	});
	
	//Clicking Picture Action
	$(document).delegate('.prev-picture', 'click', function () {
		minusId();
		showImage(id, prevId);
	});
	$(document).delegate('.next-picture', 'click', function () {
		addId();
		showImage(id, prevId);
	});
});
