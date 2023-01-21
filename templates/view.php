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
            if (!str_ends_with($file, ".meta.json") && !($file == ".git") && !($file == "README.md")){
                echo("<section id=\"preview\">\n");
                $type = mime_content_type($path);
                $size = filesize($path);
                echo("<h1>File `{$name}`</h1>");
                echo("<p>Type: {$type}. Size: {$size} bytes.<p>");
                echo("<a href=\"{$name}\">Download here.</a>");

                $markdownFormat = false;
                if (file_exists($path.".meta.json")) {
                    $data = json_decode(file_get_contents($path.".meta.json"), true);
                    if (array_key_exists("url", $data)) {
                        $url = $data["url"];
                        echo("<br>");
                        echo("<a target=\"black\" href=\"{$url}\">View permanent.</a>");
                    }
                    if (array_key_exists("desc", $data)) {
                        $desc = $data["desc"];
                        echo("<hr>\n");
                        foreach ($desc as $line) {
                            echo "$line\n";
                        }                     
                    }
                    if (array_key_exists("format", $data) && $data["format"] == "markdown") {
                        $markdownFormat = true;
                    }
                }
                if ($markdownFormat) {
                    echo("<hr>\n");
                    echo("<article class=\"markdown-body\">\n");
                    $Parsedown = new Parsedown();
                    echo $Parsedown->text(file_get_contents($path));
                    echo("</article>\n");
                }
                echo("</section>\n");
            }
        } else {
            echo("<h1>404 File not found.</h1>");
        }
    }
    ?>
`% endblock %`