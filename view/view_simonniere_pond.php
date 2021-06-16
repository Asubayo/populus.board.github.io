<link rel="stylesheet" href="public/css/view_fondreau.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" charset="utf-8"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min.js" charset="utf-8"></script>

<script src="/web_suivi_terrains/public/js/Chart.js/dist/Chart.min.js"></script>
<script src="/web_suivi_terrains/public/js/Chart.js/samples/utils.js"></script>
<script src="/web_suivi_terrains/public/js/jQuery-Mapael/js/jquery.mapael.js" charset="utf-8"></script>
<script src="/web_suivi_terrains/public/js/maps/map_simonniere_pond.js" charset="utf-8"></script>
	
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
                name: "map_simonniere_pond",

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
                        var im_height = $.mapael.maps['map_simonniere_pond'].height;
                        var im_width = $.mapael.maps['map_simonniere_pond'].width;
                        
                        var v_fact = viewportHeight / $.mapael.maps['map_simonniere_pond'].height ;
                        var h_fact = viewportWidth / $.mapael.maps['map_simonniere_pond'].width;
                        var im_fact = Math.min(v_fact, h_fact);
                        
                        var new_height = im_height * im_fact;
                        var new_width = im_width * im_fact;
                                    
                        paper.setSize(new_width, new_height);
                        
                    }).trigger('resize');
                },
                beforeDrawMapAreas : function($self, paper, options) {
                    var im_height = $.mapael.maps['map_simonniere_pond'].height;
                    var im_width = $.mapael.maps['map_simonniere_pond'].width;
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
                            /*if("path94" == id){ // Dorskamp
                                window.location.href = "index.php?route=fondreauDorskamp";
                            }
                            else if("path98" == id){ // Dano
                                window.location.href = "index.php?route=fondreauDano";
                            }
                            else if("path100" == id){ // Banchereau
                                window.location.href = "index.php?route=fondreauBanchereau";
                            }*/
                        }
                    }
                }
            },
            // Customize some areas of the map
            areas: {
                /*"path104": {
                    attrs: {
                        fill: "none",
                        opacity : 80
                    }
                    , attrsHover: {
                        fill: "none"
                    }
                    ,
                    tooltip: {
                        content: "<span style=\"font-weight:bold;\">tet<\/span>"
                    }
                },
                "path100": {
                    tooltip: {
                        content: "<span style=\"font-weight:bold;\">2300m²<\/span>"
                    }
                },
                "path98": {
                    tooltip: {
                        content: "<span style=\"font-weight:bold;\"> Peupliers Dano <br/> 5400m²<\/span>"
                    }
                },
                "path94": {
                    tooltip: {
                        content: "<span style=\"font-weight:bold;\"> Peupliers Dorskamp <br/> ~14700m²<\/span>"
                    }
                },
                "path102": {
                    attrs: {
                        fill: "none",
                        opacity : 80
                    }
                    , attrsHover: {
                        fill: "none"
                    }
                },
                "path86": {
                    attrs: {
                        fill: "none",
                        opacity : 80
                    }
                    , attrsHover: {
                        fill: "none"
                    }
                },
                "path88": {
                    attrs: {
                        fill: "#e8ebed"
                    }
                    , attrsHover: {
                        fill: "#e8ebed"
                    }
                },
                "path90": {
                    attrs: {
                        fill: "none",
                        opacity : 80
                    }
                    , attrsHover: {
                        fill: "none"
                    }
                },
                "path92": {
                    attrs: {
                        fill: "#b07447"
                    }
                    , attrsHover: {
                        fill: "#b07447"
                    }
                },
                "path96": {
                    attrs: {
                        fill: "none",
                        opacity : 80
                    }
                    , attrsHover: {
                        fill: "none"
                    }
                },*/
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

