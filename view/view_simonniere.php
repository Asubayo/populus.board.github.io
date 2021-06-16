<link rel="stylesheet" href="public/css/view_fondreau.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js" charset="utf-8"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" charset="utf-8"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min.js" charset="utf-8"></script>

<script src="/web_suivi_terrains/public/js/Chart.js/dist/Chart.min.js"></script>
<script src="/web_suivi_terrains/public/js/Chart.js/samples/utils.js"></script>
<script src="/web_suivi_terrains/public/js/jQuery-Mapael/js/jquery.mapael.js" charset="utf-8"></script>
<script src="/web_suivi_terrains/public/js/maps/map_global_view_simonniere.js" charset="utf-8"></script>
	
<script type="text/javascript">

    var previousClickedArea;;

    var defaultAreaColorFill = "#00ff00";
    var areaUnderSelectionColorFill = "#ff0000";
    
    function getAreaTooltip(data) {
        return "<span style=\"font-weight:bold;\">" + data + "<\/span>";
    }

    $(function () {
        $(".mapcontainer").mapael({
            map: {
                // Set the name of the map to display
                name: "global_view_simonniere",

                afterInit : function($self, paper, areas, plots, options) {
                    // After init hook is called just after the map initialization
                    
                    // Disable default behavior of mapael
                    $(window).unbind("resize.mapael");

                    // Add our custom behavior on resize event to set the proper dimensions to the SVG by using the paper object
                    $(window).on('resize', function () {
                        
                        var w = window.innerWidth
                                || document.documentElement.clientWidth
                                || document.body.clientWidth;
                        
                        var h = window.innerHeight
                                || document.documentElement.clientHeight
                                || document.body.clientHeight;
                            console.log(document.getElementsByClassName("tabtr"));    
                        var viewportHeight = $(window).height() - 100;
                        var viewportWidth = $(window).width();
                        console.log(viewportHeight);    
                        var im_height = $.mapael.maps['global_view_simonniere'].height;
                        var im_width = $.mapael.maps['global_view_simonniere'].width;
                        
                        var v_fact = viewportHeight / $.mapael.maps['global_view_simonniere'].height ;
                        var h_fact = viewportWidth / $.mapael.maps['global_view_simonniere'].width;
                        var im_fact = Math.min(v_fact, h_fact);
                        
                        var new_height = im_height * im_fact;
                        var new_width = im_width * im_fact;
                                    
                        paper.setSize(new_width, new_height);
                        
                    }).trigger('resize');
                },
                beforeDrawMapAreas : function($self, paper, options) {
                    var im_height = $.mapael.maps['global_view_simonniere'].height;
                    var im_width = $.mapael.maps['global_view_simonniere'].width;
                    //paper.image("satellite_view_fondreau.jpg", 0, 0, im_width, im_height);
                },
                defaultArea: {
                    attrs: {
                        fill: defaultAreaColorFill,
                        stroke: "#99c7ff",
                        cursor: "pointer"
                    },
                    attrsHover: {
                        animDuration: 0
                    },
                    text: {
                        attrs: {
                            cursor: "pointer",
                            "font-size": 10,
                            fill: "#000"
                        },
                        attrsHover: {
                            animDuration: 0
                        }
                    },
                    eventHandlers: {
                        click: function (e, id, mapElem, textElem) {
                            if("path_simonniere" == id){ // Simonniere
                                window.location.href = "index.php?route=simonniereBase";
                            }
                            else if("path_etang" == id){ // Etang
                                window.location.href = "index.php?route=simonnierePond";
                            }
                        }
                    }
                }
            },
            // Customize some areas of the map
            areas: {
                "path_road": {
                    attrs: {
                        fill: "none",
                        opacity : 80
                    }
                    , attrsHover: {
                        fill: "none"
                    }
                },
                "path_simonniere": {
                    tooltip: {
                        content: "<span style=\"font-weight:bold;\">Home<\/span>"
                    }
                },
                "path_etang": {
                    tooltip: {
                        content: "<span style=\"font-weight:bold;\">Etang<\/span>"
                    }
                },
            },
        });
     });
</script>

<table class="main_table" >
	<tr width = "100%"  height = "100%" >
		<td width = "100%"  height = "100%" >
			<div class="container">
				<div class="mapcontainer">
					<div class="map">
						<span>Map</span>
					</div>
				</div>
			</div>
		</td>
	</tr>
</table>