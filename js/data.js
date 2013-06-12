!function (){
	var pools = [];

	setInterval(function() {
		var pool = {
			'label': 'Pool ' + _.random(1000),
			'hosts': [
				{ 'label': 'Host 1' },
				{ 'label': 'Host 2' },
				{ 'label': 'Host 3' },
				{ 'label': 'Host 4' },
			]
		};
		pools.push(pool);

		refresh(pools);
	}, 1000);

	setInterval(function() {
		pools.splice(_.random(pools.length - 1), 1);

		refresh(pools);
	}, 1500);
}();
