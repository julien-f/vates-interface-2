!function () {
	'use strict';

	var height = 1000;
	var width  = 1000;

	// mouse event vars.
	var selected  = null;
	var mousedown = null;
	var mouseup   = null;

	// Variables de construction des cercles.
	var r_pools = 100;
	var r_hosts = r_pools*1.5;

	// Create the graph.
	var svg = d3.select('body').append('svg')
		.attr('height', height)
		.attr('width', width)
	;

	// Everything will be contained in a group to apply transformations.
	var graph = svg.append('g');

	// Reacts to appropriate events.
	svg
		.attr("pointer-events", "all")
		.call(d3.behavior.zoom().on("zoom", function () {
			graph.attr(
				"transform",
				"translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")"
			);
		}))
	;

	////////////////////////////////////////////////////////////////////////////////

	var coordFunc = function (n, r, alpha, beta)
	{
		var helper = d3.scale.linear()
			.domain([0, height])
			.range([height, 0])
		;

		var angle = alpha / n;
		console.log(n);


		return function (d, i) {
			var x =	Math.cos(angle * i) * r + width/2;
			var y =	Math.sin(angle * i) * r + height/2;

			return [x, helper(y)];
		};
	};

	var label = function (d) {
		return d.label;
	};

	////////////////////////////////////////////////////////////////////////////////

	window.refresh = function (pools) {

		var n = pools.length;

		var pools = graph.selectAll('g.pool')
			.data(pools, function (pool) {
				return pool.label;
			})
		;

		// Deletes exiting pools.
		pools.exit().remove(); // @todo Add transition.

		// Creates entering pools.
		var new_pools = pools.enter().append('g')
			.attr('class', 'pool')
		;
		new_pools.append('circle')
			.attr('r', 25)
		;
		var hosts = pools.selectAll('g.host').data(
			function (pool) {
				return pool.hosts;
			},
			function (host) {
				return host.label;
			}
		);
		hosts.enter().append('g')
			.attr('class', 'host')
			.append('circle')
				.attr('r', 15)
				.attr('cx', function (host, i, j) {
					return 0;
				})
		;

		// Sets position for all existing pools.
		var f = coordFunc(
			n,           // Number of pools.
			r_pools,     // Radius of the “pool”-circle.
			2 * Math.PI, // This is a circle so its angle is 2pi.
			0            // No angle shift.
		);
		pools.attr('transform', function (pool, i) {
			return ('translate('+ f(pool, i).join(',') +')');
		});
	};
}();
