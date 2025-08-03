<?php
/**
 * Plugin Name: Portfolio RML REST
 * Description: Expose Real Media Library tree via REST API.
 */

// Register custom REST route
function portfolio_rml_register_rest() {
    register_rest_route('portfolio/v1', '/tree', array(
        'methods'  => 'GET',
        'callback' => 'portfolio_rml_get_tree',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'portfolio_rml_register_rest');

// Build folder tree recursively using Real Media Library taxonomy.
function portfolio_rml_build_tree($parent_id = 0) {
    $terms = get_terms(array(
        'taxonomy'   => 'rml_folder',
        'hide_empty' => false,
        'parent'     => $parent_id,
        'orderby'    => 'name',
        'order'      => 'ASC',
    ));

    $tree = array();

    foreach ($terms as $term) {
        // Get attachments for this folder
        $attachments = get_posts(array(
            'post_type'      => 'attachment',
            'post_status'    => 'inherit',
            'numberposts'    => -1,
            'tax_query'      => array(
                array(
                    'taxonomy' => 'rml_folder',
                    'field'    => 'term_id',
                    'terms'    => $term->term_id,
                )
            ),
        ));

        $images = array();
        foreach ($attachments as $att) {
            $images[] = array(
                'id'    => $att->ID,
                'title' => get_the_title($att->ID),
                'url'   => wp_get_attachment_url($att->ID),
                'thumb' => wp_get_attachment_image_url($att->ID, 'medium'),
            );
        }

        $tree[] = array(
            'id'       => $term->term_id,
            'name'     => $term->name,
            'children' => portfolio_rml_build_tree($term->term_id),
            'images'   => $images,
        );
    }

    return $tree;
}

function portfolio_rml_get_tree($request) {
    $tree = portfolio_rml_build_tree();
    return rest_ensure_response($tree);
}
