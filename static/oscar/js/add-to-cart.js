/*
 * Author: Themina
 * UR: http://themina.net
 *
 * This file manages Add to Cart functionality
 * By clicking `add to cart` button, the product will be added to cookie `cart`
 * With a nice animation.
 */
jQuery(function($) {
	
	$(document).on('click', '.add-to-cart', function(e) {
		e.preventDefault();
		var $this = $(this),
			$container,
			data = {};
		
		// Get Related add-cart container and settings
		$container = $this.closest('.add-cart');
		$item = $this.closest( $container.data('product') );
		data = {
			id: $item.data('product-id'),
			thumbnail: $item.find( $container.data('thumbnail') ).attr('src'),
			title: $.trim( $item.find( $container.data('title') ).text() ),
			url: $item.find( $container.data('url') ).attr('href'),
			price: $.trim( $item.find( $container.data('price') ).text() ),
			qty: 1
		}
		
		/* Add to Cart Animation - Credits : http://codepen.io/ElmahdiMahmoud/pen/tEeDn */
		var $imgToDrag = $item.find( $container.data('thumbnail') ),
			$cart = $('.header-top [data-target="#sub-cart"]'),
			$imgClone = $imgToDrag.clone()
				.offset({
					top: $imgToDrag.offset().top,
					left: $imgToDrag.offset().left
				})
				.css({
					'opacity': '0.5',
					'position': 'absolute',
					'height': '150px',
					'width': '150px',
					'z-index': '100000'
				})
				.appendTo( $('body') )
				.animate({
					'top': $cart.offset().top + 10,
					'left': $cart.offset().left + 10,
					'width': 75,
					'height': 75
				}, 1000, 'easeInQuad', function() {
					$(this).animate({
						'width': 0,
						'height': 0
					}, function () {
						$(this).detach();
					});
					
					var $notification = $('.cart-notification ul'),
						$newNotify = $('<li><strong>"' + data.title + '"</strong> Added to Your Cart Succesfully.</li>').hide();
					
					$newNotify.appendTo($notification).slideDown(400, function() {
						setTimeout(function() { $newNotify.slideUp(400, function() { $(this).remove(); }); }, 2000);
					});
				});

		updateCookie(data);
		updateCart();
	});
	
	
	$(document).on('click', '#sub-cart .close', function() {
		var $this = $(this),
			$item = $this.closest('.item'),
			id = $item.data('product-id');
			
		cookie = getCookie();
		cookie = toJSON(cookie);
		
		for ( var x in cookie )
		{
			if ( cookie[x].id == id )
			{
				cookie.splice(x,1);
			}
		}
		
		setCookie(cookie);
		$item.parent().fadeOut(400, function() {
			updateCart();
		});
	});
	
	function getCookie()
	{
		return $.cookie('cart');
	}
	
	function setCookie(cookie)
	{
		$.cookie('cart', JSON.stringify(cookie) );
	}
	
	function toJSON(cookie)
	{
		return $.parseJSON(cookie);
	}
	
	function updateCookie(data)
	{
		var cookie = getCookie();
		if ( typeof cookie == 'undefined' )
		{
			cookie = [];
			cookie.push(data);
		}
		else
		{
			cookie = toJSON(cookie);
			
			for ( var x in cookie )
			{
				if ( cookie[x].id == data.id )
				{
					cookie[x].qty++;
					setCookie(cookie);
					return;
				}
			}
			
			cookie.push(data);
		}
		
		setCookie(cookie);
	}
	
	function updateCart()
	{
		var cookie = getCookie();
		var $cartPop = $('#sub-cart'),
			$cartItems = $cartPop.find('.cart-items'),
			$cartHeader = $cartPop.find('.cart-header'),
			$cartTotal = $cartPop.find('.cart-total .total');
		
		
		$cartItems.empty();
		$cartHeader.find('small').hide();
		
		if ( typeof cookie == 'undefined' )
		{
			$cartHeader.find('span').text('Your cart is currently empty.');
			$cartTotal.text('0');
			return;
		}
		else
		{
			var total = 0, counter = 0, temp, max = 2;
			cookie = toJSON(cookie);
			for ( var x in cookie )
			{
				temp = cookie[x].price;
				temp = temp.replace( /^\D+/g, '');
				temp = parseInt(temp);
				if ( ! isNaN(temp) )
				{
					total += cookie[x].qty * temp;
				}
				if ( ++counter > max ) continue;
				var $new = $('<li> \
								<div class="item clearfix" data-product-id="' + cookie[x].id + '"> \
									<button type="button" class="close" aria-hidden="true">×</button> \
									<a href="' + cookie[x].thumbnail + '" data-toggle="lightbox" class="entry-thumbnail"> \
										<img src="' + cookie[x].thumbnail+ '" alt="' + cookie[x].title + '" /> \
									</a> \
									<h5 class="entry-title"><a href="' + cookie[x].url + '">' + cookie[x].title + '</a></h5> \
									<span class="entry-price">' + cookie[x].qty + ' x ' + cookie[x].price + '</span> \
								</div> \
							</li>');
				
				$new.appendTo($cartItems);
				$new.find('[data-toggle="lightbox"]').magnificPopup({
					type: 'image'
				});
			}
			
			if ( max >= counter )
			{
				max = counter;
			}
			else
			{
				$cartHeader.find('small').show();
			}
			
			if ( counter == 0 )
			{
				$.removeCookie('cart');
				updateCart();
				return;
			}
			
			$cartHeader.find('span').text('Displaying ' + max.toString() + ' of ' + counter.toString() + ' items');
			$cartTotal.text( '$ ' + total.toString() );
		}
		
	}
	updateCart();
	
	
	function addCartAJAX(data)
	{
		$.ajax({
			url: 'cart.php',
			type: 'post',
			data: 'data=' + encodeURIComponent(JSON.stringify(data)),
			dataType: 'json',
			beforeSend: function() {
			},
			sucess: function(result) {
				updateCart(data);
			}
		});
	}
});