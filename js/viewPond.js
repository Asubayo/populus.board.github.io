
class ViewPond
{
	constructor()
	{
		this.name = "Etang";

		// The root element
		this.app = document.getElementById('Etang')

		const divMapContainer = document.createElement('div');
		divMapContainer.className = 'mapcontent';
		const divMap = document.createElement('div');
		divMap.className = 'map';
		divMapContainer.appendChild(divMap);
		this.app.appendChild(divMapContainer);

		const divChart = document.createElement('div');
		divChart.className = 'chartcontent';
		this.app.appendChild(divChart);

		const divData = document.createElement('div');
		divData.className = 'datacontent';
		this.app.appendChild(divData);

		this.previousClickedArea;;

		this.defaultAreaColorFill = "#00ff00";
		this.areaUnderSelectionColorFill = "#ff0000";

		this.createMap();
	}

	createMap() {
		$.mapael.prototype.isRaphaelBBoxBugPresent = function () { return false; };

		$("#Etang .mapcontent").mapael({
			map: {
				// Set the name of the map to display
				name: "map_simonniere_pond",

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
						console.log(document.getElementsByClassName("tabtr"));
						var viewportHeight = $(window).height() - 150;
						var viewportWidth = $(window).width();

						var im_height = $.mapael.maps['map_simonniere_pond'].height;
						var im_width = $.mapael.maps['map_simonniere_pond'].width;

						var v_fact = viewportHeight / $.mapael.maps['map_simonniere_pond'].height;
						var h_fact = viewportWidth / $.mapael.maps['map_simonniere_pond'].width;
						var im_fact = Math.min(v_fact, h_fact);

						var new_height = im_height * im_fact;
						var new_width = im_width * im_fact;

						paper.setSize(new_width, new_height);

					}).trigger('resize');
				},
				beforeDrawMapAreas: function ($self, paper, options) {
					var im_height = $.mapael.maps['map_simonniere_pond'].height;
					var im_width = $.mapael.maps['map_simonniere_pond'].width;
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
						click: function (e, id, mapElem, textElem) {
							
						}
					}
				}
			}
		});
	}
}
