var height = 1000;
var margin = 50;
var width  = 1000;

// Variables
var centrex = 500;
var centrey = 500;
var espace = 100;

// Create the graph.
var svg = d3.select('body').append('svg')
	.attr('height', height)
	.attr('width', width);

function refresh(pools)
{
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
	exit.remove();

	////////////////////////////////////////
	// Création des groupes manquants.

	// Groupe.
	var groups = enter.append('g')
		.attr('class', 'pool')
		.attr('transform', 'translate('+ width/2 +', '+ height/2 +') scale(0)') // @todo Nicer apparation.
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
		.attr('text-anchor', 'middle')
		.text(label)
		;

	// @todo Better alignment of circles and texts.

	////////////////////////////////////////
	// Mise à jour des groupes existants.

	update.transition().attr('transform', function (d, i) { // @todo How to slow the transition down.
		return ('translate('+ cx(d, i) +', '+ cy(d, i) +')');
	});
}
