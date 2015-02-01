/*
 * Author: Themina
 * UR: http://themina.net
 *
 * This file manages Add to Cart functionality
 * By clicking `add to cart` button, the product will be added to storage `cart`
 * With a nice animation.
 */
jQuery(function($) {

    function MemStorage () {}
    MemStorage.prototype = {
        get: function () {
            return this.storage;
	    },

	    set: function (storage) {
            this.storage = storage;
	    },

        clear: function () {
            delete this.storage;
        }
    };

    function CookieStorage (storage_name) {
        self.storage_name = ( typeof storage_name == 'undefined' ) ? 'cart' : storage_name;
    }
    CookieStorage.prototype = {
        get: function () {
            var storage = $.cookie(this.storage_name);
            if ( typeof storage == 'undefined' )
                return storage;
            else
		        return this.toJSON(storage);
	    },

	    set: function (cookie) {
		    $.cookie(this.storage_name, JSON.stringify(cookie));
	    },

	    toJSON: function (cookie) {
		    return $.parseJSON(cookie);
	    },

        clear: function () {
            $.removeCookie(this.storage_name);
        }
    };

    var cart_storage = new MemStorage();

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
		};

        addCartAJAX($this.parent(), data, function () {
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
        });
	});


	$(document).on('click', '#sub-cart .close', function() {
		var $this = $(this),
			$item = $this.closest('.item'),
			id = $item.data('product-id');

		storage = cart_storage.get();

		for ( var x in storage )
		{
			if ( storage[x].id == id )
			{
				storage.splice(x,1);
			}
		}

		cart_storage.set(storage);
		$item.parent().fadeOut(400, function() {
			updateCart();
		});
	});

	function updateStorage(data)
	{
		var storage = cart_storage.get();
		if ( typeof storage == 'undefined' )
		{
			storage = [];
			storage.push(data);
		}
		else
		{
			for ( var x in storage )
			{
				if ( storage[x].id == data.id )
				{
					storage[x].qty++;
					cart_storage.set(storage);
					return;
				}
			}

			storage.push(data);
		}

		cart_storage.set(storage);
	}

	function updateCart(initial)
	{
        if (initial) {
            for (x in initial) {
                updateStorage(initial[x]);
            }
        }

		var storage = cart_storage.get();
		var $cartPop = $('#sub-cart'),
			$cartItems = $cartPop.find('.cart-items'),
			$cartHeader = $cartPop.find('.cart-header'),
			$cartTotal = $cartPop.find('.cart-total .total');

		$cartItems.empty();
		$cartHeader.find('small').hide();

		if ( typeof storage == 'undefined' )
		{
			$cartHeader.find('span').text('Your cart is currently empty.');
			$cartTotal.text('0');
			return;
		}
		else
		{
			var total = 0, counter = 0, temp, max = 2;
			for ( var x in storage )
			{
				temp = storage[x].price;
				temp = temp.replace( /^\D+/g, '');
				temp = parseInt(temp);
				if ( ! isNaN(temp) )
				{
					total += storage[x].qty * temp;
				}
				if ( ++counter > max ) continue;
				var $new = $('<li> \
								<div class="item clearfix" data-product-id="' + storage[x].id + '"> \
									<button type="button" class="close" aria-hidden="true">×</button> \
									<a href="' + storage[x].thumbnail + '" data-toggle="lightbox" class="entry-thumbnail"> \
										<img src="' + storage[x].thumbnail+ '" alt="' + storage[x].title + '" /> \
									</a> \
									<h5 class="entry-title"><a href="' + storage[x].url + '">' + storage[x].title + '</a></h5> \
									<span class="entry-price">' + storage[x].qty + ' x ' + storage[x].price + '</span> \
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
                cart_storage.clear();
				updateCart();
				return;
			}

			$cartHeader.find('span').text('Displaying ' + max.toString() + ' of ' + counter.toString() + ' items');
			$cartTotal.text( '$ ' + total.toString() );
		}

	}
	updateCart($initial_cart);

	function addCartAJAX(form, data, handler)
	{
        form.ajaxSubmit(function (answer) {
            if (answer.status == 'success') {
		        updateStorage(data);
			    updateCart();
                handler();
            } else {
                for (etype in answer.messages) {
                    for (i in answer.messages[etype]){
                        msg = answer.messages[etype][i];
                        tname = etype.charAt(0).toUpperCase() + etype.slice(1);
				        var $notification = $('.cart-notification ul'),
					        $newNotify = $('<li><strong>' + tname + '! </strong> '+ msg +'</li>').hide();

				        $newNotify.appendTo($notification).slideDown(400, function() {
					        setTimeout(function() { $newNotify.slideUp(400, function() { $(this).remove(); }); }, 2000);
				        });
                    }
                }
            }
        });
	}
});
