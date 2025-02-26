<?php
// Проверяем, что форма была отправлена методом POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = htmlspecialchars($_POST['name']); // Имя
    $tel = htmlspecialchars($_POST['tel']); // Телефон
    $operation = htmlspecialchars($_POST['operation']); // Операция

    // Адрес получателя (ваш почтовый ящик)
    $to = "drkarakh.ru@drkarakhanyan.ru";

    // Тема письма
    $subject = "Новая заявка с сайта drkarakhanyan.ru";

    // Тело письма
    $message = "Имя: $name\n";
    $message .= "Телефон: $tel\n";
    $message .= "Операция: $operation\n";

    // Заголовки письма
    $headers = "From: no-reply@drkarakhanyan.ru\r\n"; // От кого (ваш доменный email)
    $headers .= "Reply-To: no-reply@drkarakhanyan.ru\r\n"; // Адрес для ответа
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n"; // Кодировка

    // Отправка письма
    if (mail($to, $subject, $message, $headers)) {
        echo "Письмо успешно отправлено!";
    } else {
        echo "Ошибка при отправке письма.";
    }
} else {
    echo "Данные не были отправлены.";
}
?>