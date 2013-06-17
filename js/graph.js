!function () {
	'use strict';

	// Math constants.
	var TWO_PI = 2 * Math.PI;

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
	var graph = svg.append('g')
		.attr('transform', 'translate('+ width/2 +','+ height/2 +')')
	;

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

	/**
	 * This generator returns a function which can be used to
	 * calculate coordinates of points on a arc.
	 *
	 * @param {integer} n The number of points on the arc.
	 * @param {number} r Radius of the arc.
	 * @param {number} alpha Angle of the arc.
	 * @param {number} beta Angle shift from the horizontal.
	 *
	 * @return {function(*, integer): Array.<number>} [description]
	 */
	var coordFunc = function (n, r, alpha, beta)
	{
		var angle = alpha / n;

		return function (d, i) {
			var angle_i = angle * i + beta;

			return [
				Math.cos(angle_i) * r,
				Math.sin(angle_i) * r
			];
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
			n,       // Number of pools.
			r_pools, // Radius of the “pool”-circle.
			TWO_PI,  // This is a circle so its angle is 2pi.
			0        // No angle shift.
		);
		pools.attr('transform', function (pool, i) {
			return ('translate('+ f(pool, i).join(',') +')');
		});
	};
}();
