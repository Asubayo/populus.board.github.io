class ViewLayout
{
    constructor()
    {
        this.app = document.getElementById("Fondreau")
        
        this.mainTable = document.createElement("table");
        this.mainTable.style.width = '100%';
        this.mainTable.setAttribute('border', '1');

        var tableBody = document.createElement("tbody");

        var row1 = document.createElement("tr");
        var row2 = document.createElement("tr");

        this.tableCell_00 = document.createElement("td");
        this.tableCell_10 = document.createElement("td");
        this.tableCell_10.className = 'chart_cell';
        this.tableCell_01 = document.createElement("td");

        this.tableCell_10.style.height = $(window).height() / 2 - 120 + 'px';
        this.tableCell_00.style.width = $(window).width() * 0.5 +'px';
        this.tableCell_01.rowSpan = "2";

        row1.appendChild(this.tableCell_00);
        row1.appendChild(this.tableCell_01);
        row2.appendChild(this.tableCell_10);
        
        tableBody.appendChild(row1);
        tableBody.appendChild(row2);
        
        this.mainTable.appendChild(tableBody);
        this.app.appendChild(this.mainTable);

        var tables = document.getElementsByTagName('table');
        for (var i=0; i<tables.length;i++)
        {
            this.resizableGrid(tables[i]);
        }
    }

    paddingDiff(col)
    {
        if (this.getStyleVal(col,'box-sizing') == 'border-box')
        {
            return 0;
        }

        var padLeft = this.getStyleVal(col,'padding-left');
        var padRight = this.getStyleVal(col,'padding-right');
        return (parseInt(padLeft) + parseInt(padRight));
     }
     
     getStyleVal(elm,css)
     {
        return (window.getComputedStyle(elm, null).getPropertyValue(css))
     }

    setListeners(div)
    {
        var pageX,curCol,nxtCol,curColWidth,nxtColWidth;
        div.addEventListener('mousedown', function (e) 
        {
            curCol = e.target.parentElement;
            nxtCol = curCol.nextElementSibling;
            pageX = e.pageX;
            
            var padding = 0;

            if ((window.getComputedStyle(curCol, null).getPropertyValue('box-sizing')) == 'border-box')
            {
               padding = 0;
            }
            else
            {
                var padLeft = (window.getComputedStyle(curCol, null).getPropertyValue('padding-left'));
                var padRight = (window.getComputedStyle(curCol, null).getPropertyValue('padding-right'));
                padding = (parseInt(padLeft) + parseInt(padRight));
            }
            
            curColWidth = curCol.offsetWidth
            if (nxtCol)
            {
                nxtColWidth = nxtCol.offsetWidth
            }
        });
        
        div.addEventListener('mouseover', function (e)
        {
            e.target.style.borderRight = '2px solid #0000ff';
        })
          
        div.addEventListener('mouseout', function (e) 
        {
            e.target.style.borderRight = '';
        })

        document.addEventListener('mousemove', function (e) 
        {
            if (curCol) 
            {
                console.log("mousemove ! curCol = " + curCol);
                var diffX = e.pageX - pageX;
                
                if (nxtCol)
                {
                    nxtCol.style.width = (nxtColWidth - (diffX))+'px';
                }

                curCol.style.width = (curColWidth + diffX)+'px';
                
                $(window).trigger('resize'); // will resize the map
            }
        });

        document.addEventListener('mouseup', function (e) 
        { 
            curCol = undefined;
            nxtCol = undefined;
            pageX = undefined;
            nxtColWidth = undefined;
            curColWidth = undefined;
        });
    }

    createDiv(height)
    {
        var div = document.createElement('div');
        div.style.top = 0;
        div.style.right = 0;
        div.style.width = '5px';
        div.style.position = 'absolute';
        div.style.cursor = 'col-resize';
        /* remove backGroundColor later */
        div.style.backgroundColor = 'red';
        div.style.userSelect = 'none';
        /* table height */
        div.style.height = height+'px';
        return div;
    }

    resizableGrid(table) 
    {
        console.log(table);
        var row = table.getElementsByTagName('tr')[0],
        cols = row ? row.children : undefined;
        if (!cols) return;
        
        for (var i=0;i</*cols.length*/1;i++)
        {
            var div = this.createDiv(/*table.offsetHeight*/500);
            cols[i].appendChild(div);
            cols[i].style.position = 'relative';
            this.setListeners(div);
        }
    }
}

class CMapView
{
    constructor(mapName)
    {
        this.app = document.getElementById("Fondreau")
        this.mapElement = this.createMap(mapName);
        console.log(this.mapElement);
    }
    
    getAreaTooltip(data, value = -1) 
    {
        var res = "<span style=\"font-weight:bold;\">" + data;

        if(value >= 0)
        {
            res += " </br> Ø " + value + "cm";
        }

        res += "<\/span>";

        return res;
    }

	createMap(mapName)
	{
	    const divMapContainer = document.createElement('div');
	    divMapContainer.className = 'mapcontainer';
	    const divMap = document.createElement('div');
	    divMap.className = 'map';
	    divMapContainer.appendChild(divMap);
	    this.app.appendChild(divMapContainer);
	    //button.className = 'btn';

	    this.previousClickedArea;;
	    this.defaultAreaColorFill = "#00ff00";
	    this.areaUnderSelectionColorFill = "#ff0000";

		$.mapael.prototype.isRaphaelBBoxBugPresent = function () { return false; };

		$(".mapcontainer").mapael({
			map: {
				// Set the name of the map to display
				name: mapName,

				afterInit: function ($self, paper, areas, plots, options) {
					// After init hook is called just after the map initialization
				
					// Disable default behavior of mapael
					$(window).unbind("resize.mapael");

					// Add our custom behavior on resize event to set the proper dimensions to the SVG by using the paper object
					$(window).on('resize', function () {
						console.log("resize");
						var w = window.innerWidth
								|| document.documentElement.clientWidth
								|| document.body.clientWidth;

						var h = window.innerHeight
								|| document.documentElement.clientHeight
								|| document.body.clientHeight;
		   
						var row = document.getElementsByTagName('td')[0];
						
						var requestedWidth = $(window).width() * 0.5;
						if(row)
						{
							var str = row.style.width;
							str = str.replace("px", "");
							requestedWidth = parseInt(str);
						}

						var viewportHeight = $(window).height();
						var viewportWidth = requestedWidth;

						var im_height = $.mapael.maps[mapName].height;
						var im_width = $.mapael.maps[mapName].width;

						var v_fact = viewportHeight / $.mapael.maps[mapName].height;
						var h_fact = viewportWidth / $.mapael.maps[mapName].width;
						var im_fact = Math.min(v_fact, h_fact);

						var new_height = im_height * im_fact;
						var new_width = im_width * im_fact;

						paper.setSize(new_width, viewportHeight/2);

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
				        content: "<span style=\"font-weight:bold;\"></br> Ø cm<\/span>"
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
				    eventHandlers: 
                    {
				        click: function (e, id, mapElem, textElem) 
                        {
							
							console.trace("Click on : " + id);
				            var idTokens = id.split("_");
							console.trace("ID : " + idTokens[1]);
				            var newData = 
                            {
				                'areas': {}
				            };
				       
							newData.areas[id] = {
								attrs: {
									fill: "#ff0000"
								}
							};
					   

				            /*if (previousClickedArea) {
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

				                /*$(".mapcontainer").trigger('update', [{ mapOptions: prevData }]);
				            }*/

				            //previousClickedArea = [id, getAreaTooltip(id)];
				            //onAreaClick(id);


							// https://asubayo.github.io/populus.data.github.io/data/populus_full_database.json
							var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
							var url = "https://asubayo.github.io/populus.data.github.io/data/fondreau/cycle_2002/";
							url += idTokens[1] + ".json";
							console.trace("REQUEST TO : " + url);
							xmlhttp.open("GET", url);
							xmlhttp.responseType = 'json';
							
							xmlhttp.onload = function() {
                                const jsonData = xmlhttp.response;
    
                                var event = new CustomEvent('SelectPopulusFromMap', { 'detail': jsonData });
                                document.dispatchEvent(event);
							   //document.trigger('SelectPopulusFromMap', jsonData);
							}
							
							xmlhttp.send();

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
		return divMapContainer;
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

class ViewFondreauDorskamp
{
    constructor(name)
    {
        this.name = "Fondreau";

        this.app = document.getElementById("Fondreau")

        this.layout = new ViewLayout();
        
        this.mapObject = new CMapView("map_dorskamp");
        this.layout.tableCell_00.appendChild(this.mapObject.mapElement);
        
        var chart = this.createChart();
        this.layout.tableCell_10.appendChild(chart);
        
        var dataView = this.createDataView();
        this.layout.tableCell_01.appendChild(dataView);
    }

    createChart()
    {
        // The root element
        this.app = document.getElementById("Fondreau")

        const divContainer = document.createElement('div');

        const divChart = document.createElement('div');
        
        divChart.style.height = "100%";
        const title1 = document.createElement('h1')
        title1.textContent = 'Growth'
        divContainer.appendChild(title1);

        var canvas = document.createElement("canvas");
        divContainer.className = 'chart_canvas';
        
        var ctx = canvas.getContext('2d');
        this.layout.tableCell_10.style.height
        
        var strWidthCell = this.layout.tableCell_10.style.width;
        strWidthCell = strWidthCell.replace("px", "");
        
        var strHeightCell = this.layout.tableCell_10.style.height;
        strHeightCell = strHeightCell.replace("px", "");
        console.log("strHeightCell: "+strHeightCell);
        ctx.canvas.width = parseInt(strWidthCell);
        ctx.canvas.height = parseInt(strHeightCell) - 200;
        
        canvas.style.width = this.layout.tableCell_10.style.width;
        canvas.style.height = (parseInt(strHeightCell) - 100) + "px" ;
        divChart.appendChild(canvas);

        /*$(window).on('resize', function () {
            console.log("resize canvas");
            var w = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth;

            var h = window.innerHeight
                    || document.documentElement.clientHeight
                    || document.body.clientHeight;

            var row = document.getElementsByTagName('td')[0];
            
            var requestedWidth = $(window).width() * 0.5;
            if(row)
            {
                var str = row.style.width;
                str = str.replace("px", "");
                requestedWidth = parseInt(str);
            }
            
            var canvas = document.getElementsByClassName("chart_canvas")[0];
            if(canvas)
            {
                console.log("canvas: " + canvas);
                var chart_cell = document.getElementsByClassName("chart_cell")[0];
                //var ctx = canvas.getContext('2d');
                
                var strWidthCell = chart_cell.style.width;
                strWidthCell = strWidthCell.replace("px", "");
                
                var strHeightCell = chart_cell.style.height;
                strHeightCell = strHeightCell.replace("px", "");
                
                //ctx.canvas.width = parseInt(strWidthCell);
                //ctx.canvas.height = parseInt(strHeightCell) - 200;
                canvas.style.width = chart_cell.style.width;
                canvas.style.height = (parseInt(strHeightCell) - 100) + "px" ;
                //this.chart.update();
            }

        }).trigger('resize');*/

        divContainer.appendChild(divChart);
        
        var color = Chart.helpers.color;
        
        var defaultData = [];
        defaultData.push({t: moment('19900101', 'YYYYMMDD').valueOf(), y: 10},
                         {t: moment('19920101', 'YYYYMMDD').valueOf(), y: 20},
                         {t: moment('19950101', 'YYYYMMDD').valueOf(), y: 60},
                         {t: moment('19970101', 'YYYYMMDD').valueOf(), y: 70},
                         {t: moment('19980101', 'YYYYMMDD').valueOf(), y: 80},
                         {t: moment('19990101', 'YYYYMMDD').valueOf(), y: 90},
                         {t: moment('20000101', 'YYYYMMDD').valueOf(), y: 100},
                         {t: moment('20100101', 'YYYYMMDD').valueOf(), y: 110},
                         {t: moment('20030101', 'YYYYMMDD').valueOf(), y: 120},
                         {t: moment('20110101', 'YYYYMMDD').valueOf(), y: 125},
                         {t: moment('20200101', 'YYYYMMDD').valueOf(), y: 130},
                         {t: moment('20400101', 'YYYYMMDD').valueOf(), y: 140});
        
        var cfg = {
            data: {
                datasets: [{
                    label: 'Poplar circumferences over time ',
                    backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                    borderColor: window.chartColors.red,
                    data: defaultData,
                    type: 'line',
                    pointRadius: 0,
                    fill: false,
                    lineTension: 0,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 0
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                        offset: true,
                        gridLines: {
                            //drawBorder: false,
                            color:'rgba(255, 255, 255, 0.2)'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Years'
                        },
                        ticks: {
                            major: {
                                enabled: true,
                                fontStyle: 'bold'
                            },
                            source: 'data',
                            autoSkip: true,
                            autoSkipPadding: 75,
                            maxRotation: 0,
                            sampleSize: 100,
                            fontColor:'#fff'
                        }/*,
                        afterBuildTicks: function(scale, ticks) {
                            var majorUnit = scale._majorUnit;
                            var firstTick = ticks[0];
                            var i, ilen, val, tick, currMajor, lastMajor;

                            val = moment(ticks[0].value);
                            if ((majorUnit === 'minute' && val.second() === 0)
                                    || (majorUnit === 'hour' && val.minute() === 0)
                                    || (majorUnit === 'day' && val.hour() === 9)
                                    || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                                    || (majorUnit === 'year' && val.month() === 0)) {
                                firstTick.major = true;
                            } else {
                                firstTick.major = false;
                            }
                            lastMajor = val.get(majorUnit);

                            for (i = 1, ilen = ticks.length; i < ilen; i++) {
                                tick = ticks[i];
                                val = moment(tick.value);
                                currMajor = val.get(majorUnit);
                                tick.major = currMajor !== lastMajor;
                                lastMajor = currMajor;
                            }
                            return ticks;
                        }*/
                    }],
                    yAxes: [{
                        gridLines: {
                            drawBorder: true,
                            color:'rgba(255, 255, 255, 0.2)'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Circumferences (cm)'
                        },
                        ticks: {
                            major: {
                                enabled: true,
                                fontStyle: 'bold'
                            },
                            fontColor:'#fff'
                        }
                    }]
                },
                tooltips: {
                    intersect: false,
                    mode: 'index',
                    callbacks: {
                        label: function(tooltipItem, myData) {
                            var label = myData.datasets[tooltipItem.datasetIndex].label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += parseFloat(tooltipItem.value).toFixed(2);
                            return label;
                        }
                    }
                }
            }
        };

        this.chart = new Chart(ctx, cfg);

        /*document.getElementById('update').addEventListener('click', function() {
            var type = document.getElementById('type').value;
            var dataset = chart.config.data.datasets[0];
            dataset.type = type;
            chart.update();
        });*/
        
        /*var data = [];
		var arrayLength = defaultData.length;
		
		for (var i = 0; i < arrayLength; i++) {
			var res = defaultData[i].split("-");
            console.log(res);
			var date = res;
             console.log(date.x);
			//date = date.concat(res[1]);
			//date = date.concat(res[2]);

			data.push({
				t: moment(date, 'YYYYMMDD').valueOf(),
				y: defaultData[i][1]
			});
		}*/
		

        var selectDisplayTypeElement = document.createElement("select");
        var lineOption = document.createElement("option");
        var barOption = document.createElement("option");
        lineOption.value = "line";
        lineOption.text = "Line";
        barOption.value = "bar";
        barOption.text = "Bar";
        selectDisplayTypeElement.add(lineOption, null);
        selectDisplayTypeElement.add(barOption, null);
        divContainer.appendChild(selectDisplayTypeElement);
        
        var selectDisplayUnitElement = document.createElement("select");
        var dayOption = document.createElement("option");
        var monthOption = document.createElement("option");
        var yearOption = document.createElement("option");
        dayOption.value = "day";
        dayOption.text = "Day";
        monthOption.value = "month";
        monthOption.text = "Month";
        yearOption.value = "year";
        yearOption.text = "Year";
        selectDisplayUnitElement.add(dayOption, null);
        selectDisplayUnitElement.add(monthOption, null);
        selectDisplayUnitElement.add(yearOption, null);
        divContainer.appendChild(selectDisplayUnitElement);
        
        var updateChartElement = document.createElement("button");
        updateChartElement.innerHTML = "update";
        divContainer.appendChild(updateChartElement);
        
        var dataset = this.chart.config.data.datasets[0];
		dataset.type = "bar";
		dataset.data = defaultData;
		this.chart.update();

        return divContainer;
    }

    createDataView(jsonData) 
    {
        const divDataContainer = document.createElement('div');
        divDataContainer.className = 'data_container';
        
        var dcTable = document.createElement("table");
        dcTable.style.width = '100%';
        dcTable.style.height = '100%';
        //dcTable.setAttribute('border', '1');
        
        var dcTableBody = document.createElement("tbody");
        
        var toolbarRow = document.createElement("tr");
        var toolbarCell = document.createElement("td");
        
        const toobarContainer = document.createElement('div');
        toobarContainer.className = 'toolbar_container';
        
        // Tool button to get a list of all data in the data container
        var allDataList = document.createElement("button");
        allDataList.innerHTML = "All data";
        toobarContainer.appendChild(allDataList);
        toolbarCell.appendChild(toobarContainer);
        toolbarRow.appendChild(toolbarCell);
        dcTableBody.appendChild(toolbarRow);
        
        allDataList.addEventListener('click', function() {
            var dataContentDiv = document.getElementsByClassName("data_content")[0];
            dataContentDiv.innerHTML = "";
        });
        
        var dataRow = document.createElement("tr");
        var dataCell = document.createElement("td");
        
        const divData = document.createElement('div');
        divData.className = 'data_content';
        dataCell.appendChild(divData);
        dataRow.appendChild(dataCell);
        dcTableBody.appendChild(dataRow);
        
        var h = window.innerHeight
                    || document.documentElement.clientHeight
                    || document.body.clientHeight;
        
        //divData.style.height = h - 200 + "px";
        
        document.addEventListener('SelectPopulusFromMap', function (e) { 
            console.log(e.detail);
            var jsonData = e.detail;
            var dataContentDiv = document.getElementsByClassName("data_content")[0];
            dataContentDiv.innerHTML = "";
            
            var table = document.createElement("table");
            table.style.width = '100%';
            table.setAttribute('border', '1');

            var tableBody = document.createElement("tbody");
             
            function isArray(what) {
                return Object.prototype.toString.call(what) === '[object Array]';
            } 
           
            //for(var i = 0; i < Object.keys(jsonData).length; i++)
            for(var key in jsonData) {

                 if(isArray(jsonData[key]))
                 {
                     var row = document.createElement("tr");
                     var cell0 = document.createElement("td");
                     cell0.colSpan = "2";
                     row.appendChild(cell0);
                     tableBody.appendChild(row);
                     
                     var row2 = document.createElement("tr");
                     var cell1 = document.createElement("td");
                     cell1.colSpan = "2";
                     row2.style.width = '100%';
                     row2.appendChild(cell1);
                     tableBody.appendChild(row2);
                     
                     
                     var t = document.createElement("table");
                    // t.style.width = '50%';
                     t.style.height = "500px";
                     t.setAttribute('border', '1');
                    // t.setAttribute('display', 'block');
                     //t.setAttribute('style', 'overflow:scroll;');
                     var tb = document.createElement("tbody");
                     tb.style.width = '100%';
                     tb.setAttribute('display', 'block');
                     t.setAttribute('display', 'block');
                     t.style.display = "block";
                     t.style.overflow = "auto";
                     //t.setAttribute('style', 'overflow-y:scroll');
                     //t.setAttribute('style', 'verflow-x:hidden');
                     //tb.style.width = '100%';
                     var r = document.createElement("tr");
                     r.style.width = '100%';
                     
                     if(jsonData[key].length > 0) {
                         
                         for(var k in jsonData[key][0])
                         {
                             var c = document.createElement("td");
                             c.innerHTML = k;
                             r.appendChild(c);
                         }
                     }
                     
                     tb.appendChild(r);
                     
                     for(var i = 0; i < jsonData[key].length; i++) {
                         var rNext = document.createElement("tr");
                         for(var k in jsonData[key][i])
                         {
                             var c = document.createElement("td");
                             c.innerHTML = jsonData[key][i][k];
                             if(k == "comment")
                             {
                                c.style.width = '100%';
                             }
                              rNext.style.width = '100%';
                             rNext.appendChild(c);
                         }
                         tb.appendChild(rNext);
                     }
                     
                     
                     t.appendChild(tb);
                     cell1.appendChild(t);

                     
                 }
                 else
                 {
                     var row = document.createElement("tr");
                     var cell0 = document.createElement("td");
                     var cell1 = document.createElement("td");
                     cell0.style.width = "50%";
                     cell1.style.width = "50%";
                     cell0.innerHTML = key;
                     cell1.innerHTML = jsonData[key];
                    
                     row.appendChild(cell0);
                     row.appendChild(cell1);
                     tableBody.appendChild(row);
                 }
                 
                
            }
            
     
            table.appendChild(tableBody);
            dataContentDiv.appendChild(table);


        }, false);
        //divData.style.height = "50%";
        //divDataContainer.appendChild(divData);
        
        const divMediaContainer = document.createElement('div');
        divMediaContainer.className = 'media_container';
        //divMediaContainer.style.height = "25%";
        
        var mediaRow = document.createElement("tr");
        var mediaCell = document.createElement("td");
        mediaCell.appendChild(divMediaContainer);
        mediaRow.style.height = "150px";
        mediaRow.appendChild(mediaCell);
        dcTableBody.appendChild(mediaRow);
        dcTable.appendChild(dcTableBody);
        divDataContainer.appendChild(dcTable);
        //divDataContainer.appendChild(divMediaContainer);
        
        return divDataContainer;
        //this.app.appendChild(divData);
    }
}