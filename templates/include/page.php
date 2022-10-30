<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Samland Government - <?php echo($page);?></title>
		<link rel="stylesheet" href="/style.css">
	</head>
	<body class="content">
		<header>
			<h1><a href="/">Samland Government</a> - <?php echo($page);?></h1>
			<form action="/search.php" method="GET">
				<input name="q" id="q">
				<input type="submit" value="Search">
			</form>
		</header>
		<div id="main">
			<nav>
				<a href="/"><p>Home</p></a>
				<a href="/search.php?q=regulations"><p>Regulations</p></a>
				<a href="/search.php?q="><p>All Files</p></a>
			</nav>

			<main>
				<div>
					`% yield content %`
				</div>
			</main>
		</div>
	</body>
</html>