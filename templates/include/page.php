<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Samland Government - <?php echo($page);?></title>
		<link rel="stylesheet" href="/style.css">
	</head>
	<body class="content">
		<h1 class="title"><a href="/">Samland Government</a> - <?php echo($page);?></h1>
		<div id="main">
			<nav>
				<p>Test</p>
				<p>Test1</p>
				<p>Test2</p>
			</nav>

			<main>
				<div>
					<form action="/search.php" method="GET">
						<input name="q" id="q">
						<input type="submit">
					</form>
					`% yield content %`
				</div>
			</main>
		</div>
	</body>
</html>