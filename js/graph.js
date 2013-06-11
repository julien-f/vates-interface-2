var height = 1000;
var margin = 50;
var width  = 1000;

// Create the graph.
var svg = d3.select('body').append('svg')
	.attr('height', height)
	.attr('width', width);

function refresh(pools)
{
	// d3.js selections.
	var update = svg.selectAll('circle').data(pools);
	var enter  = update.enter();
	var exist  = update.exit();

	// Update the graph.
	// @todo
}
