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

										
	//////////////////////////////////////////////////////////	
	
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
	
	var titlePool = function(d){
	return d.label;
	}	
	
	//////////////////////////////////////////////////////////

	
	//définit pool =  recherche de groupe, par raport au data creation de nouveau groupe si manque . 
	var pool = svg.selectAll(".pool").data(pools, function(d){return d.label})
		.enter()
		.append("g")
		.attr("class","pool")

	
	// update des pools.
	svg.selectAll('circle').data(pools, function(d) { return d.label; })

	// draw circle.
	pool.append("circle")
		.attr("cx",cx)
		.attr("cy",cy)
		.attr("r",  25)
		.attr("fill","green")
		.attr("stroke","gray")
		
	// Exit any old  pool.


}

/*
	// d3.js selections.
	// Update the pool.
	var update = svg.selectAll('circle').data(pools, function(d) { return d.label; });
	var enter  = update.enter();
	var exit  = update.exit();
	
	var updatePool = svg.selectAll('circle').data(pools, function(d) { return d.label; });
	var updateTextPool = svg.selectAll('text').data(pools, function(d) { return d.label; });

	// groupe pool
	
	var pool = svg.selectAll('.pool').data(pools, function(d) { return d.label; })   
		.enter()
		.append("g")
		.attr("class","pool");
					
					
					
	updatePool
		.transition()
		.attr("cx",0)
		.attr("cx", cx)
		.attr("cy", cy)
		.attr("r",  25)
		.attr("fill","green")
		.attr("stroke","gray")
		
	updateTextPool 
		.attr("dx", 0)
        .attr("dy", 0)
		.attr("text-anchor", "middle")
		.text(titlePool);
		
  	// Draw circle with propreties.
	// Enter any new pool.    	
				    
	pool.append("circle")
		.attr("cx", width/2 )
		.attr("cy", height/2 )
		.transition()
	  	.attr("cx", cx)
		.attr("cy", cy)
		.attr("r",  25)
		.attr("fill","green")
		.attr("stroke","gray")
		
	pool.append("text")
		.attr("dx", cx)
        .attr("dy", 0)
        .attr("text-anchor", "middle")
        .text(titlePool);
	 
	 // Exit any old  pool.
	  exit.remove();
	 // Exit any old  label.
	  updateTextPool.exit().remove();

*/