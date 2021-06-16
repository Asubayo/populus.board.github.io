/*!
 *
 * Jquery Mapael - Dynamic maps jQuery plugin (based on raphael.js)
 * Requires jQuery and Mapael
 *
 * Map of metropolitan France by department
 * Equirectangular projection
 *
 * @author Vincent Brouté
 * @source http://fr.m.wikipedia.org/wiki/Fichier:France_location_map-Departements.svg
 *
 * @deprecated : this map will be definitely moved to 'mapael-maps' repository starting from the next major release (3.0.0).
 * You can use instead https://github.com/neveldo/mapael-maps/blob/master/france/france_departments.js
 */
(function (factory) {
    if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(require('jquery'), require('jquery-mapael'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'mapael'], factory);
    } else {
        // Browser globals
        factory(jQuery, jQuery.mapael);
    }
}(function ($, Mapael) {

    "use strict";
    
    $.extend(true, Mapael, 
        {
            maps : {
                fondreau : {
                    width : 946, 
                    height : 796,
                    elems : {
                        "path104" : "m 259.30967,214.75 c 3.36106,-14.85242 4.65945,-18.46626 15.09662,-42.01891 l 11.41928,-25.76891 -39.66278,-23.60038 c -21.81454,-12.9802 -40.23276,-24.132737 -40.9294,-24.783406 -1.02148,-0.954084 -0.96843,-4.43745 0.27411,-17.999209 0.90701,-9.899648 1.17601,-17.281564 0.65402,-17.947679 C 205.67384,62.009178 195.39388,49.04715 183.31715,33.827001 L 161.35945,6.1540014 112.92973,50.658966 c -26.636353,24.47773 -48.737627,44.80558 -49.113946,45.172999 -0.376318,0.367419 7.273682,9.305505 17,19.862415 16.137697,17.51579 20.570126,21.56671 50.684216,46.32163 24.32847,19.99893 35.10219,28.21188 41,31.25485 9.92395,5.12025 80.60446,37.5498 82.06617,37.6535 0.5864,0.0416 2.72097,-7.23686 4.7435,-16.17436 z",
                        "path102" : "m 411.4728,251.06068 c 17.48888,-39.01662 31.77905,-71.26576 31.75594,-71.66475 -0.0575,-0.99294 -122.5048,-70.39242 -123.61997,-70.06414 -0.49018,0.1443 -10.64832,24.81719 -22.57365,54.82863 l -21.68241,54.56627 29.91289,22.87654 c 16.45208,12.5821 30.09474,23.17079 30.31701,23.53043 0.22227,0.35964 -2.50039,7.25862 -6.05035,15.33106 l -6.45448,14.67716 18.21111,8.67392 C 351.305,308.58645 363.775,314.59791 369,317.17459 c 5.225,2.57669 9.76434,4.7165 10.08742,4.75515 0.32308,0.0386 14.8965,-31.85243 32.38538,-70.86906 z",
                        "path100" : "m 304.23222,321.71286 c 8.10272,-14.45251 15.15827,-26.7128 15.67899,-27.24508 0.52072,-0.53228 3.68091,-7.22388 7.02264,-14.87023 5.63266,-12.88832 5.94786,-13.99301 4.32101,-15.14399 -0.96517,-0.68285 -13.85762,-10.52399 -28.64988,-21.86919 -14.79227,-11.34521 -27.05259,-20.47009 -27.24516,-20.27752 -0.40015,0.40015 -31.18936,97.20591 -31.59441,99.33742 -0.16899,0.8893 7.72661,5.90848 21.73459,13.81652 12.1,6.83092 22.45,12.4445 23,12.47462 0.55,0.0301 7.6295,-11.77003 15.73222,-26.22255 z",
						"path98" : "m 500.98704,426 c 7.26268,-17.325 13.41444,-32.00935 13.67058,-32.63189 0.9314,-2.26373 -40.14917,-23.27499 -115.43684,-59.04185 -42.19643,-20.04623 -77.07603,-36.53287 -77.51022,-36.63698 -0.43419,-0.1041 -7.34681,11.4381 -15.36138,25.64933 -10.01758,17.76292 -14.24935,26.16122 -13.53977,26.8708 2.22873,2.22873 193.73023,108.64584 194.33168,107.98983 0.35259,-0.38458 6.58327,-14.87424 13.84595,-32.19924 z",
						"path96" : "m 358.541,429.92145 c 8.7849,-16.82833 15.31802,-30.44889 14.83045,-30.91925 -0.4793,-0.4624 -30.08894,-17.16333 -65.79921,-37.1132 -53.19625,-29.71856 -65.09721,-36.00385 -65.86554,-34.7858 -0.51577,0.81767 -7.34565,18.79145 -15.17749,39.94174 -12.23322,33.03639 -14.01353,38.56583 -12.63447,39.24116 0.88289,0.43236 30.18026,12.65261 65.10526,27.15611 34.925,14.50351 63.5763,26.41227 63.66955,26.4639 0.0933,0.0516 7.2354,-13.44146 15.87145,-29.98466 z",
						"path94" : "M 768,504.24021 786.5,449.5 h 41.96299 41.96299 l 6.12047,-29 c 3.36626,-15.95 5.99419,-29.16373 5.83984,-29.36384 -0.15434,-0.20011 -7.77622,-1.21676 -16.9375,-2.25923 l -16.65686,-1.89539 -120.14597,7.07868 c -117.91933,6.9475 -120.70595,7.06587 -150.36204,6.38706 -29.0294,-0.66447 -30.7967,-0.8187 -45,-3.92717 -8.13116,-1.77954 -15.09471,-2.96206 -15.47455,-2.62782 -1.07574,0.94657 -27.90538,65.34504 -27.42439,65.82602 0.23493,0.23493 21.94389,2.20389 48.24212,4.37546 26.29824,2.17157 48.15215,4.28548 48.56425,4.69758 0.41209,0.41209 -8.44199,18.29012 -19.67575,39.72895 -11.24723,21.46456 -19.93739,39.14902 -19.33983,39.35652 0.95786,0.33262 187.14962,10.70315 197.32423,10.99059 l 4,0.113 z",
						"path92" : "m 167.65597,521 c 8.59932,-21.4361 21.82191,-57.11517 29.83314,-80.5 7.91365,-23.1 20.75702,-59.1 28.5408,-80 12.2958,-33.01504 45.40732,-133.29941 46.38978,-140.5 0.44539,-3.26433 43.16257,-110.58488 45.57485,-114.5 1.01663,-1.65 8.1068,-16.541328 15.75592,-33.091841 l 13.9075,-30.091841 -3.76172,-3.158159 C 341.82729,37.421172 339.7216,36 339.21692,36 c -0.86605,0 -36.16101,77.94182 -61.58587,136 -10.61824,24.24697 -11.94162,27.96061 -15.56555,43.67963 -2.17836,9.44879 -4.46146,17.99879 -5.07356,19 -0.6121,1.0012 -27.10783,74.27037 -58.8794,162.82037 l -57.7665,161 3.07698,0.64048 c 1.69234,0.35227 4.36202,0.57727 5.93263,0.5 2.80169,-0.13783 3.14746,-0.86791 18.30032,-38.64048 z",
						"path90" : "m 717.85055,642.53379 c 16.58579,-43.37333 29.93381,-79.08276 29.66228,-79.3543 -0.27154,-0.27153 -45.84126,-2.92626 -101.26605,-5.89938 -55.4248,-2.97313 -101.11101,-5.74434 -101.52492,-6.15825 -0.4139,-0.4139 8.44497,-18.29691 19.68639,-39.74002 l 20.43895,-38.98746 -3.72641,-0.74021 c -2.04953,-0.40711 -23.57217,-2.33196 -47.8281,-4.27744 L 489.191,463.83949 450.29269,442.07045 c -65.31576,-36.5533 -72.43633,-40.4738 -72.77297,-40.06785 -0.17869,0.21548 -7.41039,14.00424 -16.07045,30.64168 -8.66005,16.63745 -16.08408,30.45912 -16.49783,30.71484 -0.41375,0.25571 -30.40836,-11.80731 -66.65467,-26.80671 l -65.90239,-27.27164 -11.66469,34.0568 c -10.6406,31.06686 -11.51853,34.17046 -10,35.3513 0.91558,0.71197 22.78661,14.21197 48.60228,30 l 46.93759,28.70551 22.06241,29.51829 c 16.15153,21.60986 23.26105,32.00157 26.53633,38.78715 3.07861,6.37813 5.1058,9.40965 6.5,9.7203 1.11434,0.24829 42.31264,7.43324 91.55176,15.96655 l 89.52568,15.51512 82.47432,37.33019 c 45.36088,20.5316 82.54186,37.29243 82.62442,37.24629 0.0826,-0.0461 13.72028,-35.57116 30.30607,-78.94448 z",
						"path88" : "m 808.45805,782.3305 4.95806,-1.86199 14.8021,-33.96496 14.80209,-33.96495 6.98928,-36.01932 c 3.84409,-19.81062 12.15492,-65.88662 18.46849,-102.39112 6.31358,-36.5045 11.99394,-66.992 12.62302,-67.75 0.77903,-0.93867 3.45248,-1.37819 8.38304,-1.37819 5.90663,0 8.45719,0.55224 13.8556,3 3.63899,1.65 7.00798,3 7.48662,3 0.47865,0 1.55534,-1.74403 2.39266,-3.87562 l 1.52238,-3.87562 -6.41648,-2.63505 C 903.30599,498.55259 887,487.75911 887,486.49803 c 0,-0.1428 7.17008,-43.62578 15.9335,-96.62883 8.76343,-53.00306 16.07593,-97.69526 16.25,-99.316 0.31587,-2.94092 0.30153,-2.94914 -7.1835,-4.11991 -4.125,-0.64521 -7.69653,-0.99762 -7.93673,-0.78314 -0.2402,0.21449 -4.13431,23.35799 -8.65358,51.43002 -4.51926,28.07203 -8.69358,52.2505 -9.27625,53.72994 -2.76552,7.02185 -13.97034,67.40348 -33.62804,181.2181 l -21.50812,124.52821 -10.32329,28.47179 c -5.67781,15.65948 -10.81283,29.38116 -11.41117,30.4926 -0.59833,1.11145 -5.58657,9.29764 -11.08498,18.19153 l -9.99711,16.17072 7.65963,-2.84527 c 4.2128,-1.5649 9.89076,-3.68317 12.61769,-4.70726 z",
						"path86" : "m 789.93267,782.25 c 2.9598,-4.8125 8.02375,-13.06111 11.25323,-18.33024 4.73441,-7.72455 7.89918,-15.17488 16.33848,-38.46325 L 827.99109,696.57349 849.0415,575.16603 C 860.61922,508.39192 869.95872,453.63696 869.79595,453.48834 869.63318,453.33971 851.275,452.90014 829,452.51151 l -40.5,-0.7066 -17.88508,53.34754 c -9.8368,29.34115 -18.46986,54.29928 -19.18458,55.46251 -1.21396,1.97577 -60.87168,157.21997 -61.59773,160.29262 -0.31549,1.33513 91.32202,69.80491 93.693,70.00561 0.56409,0.0477 3.44726,-3.85069 6.40706,-8.66319 z"
					}
                }
            }
        }
    );

    return Mapael;

}));