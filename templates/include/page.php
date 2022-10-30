<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>Samland Government - <?php echo($page);?></title>
		<link rel="stylesheet" href="/style.css">
	</head>
	<body>
	<h1><u><a href="/">Samland Government</u></a> - <?php echo($page);?></h1>
		<main>
		<form action="/search.php" method="GET">
			<input name="q" id="q">
			<label for="q">Search</label>
			<input type="submit">
		</form>
		`% yield content %`
		</main>
	</body>
</html>