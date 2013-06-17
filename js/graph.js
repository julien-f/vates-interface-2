!function () {
	'use strict';

	var height = 1000;
	var margin = 50;
	var width  = 1000;

	// mouse event vars.
	var selected  = null;
	var mousedown = null;
	var mouseup   = null;

	// Variables de construction des cercles.
	var r_pools  = 100;

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
    // function when the mouse are on a pool  
	var mouseover = function(d, i) {
		d3.select(this)
			.style('fill', d3.rgb(31, 120, 180));
		svg
			.append('rect')
			.attr('class','info')
			.attr('x',850)
			.attr('y', 0)
			.attr('width', 150 )
			.attr('height',150 )
			.attr('fill','white')
			.attr('stroke', 'black')
			
	};
	
	// function when the mouse are not on a pool  	
	var mouseout =  function(d, i) {
		d3.select(this)
			.style("fill", d3.rgb('green'));
			svg.selectAll('rect').remove()
			svg.selectAll('.infotxt').remove()
	};

	////////////////////////////////////////////////////////////////////////////////

	//Pour les POOLS.
	
    	
	// Abscisse des pools.
	var pool_x = function (d, i) {
		var angleP = 2 * Math.PI / pool_x.n;
		var angle = angleP*i;
		var x =	Math.cos(angle) * r_pools + width/2 ;

		return pool_x.helper(x);
	};
	pool_x.helper = d3.scale.linear()
		.domain([0, width])
		.range([0, width])
		;

	// Ordonnée des pools.
	var pool_y = function (d, i) {

		var angleP = 2 * Math.PI / pool_y.n;
		var angle = angleP*i;
		var y = Math.sin(angle) * r_pools + width/2 ;

		return pool_y.helper(y);
	};
	pool_y.helper = d3.scale.linear()
		.domain([0, height])
		.range([height, 0])
		;

	var label = function (d) {
		return d.label;
	};
	
	////////////////////////////////////////////////////////////////////////////////

	//Pour les HOSTS.
	
   
	// Abscisse des pools.
	var hosts_x = function (d, i,j) {
		var angleP = 2 * Math.PI /pool_x.n;
		var angle = angleP*i;
		var x =	Math.cos(angle) * r_pools + width/2;
		
				
		var angleH = angleP/3 *i - angleP/2 + angleP*j;
		x = Math.cos(angleH) * r_pools * 1.5 ;
	
		return hosts_x.helper(x);
	};
	
	hosts_x.helper = d3.scale.linear()
		.domain([0, width])
		.range([0, width])
		;
	
	// Ordonnée des pools.
	var hosts_y = function (d, i,j) {

		var angleP = 2 * Math.PI / pool_y.n;
		var angle = angleP*i;
		var y = Math.sin(angle) * r_pools + width/2 ;
		
		var angleH = angleP/3 *i - angleP/2 + angleP*j;
		y = Math.cos(angleH) * r_pools * 1.5 ;

		return hosts_y.helper(y);
	};
	
	hosts_y.helper = d3.scale.linear()
		.domain([0, width])
		.range([0, width])
		;
	

	window.refresh = function (pools) {
	
		////////////////////////////////////////////////////////////////////////////////
		// Pour les POOLS.
		
		// d3.js selections.
		var update = graph.selectAll('.pool').data(pools, function(d) { return d.label; });
		var enter  = update.enter();
		var exit   = update.exit();

		// Functions parametrizing.
		pool_x.n = pool_y.n = pools.length;


		////////////////////////////////////////
		// Suppression des groupes non-utilisés.

		exit.transition()
			.duration(50)
			.attr("r", 5)
			.remove()
			;
		
		

		////////////////////////////////////////
		// Création des groupes manquants.

		// Groupe.
		var groups = enter.append('g')
			.attr('class', 'pool')
			.attr('transform', 'translate('+ width/2 +', '+ height/2 +') scale(0.5)')
			;

		groups.transition()
			.attr('transform', function (d, i) {
				return ('translate('+ pool_x(d, i) + ', '+ pool_y(d, i) + ')');
			})
			;

		// Cercle.
		groups.append('circle')
			.attr('fill', 'green')
			.attr('r', 25)
			.attr('stroke', 'gray')
			.on("mouseout", mouseout)
			.on("mouseover",mouseover)
			;

		// Texte.
		groups.append('text')
			.attr('text-anchor', 'left')
			.attr('dx',25) 
			.text(label)
			;
			
			
		////////////////////////////////////////////////////////////////////////////////
		// Pour les HOSTS.	

		
		// d3.js selections.
		var update2 = graph.selectAll('.pool').selectAll('.hosts').data(pools, function(d) { return d.hosts.label; });
		var enter2  = update2.enter();
		var exit2   = update2.exit();


		for (var j = 0 ; j < 3; ++j){
		
			////////////////////////////////////////
			// Suppression des groupes non-utilisés.
	
			exit2.transition()
				.duration(50)
				.attr("r", 5)
				.remove()
				;
				
			////////////////////////////////////////
			// Création des groupes manquants.
	
			// Groupe.
			var hosts = enter2.append('g')
				.attr('class', 'hosts')
				.attr('transform', 'translate('+ width/2 +', '+ height/2 +') scale(0.5)')
				;
	
			hosts.transition()
				.attr('transform', function (d, i) {
					return ('translate('+ hosts_x(d, i) +', '+ hosts_y(d, i) +')');
				})
				;
	
			// Cercle.
			hosts.append('circle')
				.attr('fill', 'blue')
				.attr('r', 25)
				.attr('stroke', 'gray')
				;
				
			update2.transition()
			.duration(800)
			.ease("elastic") // add an elastic effect when death.
			.attr('transform', function (d, i, j) { 
			return ('translate('+ hosts_x(d, i) +', '+ hosts_y(d, i) +')');
		});
		
		};
			
		////////////////////////////////////////////////////////////////////////////////
		// Mise à jour des groupes existants.
	
		update2.transition()
			.duration(800)
			.ease("elastic") // add an elastic effect when death.
			.attr('transform', function (d, i, j) { // @todo How to slow the transition down.
			return ('translate('+ hosts_x(d, i) +', '+ hosts_y(d, i) +')');
		});
		
		update.transition()
			.duration(800)
			.ease("elastic") // add an elastic effect when death.
			.attr('transform', function (d, i) { // @todo How to slow the transition down.
			return ('translate('+ pool_x(d, i) +', '+ pool_y(d, i) +')');
		});
	}
}();
