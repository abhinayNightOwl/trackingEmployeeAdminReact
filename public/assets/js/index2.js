$(function() {
	
	/*-----chart-----*/
	var myCanvas = document.getElementById( "chart" );
	myCanvas.height="380";
	var myCanvasContext = myCanvas.getContext("2d");
	var gradientStroke1 = myCanvasContext.createLinearGradient(0, 0, 0, 280);
	gradientStroke1.addColorStop(0, 'rgba(110, 80, 235)');
	gradientStroke1.addColorStop(1, 'rgba(3, 173, 247)');
	
    var myChart = new Chart( myCanvas, {
        type: 'bar',
        data: {
            labels: [ "HTML", "PHP", "Angular", "Wordpress", "Psd", "Psd", "React" ],
            datasets: [
                {
                    label: "Main Project",
                    data: [12, 14, 12, 15, 14, 13, 15],
					backgroundColor: gradientStroke1,
					hoverBackgroundColor: gradientStroke1,
					hoverBorderWidth: 2,
					hoverBorderColor: 'gradientStroke1'
                }
            ]
        },
        options: {
			responsive: true,
			maintainAspectRatio: false,
			tooltips: {
				intersect: false,
			},
            scales: {
				xAxes: [{
					barPercentage: 0.4,
					ticks: {
						fontColor: "#b0bac9",
					 },
					display: true,
					gridLines: {
						display: true,
						drawBorder: false, 
						zeroLineColor: 'rgba(142, 156, 173,0.1)'
					},
				}],
				yAxes: [{
					ticks: {
						beginAtZero: true,
						fontColor: "#b0bac9",
					 },
					display: true,
					gridLines: {
						display: true,
						drawBorder: false,
						zeroLineColor: 'rgba(142, 156, 173,0.1)'
					},
				}]
			},
			legend: {
				display: false,
			},
        }
    } );
	/*-----chart-----*/
	
	/*-----site-executive-----*/
	var myCanvas = document.getElementById("site-executive");
	myCanvas.height = "343";
	var myCanvasContext = myCanvas.getContext("2d");
	var gradientStroke1 = myCanvasContext.createLinearGradient(0, 0, 0, 240);
	gradientStroke1.addColorStop(0, '#765be6');
	gradientStroke1.addColorStop(1, '#765be6');
	var gradientStroke2 = myCanvasContext.createLinearGradient(0, 0, 0, 280);
	gradientStroke2.addColorStop(0, '#26c2f7');
	gradientStroke2.addColorStop(1, '#26c2f7');
	var gradientStroke3 = myCanvasContext.createLinearGradient(0, 0, 0, 280);
	gradientStroke3.addColorStop(0, '#e44374');
	gradientStroke3.addColorStop(1, '#e44374');
	var myChart = new Chart(myCanvas, {
		type: 'line',
		data: {
			labels: [2013, 2014, 2015, 2016, 2017, 2018, 2019],
			type: 'line',
			datasets: [{
				label: 'Users',
				data: [0, 70, 75, 120, 94, 141, 162],
				backgroundColor: 'transparent',
				borderColor: gradientStroke1,
				pointBackgroundColor: '#fff',
				pointHoverBackgroundColor: gradientStroke1,
				pointBorderColor: gradientStroke1,
				pointHoverBorderColor: gradientStroke1,
				pointBorderWidth: 4,
				pointRadius: 2,
				pointHoverRadius: 2,
				borderWidth: 2
			}, {
				label: 'Page Views',
				data: [0, 50, 40, 80, 40, 79, 120],
				backgroundColor: 'transparent',
				borderColor: gradientStroke2,
				pointBackgroundColor: '#fff',
				pointHoverBackgroundColor: gradientStroke2,
				pointBorderColor: gradientStroke2,
				pointHoverBorderColor: gradientStroke2,
				pointBorderWidth: 4,
				pointRadius: 2,
				pointHoverRadius: 2,
				borderWidth: 2
			},{
				label: "New Users",
				data: [0, 50, 0, 100, 50, 130, 100, 140],
				backgroundColor: 'transparent',
				borderColor: gradientStroke3,
				pointBackgroundColor: '#fff',
				pointHoverBackgroundColor: gradientStroke3,
				pointBorderColor: gradientStroke3,
				pointHoverBorderColor: gradientStroke3,
				pointBorderWidth: 4,
				pointRadius: 2,
				pointHoverRadius: 2,
				borderWidth: 2
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			tooltips: {
				mode: 'index',
				titleFontSize: 12,
				titleFontColor: 'rgba(0,0,0,0.5)',
				bodyFontColor: 'rgba(0,0,0,0.5)',
				backgroundColor: '#fff',
				cornerRadius: 3,
				intersect: false,
			},
			legend: {
				display: false,
				labels: {
					usePointStyle: true,
				},
			},
			scales: {
				xAxes: [{
					ticks: {
						fontColor: "#8e9cad",
					},
					display: true,
					gridLines: {
						color: 'rgba(142, 156, 173,0.2)'
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
						display: false,
						drawBorder: true
					},
					scaleLabel: {
						display: false,
						labelString: 'Revenue by channel',
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
	/*-----site-executive-----*/
	
});
