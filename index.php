<?php

require( __DIR__."/template.php" );
require( __DIR__."/config.php" );

Template::view(TEMPLATE_PATH."/index.php", [
	'_GET' => $_GET,
	'page' => 'Home'
]);