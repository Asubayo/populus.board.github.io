class ViewFondreau
{
	constructor(name)
	{
		this.name = "Fondreau";

		// The root element
		this.app = document.getElementById("Fondreau")

		const h = document.createElement('h3')
		h.textContent = "Welcome to the FONDREAU";
		this.app.appendChild(h);

		const divMapContainer = document.createElement('div');
		divMapContainer.className = 'mapcontent';
		const divMap = document.createElement('div');
		divMap.className = 'map';
		divMapContainer.appendChild(divMap);
		this.app.appendChild(divMapContainer);

		/*const divChart = document.createElement('div');
		divChart.className = 'chartcontent';

		const title1 = document.createElement('h1')
		title1.textContent = 'chartcontent'
		divChart.appendChild(title1);
		this.app.appendChild(divChart);

		const divData = document.createElement('div');
		divData.className = 'datacontent';

		const title2 = document.createElement('h1')
		title2.textContent = 'datacontent'
		divChart.appendChild(title2);

		this.app.appendChild(divData);*/

		this.previousClickedArea;;

		this.defaultAreaColorFill = "#00ff00";
		this.areaUnderSelectionColorFill = "#ff0000";

		this.createMap("fondreau");
	}

	createMap(mapName)
	{
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
						click: function (e, id, mapElem, textElem, c) {
							if ("path94" == id) { // Dorskamp
								window.location.href = "index.html?route=fondreau&stop=map_dorskamp";
							}
							else if ("path98" == id) { // Dano
								window.location.href = "index.html?route=fondreau&stop=dano";
							}
							else if ("path100" == id) { // Banchereau
								window.location.href = "index.html?route=fondreau&stop=banchereau";
							}
						}
					}
				}
			},
			// Customize some areas of the map
			areas: {
				"path104": {
					attrs: {
						fill: "none",
						opacity: 80
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
						opacity: 80
					}
					, attrsHover: {
						fill: "none"
					}
				},
				"path86": {
					attrs: {
						fill: "none",
						opacity: 80
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
						opacity: 80
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
						opacity: 80
					}
					, attrsHover: {
						fill: "none"
					}
				},
			},
		});
	}
}