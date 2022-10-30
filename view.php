<?php

require( __DIR__."/template.php" );
require( __DIR__."/config.php" );

Template::view(TEMPLATE_PATH."/view.php", [
	'_GET' => $_GET,
	'root' => $_SERVER["DOCUMENT_ROOT"],
	'page' => 'View File'
]);