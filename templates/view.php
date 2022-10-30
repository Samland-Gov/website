`% extends templates/include/page.php %`
`% block content %`
    <?php
    if (isset($_GET["name"])) {
        $name = str_replace("../", "",$_GET["name"]);
        if ($name == "/") {
            $name = substr($name, 1);
        }
        
        $path = $root.$name;

        if (!($path == $root) && file_exists($path)) {
            echo("<h1>File `{$name}`</h1>");
            echo("<a download href=\"{$name}\">Download here.</a>");
            if (file_exists($path.".desc")) {
                $desc = file_get_contents($path.".desc");
                echo("<div>{$desc}</div>");
            }
        } else {
            echo("<h1>404 File not found.</h1>");
        }
    }
    ?>
`% endblock %`