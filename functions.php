<?php
function my_theme_disable_all_styles() {
    // Отключаем все встроенные стили
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('global-styles');
    wp_dequeue_style('comment-reply');
    wp_deregister_style('dashicons');
}
add_action('wp_enqueue_scripts', 'my_theme_disable_all_styles', 100);

function my_theme_disable_content_filters() {
    remove_filter('the_content', 'wpautop'); // Отключаем автоматическое добавление тегов <p> и <br>
    remove_filter('the_content', 'wptexturize'); // Отключаем замену символов
}
add_action('wp_loaded', 'my_theme_disable_content_filters');

function my_theme_disable_admin_bar() {
    // Отключаем панель администратора для всех пользователей
    show_admin_bar(false);
}
add_action('after_setup_theme', 'my_theme_disable_admin_bar');

function landing_theme_scripts() {
    // Подключение стилей
    wp_enqueue_style('main-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style('owl-carousel', get_template_directory_uri() . '/css/owl.carousel.min.css');
    wp_enqueue_style('loading-bar', get_template_directory_uri() . '/css/loading-bar.css');

    // Подключение скриптов
    wp_enqueue_script('jquery', get_template_directory_uri() . '/js/jquery-3.7.1.min.js', array(), null, true);
    wp_enqueue_script('owl-carousel', get_template_directory_uri() . '/js/owl.carousel.min.js', array('jquery'), null, true);
    wp_enqueue_script('main-script', get_template_directory_uri() . '/app.js', array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'landing_theme_scripts');

function custom_footer_scripts() {
    ?>
    <script type="text/javascript">
            const footer = document.getElementById('footer');

          const wrapper = document.getElementById('wrapper');

          if (footer && wrapper) {
              wrapper.appendChild(footer);
          }

            console.log("Страница полностью загружена!");
    </script>
    <?php
}
add_action('wp_footer', 'custom_footer_scripts');

function my_custom_assets() {
    if (is_page_template('privacy-policy.php')) {
        wp_enqueue_script('my-custom-script', get_template_directory_uri() . '/js/appPolicy.js', array('jquery'), null, true);
        wp_dequeue_script('main-script');
        wp_dequeue_script('jquery');
        wp_dequeue_script('owl-carousel');
    }
}
add_action('wp_enqueue_scripts', 'my_custom_assets');



function enqueue_ajax_script() {
    wp_enqueue_script('ajax-script', get_template_directory_uri() . '/app.js', array('jquery'), null, true);
    
    // Передаем переменные в скрипт
    wp_localize_script('ajax-script', 'my_ajax_params', array(
        'ajaxurl' => admin_url('admin-ajax.php')
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_ajax_script');

function handle_custom_email() {
    if (isset($_POST['name']) && isset($_POST['tel']) && isset($_POST['operation'])) {
        
        $name = sanitize_text_field($_POST['name']);
        $tel = sanitize_text_field($_POST['tel']);
        $operation = sanitize_text_field($_POST['operation']);

        $to = "drkarakh.ru@drkarakhanyan.ru"; // Замените на свой email
        $subject = "Новое сообщение от $name";
        
        $body = "Имя: $name\n";
        $body .= "Телефон: $tel\n";
        $body .= "Операция: $operation\n";

        $headers = "From: no-reply@drkarakhanyan.ru\r\n";
        $headers .= "Reply-To: no-reply@drkarakhanyan.ru\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        if (mail($to, $subject, $body, $headers)) {
            echo "Сообщение успешно отправлено!";
        } else {
            echo "Ошибка при отправке сообщения.";
        }
    } else {
        echo "Все поля обязательны для заполнения.";
    }
    wp_die(); // Завершает выполнение запроса
}
add_action('wp_ajax_send_custom_email', 'handle_custom_email');
add_action('wp_ajax_nopriv_send_custom_email', 'handle_custom_email');

function redirect_index_to_main() {
    if ($_SERVER['REQUEST_URI'] == 'drkarakhanyan.ru') {
        wp_redirect('/main-page', 301);
        exit;
    }
}
add_action('init', 'redirect_index_to_main');

function add_favicon() {
    echo '<link rel="shortcut icon" href="' . get_template_directory_uri() . '/favicon-32.ico" />';
}
add_action('wp_head', 'add_favicon');

add_filter('show_admin_bar', '__return_false');
?>