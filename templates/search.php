`% extends templates/include/page.php %`
`% block content %`
    <div class="results">
        <style>
            .results div p{
                color: green;
            }
        </style>
    <?php

    function scan($dir, $for, $prefix) {
        $files = scandir($dir);
        foreach ($files as $file) {
            if ($file != ".." & $file != ".") {
                if (is_file($dir."/".$file)) {
                    if (!str_ends_with($file, ".desc")){
                        if (strpos(strtolower($prefix.$file), strtolower($for)) !== false) {
                            $when = date("F d Y H:i:s.", filemtime("{$dir}/{$file}"));
                            $path = htmlentities("/{$dir}/{$file}");
                            $desc = "";
                            if (file_exists($dir."/".$file.".desc")) {
                                $desc = strip_tags(fgets(fopen($dir."/".$file.".desc", 'r')));
                            }
                            echo("
                            <a href=\"/view.php?name={$path}\"><p>{$prefix}{$file}</p></a>
                            <div>
                            <p>Last Modified: {$when}</p>
                            <p>{$desc}</p>
                            </div>
                            ");
                        }
                    }
                } else {
                    scan("{$dir}/{$file}", $for, "{$dir}/{$file}/");
                }
            }
        }
    }

    if (isset($_GET["q"])) {
        $name = $_GET["q"];
        scan("docs", $name, 'docs/');
    }
    ?>
    </div>
`% endblock %`