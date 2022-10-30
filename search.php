<?php

require( __DIR__."/template.php" );
require( __DIR__."/config.php" );

Template::view(TEMPLATE_PATH."/search.php", [
	'_GET' => $_GET,
	'page' => 'Search'
]);