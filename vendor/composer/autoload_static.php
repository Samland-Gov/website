<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit2318e26c88846e1c28d385a1fcd0e7df
{
    public static $prefixesPsr0 = array (
        'P' => 
        array (
            'Parsedown' => 
            array (
                0 => __DIR__ . '/..' . '/erusev/parsedown',
            ),
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixesPsr0 = ComposerStaticInit2318e26c88846e1c28d385a1fcd0e7df::$prefixesPsr0;
            $loader->classMap = ComposerStaticInit2318e26c88846e1c28d385a1fcd0e7df::$classMap;

        }, null, ClassLoader::class);
    }
}
