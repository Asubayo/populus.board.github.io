/*!
 *
 * Jquery Mapael - Dynamic maps jQuery plugin (based on raphael.js)
 * Requires jQuery and Mapael >=2.0.0
 *
 * Map of map_simonniere_pond
 * 
 * @author YA
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
            maps :  {
                map_simonniere_pond : {
                    width : 210,
                    height : 297,
                    getCoords : function (lat, lon) {
                        // todo
                        return {"x" : lon, "y" : lat};
                    },
                    'elems': {
                        "path61" : "m 145.73,90.76 c -7.05,-5.21 -23.03,-17 -35.5,-26.2 l -22.67,-16.73 0.79,-1.65 c 0.43,-0.91 0.89,-1.62 1.01,-1.59 0.24,0.06 70.31,52.03 70.87,52.56 0.26,0.25 0.13,0.6 -0.6,1.7 -0.51,0.76 -0.96,1.38 -1,1.38 -0.04,0 -5.84,-4.26 -12.89,-9.47 z",
                        "path57" : "m 153.82,205.18 c -3.03,-1.58 -4.31,-2.94 -5.93,-6.27 -0.96,-1.96 -0.97,-2.02 -0.97,-5.29 5.3e-4,-2.47 0.11,-3.58 0.44,-4.38 l 0.44,-1.07 -12.43,-6.2 c -6.84,-3.41 -12.54,-6.33 -12.67,-6.48 -0.15,-0.17 4.02,-8.53 11.15,-22.36 6.26,-12.14 15.08,-29.44 19.58,-38.44 6.54,-13.05 8.28,-16.33 8.61,-16.2 1.33,0.51 20.74,11.74 21.47,12.42 1.07,0.99 1.77,2.31 2.01,3.74 0.17,1.04 -1.71,24.37 -2.25,27.91 -0.34,2.25 -1.08,4.5 -2.63,8.07 -0.7,1.6 -2.34,5.47 -3.65,8.6 -3.97,9.48 -20.13,46.91 -20.35,47.13 -0.11,0.11 -1.39,-0.42 -2.83,-1.17 z",
                        "path53" : "m 65.98,190.86 c -20.5,-11.12 -37.43,-20.38 -37.62,-20.57 -0.28,-0.29 0.14,-0.99 2.36,-3.94 5.64,-7.51 5.94,-7.78 12.69,-11.55 1.27,-0.71 3.09,-1.94 4.04,-2.73 1.58,-1.32 1.88,-1.75 3.67,-5.27 1.07,-2.11 5.7,-11.93 10.29,-21.83 4.59,-9.9 10.69,-22.87 13.56,-28.84 2.87,-5.97 5.49,-11.7 5.84,-12.75 0.34,-1.05 0.93,-3.84 1.3,-6.22 0.37,-2.37 0.86,-5.45 1.08,-6.83 0.22,-1.38 0.8,-4.3 1.3,-6.48 0.49,-2.18 1.14,-5.25 1.44,-6.83 0.63,-3.28 0.85,-3.77 2.58,-5.69 l 1.27,-1.4 34.13,25.16 c 18.77,13.84 34.41,25.47 34.74,25.84 0.36,0.4 0.55,0.85 0.45,1.11 -0.33,0.88 -55.26,108.39 -55.55,108.71 -0.23,0.25 -8.7,-4.23 -37.57,-19.89 z",
                        "path49" : "m 119.92,220.58 c -7.99,-4.37 -14.8,-8.12 -15.13,-8.33 -0.59,-0.38 -0.57,-0.42 8.29,-18.17 4.89,-9.78 8.92,-17.82 8.95,-17.86 0.09,-0.1 24.75,12.05 24.75,12.19 0,0.06 -0.23,0.64 -0.5,1.27 -0.28,0.64 -0.71,2.09 -0.96,3.23 -0.77,3.53 0.05,6.31 2.82,9.53 1.36,1.58 2.11,2.16 4.51,3.51 1.58,0.88 3,1.73 3.15,1.88 0.19,0.19 -0.62,2.06 -2.65,6.11 l -2.92,5.84 -2.59,1.83 c -2.99,2.11 -9.08,5.38 -11.15,5.99 -0.78,0.23 -1.56,0.53 -1.74,0.67 -0.22,0.18 -4.69,-2.13 -14.85,-7.69 z",
                        "path47" : "m 68.31,106.51 c 0.54,-1.2 2.36,-4.77 4.04,-7.94 3.55,-6.68 6.51,-13.42 7.26,-16.52 0.29,-1.2 1,-5.3 1.58,-9.13 0.94,-6.15 2.44,-12.78 4.38,-19.31 0.07,-0.25 0.72,-1.25 1.43,-2.22 l 1.3,-1.78 -0.66,-0.52 c -0.36,-0.29 -0.7,-0.48 -0.74,-0.42 -0.04,0.05 -0.99,1.76 -2.1,3.8 -3.03,5.57 -4.6,10.66 -5.48,17.73 -0.98,7.98 -1.51,10.62 -2.8,14.02 -1.2,3.18 -3.6,7.98 -5.36,10.72 -0.51,0.8 -2.1,4.02 -3.52,7.14 l -2.59,5.69 0.99,0.46 c 0.54,0.25 1.06,0.46 1.14,0.46 0.08,0 0.6,-0.98 1.13,-2.18 z",
                        "path45" : "m 28.18,167.56 c 0.73,-0.87 2.14,-2.72 3.12,-4.1 2.43,-3.43 4.93,-5.94 6.88,-6.93 3.41,-1.73 7.75,-4.51 8.92,-5.7 1.49,-1.53 3.41,-5.15 8.16,-15.41 3.97,-8.58 11.63,-25.64 11.63,-25.92 0,-0.22 -2.07,-0.94 -2.22,-0.78 -0.05,0.06 -3.64,8 -7.97,17.63 -7.45,16.58 -8,17.71 -10.21,20.93 l -2.34,3.41 -4.18,2.35 c -3.62,2.04 -4.47,2.65 -6.4,4.6 -2.47,2.5 -9.02,10.02 -9.02,10.35 0,0.33 1.95,1.57 2.13,1.35 0.09,-0.11 0.76,-0.91 1.5,-1.78 z",
                        "path43" : "m 133.05,230.55 c 0.34,-0.65 0.57,-1.23 0.5,-1.28 -0.21,-0.18 -109.44,-59.43 -109.88,-59.6 -0.29,-0.11 -0.58,0.16 -0.98,0.95 -0.31,0.61 -0.49,1.18 -0.4,1.27 0.33,0.33 109.56,59.84 109.84,59.84 0.16,0 0.57,-0.52 0.92,-1.17 z"
                    }
                }
            }
        }
    );

    return Mapael;

}));