var scrnW, scrnH;

jQuery(function($) {

	function scrnSize()
	{
		scrnW = $(window).width(),
		scrnH = $(window).height();
	}

	$(window).on('resize', function() {
		scrnSize();
	});
	scrnSize();


	/*
	| ----------------------------------------------------------------------------------
	| Google Map
	| ----------------------------------------------------------------------------------
	*/
	if ( jQuery().gmap3 )
	{
		$('#store-locator-gmap').gmap3({
			marker : {
				values:[
					{ latLng : [-37.817243, 144.955475] },
					{ latLng : [-37.812843, 144.924475] },
					{ latLng : [-37.822843, 144.974475] },
					{ latLng : [-37.802843, 144.964475] },
					{ latLng : [-37.822043, 144.978475] }
				],
				options : {
					draggable : true
				},
				events : {
					dragend : function (marker) {
						$(this).gmap3({
							getaddress : {
								latLng : marker.getPosition(),
								callback : function (results) {
									var map = $(this).gmap3("get"),
									infowindow = $(this).gmap3({
											get : "infowindow"
										}),
									content = results && results[1] ? results && results[1].formatted_address : "no address";
									if (infowindow) {
										infowindow.open(map, marker);
										infowindow.setContent(content);
									} else {
										$(this).gmap3({
											infowindow : {
												anchor : marker,
												options : {
													content : content
												}
											}
										});
									}
								}
							}
						});
					}
				}
			},
			map : {
				options : {
					zoom : 13
				}
			}
		});

		$('#gmap').gmap3({
			marker : {
				latLng : [-37.817243, 144.955475],
				options : {
					draggable : true
				},
				events : {
					dragend : function (marker) {
						$(this).gmap3({
							getaddress : {
								latLng : marker.getPosition(),
								callback : function (results) {
									var map = $(this).gmap3("get"),
									infowindow = $(this).gmap3({
											get : "infowindow"
										}),
									content = results && results[1] ? results && results[1].formatted_address : "no address";
									if (infowindow) {
										infowindow.open(map, marker);
										infowindow.setContent(content);
									} else {
										$(this).gmap3({
											infowindow : {
												anchor : marker,
												options : {
													content : content
												}
											}
										});
									}
								}
							}
						});
					}
				}
			},
			map : {
				options : {
					zoom : 13
				}
			}
		});
	}


	/*
	| ----------------------------------------------------------------------------------
	| Simulate select click
	| ----------------------------------------------------------------------------------
	*/
	$(document).on('click', '.styled-dd', function(e) {
		e.stopPropagation();
		if ( $(e.target).hasClass('styled-dd') )
			$(this).find('select').simulate('mousedown');
	});

	$('.styled-dd select').change(function() {
        window.location.href = jQuery.query.set('limit', $(this).find('option:selected').text());
	});


	/*
	| ----------------------------------------------------------------------------------
	| Simulate Smooth Height functionality for bootstrap carousel
	| ----------------------------------------------------------------------------------
	*/
	$('.carousel').bind('slide.bs.carousel', function(e) {
		var $this = $(this);
		setTimeout(function () {
			if ( ! $this.is(':visible') ) return false;
			var next_h = $(e.relatedTarget).outerHeight();
			$this.animate( { 'height': next_h }, 590 );
		}, 10);
	});


	/*
	| ----------------------------------------------------------------------------------
	| PrettyCheckable jQuery Plugin
	| This plugin replaces the default checkboxes and radio inputs for better looking ones.
	| Git: https://github.com/arthurgouveia/prettyCheckable
	| URL: http://arthurgouveia.com/prettyCheckable/
	| ----------------------------------------------------------------------------------
	*/
	$('.prettyCheckable').each(function() {
		$(this).prettyCheckable();
	});
	$('.vmenu .prettyCheckable').on('change', function() {
		var $this = $(this);
		$this.parent().siblings('ul').find('.prettyCheckable').each(function() {
			if ( $this.prop('checked') )
			{
				$(this).prettyCheckable('check');
				$(this).parent().addClass('checked');
			}
			else
			{
				$(this).prettyCheckable('uncheck');
				$(this).parent().removeClass('checked');
			}
		});
	});


	/*
	| ----------------------------------------------------------------------------------
	| Product LightBox - jQuery magnificPopup Plugin By dimsemenov
	| Git: https://github.com/dimsemenov/Magnific-Popup/
	| Documentation: http://dimsemenov.com/plugins/magnific-popup/documentation.html
	| URL: http://dimsemenov.com/plugins/magnific-popup/
	| ----------------------------------------------------------------------------------
	*/
	$('[data-toggle="lightbox"]').magnificPopup({
		type: 'image',
		disableOn: function() {
			return ( $(window).width() < 500 ) ? false : true;
		}
	});


	/*
	| ----------------------------------------------------------------------------------
	| Product Carousel - jQuery OwlCarousel Plugin
	| URL: http://owlgraphic.com/owlcarousel/
	| ----------------------------------------------------------------------------------
	*/
	var $ProductCarousel = $('.owl-carousel');
	$ProductCarousel.each(function() {
		var $this = $(this),
			settings = {
				items: ( $this.data('visible-items') === undefined ) ? 4 : $this.data('visible-items'),
				speed: ( $this.data('slideshow-speed') === undefined ) ? 800 : $this.data('slideshow-speed'),
				lazyLoad: ( $this.data('lazyload') == true ) ? true : false,
				navigation: ( $this.data('navigation') == true ) ? true : false,
				pagination: ( $this.data('pagination') == true ) ? true : false,
			};

		$this.owlCarousel({
			items: settings.items,
			slideSpeed: settings.speed,
			lazyLoad : settings.lazyLoad,
			lazyEffect: false,
			navigation: false,
			pagination: settings.pagination,
			navigationText: [
				'<i class="iconfont-angle-left"></i>',
				'<i class="iconfont-angle-right"></i>'
			],
			afterInit: function() {
				var $controls = $this.siblings('.owl-controls');
				if ( $controls.length )
				{
					$controls.prependTo( $this );
					if ( scrnW < 768 )
					{
						$controls.addClass('top').removeClass('outside');
					}
				}
				$controls.find('.owl-prev').on('click', function() {
					$this.trigger('owl.prev');
				});
				$controls.find('.owl-next').on('click', function() {
					$this.trigger('owl.next');
				});
			}
		});
	});


	/*
	| ----------------------------------------------------------------------------------
	| Carousel Navigation Hover Animation Effect
	| ----------------------------------------------------------------------------------
	*/
	$('html:not(.lte8) .owl-buttons div').hoverIntent({
		over: function() {
			var $this = $(this),
				$clone = $this.clone(),
				leftOrRight = ( $clone.hasClass('owl-prev') ) ? 'left' : 'right';

			var posLeft = $this.offset().left;
			posLeft = ( leftOrRight == 'right' ) ? posLeft + 50 : posLeft - 50;

			$clone.css({
				'position': 'absolute',
				'left': $this.offset().left,
				'top': $this.offset().top,
				'cursor': 'hand',
				'z-index': '2'
			})
			.addClass('round-icon')
			.appendTo('body')
			.animate({
				'left': posLeft,
				'opacity': '0'
			}, 300, 'easeOutQuad', function() { $clone.detach(); });
		},
		out: function() {
			return;
		},
		timeout: 150
	});


	/*
	| ----------------------------------------------------------------------------------
	| animate elements when they are in viewport
	| ----------------------------------------------------------------------------------
	*/
	$('.noIE .animated:not(.animation-done)').waypoint(function() {
		var animation = $(this).data('animation');
		$(this).addClass('animation-done').addClass(animation);
	}, {
		triggerOnce: true,
		offset: '85%'
	});


	/*
	| ----------------------------------------------------------------------------------
	| Bootstrap tooltip plugin for every element with data-toggle="tooltip"
	| ----------------------------------------------------------------------------------
	*/
	$('[data-toggle="tooltip"]').tooltip();


	/*
	| ----------------------------------------------------------------------------------
	| Convert label as input placeholder
	| ----------------------------------------------------------------------------------
	*/
	$('input[type="text"], input[type="password"], input[type="email"], input[type="tell"], textarea').on('focus', function() {
		$(this).siblings('.placeholder').addClass('hide-label');
	});
	$('.placeholder').on('click', function() {
		$(this).siblings('input').focus();
	});
	$('input[type="text"], input[type="password"], input[type="email"], input[type="tell"], textarea').on('blur', function() {
		if ( $(this).val() == '' )
		{
			$(this).siblings('.placeholder').removeClass('hide-label');
		}
		else
		{
			$(this).siblings('.placeholder').addClass('hide-label');
		}
	});


	/*
	| ----------------------------------------------------------------------------------
	| Open Shopping Cart Popup on Header On mouse over Icon
	| ----------------------------------------------------------------------------------
	*/
	$('[data-toggle="sub-header"]').each(function() {
		var $this = $(this),
			$target = $( $this.data('target') );

		$this.hoverIntent({
			over: function() {
				// Move Popup to Center of the viewport when screen width is low
				if ( $this.offset().left < $target.width() )
				{
					$target.css( 'right', $target.width() / -2 );
				}
				else
				{
					$target.css( 'right', 0 );
				}
				$target.animate( { 'height': 'toggle' }, 300, 'easeInExpo' );
			},
			out: function() {
				$target.animate( { 'height': 'toggle' }, 300, 'easeOutExpo' );
			},
			timeout: 250
		});
	});


	/*
	| ----------------------------------------------------------------------------------
	| Main menu & Mega menu
	| ----------------------------------------------------------------------------------
	*/

	// add class submenu to submenu's that are not megamenu
	$('.main-menu ul').each(function() {
		if ( $(this).closest('.mega-menu').length == 0 )
		{
			$(this).addClass('sub-menu');
		}
		else
		{
			$(this).addClass('mega-menu-parent');
		}
	});

	// add class has-child to each menu item that has child
	$('.main-menu li').each(function() {
		if ( $(this).find('ul').length )
			$(this).addClass('has-child');
	});

	$('.main-menu li').hoverIntent({
		// on menu mouse hover function handler
		over: function() {
			var $this = $(this),
				$mm = $this.children('.mega-menu'),
				$parent = $('#site-menu');

			// we need to setup megamenu position and width
			var $pattern_container = $parent.closest('.main-header');

			var lgORmd = ( scrnW >= 1170 ) ? 'col-lg' : 'col-md';
				cols = parseInt($mm.data(lgORmd)),
				mmW =  $pattern_container.outerWidth(),
				mmLeft = $pattern_container.offset().left - $this.offset().left;

			if ( isNaN(cols) ) cols = 12;
			mmW = parseInt(mmW * (cols/12));

			mmLeft += ($pattern_container.outerWidth() - mmW) / 2;
			mmLeft = parseInt(mmLeft);

			$mm.css({
				'left': mmLeft + 'px',
				'width': mmW + 'px',
				'visibility': 'visible'
			});

			// now we are good and we can show the megamenu
			$this.addClass('hover').children('ul, .mega-menu').animate({ 'height': 'toggle' }, 300, function() { $(this).css('overflow', 'visible'); } );
		},
		// mouse out handler
		out: function() {
			$(this).removeClass('hover').children('ul, .mega-menu').animate({ 'height': 'toggle' }, 300, function() { $(this).css('overflow', 'visible'); } );
		},
		// A simple delay, in milliseconds, before the "out" function is called
		timeout: 200
	});


	/*
	| ----------------------------------------------------------------------------------
	| Responsive multi level menu
	| Credits goes to: https://github.com/codrops/ResponsiveMultiLevelMenu
	| Licensed under the MIT License
	| ----------------------------------------------------------------------------------
	*/
	$( '#mobile-menu' ).dlmenu({
		animationClasses : { classin : 'dl-animate-in-5', classout : 'dl-animate-out-5' }
	});
});

oscar.basket.init = function(options) {
    if (typeof options == 'undefined') {
        options = {'basketURL': document.URL};
    }
    oscar.basket.url = options.basketURL || document.URL;
    $('#main-content').on('click', '#basket_formset button[data-behaviours~="remove"]', function(event) {
        oscar.basket.checkAndSubmit($(this), 'form', 'DELETE');
        event.preventDefault();
    });
    $('#main-content').on('click', '#basket_formset a[data-behaviours~="save"]', function(event) {
        oscar.basket.checkAndSubmit($(this), 'form', 'save_for_later');
        event.preventDefault();
    });
    $('#main-content').on('click', '#saved_basket_formset a[data-behaviours~="move"]', function(event) {
        oscar.basket.checkAndSubmit($(this), 'saved', 'move_to_basket');
    });
    $('#main-content').on('click', '#saved_basket_formset button[data-behaviours~="remove"]', function(event) {
        oscar.basket.checkAndSubmit($(this), 'saved', 'DELETE');
        event.preventDefault();
    });
    $('#main-content').on('click', '#voucher_form_link a', function(event) {
        oscar.basket.showVoucherForm();
        event.preventDefault();
    });
    $('#main-content').on('click', '#voucher_form_cancel', function(event) {
        oscar.basket.hideVoucherForm();
        event.preventDefault();
    });
};
