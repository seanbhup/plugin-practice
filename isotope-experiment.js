$(document).ready(function(){
	var $grid = $('.grid').isotope({
	  // options
	});
	// $grid.isotope({ filter: '.fish' });
	$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});

	console.log("OH MY ZEESH");
})




