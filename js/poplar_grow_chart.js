function createChart (measures) {
	
		var data = [];
		var arrayLength = measures.length;
		
		for (var i = 0; i < arrayLength; i++) {
			var res = measures[i][0].split("-");
			var date = res[0];
			date = date.concat(res[1]);
			date = date.concat(res[2]);

			data.push({
				t: moment(date, 'YYYYMMDD').valueOf(),
				y: measures[i][1]
			});
		}
		
		var type = document.getElementById('type').value;
		var dataset = chart.config.data.datasets[0];
		dataset.type = type;
		dataset.data = data;
		chart.update();
	};

	var ctx = document.getElementById('chart1').getContext('2d');
	
	var w = window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;

	ctx.canvas.width = w/2;
	ctx.canvas.height = 300;

	var color = Chart.helpers.color;

	var defaultData = [];
	defaultData.push({t: moment('19900101', 'YYYYMMDD').valueOf(), y: 0}, {t: moment('20400101', 'YYYYMMDD').valueOf(), y: 140});
	
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
						drawBorder: false,
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

	var chart = new Chart(ctx, cfg);

	document.getElementById('update').addEventListener('click', function() {
		var type = document.getElementById('type').value;
		var dataset = chart.config.data.datasets[0];
		dataset.type = type;
		chart.update();
	});
	
	/*$(function(){
		resizeCanvas();
	});

	$(window).on('resize', function(){
		resizeCanvas();
	});

	function resizeCanvas()
	{
		var w = window.innerWidth
				|| document.documentElement.clientWidth
				|| document.body.clientWidth;

		var ctx = document.getElementById('chart1').getContext('2d');
		ctx.canvas.width = w/2;
		ctx.canvas.height = 200;
	}*/