var main = {
	init: function() {
		// var dest = {
		// 	name: "Bob Home",
		// 	latlong: {Latitude: 91384149, Longitude: 934245},
		// 	importance: 1 // very important
		// };
		// placer.getLandmarks( dest, 0, function( data, landmarks ) {
		// 	neighborhood = placer.getNeighborhood( data );
		// 	
		// 	console.log( dest.name + " in " + neighborhood );
		// 	
		// 	placer.map( domObj, landmarks );
		// });
		
		var center = new google.maps.LatLng(24.4700, 54.38);
		mapper.start( document.getElementById("map"), center, 13 );		
		placer.getLandmarks(mapper.map, center, 1, mapper.addLandmarks, true);
		var defaultBounds = new google.maps.LatLngBounds(center, new google.maps.LatLng(30, 50));

		var input = document.getElementById('search-query');

		var searchBox = new google.maps.places.SearchBox(input, {
		  bounds: defaultBounds
		});
		
		searchBox.bindTo('bounds', mapper.map);
		
		main.selector();
		
		if (navigator.geolocation) {
			$('.nav-current').click( function( ev) {
				navigator.geolocation.getCurrentPosition( function( position ) {
					console.log( position.coords.latitude + " Longitude: " + position.coords.longitude);
				});

				return false;
			});
		}
		else
		{
			$('.nav-current').hide();
		}
		
		director.init();
	},
	smser: function() {
		
	},
	setDest: function( location, info ) {
		placer.getLandmark( mapper.map, location, 0, function( landmark ) {
			mapper.addMarker( landmark.latlong, 1, landmark.name );
		} );
		
		if ( main.destination ) {
	    main.destination.setPosition(location);
	  } else {
	    main.destination = mapper.addMarker( location, 0, "Destination" );
		var infowindow = new google.maps.InfoWindow(
			{
				content: '<p>Sama Tower<br>Across from Etisalat Towers<br>Al Markaziyah</p><p class="sms"><label for="sms">Send to</label><input type="text" id="sms" name="sms" placeholder="SMS"></p>',
				size: new google.maps.Size(50,50)
			}
		);
		infowindow.open(mapper.map, main.destination);
				
	  }
	},
	startNav: function() {
		$('#panel').show().animate( {width: '20%'} );
		$('#map').animate( {width: '80%'} );
		director.getDirections( new google.maps.LatLng( 24.485079, 54.353435 ), main.destination.position );
	},
	selector: function() {
		google.maps.event.addListener(mapper.map, 'click', function(event) {			
			main.setDest(event.latLng, "Destination");
			main.startNav();
		});
	}
}

$(document).ready( main.init );