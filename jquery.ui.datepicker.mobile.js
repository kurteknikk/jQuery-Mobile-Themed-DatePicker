/*
* jQuery Mobile Framework : temporary extension to port jQuery UI's datepicker for mobile
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

	//cache previous datepicker ui method
	var prevDp = $.fn.datepicker;
	
	//rewrite datepicker
	$.fn.datepicker = function( options ){
		
		var dp = this;
	
		//call cached datepicker plugin
		prevDp.call( this, options );
		
		//extend with some dom manipulation to update the markup for jQM
		//call immediately
		function updateDatepicker(){
			$( ".ui-datepicker-header", dp ).addClass("ui-body-c ui-corner-top").removeClass("ui-corner-all");
			$( ".ui-datepicker-prev, .ui-datepicker-next", dp ).attr("href", "#");
			$( ".ui-datepicker-prev", dp ).buttonMarkup({iconpos: "notext", icon: "arrow-l", shadow: true, corners: true});
			$( ".ui-datepicker-next", dp ).buttonMarkup({iconpos: "notext", icon: "arrow-r", shadow: true, corners: true});
			$( ".ui-datepicker-calendar th", dp ).addClass("ui-bar-c");
			$( ".ui-datepicker-calendar td", dp ).addClass("ui-body-c");
			$( ".ui-datepicker-calendar a", dp ).buttonMarkup({corners: false, shadow: false}); 
			$( ".ui-datepicker-calendar a.ui-state-active", dp ).addClass("ui-btn-active"); // selected date
			$( ".ui-datepicker-calendar a.ui-state-highlight", dp ).addClass("ui-btn-up-e"); // today"s date
		        $( ".ui-datepicker-calendar .ui-btn", dp ).each(function(){
					var el = $(this);
					// remove extra button markup - necessary for date value to be interpreted correctly
					el.html( el.find( ".ui-btn-text" ).text() ); 
		        });
	            $("input[data-type=date]").addClass("ui-input-text ui-body-c ui-corner-all ui-shadow-inset ui-focus");
	            $("label").addClass("ui-input-text");            		        
		};
		
		//update now
		updateDatepicker();
		
		// and on click
		$( dp ).click( updateDatepicker );
		
		//return jqm obj 
		return this;
	};
		
	//enhance date inputs with the right value	
    	jQuery(function($){        		
		$( "input[type='date'], input:jqmData(type='date')", this ).each(function(){
			$(this).after( $( "<div />" ).datepicker({ altField: "#" + $(this).attr( "id" ), showOtherMonths: true, , defaultDate: $(this).attr( "value" ) ? $(this).attr( "value" ) : null }) );
		});	
	});
})( jQuery );