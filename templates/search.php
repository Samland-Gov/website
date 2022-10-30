`% extends templates/include/page.php %`
`% block content %`
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
`% endblock %`