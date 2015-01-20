jQuery(function($) {
	var $slider = $('#home-slider > .flexslider');
	$slider.find('.flex-caption').each(function() {
		var $this = $(this);
		var configs = {
			left: $this.data('x'),
			top: $this.data('y'),
			speed: $this.data('speed') + 'ms',
			delay: $this.data('start') + 'ms'
		};
		if ( configs.left == 'center' && $this.width() !== 0 ) 
		{
			configs.left = ( $slider.width() - $this.width() ) / 2;
		}
		if ( configs.top == 'center' && $this.height() !== 0 ) 
		{
			configs.top = ( $slider.height() - $this.height() ) / 2;
		}
		
		$this.data('positions', configs);
		
		$this.css({
			'left': configs.left + 'px',
			'top': configs.top + 'px',
			'animation-duration': configs.speed,
			'animation-delay': configs.delay
		});
	});
	
	$(window).on('resize', function() {
		var wW = $(window).width(),
			zoom = ( wW >= 1170 ) ? 1 : wW / 1349;
		$('.flex-caption.gfc').css('zoom', zoom);
	});
	$(window).trigger('resize');
	
	
	
	$slider.imagesLoaded(function() {
		$slider.flexslider({
			animation: 'slide',
			easing: 'easeInQuad',
			slideshow: false,
			nextText: '<i class="iconfont-angle-right"></i>',
			prevText: '<i class="iconfont-angle-left"></i>',
			start: function() {
				flex_fix_pos(1);
			},
			before: function(slider) {
				// initial caption animation for next show
				$slider.find('.slides li .animation-done').each(function() {
					$(this).removeClass('animation-done');
					var animation = $(this).attr('data-animation');
					$(this).removeClass(animation);
				});
				
				flex_fix_pos(slider.animatingTo + 1);
			},
			after: function() {
				// run caption animation
				$slider.find('.flex-active-slide .animated').each(function() {
					var animation = $(this).attr('data-animation');
					$(this).addClass('animation-done').addClass(animation);
				});
			}
		});
	});
	
	
	function flex_fix_pos(i) {
		$slider.find('.slides > li:eq(' + i + ') .gfc').each(function() {
			var $this = $(this),
				pos = $(this).data('positions');
				
			if ( pos.left == 'center' )
			{
				pos.left = ( $slider.width() - $this.width() ) / 2;
				$this.css('left', pos.left + 'px');
				$this.data('positions', pos);
			}
			if ( pos.top == 'center' )
			{
				pos.top = ( $slider.height() - $this.height() ) / 2;
				$this.css('left', pos.top + 'px');
				$this.data('positions', pos);
			}
		});
	}
});