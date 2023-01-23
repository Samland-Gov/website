<?php
require( __DIR__."/../vendor/autoload.php" );
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Samland Government - <?php echo($page);?></title>
		<link rel="stylesheet" href="/style.css">
		<link rel="stylesheet" href="/github-markdown.css">
		<script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
		`% yield extra_head %`
	</head>
	<body class="markdown-body">
		<header id="one">
			<h1><a href="/">Samland Government</a> - <?php echo($page);?></h1>
			<form action="/search.php" method="GET">
				<input name="q" id="q">
				<input type="submit" value="Search">
			</form>
		</header>
		<div id="main">
			<nav id="two">
				<a href="/"><p>Home</p></a>
				<a href="/search.php?q=regulations"><p>Regulations</p></a>
				<a href="/search.php?q="><p>All Files</p></a>
			</nav>

			<main id="three">
				<div id="preview">
					`% yield content %`
				</div>
			</main>
		</div>
	</body>
</html>