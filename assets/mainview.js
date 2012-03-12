$(function() {
	$(document).ready(function() {
		$( '#textSearch').val( 'intel');
		getImgFromFlick();
	});
	

	$( '#btnSearch').click( function(){
		getImgFromFlick();
	});
	
	$( '#textSearch').keyup(function(e) {
		if(e.keyCode == 13) {
			getImgFromFlick();
		}
	});

	$('#btnSearchMore').click( function () {
		$('#searchShow').hide();
		$('#btnSearchMore').hide();	
		
		$('#textSearch').show();
		$('#btnSearch').show();
	});
	
	function getImgFromFlick() {
		$( '#searchResult').favoriteFlicker( {
			method :  'flickr.photos.search',
			api_key : '77f7a3eb07331902b582e1db782aeb57',
			format :  'json',
			text :	  $('#textSearch').val()
		});
		
		$('#searchShow').text('Pictures for ' + $('#textSearch').val());
		
		$('#searchShow').show();
		$('#btnSearchMore').show();	
		
		$('#textSearch').hide();
		$('#btnSearch').hide();
	}
});