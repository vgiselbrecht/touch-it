<?php
header("Content-Type: text/html; charset=utf-8");
$lang = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"],0,2);
$webcamText;
$errorbrowserText;
$descText;
switch ($lang) {
    case 'de':
        $webcamText = "Sie müssen Ihre Webcam aktivieren!";
        $errorbrowserText = "Ihr Browser ist für dieses Spiel nicht geeignet!<br>Es wird die neuste Version von Firefox oder Chrome benötigt!";
        $descText = "Berühren Sie so schnell wie möglich die richtige Farbe! Dieses Spiel funktioniert über die Gestensteuerung mit Ihren Händen.";
        break;
    default:
        $webcamText = "You need to enable your webcam!";
        $errorbrowserText = "Your browser is not suitable for this game!<br>You need the latest version of Firefox or Chrome!";
        $descText = "Touch as soon as possible the right color! This game works over the gesture control with your hands.";
        //$descText = "Berühren Sie so schnell wie möglich die richtige Farbe! Dieses Spiel funktioniert über die Gestensteuerung mit Ihren Händen.";
        break;
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="description" content="<?php echo $descText ?>">
        <meta name="keywords" content="TouchIt, gise, gesten, motion, js, webrtc">
        <meta name="author" content="Valentin Giselbrecht">
        <meta property="og:title" content="TouchIt [Beta]" >
        <meta property="og:description" content="<?php echo $descText ?>" >
        <meta property="og:url" content="http://touchit.gise.at" >
        <meta property="og:image" content="http://touchit.gise.at/images/og.png" >
        <meta name="twitter:card" content="summary">
        <meta name="twitter:url" content="http://touchit.gise.at">
        <meta name="twitter:title" content="TouchIt [Beta]">
        <meta name="twitter:description" content="<?php echo $descText ?>">
        <meta name="twitter:image" content="http://touchit.gise.at/images/og.png">
        <meta name="twitter:site" content="@vgiselbrecht">
        <meta name="twitter:creator" content="@vgiselbrecht">
        <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="styles/game.css"/>
        <link id="favicon" rel="icon" type="image/ico" sizes="16x16" href="images/favicon.ico">
        <link id="favicon2x" rel="icon" type="image/png" sizes="32x32" href="images/icon.png">
        <title>TouchIt [Beta]</title>
    </head>
    <body>
        <div id="content">
            <video id="webcam" autoplay width="640" height="480"></video>
            <canvas id="canvas-source" width="640" height="480"></canvas>
            <canvas id="canvas-highlights" width="640" height="480"></canvas>
            <canvas id="canvas-blended" width="640" height="480"></canvas>
            <div id="hotSpots">
                <div id="greenArea" class="standardArea"></div>
                <div id="redArea" class="standardArea"></div>
                <div id="blueArea" class="standardArea"></div>
                <div id="orangeArea" class="standardArea"></div>
            </div>
        </div>
        <div id="textArea">Game starts!</div>
        <div id="scoreArea">Time: 10 |Score: 0 | Best: 0</div>
        <div class="loading">Loading Webcam...</div>
        <div class="introduction"><?php echo $webcamText; ?></div>
        <div class="browsers"><?php echo $errorbrowserText; ?></div>
        <div id="infoArea">
            <div class="infoIcon">
                <a title="Facebook" target="_blank" href="http://www.facebook.com/sharer.php?u=http://touchit.gise.at"><img style="border:0" alt="" src="images/facebook.png"></a>
            </div>
            <div class="infoIcon">
                <a title="Twitter" target="_blank" href="http://twitter.com/home?status=TouchIt+http://touchit.gise.at"><img style="border:0" alt="" src="images/twitter.png"></a>
            </div>
            <div class="infoIcon">
                <a title="Impressum" target="_blank" href="http://www.gise.at/impressum.html"><img alt="" style="border:0" src="images/info.png"></a>
            </div>
        </div>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script src="js/app.js"></script>
        <script src="js/game.js"></script>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-41250578-1', 'gise.at');
            ga('send', 'pageview');

        </script>
    </body>
</html>