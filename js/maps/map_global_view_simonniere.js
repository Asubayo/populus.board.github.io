/*!
 *
 * Jquery Mapael - Dynamic maps jQuery plugin (based on raphael.js)
 * Requires jQuery and Mapael >=2.0.0
 *
 * Map of global_view_simonniere
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
                global_view_simonniere : {
                    width : 611,
                    height : 773,
                    getCoords : function (lat, lon) {
                        // todo
                        return {"x" : lon, "y" : lat};
                    },
                    'elems': {
                        "path_simonniere" : "m 483.22,152.98 c -21.08,-16.51 -21.14,-16.56 -21.75,-21.06 -0.34,-2.48 -0.91,-6.64 -1.26,-9.25 -0.65,-4.77 -3.5,-8.6 -9.11,-12.27 -2.25,-1.47 -2.12,-1.69 22.86,-36.98 13.82,-19.53 25.65,-36.06 26.29,-36.74 0.91,-0.96 9.47,5.27 38.91,28.35 l 37.75,29.59 -18,18.65 c -9.9,10.26 -26.22,27.11 -36.27,37.45 l -18.27,18.81 z",
                        "path_road" : "m 60.17,665.32 -3.19,-3.23 4.69,-5.49 c 2.58,-3.02 7.61,-7.41 11.19,-9.76 3.58,-2.35 8.13,-5.76 10.13,-7.59 5.81,-5.32 21.48,-31.7 29.9,-50.32 4.23,-9.35 11.11,-23.82 15.29,-32.17 8.49,-16.92 13.05,-32.24 13.97,-46.83 0.56,-8.89 2.78,-14.87 9.47,-25.54 3.41,-5.43 56.21,-94.62 61.14,-103.27 0.88,-1.55 14.88,-15.01 31.1,-29.92 27.5,-25.27 29.52,-27.36 29.8,-30.8 0.27,-3.34 -0.2,-4.14 -5,-8.47 -2.92,-2.63 -12.5,-10.21 -21.3,-16.86 -16.99,-12.83 -42.7,-37.26 -50.38,-47.87 -9.31,-12.86 -24.44,-37.43 -30.59,-49.71 -3.6,-7.19 -7.09,-13.07 -7.75,-13.07 -2.55,0 -22.21,23.55 -34.92,41.83 -12.24,17.61 -31.07,52.21 -69.36,127.47 -15.4,30.27 -28.45,54.94 -29,54.83 -0.59,-0.12 -0.87,-3.11 -0.69,-7.28 0.3,-7.04 0.46,-7.4 25.34,-57.14 23.73,-47.45 48.86,-93.9 63.96,-118.21 3.76,-6.05 14.09,-19.76 22.95,-30.47 8.86,-10.71 16.79,-20.77 17.62,-22.37 1.89,-3.65 1.38,-6.4 -3.57,-19.37 -2.14,-5.62 -4.45,-12.59 -5.13,-15.5 -1.91,-8.14 -10.49,-29.53 -14.8,-36.88 -7.25,-12.37 -18.61,-27.39 -27.15,-35.91 -4.69,-4.68 -17.61,-15.6 -28.7,-24.28 l -20.17,-15.78 -1.1,-5.14 c -0.61,-2.83 -0.73,-5.51 -0.28,-5.96 0.45,-0.45 14.3,10.38 30.78,24.06 l 29.96,24.89 10.62,14.36 c 15.66,21.18 18.61,26.91 28.33,55.18 4.67,13.59 8.99,25.63 9.59,26.75 0.82,1.54 1.9,1.96 4.38,1.73 3,-0.28 6.71,-4.34 41.34,-45.31 l 38.05,-45 16.84,-12.61 c 9.26,-6.94 21.12,-15.56 26.34,-19.16 5.23,-3.6 15.97,-11.54 23.89,-17.64 l 14.39,-11.09 h 7.3 7.3 l 0.31,3.39 c 0.28,3.12 4.81,7.34 55.31,51.61 30.25,26.52 56.13,49.32 57.5,50.66 l 2.5,2.45 -2.86,2.49 c -2.5,2.17 -3.08,2.31 -4.5,1.1 -0.9,-0.77 -25.04,-21.85 -53.64,-46.84 -28.6,-25 -53.35,-46.41 -55,-47.6 -4.75,-3.4 -12.92,-5.66 -16.26,-4.5 -2.19,0.76 -53.46,36.95 -67.49,47.63 -3.49,2.66 -31.04,35.24 -59.01,69.8 -25.48,31.48 -25.03,30.87 -27.27,37.37 l -1.75,5.08 2.76,6.92 c 3.93,9.86 8.36,18.41 16.49,31.88 12.13,20.08 21.61,31.41 39.02,46.63 12.83,11.22 45.83,35.99 49.24,36.97 3.86,1.11 9.81,1.19 11.37,0.17 0.61,-0.4 16.37,-21.66 35.02,-47.23 40.57,-55.64 53.92,-72.04 65.6,-80.64 11.38,-8.38 12.43,-8.87 13.73,-6.44 0.57,1.07 1.04,2.41 1.04,2.98 0,0.57 -3.94,4.1 -8.75,7.84 -12.92,10.05 -19.33,17.38 -36.48,41.76 -8.51,12.1 -25.72,36.14 -38.25,53.43 -12.52,17.28 -23.42,32.98 -24.22,34.88 -1.13,2.7 -1.2,4.05 -0.31,6.19 1.23,2.97 79.59,79.68 85.48,83.68 7.82,5.32 22.91,11.51 41.03,16.85 10.45,3.08 21.03,6.29 23.5,7.14 2.48,0.85 12.15,4.14 21.5,7.31 9.35,3.17 32.77,11.64 52.05,18.82 32.58,12.15 36.35,13.32 53.43,16.62 10.11,1.95 18.78,3.95 19.26,4.43 1.04,1.04 -6.91,7.18 -9.2,7.09 -0.85,-0.03 -3.8,-0.48 -6.55,-0.99 -2.75,-0.51 -9.05,-1.36 -14,-1.89 -10.51,-1.12 -16.82,-3.29 -55.5,-19.07 -15.13,-6.17 -34.08,-13.6 -42.13,-16.52 -8.05,-2.91 -16.08,-6.05 -17.85,-6.96 -1.77,-0.91 -10.08,-3.39 -18.47,-5.5 -21.32,-5.36 -39.21,-11.5 -46.4,-15.92 -3.85,-2.37 -17.14,-14.48 -35.88,-32.69 -51.69,-50.24 -56.46,-54.4 -62.29,-54.4 -3.57,0 -4.92,0.95 -16.63,11.75 -7.01,6.46 -19.74,18.09 -28.29,25.83 -8.55,7.75 -17.57,16.87 -20.05,20.27 -4.09,5.63 -16.09,26.06 -40.03,68.15 -4.85,8.53 -12.47,21.2 -16.93,28.18 -9.13,14.26 -12.06,22.39 -14.01,38.82 -2.11,17.81 -3.41,21.42 -19.6,54.52 -8.47,17.32 -15.69,32.73 -16.04,34.23 -0.35,1.51 -3.4,8.1 -6.77,14.65 -6.99,13.58 -15.32,23.18 -24.64,28.42 -5.98,3.36 -10.79,7.55 -15.49,13.5 l -3,3.8 z",
                        "path_etang" : "m 219.25,766.98 c -3.46,-1.57 -5.32,-3.09 -5.76,-4.69 -0.36,-1.3 -1.43,-3.28 -2.39,-4.4 -0.96,-1.12 -33.69,-19.96 -72.74,-41.86 -39.05,-21.91 -72.04,-40.49 -73.32,-41.29 -2.26,-1.42 -2.28,-1.53 -0.58,-4.14 4.24,-6.52 9.52,-11.8 17.9,-17.9 17.93,-13.06 17.59,-12.56 38.12,-55.39 26.99,-56.31 25.73,-53.1 29.29,-74.37 1.73,-10.31 3.76,-19.93 4.51,-21.38 0.75,-1.45 1.87,-4.51 2.48,-6.8 0.61,-2.29 1.9,-5.11 2.85,-6.27 1.73,-2.1 2.05,-1.89 54.32,35.75 28.92,20.83 54.84,39.65 57.6,41.83 4.22,3.34 6.64,4.32 15.41,6.29 5.72,1.28 11.6,2.93 13.07,3.67 3.86,1.95 6.66,5.95 8.44,12.07 2.24,7.69 0.49,29.37 -4.19,52.06 -3.43,16.63 -4.16,18.73 -20.49,58.98 -9.31,22.95 -17.72,42.49 -18.68,43.42 -0.96,0.93 -8.49,7.35 -16.74,14.27 -14.42,12.09 -15.18,12.58 -19.5,12.53 -2.48,-0.03 -6.8,-1.1 -9.61,-2.38 z"
                    }
                }
            }
        }
    );

    return Mapael;

}));