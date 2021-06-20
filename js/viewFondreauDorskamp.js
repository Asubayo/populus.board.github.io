
class ViewFondreauDorskamp
{
	constructor(name)
	{
		this.name = "Fondreau";

		// The root element
		this.app = document.getElementById("Fondreau")

		const h = document.createElement('h3')
		h.textContent = "Welcome to the Dorskamp";
		this.app.appendChild(h);

		this.createMap("map_dorskamp");
		this.createChart();
		this.createDataView();
	}

    createChart()
    {
        // The root element
        this.app = document.getElementById("Fondreau")

        const divChart = document.createElement('div');
        divChart.className = 'chartcontent';

        const title1 = document.createElement('h1')
        title1.textContent = 'chartcontent'
        divChart.appendChild(title1);
        this.app.appendChild(divChart);
    }

    createDataView() {

        // The root element
        this.app = document.getElementById("Fondreau")

        const divData = document.createElement('div');
        divData.className = 'datacontent';

        const title2 = document.createElement('h1')
        title2.textContent = 'datacontent'
        divData.appendChild(title2);

        this.app.appendChild(divData);
    }

	createMap(mapName)
	{
	    const divMapContainer = document.createElement('div');
	    divMapContainer.className = 'mapcontent';
	    const divMap = document.createElement('div');
	    divMap.className = 'map';
	    divMapContainer.appendChild(divMap);
	    this.app.appendChild(divMapContainer);
	    //button.className = 'btn';

	    this.previousClickedArea;;
	    this.defaultAreaColorFill = "#00ff00";
	    this.areaUnderSelectionColorFill = "#ff0000";

		$.mapael.prototype.isRaphaelBBoxBugPresent = function () { return false; };

		$("#Fondreau .mapcontent").mapael({
			map: {
				// Set the name of the map to display
				name: mapName,

				afterInit: function ($self, paper, areas, plots, options) {
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
		   
						var viewportHeight = $(window).height() - 150;
						var viewportWidth = $(window).width();
			
						var im_height = $.mapael.maps[mapName].height;
						var im_width = $.mapael.maps[mapName].width;

						var v_fact = viewportHeight / $.mapael.maps[mapName].height;
						var h_fact = viewportWidth / $.mapael.maps[mapName].width;
						var im_fact = Math.min(v_fact, h_fact);

						var new_height = im_height * im_fact;
						var new_width = im_width * im_fact;

						paper.setSize(new_width, new_height);

					}).trigger('resize');
				},

			    /*
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
                */

				beforeDrawMapAreas: function ($self, paper, options) {
					var im_height = $.mapael.maps[mapName].height;
					var im_width = $.mapael.maps[mapName].width;
					//paper.image("satellite_view_fondreau.jpg", 0, 0, im_width, im_height);
				},
				defaultArea: {
				    attrs: {
				        fill: this.defaultAreaColorFill,
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

				            if (mapElem.originalAttrs.fill == this.defaultAreaColorFill) {
				                var treeMeasurement = mapTreeMeasurements[idTokens[1]];
				                newData.areas[id] = {
				                    attrs: {
				                        fill: areaUnderSelectionColorFill
				                    },
				                    tooltip: {
				                        ////content: getAreaTooltip(id, treeMeasurement)
				                    },
				                    value: treeMeasurement ? treeMeasurement : 0
				                };
				            }

				            if (previousClickedArea) {
				                var prevData = {
				                    'areas': {}
				                };

				                var prevIdTokens = previousClickedArea[0].split("_");

				                var treeMeasurement = mapTreeMeasurements[prevIdTokens[1]];
				                console.log(prevIdTokens[1] + " " + treeMeasurement);
				                prevData.areas[previousClickedArea[0]] = {
				                    attrs: {
				                        fill: this.defaultAreaColorFill
				                    },
				                    tooltip: {
				                        //content: getAreaTooltip(prevIdTokens, treeMeasurement)
				                    },
				                    value: treeMeasurement ? treeMeasurement : 0
				                };

				                /*$(".mapcontainer").trigger('update', [{
                                    //mapOptions: {areas:{attrs:{ opacity: 80 }}}
                                    mapOptions: {areas: {"peuplier_1" : { value: [mapTreeMeasurements[1]] }}}
                                }]);*/

				                $(".mapcontainer").trigger('update', [{ mapOptions: prevData }]);
				            }

				            //previousClickedArea = [id, getAreaTooltip(id)];
				            //onAreaClick(id);

				            $(".mapcontainer").trigger('update', [{ mapOptions: newData }]);
				        }
				    }
				}
			},
			// Customize some areas of the map
			areas: {
			    "parcelle_outline": {
			        attrs: {
			            fill: "none",
			            opacity: 80
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

		this.createMapSettings(divMapContainer);
	}

	createMapSettings(divMapContainer)
	{
	    // The root element
	    this.app = document.getElementById("Fondreau")

	    const divMapSettings = document.createElement('div');
	    divMapSettings.className = 'mapSettings';
	    divMapContainer.appendChild(divMapSettings);
	    this.app.appendChild(divMapContainer);

	    var btnShowSatellite = document.createElement('input');
	    btnShowSatellite.type = 'checkbox';
	    btnShowSatellite.id = 'showSatellite';
	    btnShowSatellite.textContent = "Show satellite"
	    btnShowSatellite.value = '{show_satellite_view}';
	    divMapSettings.appendChild(btnShowSatellite);

	    var btnShowMarkedPoplars = document.createElement('input');
	    btnShowMarkedPoplars.type = 'checkbox';
	    btnShowMarkedPoplars.id = 'showMarkedPoplars';
	    btnShowMarkedPoplars.textContent = "Show follow-ups";
	    btnShowMarkedPoplars.value = '{show_marked_poplars}';
	    divMapSettings.appendChild(btnShowMarkedPoplars);

	    var btnShowExploitablePoplars = document.createElement('input');
	    btnShowExploitablePoplars.type = 'checkbox';
	    btnShowExploitablePoplars.id = 'showExploitablePoplars';
	    btnShowExploitablePoplars.value = '{show_exploitable_poplars}';
	    btnShowExploitablePoplars.textContent = "Show grown-ups";
	    divMapSettings.appendChild(btnShowExploitablePoplars);
	    console.log("btnShowExploitablePoplars.textContent  : " + btnShowExploitablePoplars.textContent);
	    var btnShowLostPoplars = document.createElement('input');
	    btnShowLostPoplars.type = 'checkbox';
	    btnShowLostPoplars.id = 'showLostPoplars';
	    btnShowLostPoplars.textContent = "Show losses";
	    btnShowLostPoplars.value = '{show_lost_poplars}';
	    divMapSettings.appendChild(btnShowLostPoplars);
	}
}