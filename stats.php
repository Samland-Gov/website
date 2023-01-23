<?php

require( __DIR__."/template.php" );
require( __DIR__."/config.php" );

Template::view(TEMPLATE_PATH."/stats.php", [
	'_GET' => $_GET,
	'page' => 'Stats'
]);