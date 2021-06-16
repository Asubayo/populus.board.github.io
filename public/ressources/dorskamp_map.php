<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Poplar management</title>
	
	<link rel="stylesheet" href="css/chart.css">
	<link rel="stylesheet" href="css/svg_map.css">
	<link rel="stylesheet" href="css/detail_pane.css">
	<link rel="stylesheet" href="css/topnav.css">
	<link rel="stylesheet" href="css/map_settings.css">
    
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
	<script src="Chart.js/dist/Chart.min.js"></script>
	<script src="Chart.js/samples/utils.js"></script>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/8.2.1/nouislider.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/8.2.1/nouislider.min.js" charset="utf-8"></script>
	
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" charset="utf-8"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js" charset="utf-8"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min.js" charset="utf-8"></script>
    <script src="https://rawgit.com/aterrien/jQuery-Knob/master/dist/jquery.knob.min.js" charset="utf-8"></script>

	<script src="jQuery-Mapael/js/jquery.mapael.js" charset="utf-8"></script>

    <script src="js/maps/map_dorskamp.js" charset="utf-8"></script>
	
    <script type="text/javascript">

		/*var previousClickedArea;;
		var mapTreeMeasurements = {};
		var exploitatableAreas = { 'areas': {} };
		var markedAreas = { 'areas': {} };
		var deadAreas = { 'areas': {} };
		var allAreas = { 'areas': {} };
		var defaultAreaColorFill = "#00ff00";
		var areaUnderSelectionColorFill = "#ff0000";
		
		function getAreaTooltip(data) {
			return "<span style=\"font-weight:bold;\">" + data + "<\/span>";
		}
		
		function getLastPoplarsMeasurements() {
			return $.ajax({
				url:"measurements_poplar_request.php",
				type: "post",
				dataType: 'json',
				success:function(result){
					
					var treeArrayLength = result.trees.length;
					for (var i = 0; i < treeArrayLength; i++) {
						mapTreeMeasurements[result.trees[i]] = result.measurements[i];
					}
				},
				fail:function(result){
					console.log("fail");
				},
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
					url:"exploitable_poplar_request.php",
					type: "post",
					dataType: 'json',
					data: {thresholdMeasure: 140},
					success:function(result){
						
						if(result.poplars)
						{
							for (var i = 0; i < result.poplars.length; i++) {
								var id = "peuplier_" + result.poplars[i];
								exploitatableAreas.areas[id] = {
									attrs: {
										fill: areaUnderSelectionColorFill
									},
									tooltip: {
										content: getAreaTooltip(id)
									}
								};
							}
		
							$(".mapcontainer").trigger('update', [{mapOptions: exploitatableAreas}]);
						}
					},
					fail:function(result){
						console.log("fail");
					},
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
				
				temp.areas[key] = {
					attrs: {
						fill: defaultAreaColorFill
					},
					tooltip: {
						content: getAreaTooltip(key)
					}
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
					url:"marked_poplar_request.php",
					type: "post",
					dataType: 'json',
					success:function(result){
						var arrayLength = result.poplars.length;
						for (var i = 0; i < arrayLength; i++) {
							var id = "peuplier_"+result.poplars[i];
							markedAreas.areas[id] = {
								attrs: {
									fill: areaUnderSelectionColorFill
								},
								tooltip: {
									content: getAreaTooltip(id)
								}
							};
						}

						$(".mapcontainer").trigger('update', [{mapOptions: markedAreas}]);
						
					},
					fail:function(result){
						console.log("fail");
					},
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
				temp.areas[key] = {
					attrs: {
						fill: defaultAreaColorFill
					},
					tooltip: {
						content: getAreaTooltip(key)
					}
				};
			}

			$(".mapcontainer").trigger('update', [{mapOptions: temp}]);

			markedAreas.areas = [];
		}

		// --------------------------------
		// MAP OPTION : SHOW SATELLITE VIEW
		// --------------------------------

		function onShowSatelliteView(obj) {
			if($(obj).is(":checked")){
				$(".container")[0].style = "background-image: url('satellite_view_fondreau.jpg'); background-size: cover;"
			}else{
				$(".container")[0].style = "";
			}
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
				temp.areas[key] = {
					attrs: {
						fill: defaultAreaColorFill
					},
					tooltip: {
						content: getAreaTooltip(key)
					}
				};
			}

			$(".mapcontainer").trigger('update', [{mapOptions: temp}]);
		}*/

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

		/*function showLostPoplars(obj) {
			if($(obj).is(":checked")){
				
				clearMarkedPoplars();
				clearExploitableAreas();
				
				$.ajax({
					url:"dead_poplar_request.php",
					type: "post",
					dataType: 'json',
					success:function(result){
						console.log("test");
						var arrayLength = result.poplars.length;
						for (var i = 0; i < arrayLength; i++) {
							var id = "peuplier_"+result.poplars[i];
							deadAreas.areas[id] = {
								attrs: {
									fill: areaUnderSelectionColorFill
								},
								tooltip: {
									content: getAreaTooltip(id)
								}
							};
						}

						$(".mapcontainer").trigger('update', [{mapOptions: deadAreas}]);
						
					},
					fail:function(result){
						console.log("fail");
					},
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
				temp.areas[key] = {
					attrs: {
						fill: defaultAreaColorFill
					},
					tooltip: {
						content: getAreaTooltip(key)
					}
				};
			}

			$(".mapcontainer").trigger('update', [{mapOptions: temp}]);
			
			deadAreas.areas = [];
		}

		function onAreaClick(id) {

			var idTokens = id.split("_");

			$.ajax({
				url:"request.php",	//the page containing php script
				type: "post",    	//request type,
				dataType: 'json',
				data: {id: idTokens[1]},
				success:function(result){
					$('#data_info').html(result.infos);
					$('#data_measures').html(result.measurements);
					$('#data_notes').html(result.notes);
					$('#data_console').html(result.logs);
					createChart(result.measures);
				},
				fail:function(result){
					console.log("fail");
				},
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
								
								areas[i].options.tooltip = 
								{
									content: getAreaTooltip(i)
								}
								
								if(i.includes("peuplier"))
								{
									allAreas.areas[i] = {
										attrs: {
											fill: defaultAreaColorFill
										},
										tooltip: {
											content: getAreaTooltip(i)
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

								if($('#filter_by_size_function').is(":checked")) {
									alert("Selection while filtering by size is not available");
									return;
								}


								var newData = {
									'areas': {}
								};

								if (mapElem.originalAttrs.fill == defaultAreaColorFill) {
									newData.areas[id] = {
										attrs: {
											fill: areaUnderSelectionColorFill
										},
										tooltip: {
											content: getAreaTooltip(id)
										}
									};
								}
								
								if(previousClickedArea)
								{
									var prevData = {
										'areas': {}
									};
	
									prevData.areas[previousClickedArea[0]] = {
										attrs: {
											fill: defaultAreaColorFill
										},
										tooltip: {
											content: previousClickedArea[1]
										}
									};
									
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
						
			if(!$("#filter_by_size_function").is(":checked"))
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
       // });

		function openPage(pageName, elmnt, color) {
			// Hide all elements with class="tabcontent" by default */
			var i, tabcontent, tablinks;
			tabcontent = document.getElementsByClassName("tabcontent");
			for (i = 0; i < tabcontent.length; i++) {
				tabcontent[i].style.display = "none";
			}

			// Remove the background color of all tablinks/buttons
			tablinks = document.getElementsByClassName("tablink");
			for (i = 0; i < tablinks.length; i++) {
				tablinks[i].style.backgroundColor = "";
			}

			// Show the specific tab content
			document.getElementById(pageName).style.display = "block";

			// Add the specific color to the button used to open the tab content
			elmnt.style.backgroundColor = color;

			if(pageName == "Fondreau")
			{
				$("#Fondreau").load("fondreau_dorskamp.php");
				console.log("Load fondreau_dorskamp.php");
			}
		}
    </script>

</head>

<body>
	<table width = "100%">
		<tr width = "100%">
			<td width = "50.7%" style=" text-align: center; margin:0; padding:0;">
				<button class="tablink" onclick="openPage('Fondreau', this, '#333')" style="width:100%;">Fondreau</button>
			</td>
			<td width = "49.3%" style=" text-align: center; margin:0; padding:0;">
				<button class="tablink" onclick="openPage('Simonniere', this, '#333')" id="defaultOpen" style="width:100%;">Simonnière</button>
			</td>
		</tr>
		<tr width = "100%">
			<td colspan = "2">
				<div id="Fondreau" class="tabcontent">
					<p>Fondreau</p>
				</div>

				<div id="Simonniere" class="tabcontent">
					<p>Home is where the heart is..</p>
				</div>
			</td>
		</tr>
	</table>
</body>
</html>