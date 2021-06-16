<!doctype html>
<html>
    <link rel="stylesheet" href="public/css/view_template.css">

    <head>
        <meta charset="utf-8"/>
        <!--<link rel="stylesheet" href="Contenu/style.css" />-->
        <title><?= $titre ?></title>
    </head>
    <body>
        <table width = "100%"  height = "100%">
            <tr class="tabtr" width = "100%" height = "7%">
                <td class="tabtd" width = "10%" style=" text-align: center; margin:0; padding:0;">
                    <button class="tablink" onclick="location.href='index.php?route=home';" style="width:100%;">Home</button>
                </td>
                <td class="tabtd" width = "45%" style=" text-align: center; margin:0; padding:0;">
                    <button class="tablink" onclick="location.href='index.php?route=fondreau';" style="width:100%;">Fondreau</button>
                </td>
                <td class="tabtd" width = "45%" style=" text-align: center; margin:0; padding:0;">
                    <button class="tablink" onclick="location.href='index.php?route=simonniere';" style="width:100%;">Simonnière</button>
                </td>
            </tr>
            <tr width = "100%" height = "93%">
                <td colspan = "3">
                    <?= $content ?>
                </td>
            </tr>
        </table>
    </body>
</html>