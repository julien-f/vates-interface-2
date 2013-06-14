!function () {
	'use strict';

	var height = 1000;
	var margin = 50;
	var width  = 1000;

	// mouse event vars.
	var selected= null,
	    mousedown = null,
	    mouseup = null;

	// Variables de construction des cercles.
	var centrex = 500;
	var centrey = 500;
	var espace = 100;

	// Create the graph.
	var svg = d3.select('body').append('svg')
		.attr('height', height)
		.attr('width', width)
		.attr("pointer-events", "all") // activate all pointers eventss
		.append('g') // create a group to zoom.
			.call(d3.behavior.zoom().on("zoom", redraw)) // construct an area to activate zoom and call
	  ;

	// fonction que redessine le groupe avec les propriété suivant :
	function redraw() {
	  svg.attr("transform",
	      "translate(" + d3.event.translate + ")"
	      + " scale(" + d3.event.scale + ")");
	}

	// rectangle invisble qui permet le zoom partout.
	svg.append('svg:rect')
	    .attr('width', 1000 )
	    .attr('height', 1000 )
	    .attr('fill', 'white');

	window.refresh = function (pools) {
		// d3.js selections.
		var update = svg.selectAll('.pool').data(pools, function(d) { return d.label; });
		var enter  = update.enter();
		var exit  = update.exit();

		////////////////////////////////////////
		// Abscisse des pools.
		var cx = function (d, i) {
			var f = d3.scale.linear()
				.domain([0, 1000])
				.range([0, width]);

			var angleP = 2 * Math.PI / pools.length;
			var angle = angleP*i;
			var x =	Math.cos(angle) * espace + centrey ;
			return f(x);
		};

		// Ordonnée des pools.
		var cy = function (d, i) {
			var f = d3.scale.linear()
				.domain([0, 1000])
				.range([height, 0]);

			var angleP = 2 * Math.PI / pools.length;
			var angle = angleP*i;
			var y = Math.sin(angle) * espace + centrey ;
			return f(y);
		};

		var label = function (d) {
			return d.label;
		}

		////////////////////////////////////////
		// Suppression des groupes non-utilisés.

		// @todo Nice fading.
		exit.transition()
			.duration(50)
			.attr("r", 5)
		.remove();

		////////////////////////////////////////
		// Création des groupes manquants.

		// Groupe.
		var groups = enter.append('g')
			.attr('class', 'pool')
			.attr('transform', 'translate('+ width/2 +', '+ height/2 +') scale(0.5)') // @todo Nicer apparation.
			;

		groups.transition() // @todo How to slow the transition down.
			.attr('transform', function (d, i) {
				return ('translate('+ cx(d, i) +', '+ cy(d, i) +')');
			})
			;

		// Cercle.
		groups.append('circle')
			.attr('fill', 'green')
			.attr('r', 25)
			.attr('stroke', 'gray')
			;

		// Texte.
		groups.append('text')
			.attr('text-anchor', 'left')
			.attr('dx',25)
			.text(label)
			;

		////////////////////////////////////////
		//Interaction.
		// @todo Better alignment of circles and texts.
		////////////////////////////////////////
		// Mise à jour des groupes existants.

		update.transition()
			.duration(800)
			.ease("elastic") // add an elastic effect when death.
			.attr('transform', function (d, i) { // @todo How to slow the transition down.
			return ('translate('+ cx(d, i) +', '+ cy(d, i) +')');
		});
	}
}();
