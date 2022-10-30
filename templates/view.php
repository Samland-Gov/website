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
            $type = mime_content_type($path);
            $size = filesize($path);
            echo("<h1>File `{$name}`</h1>");
            echo("<p>Type: {$type}. Size: {$size} bytes.<p>");
            echo("<a href=\"{$name}\">Download here.</a>");
            if (file_exists($path.".desc")) {
                $desc = file_get_contents($path.".desc");
                echo("<br>");
                echo("<div style=\"margin-top: 40px;\">{$desc}</div>");
            }
        } else {
            echo("<h1>404 File not found.</h1>");
        }
    }
    ?>
`% endblock %`