$(function(e)  {
	
	/*-----chart-----*/
	var options = {
		series: [{
		  name: 'Monthly Sales',
		  data: [5, 45, 17, 60, 30, 52, 98, 55, 88, 60, 50, 92]
		}],
        chart: {
          type: 'area',
          height: 350,
          stacked: false,
        },
		stroke: {
			show: true,
			curve: 'smooth',
			lineCap: 'butt',
			colors: undefined,
			width: 3,
			dashArray: 0,      
		},
		markers: {
          size: 4,
          colors: ["#765be6"],
          strokeColors: "#fff",
          strokeWidth: 1,
          hover: {
            size: 7,
          }
        },
		fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: [ '#03adf7'],
            shadeIntensity: 5,
			inverseColors: true,
            type: 'vertical',
            opacityFrom: .7,
            opacityTo: .8,
          },
        },
		dataLabels: {
			enabled: false
		},
		plotOptions: {
		  bar: {
			horizontal: false,
			columnWidth: '25%',
			endingShape: 'rounded'
		  },
		},
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: 0,
              offsetY: 0
            }
          }
        }],
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
		colors: ['#765be6'],
        
    };
	var chart = new ApexCharts(document.querySelector("#sales"), options);
    chart.render();
	/*-----chart-----*/

	/*-----canvasDoughnut-----*/
	if ($('.canvasDoughnut').length){
		var chart_doughnut_settings = {
			type: 'doughnut',
			tooltipFillColor: "rgba(51, 51, 51, 0.55)",
			data: {
				labels: [
					"Organic Search",
					"Direct",
					"Email",
					"Paid Search",
					"Referral"
					
				],
				datasets: [{
					data: [68, 55, 45, 37, 27],
					backgroundColor: [
						"rgb(118, 91, 230)",
						"rgb(228, 67, 116)",
						"rgb(38, 194, 247)",
						"rgb(245, 166, 35)",
						"rgb(245, 51, 79)"

					],
					hoverBackgroundColor: [
						"#765be6",
						"#e44374",
						"#26c2f7",
						"#f5a623",
						"#f5334f"

					]
				}]
			},
			options: {
				legend: false,
				responsive: false
			}
		}

		$('.canvasDoughnut').each(function(){

			var chart_element = $(this);
			var chart_doughnut = new Chart( chart_element, chart_doughnut_settings);

		});
	}
	/*-----canvasDoughnut-----*/
	
	/*-----flotChart1-----*/
	$.plot('#flotChart1', [{
		data: flotSampleData5,
		color: '#2dce89'
	}], {
		series: {
			shadowSize: 0,
			lines: {
			  show: true,
			  lineWidth: 1,
			  fill: true,
			  fillColor: { colors: [ { opacity: 0 }, { opacity: 0.8 } ] }
			}
		},
		grid: {
			borderWidth: 0,
			labelMargin: 10,
		},
		yaxis: { show: false },
		xaxis: {
			show: false,
			position: 'top',
			color: 'rgba(142, 156, 173,0.1)',
			reserveSpace: false,
			ticks: [[23,'Jan'],[35,'Feb'],[55,'Mar'],[75,'Apr'],[95,'May'], [115,'June']],
			font: {
			  size: 10,
			  weight: '500',
			  color: '#b0bac9'
			}
		}
	});
	/*-----flotChart1-----*/
	
	/*-----flotChart2-----*/
	$.plot('#flotChart2', [{
		data: flotSampleData4,
		color: '#1171ef'
	}], {
		series: {
			shadowSize: 0,
			lines: {
			  show: true,
			  lineWidth: 1,
			  fill: true,
			  fillColor: { colors: [ { opacity: 0 }, { opacity: 0.8 } ] }
			}
		},
		grid: {
			borderWidth: 0,
			labelMargin: 10,
		},
		yaxis: { show: false },
		xaxis: {
			show: false,
			position: 'top',
			color: 'rgba(142, 156, 173,0.1)',
			reserveSpace: false,
			ticks: [[23,'Jan'],[35,'Feb'],[55,'Mar'],[75,'Apr'],[95,'May'], [115,'June']],
			font: {
			  size: 10,
			  weight: '500',
			  color: '#b0bac9'
			}
		}
	});
	/*-----flotChart2-----*/
	
 });