<?php
function portfolio_theme_setup() {
    add_theme_support('wp-block-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('title-tag');
}
add_action('after_setup_theme', 'portfolio_theme_setup');
