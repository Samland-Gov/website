<?php class_exists('Template') or exit; ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>Samland Government - <?php echo($page);?></title>
	</head>
	<body>
	<h1><u><a href="/">Samland Government</u></a> - <?php echo($page);?></h1>
		<form action="/search.php" method="GET">
			<input name="q" id="q">
			<label for="q">Search</label>
			<input type="submit">
		</form>
		<main>
		
    <?php

    function scan($dir, $for, $prefix) {
        $files = scandir($dir);
        foreach ($files as $file) {
            if ($file != ".." & $file != ".") {
                if (is_file($dir."/".$file)) {
                    if (strpos(strtolower($file), strtolower($for)) !== false) {
                        $when = date("F d Y H:i:s.", filemtime("docs/{$prefix}{$file}"));
                        echo("
                        <a href=\"/docs/{$prefix}{$file}\"><p>{$prefix}{$file}</p></a>
                        <p>Last Modified: {$when}</p>
                        ");
                    }
                } else {
                    scan("docs/{$file}", $for, "{$file}/");
                }
            }
        }
    }

    if (isset($_GET["q"])) {
        $name = $_GET["q"];
        scan("docs", $name, '');
    }
    ?>

		</main>
	</body>
</html>
