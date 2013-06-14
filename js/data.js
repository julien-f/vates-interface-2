!function () {
	'use strict';

	var pools = [];

	setInterval(function () {
		if (pools.length > 20)
		{
			return;
		}

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

		window.refresh(pools);
	}, 1000);

	setInterval(function () {
		pools.splice(_.random(pools.length - 1), 1);

		window.refresh(pools);
	}, 1500);
}();
