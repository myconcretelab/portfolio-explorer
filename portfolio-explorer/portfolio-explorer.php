<?php
/**
 * Plugin Name: Portfolio Explorer
 * Description: Bloc Gutenberg avec navigation React et galerie pour Real Media Library.
 * Version: 1.0.0
 * Author: SébastienJ
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function portfolio_explorer_register_block() {
    register_block_type( __DIR__ );
}
add_action( 'init', 'portfolio_explorer_register_block' );

require_once __DIR__ . '/includes/rest.php';
