<?php
if ( isset( $_GET['n'], $_GET['email'], $_GET['gender'], $_GET['phone'], $_GET['uid'] ) ) {

    $source = 'KT';
    $email= $_GET['email'];
    $gender= $_GET['gender'];
    $name = $_GET['n'];
    $uid= $_GET['uid'];

    if ( isset( $_GET['source'] ) ) {
        $source = $_GET['source'];
    }

    $phone = $_GET['phone'];
    $convertedPhone = preg_replace('/\s+/', '', $phone);

    $domain = 'https://cashkustaging.page.link/?link=https%3A//cashkustaging.page.link/kt?';
    $encodeParams = urlencode("name={$name}&gender={$gender}&email={$email}&phone={$convertedPhone}&uid={$uid}&source={$source}");
    $reference = "com.advisonomics.demo";
    $refParams = "&apn={$reference}&isi=123456789&ibi={$reference}";

    $newUrl = $domain . $encodeParams . $refParams;

    $newUrl = preg_replace('/\+/', '%2B', $newUrl);

    echo $newUrl;

} else {
    echo "https://cashku.page.link/kt";
}

?>
