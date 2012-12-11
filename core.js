///// compute fibonacci

var fibonacci = (function(){

	var sequence = [1,1];

	for (var n = 200; n > 1; n--) {
		var count = sequence.length;
		sequence.push(
			sequence[count-1] + sequence[count-2]
		);
	}

	console.log(sequence);

	return sequence;

})();

///// draw fibonacci

var box = document.getElementById('box');
var count = fibonacci.length;

for (var n = 0; n < count; n++) {
	var div = document.createElement('div');
	var h = fibonacci[n];
	var p = n % 4;
	var o = offset(p,n);
	div.setAttribute('class', 'pos-'+p);
	div.style.cssText
		= ' background-color:' + 'rgb('+rand()+','+rand()+','+rand()+')'
		+ ';height:' + h + 'px'
		+ ';left:' + o.left + 'px'
		+ ';top:' + o.top + 'px'
		+ ';width:' + h + 'px'
		+ ';z-index:' + (count-n);
	box.appendChild(div);
	box = div;
}

///// zoom

document.addEventListener('mousemove', function(e) {
	document.body.style.WebkitTransform = 'scale(' + (e.clientY/window.innerHeight) + ')';
});

///// helpers

function offset(pos, n) {
	var o, f = fibonacci;
	switch (pos) {
		case 0:
			o = [0, f[n-1] || 0];
			break;
		case 1:
			o = [f[n-1], -(f[n-2] || 0)];
			break;
		case 2:
			o = [-(f[n]-f[n-1]), -(f[n])];
			break;
		case 3:
			o = [-f[n], 0];
			break;
	}

	return {
		left: o[0],
		top: o[1]
	};
}

function rand() {
	var lower = 0;
	var upper = 255;
	return Math.floor((Math.random() * (upper-lower+1))+lower);
}