<?php
$content = '';
foreach ($_POST as $key => $value) {
	if($value){
		$content .= "<b>$key</b>: <i>$value</i>\n"
	}
}
if(trim($content)){
	$content = "<b>Message form Site:</b>\n".$content;
	$apiToken = "6490922494:AAE0Rg8r-n5A-D5cPu51rPZrB4wwb-5n6cc";
	$data = [
		'chat_id' => '@SpiderOlegB',
		'text' => $content,
		'parse_mode' => 'HTML'
	];
	$response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?".http_build_query($data))
}
?>