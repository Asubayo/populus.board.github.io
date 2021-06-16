<link rel="stylesheet" href="public/css/chart.css">
<link rel="stylesheet" href="public/css/svg_map.css">
<link rel="stylesheet" href="public/css/detail_pane.css">
<link rel="stylesheet" href="public/css/topnav.css">
<link rel="stylesheet" href="public/css/map_settings.css">

<link href="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/8.2.1/nouislider.min.css" rel="stylesheet">

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/8.2.1/nouislider.min.js" charset="utf-8"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" charset="utf-8"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js" charset="utf-8"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min.js" charset="utf-8"></script>
<script src="https://rawgit.com/aterrien/jQuery-Knob/master/dist/jquery.knob.min.js" charset="utf-8"></script>

<script src="/web_suivi_terrains/public/js/Chart.js/dist/Chart.min.js"></script>
<script src="/web_suivi_terrains/public/js/Chart.js/samples/utils.js"></script>
<script src="/web_suivi_terrains/public/js/jQuery-Mapael/js/jquery.mapael.js" charset="utf-8"></script>
<script src="/web_suivi_terrains/public/js/maps/map_dorskamp.js" charset="utf-8"></script>
	
<script type="text/javascript">

    var previousClickedArea;;
    var mapTreeMeasurements = {};
    var exploitatableAreas = { 'areas': {} };
    var markedAreas = { 'areas': {} };
    var deadAreas = { 'areas': {} };
    var allAreas = { 'areas': {} };
    var defaultAreaColorFill = "#00ff00";
    var areaUnderSelectionColorFill = "#ff0000";
    
    function getAreaTooltip(data, value = -1) {

        var res = "<span style=\"font-weight:bold;\">" + data;

        if(value >= 0)
        {
            res += " </br> Ø " + value + "cm";
        }

        res += "<\/span>";

        return res;
    }
    
    function getLastPoplarsMeasurements() {
        /*Trees can have several measurements over the time. 
        To be able to filter trees by size, we are only interested by having the very last measure*/

        return $.ajax({
            url:"index.php",
            type: "post",
            dataType: 'json',
            data: {
                route: "fondreauDorskamp", 
                action: "allPoplarLastMeasurementArray",
                poplar_id: null
            },
            success:function(result){
                for (var i = 0; i < result.trees.length; i++) {
                    mapTreeMeasurements[result.trees[i]] = result.measurements[i];
                }
            },
            fail:function(result){
                console.log("fail : result");
            },
            error: function(xhr, status, error) {
                alert(xhr.responseText);
            }
        });
    }

    // --------------------------------
    // MAP OPTION : EXPLOITABLE POPLARS
    // --------------------------------

    function showExploitablePoplars(obj) {
        
        if($(obj).is(":checked")){
            
            clearMarkedPoplars();
            clearDeadAreas();
            
            $.ajax({
                url:"index.php",
                type: "post",
                dataType: 'json',
                data: {
                    route: "fondreauDorskamp", 
                    action: "maturePoplars",
                    poplar_id: null
                },
                success:function(result){
                    if(result.poplars) {
                        for (var i = 0; i < result.poplars.length; i++) {
                            var id = "peuplier_" + result.poplars[i];
                            var treeMeasurement = mapTreeMeasurements[result.poplars[i]];
                            console.log(id + ":" + treeMeasurement);
                            exploitatableAreas.areas[id] = {
                                attrs: {
                                    fill: areaUnderSelectionColorFill,
                                    opacity : 80
                                },
                                tooltip: {
                                    content: getAreaTooltip(id, treeMeasurement)
                                },
                                value: treeMeasurement ? treeMeasurement : 0
                            };

                            /*$(".mapcontainer").trigger('update', [{
                                mapOptions: {areas: {"peuplier_1" :  {attrs:{ fill: areaUnderSelectionColorFill }}}}
                                
                            }]);

                            $(".mapcontainer").trigger('update', [{
                                //mapOptions: {areas:{attrs:{ opacity: 80 }}}
                                mapOptions: {areas: {"peuplier_1" :  {attrs:{ opacity: 80 }}}}
                            }]);

                            $(".mapcontainer").trigger('update', [{
                                //mapOptions: {areas:{attrs:{ opacity: 80 }}}
                                mapOptions: {areas: {"peuplier_1" :  {options:{ value: [mapTreeMeasurements[1]] }}}}
                            }]);*/


                           
                            
                        }
    
                        $(".mapcontainer").trigger('update', [{mapOptions: exploitatableAreas}]);
                    }
                },
                fail:function(result){
                    console.log("fail");
                },
                error: function(xhr, status, error) {
                    alert(xhr.responseText);
                }
            });
        }
        else{
            clearExploitableAreas();
        }
    };
    
    function clearExploitableAreas() {
        
        $('#show_exploitable_poplars_function').prop('checked', false);
        
        var temp = {
            'areas': {}
        };
        
        for (key in exploitatableAreas.areas) {
            var idTokens = key.split("_");
            var treeMeasurement = mapTreeMeasurements[idTokens[1]];
            console.log()
            temp.areas[key] = {
                attrs: {
                    fill: defaultAreaColorFill
                },
                tooltip: {
                    content: getAreaTooltip(key, treeMeasurement)
                },
                value: treeMeasurement ? treeMeasurement : 0
            };


        }
    
        $(".mapcontainer").trigger('update', [{mapOptions: temp}]);
        
        exploitatableAreas.areas = [];
    }

    // --------------------------------
    // MAP OPTION : MARKED POPLARS
    // --------------------------------

    function showMarkedPoplars(obj) {

        if($(obj).is(":checked")){
            
            clearDeadAreas();
            clearExploitableAreas();
            
            $.ajax({
                url:"index.php",
                type: "post",
                dataType: 'json',
                    data: {
                    route: "fondreauDorskamp", 
                    action: "markedPoplars",
                    poplar_id: null
                },
                success:function(result){
                    var arrayLength = result.poplars.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var id = "peuplier_"+result.poplars[i];
                        var treeMeasurement = mapTreeMeasurements[result.poplars[i]];
                        markedAreas.areas[id] = {
                            attrs: {
                                fill: areaUnderSelectionColorFill,
                                opacity : 80
                            },
                            tooltip: {
                                content: getAreaTooltip(id, treeMeasurement)
                            },
                            value: treeMeasurement ? treeMeasurement : 0
                        };
                    }

                    $(".mapcontainer").trigger('update', [{mapOptions: markedAreas}]);
                    
                },
                fail:function(result){
                    console.log("fail");
                },
                error: function(xhr, status, error) {
                    alert(xhr.responseText);
                }
            });
        }
        else{
            clearMarkedPoplars();
        }
    }

    function clearMarkedPoplars() {

        $('#show_marked_poplars_function').prop('checked', false);
            
        var temp = {
            'areas': {}
        };

        for (key in markedAreas.areas) {
            var idTokens = key.split("_"); // peuplier_XX
            var measureValue = mapTreeMeasurements[idTokens[1]];
            measureValue = measureValue ? measureValue : 0;

            temp.areas[key] = {
                attrs: {
                    fill: defaultAreaColorFill
                },
                tooltip: {
                    content: getAreaTooltip(key, measureValue)
                },
                value: measureValue
            };
        }

        $(".mapcontainer").trigger('update', [{mapOptions: temp}]);

        markedAreas.areas = [];
    }

    // --------------------------------
    // MAP OPTION : SHOW SATELLITE VIEW
    // --------------------------------

    function onShowSatelliteView(obj) {
            $(".container")[0].style = $(obj).is(":checked") ? 
            "background-image: url('/web_suivi_terrains/public/images/satellite_view_fondreau.jpg'); background-size: cover;" : 
            "";
    }

    // --------------------------------
    // MAP OPTION : FILTER BY SIZE
    // --------------------------------

    function onFilterBySize(obj) {
        
        if($(obj).is(":checked")) {
            
            clearDeadAreas();
            clearExploitableAreas();
            clearMarkedPoplars();
            
            var sliderElement = document.getElementById('slider');
            sliderElement.removeAttribute('disabled');
            $(slider).trigger("set");
        }
        else 
        {
            var opt = {
                animDuration: 500,
                hiddnOpacity: 0.1,
                ranges: {
                    area: {
                        min: parseInt(0),
                        max: parseInt(200)
                    }
                }
            };
            
            var sliderElement = document.getElementById('slider');
            sliderElement.noUiSlider.set([0, 200]);
            sliderElement.setAttribute('disabled', true);
            
            $(".mapcontainer").trigger("showElementsInRange", [opt]);
            $(".values").text("Show poplars with Ø between " + parseInt(0) + " and " + parseInt(200) + " centimeters");
            $(slider).trigger("set");
        }
    }

    function clearFilterPoplarsBySize() {

        $('#filter_by_size_function').prop('checked', false);

        var temp = {
            'areas': {}
        };
        
        for (key in allAreas.areas) {	
            var idTokens = key.split("_");
            var treeMeasurement = mapTreeMeasurements[idTokens[1]];					
            temp.areas[key] = {
                attrs: {
                    fill: defaultAreaColorFill
                },
                tooltip: {
                    content: getAreaTooltip(key, treeMeasurement)
                },
                value: treeMeasurement ? treeMeasurement : 0
            };
        }

        $(".mapcontainer").trigger('update', [{mapOptions: temp}]);
    }

    // --------------------------------
    // MAP OPTION : FILTER BY YEAR
    // --------------------------------
    
    /*function onFilterByYear(obj) {

        if($(obj).is(":checked")){
            document.getElementById('knob').disabled = false;
            $(".knobContainerCell")[0].style = "";

            $('.knob').trigger(
                'configure',
                {
                    "min":2020,
                    "max":2040,
                    "fgColor":"#454545",
                    "bgColor":"#c7e8ff",
                    //"skin":"tron",
                    "cursor":true,
                    "thickness":.45,
                    "value":2020,
                    "width":60,
                    "height":60,
                    "inputColor":"#000000"
                }
            );

        }else{
            document.getElementById('knob').disabled = true;
            $(".knobContainerCell")[0].style = "background-color: #ffffff; border:0; margin:0; padding:0; background-size: cover;";

            $('.knob').trigger(
                'configure',
                {
                    "min":2020,
                    "max":2040,
                    "fgColor":"#ffffff",
                    "bgColor":"#ffffff",
                    //"skin":"tron",
                    "cursor":true,
                    "thickness":.45,
                    "value":2020,
                    "width":60,
                    "height":60,
                    "inputColor":"#ffffff"
                }
            );
        }
    }*/

    // --------------------------------
    // MAP OPTION : SHOW DEAD POPLARS
    // --------------------------------

    function showLostPoplars(obj) {
        if($(obj).is(":checked")){
            
            clearMarkedPoplars();
            clearExploitableAreas();
            
            $.ajax({
                url:"index.php",
                type: "post",
                dataType: 'json',
                    data: {
                    route: "fondreauDorskamp", 
                    action: "deadPoplars",
                    poplar_id: null
                },
                success:function(result){

                    var arrayLength = result.poplars.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var treeMeasurement = mapTreeMeasurements[result.poplars[i]];				
                        var id = "peuplier_"+result.poplars[i];
                        deadAreas.areas[id] = {
                            attrs: {
                                fill: areaUnderSelectionColorFill,
                                opacity : 80
                            },
                            tooltip: {
                                content: getAreaTooltip(id, treeMeasurement)
                            },
                            value: treeMeasurement ? treeMeasurement : 0
                        };
                    }

                    $(".mapcontainer").trigger('update', [{mapOptions: deadAreas}]);
                    
                },
                fail:function(result){
                    console.log("fail");
                },
                error: function(xhr, status, error) {
                    alert(xhr.responseText);
                }
            });
        }
        else{
            clearDeadAreas();
        }
    }

    function clearDeadAreas() {
        
        $('#show_lost_poplars_function').prop('checked', false);
        
        var temp = {
            'areas': {}
        };
        
        for (key in deadAreas.areas) {	
            var idTokens = key.split("_");
            var treeMeasurement = mapTreeMeasurements[idTokens[1]];		
            console.log(idTokens + " = " + treeMeasurement)					
            temp.areas[key] = {
                attrs: {
                    fill: defaultAreaColorFill
                },
                tooltip: {
                    content: getAreaTooltip(key, treeMeasurement)
                },
                value: treeMeasurement ? treeMeasurement : 0
            };
        }

        $(".mapcontainer").trigger('update', [{mapOptions: temp}]);
        
        deadAreas.areas = [];
    }

    function onAreaClick(id) {

        var idTokens = id.split("_");

        $.ajax({
            url:"index.php",	//the page containing php script
            type: "post",    	//request type,
            dataType: 'json',
            data: {
                route: "fondreauDorskamp", 
                action: "poplarInfos",
                poplar_id: idTokens[1]
            },
            success:function(result) {
                console.log("success");
                $('#data_info').html(result.infoHtmlTable);
                $('#data_measures').html(result.measurementHtmlTable);
                $('#data_notes').html(result.notes);
                $('#data_console').html(result.logs);
                createChart(result.measurements);
            },
            fail:function(result) {

                console.log("fail");
            },
            error: function(xhr, status, error) {
                alert(xhr.responseText);
            }
        });
    };

    $(function () {
        $(".mapcontainer").mapael({
            map: {
                // Set the name of the map to display
                name: "map_dorskamp",

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
                                
                        var viewportHeight = $(window).height()/2;
                        var viewportWidth = $(window).width()/2;
                        
                        var im_height = $.mapael.maps['map_dorskamp'].height;
                        var im_width = $.mapael.maps['map_dorskamp'].width;
                        
                        var v_fact = viewportHeight / $.mapael.maps['map_dorskamp'].height ;
                        var h_fact = viewportWidth / $.mapael.maps['map_dorskamp'].width;
                        var im_fact = Math.min(v_fact, h_fact);
                        
                        var new_height = im_height * im_fact;
                        var new_width = im_width * im_fact;
                                    
                        paper.setSize(new_width, new_height);
                        
                    }).trigger('resize');
                    
                    $.when(getLastPoplarsMeasurements()).done(function(lastPoplarsMeasurements){
                        // This code is executed when all ajax calls are done

                        for (var i in $.mapael.maps['map_dorskamp'].elems) 
                        {
                            var idTokens = i.split("_");
                            var treeMeasurement = mapTreeMeasurements[idTokens[1]];
                            areas[i].options.value = treeMeasurement ? treeMeasurement : 0;
                            //console.log("tree[" + idTokens[1] + "] = " + areas[i].options.value)
                            areas[i].options.tooltip = 
                            {
                                content: getAreaTooltip(i, treeMeasurement)
                            }
                            
                            if(i.includes("peuplier"))
                            {
                                allAreas.areas[i] = {
                                    attrs: {
                                        fill: defaultAreaColorFill
                                    },
                                    tooltip: {
                                        content: getAreaTooltip(i, treeMeasurement)
                                    }
                                };
                            }
                        }
                    });
                    
                },
                beforeDrawMapAreas : function($self, paper, options) {
                    var im_height = $.mapael.maps['map_dorskamp'].height;
                    var im_width = $.mapael.maps['map_dorskamp'].width;
                    //paper.image("satellite_view_fondreau.jpg", 0, 0, im_width, im_height);
                },
                defaultArea: {
                    attrs: {
                        fill: defaultAreaColorFill,
                        stroke: "#99c7ff",
                        cursor: "pointer"
                    },
                    tooltip: {
                        content: ""
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

                            var idTokens = id.split("_");

                            var newData = {
                                'areas': {}
                            };

                            if (mapElem.originalAttrs.fill == defaultAreaColorFill) {
                                var treeMeasurement = mapTreeMeasurements[idTokens[1]];
                                newData.areas[id] = {
                                    attrs: {
                                        fill: areaUnderSelectionColorFill
                                    },
                                    tooltip: {
                                        content: getAreaTooltip(id, treeMeasurement)
                                    },
                                    value: treeMeasurement ? treeMeasurement : 0
                                };
                            }
                            
                            if(previousClickedArea)
                            {
                                var prevData = {
                                    'areas': {}
                                };

                                var prevIdTokens = previousClickedArea[0].split("_");

                                var treeMeasurement = mapTreeMeasurements[prevIdTokens[1]];
                                console.log(prevIdTokens[1] + " " + treeMeasurement);
                                prevData.areas[previousClickedArea[0]] = {
                                    attrs: {
                                        fill: defaultAreaColorFill
                                    },
                                    tooltip: {
                                        content: getAreaTooltip(prevIdTokens, treeMeasurement)
                                    },
                                    value: treeMeasurement ? treeMeasurement : 0
                                };
                                
                                /*$(".mapcontainer").trigger('update', [{
                                    //mapOptions: {areas:{attrs:{ opacity: 80 }}}
                                    mapOptions: {areas: {"peuplier_1" : { value: [mapTreeMeasurements[1]] }}}
                                }]);*/

                                $(".mapcontainer").trigger('update', [{mapOptions: prevData}]);
                            }
                            
                            previousClickedArea = [ id, getAreaTooltip(id)];
                            onAreaClick(id);	
                            
                            $(".mapcontainer").trigger('update', [{mapOptions: newData}]);
                        }
                    }
                }
            },
            // Customize some areas of the map
            areas: {
                "parcelle_outline": {
                    attrs: {
                        fill: "none",
                        opacity : 80
                    }
                    , attrsHover: {
                        fill: "none"
                    }
                },
                "ruisseau": {
                    attrs: {
                        fill: "#87CEFA"
                    }
                    , attrsHover: {
                        fill: "#4169E1"
                    }
                }
            },
        });

        slider = noUiSlider.create($(".slider")[0], {
            start: [0, 200],
            step: 1,
            connect: true,
            orientation: 'horizontal',
            range: {
                'min': 0,
                'max': 200
            },
            pips: {
                mode: 'range',
                density: 2
            }
        });
        
        slider.on('set', function(values){

            clearDeadAreas();
            clearExploitableAreas();
            clearMarkedPoplars();

            var opt = {
                animDuration: 500,
                hiddenOpacity: 0.1,
                ranges: {
                    area: {
                        min: parseInt(values[0]),
                        max: parseInt(values[1])
                    }
                }
            };

            $(".mapcontainer").trigger("showElementsInRange", [opt]);
            $(".values").text("Show poplars with Ø between " + parseInt(values[0]) + " and " + parseInt(values[1]) + " centimeters");
        });

        $(slider).trigger("set");
                    
        /*if(!$("#filter_by_size_function").is(":checked"))
        {
            var sliderElement = document.getElementById('slider');
            sliderElement.setAttribute('disabled', true);
        }*/
        
        // Knob initialisation (for selecting a year)
        /*$(".knob").knob({
            release: function (value) {
                $(".knobContainer").trigger('update', [{
                    //mapOptions: data[value],
                    animDuration: 300
                }]);
            },
            change: function (value) {
                console.log("changed to: " + Math.round(value));
                
                if($("#filter_by_size_function").is(":checked") && 
                    $("#filter_by_year_function").is(":checked"))
                {
                    
                }
            }
        });*/
     });

</script>

<table class="main_table" >
	<tr>
		<td width = "50%"  height = "40%" >
			<div class="container" style="">
				<div class="mapcontainer">
					<div class="map">
						<span>Alternative content for the map</span>
					</div>
				</div>
			</div>
		</td>
		<td rowspan = "3" width = "50%" >
			<table width = "100%" height="100%" border = "1" style="border-spacing: 0px; padding: 0px;">
				<!-- DATABASE RESULTS VIA PHP -->
				<tr width = "100%" height="10%">
					<td width = "100%" colspan = "2">
						<div class="data_info" id="data_info"> </div>	
					</td>
				</tr>
				<tr width = "100%"  height="80%">
					<td width = "30%">
						<div class="data_measures" id="data_measures" style="overflow: auto;"> </div>	
					</td>
					<td width = "70%">
						<div class="data_notes" id="data_notes"> </div>	
					</td>
				</tr>
				<tr width = "100%"   height="10%">
					<td width = "100%" colspan = "2">
						<div class="console" id="data_console"> </div>	
					</td>
				</tr>
			</table>
		</td>
	</tr>
	
	<tr>
		<td height = "20%">
			<table width = "100%" border=1 style="border-collapse: collapse; border: none;">
				<tr>
					<td style="text-align: center; " width = "100%" colspan = "2">
						<!--<input type="checkbox" name="filter_by_size" id="filter_by_size_function" value="{filter_by_size}" onchange="onFilterBySize(this)"> Ø by size </input>
						<input type="checkbox" name="filter_by_year" id="filter_by_year_function" value="{filter_by_year}" onchange="onFilterByYear(this)"> Ø by year </input>-->
						<input type="checkbox" name="show_marked_poplars" id="show_marked_poplars_function" value="{show_marked_poplars}" onchange="showMarkedPoplars(this)"> Show marked poplars </input>
						<input type="checkbox" name="show_satellite_view" id="show_satellite_view_function" value="{show_satellite_view}" onchange="onShowSatelliteView(this)"> Show satellite view </input>
						<input type="checkbox" name="show_exploitable_poplars" id="show_exploitable_poplars_function" value="{show_exploitable_poplars}" onchange="showExploitablePoplars(this)"> Show exploitable poplars </input>
						<input type="checkbox" name="show_lost_poplars" id="show_lost_poplars_function" value="{show_lost_poplars}" onchange="showLostPoplars(this)"> Show losses </input>
						
					</td>
				</tr>
			
				<tr>
					<!--<td width = "10%" class="knobContainerCell" style="background-color: #333; border:1; margin:0; padding:0; background-size: cover;">
						<div class="knobContainer" >
							<input class="knob" id="knob" data-width="60" data-height="60" data-min="2020" data-max="2040" data-cursor=true
								data-fgColor="#333" data-thickness=.45 value="2020" data-bgColor="#333"/>
						</div>
					</td>-->
					
					<td width = "90%" id="slider_cell">
						<div class="slider" id="slider"> </div>
						<p class="values"></p>
					</td>
				</tr>
			</table>
		
		</td>
	</tr>
	
	<tr>
		<td height = "30%">
			<div class="chart_pane">
				<div>	
					<canvas id="chart1"></canvas>
				</div>

				Chart Type:
				<select id="type">
					<option value="line">Line</option>
					<option value="bar">Bar</option>
				</select>
				<select id="unit">
					<option value="day" selected>Day</option>
					<option value="month">Month</option>
					<option value="year">Year</option>
				</select>
				<button id="update">update</button>
			</div>
		</td>
	</tr>

	<script src="public/js/poplar_grow_chart.js" charset="utf-8"></script>

</table>

