$(function(e) {

	/*-----chart-----*/
	var options = {
		chart: {
			height: 285,
			type: 'area',
			stacked: true,
			events: {
			  selection: function(chart, e) {
				console.log(new Date(e.xaxis.min) )
			  }
			},
		},
		colors: ['#765be6', '#e44374', '#26c2f7'],
		dataLabels: {
		  enabled: false
		},
		stroke: {
			curve: 'smooth'
		},
		series: [{
                name: 'Customer Retention',
                data: [34, 24, 44, 36, 56, 48, 67, 46, 78, 56]
            },{
                name: 'Resolved Complaints',
                data: [29, 18, 37, 26, 45, 34, 53, 32, 61, 70]
            }, {
                name: 'Unresolved Complaints',
                data: [40, 31, 52, 43, 64, 55, 76, 57, 88, 69]
		}],
		fill: {
			gradient: {
			  enabled: true,
			  opacityFrom: 0.6,
			  opacityTo: 0.8,
			}
		},
			legend: {
			position: 'bottom',
			horizontalAlign: 'center',
			colors: '#8e9cad'
		},
    }
    var chart = new ApexCharts(
      document.querySelector("#chart"),
      options
    );
    chart.render();
    function generateDayWiseTimeSeries(baseval, count, yrange) {
		var i = 0;
		var series = [];
		while (i < count) {
			var x = baseval;
			var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

			series.push([x, y]);
			baseval += 86400000;
			i++;
		}
		return series;
    }
	/*-----chart-----*/

	/*-----revenue-----*/
	var myCanvas = document.getElementById("revenue");
	myCanvas.height="320";
	var myCanvasContext = myCanvas.getContext("2d");
	var gradientStroke1 = myCanvasContext.createLinearGradient(0, 0, 0, 380);
	gradientStroke1.addColorStop(0, '#765be6');
	gradientStroke1.addColorStop(1, '#765be6');

	var gradientStroke2 = myCanvasContext.createLinearGradient(0, 0, 0, 300);
	gradientStroke2.addColorStop(0, '#e44374');
	gradientStroke2.addColorStop(1, '#e44374');

	var myChart = new Chart(myCanvas, {
		type: 'bar',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
			datasets: [{
				label: 'Revenue',
				data: [15, 18, 12, 14, 10, 15, 7, 14, 10, 15, 7, 14],
				backgroundColor: gradientStroke1,
				hoverBackgroundColor: gradientStroke1,
				hoverBorderWidth: 2,
				hoverBorderColor: 'gradientStroke1'
			}, {

			    label: 'Support cost',
				data: [10, 14, 10, 15, 9, 14, 15, 20, 10, 15, 7, 14],
				backgroundColor: gradientStroke2,
				hoverBackgroundColor: gradientStroke2,
				hoverBorderWidth: 2,
				hoverBorderColor: 'gradientStroke2'

			}
		  ]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			tooltips: {
				mode: 'index',
				titleFontSize: 12,
				titleFontColor: '#000',
				bodyFontColor: '#000',
				backgroundColor: '#fff',
				cornerRadius: 3,
				intersect: false,
			},
			legend: {
				display: false,
				labels: {
					usePointStyle: true,
					fontFamily: 'Montserrat',
				},
			},
			scales: {
				xAxes: [{
					barPercentage:0.5,
					ticks: {
						fontColor: "#8e9cad",

					 },
					display: true,
					gridLines: {
						display: true,
						color: 'rgba(142, 156, 173,0.2)',
						drawBorder: false
					},
					scaleLabel: {
						display: false,
						labelString: 'Month',
						fontColor: '#8e9cad'
					}
				}],
				yAxes: [{
					ticks: {
						fontColor: "#8e9cad",
					 },
					display: true,
					gridLines: {
						display: true,
						color: 'rgba(142, 156, 173,0.2)',
						drawBorder: false
					},
					scaleLabel: {
						display: false,
						labelString: 'sales',
						fontColor: '#8e9cad'
					}
				}]
			},
			title: {
				display: false,
				text: 'Normal Legend'
			}
		}
	});
	/*-----revenue-----*/
});


