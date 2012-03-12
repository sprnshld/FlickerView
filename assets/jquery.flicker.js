(function($) {
	$.fn.favoriteFlicker = function( options){

		var defaults={
			method : 	'',
			api_key : 	'',
			format : 	'',
			text :		'',
			perpage : 12,
			imgSize : 't'
		};
		var options = $.extend(defaults, options);

		var url = "http://api.flickr.com/services/rest/?method=" +
			options.method+"&format=" + options.format + "&api_key=" + options.api_key + "&text=" + options.text +"&per_page=" + options.perpage,
			target = $( this);

		function setDiv() {
			target.empty();
			target.append( '<div class="flickrThumbnail">'
				+ '<div class="flickrResultImgs"></div></div>');
			target.append( '<div class="flickrDetail"></div>');
		};

		function getImgUrl( farm, server, id, secret, type) {
			var url = "http://farm"+farm+".static.flickr.com/"+server+"/"+id+"_"+secret;
			if ( type == 'default')
				return url + ".jpg";
			else
				return url +"_" + options.imgSize + ".jpg";

		};

		function getList() {
			refresh();
			$( '.flickrThumbnail').addClass( 'flickrIndicator');
			$.ajax({
				url : url+"&page=1",
				type : 'get',
				dataType : 'jsonp',
				jsonp : 'jsoncallback',
				success : function(data) {
		          	$.each(data.photos.photo, function( index, val){
						var imgUrl = getImgUrl(val.farm, val.server, val.id, val.secret, null),
							nextImgUrl = getImgUrl(val.farm, val.server, val.id, val.secret, 'default');
						target.find( '.flickrResultImgs').append( "<a rel='group' title='"+nextImgUrl+"' href='#'>"+
								"<img src='"+imgUrl+"' class='flickrImg' width='100' height='90'></a>");

					});

		          	$( 'a').click( function(){
		          		$( this).find( 'img').addClass( 'flickrImgSelected');
		          		$( '.flickrDetail').empty();
						imgurl = $( this).attr( 'title');
						img = new Image();
						img.src = imgurl;
						img.width = $( '.flickrDetail').width();
						
						//$( '.flickrDetail').append(img);
						$( '.flickrDetail').append("<img src='" + imgurl + "' class='flickerDetailImage'></img>");
					}).mousedown( function(){
		          		$( '.flickrImgSelected').removeClass( 'flickrImgSelected');
					});
				},
				complete : function() {
		          	$( '.flickrThumbnail').removeClass( 'flickrIndicator');
				}
			});
		};

		function refresh() {
			$( '.flickrResultImgs').empty();
		};
		setDiv();
		getList();
	};

})(jQuery);
