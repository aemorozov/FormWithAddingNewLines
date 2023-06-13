<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

# проверка, что ошибки нет
if (!error_get_last()) {

    // Переменные, которые отправляет пользователь
    $name = $_POST['name'] ;
    $email = $_POST['email'];
    $tel = $_POST['tel'] ;
    $text = $_POST['text'];
    // $color = $_POST['color'] ;
    // $size = $_POST['size'] ;
    // $article = $_POST['article'] ;
    // $file = $_FILES['myfile'];


    // Формирование самого письма
    $title = "Заявка с сайта";
    $body = "
    <h2>Новая заявка</h2>
    <b>Имя:</b> $name<br>
    <b>Email:</b> $email<br>
    <b>Телефон:</b> $tel<br><br>
    <b>Сообщение:</b><br><br>$text
    ";
    
    // Настройки PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['data']['debug'][] = $str;};
    
    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'leafspb'; // Логин на почте
    $mail->Password   = 'gpukhtuodbvzfofl'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('admin@test.aemorozov.com', 'Форма обратной связи на сайте'); // Адрес самой почты и имя отправителя
    
    // Получатель письма
    $mail->addAddress('leafspb@gmail.com');  
    
    // Прикрипление файлов к письму
    if (!empty($file['name'][0])) {
        for ($i = 0; $i < count($file['tmp_name']); $i++) {
            if ($file['error'][$i] === 0) 
                $mail->addAttachment($file['tmp_name'][$i], $file['name'][$i]);
        }
    }
    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;    
    
    // Проверяем отправленность сообщения
    if ($mail->send()) {
        $data['result'] = "success";
        $data['info'] = "Сообщение успешно отправлено!";
    } else {
        $data['result'] = "error";
        $data['info'] = "Сообщение не было отправлено. Ошибка при отправке письма";
        $data['desc'] = "Причина ошибки: {$mail->ErrorInfo}";
    }
    
} else {
    $data['result'] = "error";
    $data['info'] = "В коде присутствует ошибка";
    $data['desc'] = error_get_last();
}

// Отправка результата
header('Content-Type: application/json');
echo json_encode($data);

?>