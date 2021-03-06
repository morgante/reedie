<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>Landmarkr</title>
	
	<link href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap-combined.min.css" rel="stylesheet">
	<link rel="stylesheet" href="public/css/style.css" type="text/css" media="screen" title="Main Stype" charset="utf-8">
	
 	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyC_CCb3QZEVi6VDLUJ8v3EgQvPe0ZWKD4o&sensor=false"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="public/js/mapper.js" type="text/javascript" charset="utf-8"></script>
	<script src="public/js/placer1.js" type="text/javascript" charset="utf-8"></script>
	<script src="public/js/director.js" type="text/javascript" charset="utf-8"></script>
	<script src="public/js/main.js" type="text/javascript" charset="utf-8"></script>

</head>
<body>
	<div class="navbar">
		<div class="navbar-inner">
			<div class="name pull-left">
				<a class="brand pull-left" href="#">Landmarkr</a>
			</div>
			<ul class="nav pull-right">
			  <li><a class="nav-current" href="#current">Use Current Location</a></li>
			</ul>
			<form class="navbar-search">
			  <input type="text" class="search-query" id="search-query" placeholder="Search for destination">
			</form>
		</div>
	</div>
	<div id="map"></div>
</body>
</html>