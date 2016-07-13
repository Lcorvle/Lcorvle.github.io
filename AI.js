var AI = new Object();

var create_rate = [
	3000
];

function AI_start(){
	// var new_soldier = new Object();
	// new_soldier.init = soldier_init;
	// new_soldier.init(1,1);
	// new_soldier.run();
	// soldiers.push(new_soldier);
	this.soldier_1_create = setInterval(function(){
		if(game_end_flag == -1){
			var new_soldier = new Object();
			new_soldier.init = soldier_init;
			var type = Math.random();
			if(type < 0.5){
				new_soldier.init(1,1);
			}
			else{
				new_soldier.init(3,1);
			}
			//new_soldier.init(3,1);
			new_soldier.run();
			soldiers.push(new_soldier);
		}
	}, create_rate[0]);
}