function game_init(){

	createCanvas();
	//background
	load_background();

	load_menu();

	load_gameboard();

	my_castle = new Object();
	my_castle.init = my_castle_init;
	my_castle.init();

	ai_castle = new Object();
	ai_castle.init = ai_castle_init;
	ai_castle.init();

	AI.ai_start = AI_start;

	//move the map
	document.onmousemove = function(){
		if(has_game_started){
			if(event.clientX <= 5){
				if(!background.is_bg_moving){
					background.bg_animate = setInterval(function(){
						if(background.left_bg < -50){
							background.left_bg += 50;
						}
						else{
							background.left_bg = 0;
						}
						//console.log(background.left_bg);
					}, 20);
					background.is_bg_moving = true;
				}
			}
			else if(event.clientX >= window.innerWidth - 5){
				if(!background.is_bg_moving){
					background.bg_animate = setInterval(function(){
						if(background.left_bg > window.innerWidth - background.width + 50){
							background.left_bg -= 50;
						}
						else{
							background.left_bg = window.innerWidth - background.width;
						}
						//console.log(background.left_bg);
					}, 20);
					background.is_bg_moving = true;
				}
			}
			else if(event.clientX > 5 && event.clientX < window.innerWidth - 5){
				clearInterval(background.bg_animate);
				background.is_bg_moving = false;
			}
		}
	}

}

function load_gameboard(){
	/*------create soldier--------------------*/
	//solider 0
	var soldier0_section = document.createElement('div');
	soldier0_section.setAttribute('id','soldier0_section');

	var soldier0_head = document.createElement('img');
	soldier0_head.setAttribute("src", soldier_head_src[0]);
	soldier0_section.appendChild(soldier0_head);
	soldier0_section.setAttribute("class", 'game_board_section');
	document.body.appendChild(soldier0_section);
	soldier0_section.style.top = -soldier0_section.clientHeight + 'px';
	soldier0_section.style.left = (window.innerWidth - soldier0_section.clientWidth)/ 2;
	soldier0_section.is_cd = false;


	var soldier0_money = document.createElement('a');
	soldier0_money.setAttribute('id', 'soldier0_money');
	soldier0_money.setAttribute('class', 'soldier_money');
	soldier0_money.innerText = "" + money_value[0];
	document.body.appendChild(soldier0_money);
	soldier0_money.style.top = '-100px';
	soldier0_money.style.left = (window.innerWidth - soldier0_section.clientWidth)/ 2 + 30 * scale;

	
	soldier0_section.onclick = function(){
		if(has_game_started && !this.is_cd && my_castle.money.current_dollars >= money_value[0]){
			my_castle.money.current_dollars -= money_value[0];
			document.getElementById("my_money").innerText = "Money:" + parseInt(my_castle.money.current_dollars);
			//create
			var new_soldier = new Object();
			new_soldier.init = soldier_init;
			new_soldier.init(0,0);
			new_soldier.run();
			soldiers.push(new_soldier);


			//cd
			soldier0_section.is_cd = true;
			var soldier0_section_disappear = setInterval(function(){
				if(parseInt(soldier0_section.style.top) > -soldier0_section.clientHeight + 20){
					soldier0_section.style.top = parseInt(soldier0_section.style.top) - 20 +'px';
					soldier0_money.style.top = parseInt(soldier0_section.style.top) + 100 +'px';

				}
				else{
					soldier0_section.style.top = -soldier0_section.clientHeight + 'px';
					soldier0_money.style.top = parseInt(soldier0_section.style.top) + 100 +'px';
					clearInterval(soldier0_section_disappear);
					soldier0_section_reload = setInterval(function(){
						if(parseInt(soldier0_section.style.top) < -20 - (soldier0_section.clientHeight - 20) / (cd[0] / 20) ){

							//console.log((soldier0_section.clientHeight - 20) / (cd[0] / 20));
							soldier0_section.style.top = parseInt(soldier0_section.style.top) + 
							(soldier0_section.clientHeight - 20) / (cd[0] / 20) + 'px';
							soldier0_money.style.top = parseInt(soldier0_section.style.top) + 100 +'px';
						}
						else{
							soldier0_section.style.top = '-20px';
							soldier0_money.style.top = parseInt(soldier0_section.style.top) + 100 +'px';
							clearInterval(soldier0_section_reload);
							soldier0_section.is_cd = false;
						}
					},20);
				}
			}, 20)
		}
	}

	//soldier2

	var soldier2_section = document.createElement('div');
	soldier2_section.setAttribute('id','soldier2_section');

	var soldier2_head = document.createElement('img');
	soldier2_head.setAttribute("src", soldier_head_src[1]);
	soldier2_section.appendChild(soldier2_head);
	soldier2_section.setAttribute("class", 'game_board_section');
	document.body.appendChild(soldier2_section);
	soldier2_section.style.top = -soldier2_section.clientHeight - 100 + 'px';
	soldier2_section.style.left = parseInt(soldier0_section.style.left) + soldier0_section.clientWidth + 'px';
	soldier2_section.is_cd = false;

	var soldier2_money = document.createElement('a');
	soldier2_money.setAttribute('id', 'soldier2_money');
	soldier2_money.setAttribute('class', 'soldier_money');
	soldier2_money.innerText = "" + money_value[2];
	document.body.appendChild(soldier2_money);
	soldier2_money.style.top = '-100px';
	soldier2_money.style.left = (window.innerWidth - soldier0_section.clientWidth)/ 2 + 35 * scale + soldier0_section.clientWidth;


	soldier2_section.onclick = function(){
		if(has_game_started && !this.is_cd && my_castle.money.current_dollars >= money_value[2]){
			my_castle.money.current_dollars -= money_value[2];
			document.getElementById("my_money").innerText = "Money:" + parseInt(my_castle.money.current_dollars);
			//create
			var new_soldier = new Object();
			new_soldier.init = soldier_init;
			new_soldier.init(2,0);
			new_soldier.run();
			soldiers.push(new_soldier);


			//cd
			soldier2_section.is_cd = true;
			var soldier2_section_disappear = setInterval(function(){
				if(parseInt(soldier2_section.style.top) > -soldier2_section.clientHeight + 20){
					soldier2_section.style.top = parseInt(soldier2_section.style.top) - 20+'px';
					soldier2_money.style.top = parseInt(soldier2_section.style.top) + 100 +'px';
				}
				else{
					soldier2_section.style.top = -soldier2_section.clientHeight + 'px';
					soldier2_money.style.top = parseInt(soldier2_section.style.top) + 100 +'px';
					clearInterval(soldier2_section_disappear);
					soldier2_section_reload = setInterval(function(){
						if(parseInt(soldier2_section.style.top) < -20 - (soldier2_section.clientHeight - 20) / (cd[1] / 20) ){

							//console.log((soldier2_section.clientHeight - 20) / (cd[1] / 20));
							soldier2_section.style.top = parseInt(soldier2_section.style.top) + 
							(soldier2_section.clientHeight - 20) / (cd[1] / 20) + 'px';
							soldier2_money.style.top = parseInt(soldier2_section.style.top) + 100 +'px';
						}
						else{
							soldier2_section.style.top = '-20px';
							soldier2_money.style.top = parseInt(soldier2_section.style.top) + 100 +'px';
							clearInterval(soldier2_section_reload);
							soldier2_section.is_cd = false;
						}
					},20);
				}
			}, 20)
		}
	}	

	//soldier4
	var soldier4_section = document.createElement('div');
	soldier4_section.setAttribute('id','soldier4_section');

	var soldier4_head = document.createElement('img');
	soldier4_head.setAttribute("src", soldier_head_src[2]);
	soldier4_section.appendChild(soldier4_head);
	soldier4_section.setAttribute("class", 'game_board_section');
	document.body.appendChild(soldier4_section);
	soldier4_section.style.top = -soldier4_section.clientHeight - 200 + 'px';
	soldier4_section.style.left = parseInt(soldier2_section.style.left) + soldier2_section.clientWidth + 'px';
	soldier4_section.is_cd = false;

	var soldier4_money = document.createElement('a');
	soldier4_money.setAttribute('id', 'soldier4_money');
	soldier4_money.setAttribute('class', 'soldier_money');
	soldier4_money.innerText = "" + money_value[4];
	document.body.appendChild(soldier4_money);
	soldier4_money.style.top = '-100px';
	soldier4_money.style.left = (window.innerWidth - soldier0_section.clientWidth)/ 2 + 35 * scale 
						+ soldier0_section.clientWidth + soldier2_section.clientWidth;

	soldier4_section.onclick = function(){
		if(has_game_started && !this.is_cd && my_castle.money.current_dollars >= money_value[4]){
			my_castle.money.current_dollars -= money_value[4];
			document.getElementById("my_money").innerText = "Money:" + parseInt(my_castle.money.current_dollars);
			//create
			var new_soldier = new Object();
			new_soldier.init = soldier_init;
			new_soldier.init(4,0);
			new_soldier.run();
			soldiers.push(new_soldier);


			//cd
			soldier4_section.is_cd = true;
			var soldier4_section_disappear = setInterval(function(){
				if(parseInt(soldier4_section.style.top) > -soldier4_section.clientHeight + 20){
					soldier4_section.style.top = parseInt(soldier4_section.style.top) - 20+'px';
					soldier4_money.style.top = parseInt(soldier4_section.style.top) + 100 +'px';
				}
				else{
					soldier4_section.style.top = -soldier4_section.clientHeight + 'px';
					soldier4_money.style.top = parseInt(soldier4_section.style.top) + 100 +'px';
					clearInterval(soldier4_section_disappear);
					soldier4_section_reload = setInterval(function(){
						if(parseInt(soldier4_section.style.top) < -20 - (soldier4_section.clientHeight - 20) / (cd[2] / 20)){

							//console.log((soldier4_section.clientHeight - 20) / (cd[2] / 20));
							soldier4_section.style.top = parseInt(soldier4_section.style.top) + 
							(soldier4_section.clientHeight - 20) / (cd[2] / 20) + 'px';
							soldier4_money.style.top = parseInt(soldier4_section.style.top) + 100 +'px';
						}
						else{
							soldier4_section.style.top = '-20px';
							soldier4_money.style.top = parseInt(soldier4_section.style.top) + 100 +'px';
							clearInterval(soldier4_section_reload);
							soldier4_section.is_cd = false;
						}
					},20);
				}
			}, 20)
		}
	}	

	/*----------------------------------------------*/
	/*-------xsx---create new_game_button----------------------------*/
	var new_game_button = document.createElement("div");
	new_game_button.setAttribute("id","new_game_button");

	var new_game_text = document.createElement("a");
	new_game_text.setAttribute("id", "new_game_text");
	new_game_text.innerHTML = "New Game";
	new_game_button.appendChild(new_game_text);

	document.body.appendChild(new_game_button);

	new_game_button.style.top = '-200px';
	new_game_button.style.left = (window.innerWidth - new_game_button.clientWidth) / 2;
	new_game_button.onclick = function(){
		if(game_end_flag == 2){
			game_end_flag = 3;
			reset_data();
			var temp_button = document.getElementById("new_game_button");
			var button_die_animate = setInterval(function(){
				if(parseInt(temp_button.style.top) < window.innerHeight){
					temp_button.style.top = parseInt(temp_button.style.top) + 10 + 'px';
				}
				else{
					temp_button.style.top = '-200px';
					clearInterval(button_die_animate);
				}
			},20)
		}
	};
	/*---------------------------------------------------------------*/


	/*-----------xsx---------create arrow---------------------------------------------------------------------------------------*/
	var arrow_switch = document.createElement('div');
	arrow_switch.setAttribute('id','arrow_switch');

	var arrow_img = document.createElement('img');
	arrow_img.setAttribute("src", "Resource/image/arrow_launcher.gif");
	arrow_switch.appendChild(arrow_img);
	document.body.appendChild(arrow_switch);
	arrow_switch.style.top = 210 +"px";
	arrow_switch.style.left = "-130px";
	arrow_numbers.init = HP_init;
	arrow_numbers.init("arrow_number", "arrow_number_bg", 10, 200, 120 , 45, 1, arrow_total_number);
	my_castle_hp.init = HP_init;
	my_castle_hp.init("castle_hp", "castle_hp_bg", 10, 300, 30 , 300, 1, 5000);
	ai_castle_hp.init = HP_init;
	ai_castle_hp.init("castle_hp", "castle_hp_bg", 200, 300, 30 , 300, 1,  5000);
	create_arrow();
	arrow_increasing();
	
	arrow_switch.onclick = function(){
		if(has_game_started){
			if(arrow_on){
				arrow_on = false;
			}
			else{
				arrow_on = true;
			}
		}
	};

	var support_switch = document.createElement('div');
	support_switch.setAttribute('id','support_switch');

	var support_img = document.createElement('img');
	support_img.setAttribute("src", "Resource/image/arrow.gif");
	support_switch.appendChild(support_img);
	document.body.appendChild(support_switch);
	support_switch.style.top = 140 +"px";
	support_switch.style.left = "-130px";
	support_energy.init = HP_init;
	support_energy.init("arrow_number", "arrow_number_bg", 10, 130, 120 , 45, 1, support_total_energy);
	support_energy_increasing();
	
	support_switch.onclick = function(){
		if(has_game_started){
			if(support_energy.get_current_value() == support_total_energy){
				support_energy.value_to(0);
				call_support();
			}
		}
	};
	/*--------------------------------------------------------------------------------------------------------------------------*/
	

	/*-------------------arrow_control--------------*/

	var arrow_up = document.createElement('div');
	arrow_up.setAttribute('id', 'arrow_control_up');
	document.body.appendChild(arrow_up);
	arrow_up.style.top = -window.innerHeight * 0.06 + 'px';
	//arrow_up.style.top = window.innerHeight * 0.02 + 'px';
	

	arrow_up.onmousedown = function(){
		if(!my_castle.arrow_tower.is_spinning)
		{
			my_castle.arrow_tower.spinning_direction = -1;
			my_castle.arrow_tower.spin();
			my_castle.arrow_tower.should_stop = false;
		}
		this.style.borderBottomColor = '#07fb12';
	}

	arrow_up.onmouseup = function(){
		my_castle.arrow_tower.should_stop = true;
		this.style.borderBottomColor= '#07d2fb';
	}

	arrow_up.onmouseout = function(){
		my_castle.arrow_tower.should_stop = true;
		this.style.borderBottomColor = '#07d2fb';
	}

	var arrow_text = document.createElement('a');
	arrow_text.setAttribute('id', 'arrow_text');
	arrow_text.innerHTML = 'ARROW';
	document.body.appendChild(arrow_text);
	arrow_text.style.top = parseInt(arrow_up.style.top) + (window.innerHeight * 0.06 - arrow_text.clientHeight)/2 + 'px'; 
	arrow_text.style.left = window.innerWidth * 0.09;

	/*----------xsx------------money-show-----------------------------*/
	var my_money = document.createElement('a');
	my_money.setAttribute('id', 'my_money');
	my_money.innerText = 'Money:' + 1000;
	document.body.appendChild(my_money);
	my_money.style.top = parseInt(arrow_up.style.top) + (window.innerHeight * 0.06 - arrow_text.clientHeight)/2 + 'px';
	my_money.style.left = window.innerWidth * 0.25;

	/*----------------------------------------------------------------*/

	var arrow_down = document.createElement('div');
	arrow_down.setAttribute('id', 'arrow_control_down');
	document.body.appendChild(arrow_down);
	arrow_down.style.top = parseInt(arrow_up.style.top);
	arrow_down.style.left = window.innerWidth * 0.09 + arrow_text.clientWidth;
	

	arrow_down.onmousedown = function(){
		if(!my_castle.arrow_tower.is_spinning)
		{
			my_castle.arrow_tower.spinning_direction = 1;
			my_castle.arrow_tower.spin();
			my_castle.arrow_tower.should_stop = false;
		}
		this.style.borderTopColor = '#07fb12';
	}

	arrow_down.onmouseup = function(){
		my_castle.arrow_tower.should_stop = true;
		this.style.borderTopColor = '#07d2fb';
	}

	arrow_down.onmouseout = function(){
		my_castle.arrow_tower.should_stop = true;
		this.style.borderTopColor = '#07d2fb';
	}

	/*--------------------------------------------*/
}

function load_background(){
	var ctx_gi = document.getElementById("game_canvas").getContext('2d');

	background = new Image();
	background.src = 'Resource/image/bg3.jpg';
	background.onload = function(){
		background_ready = true;
		background.is_bg_moving = false;
		background.width = background.width * scale;
		background.height = window.innerHeight;
	    background.left_bg = -(background.width - window.innerWidth)/2;
		ctx_gi.drawImage(background,background.left_bg,0,background.width,background.height);
	}
}

function load_menu(){
	var title = document.createElement("div");
	title.setAttribute("id","game_title");
	title.innerHTML = "CASTLE FIGHT";
	document.body.appendChild(title);
	title.style.top = window.innerHeight * 0.20;

	var start_button = document.createElement("div");
	start_button.setAttribute("id","start_button");
	start_button.setAttribute("class","menu_button");

	var start_text = document.createElement("a");
	start_text.setAttribute("class", "menu_text");
	start_text.innerHTML = "START";
	start_button.appendChild(start_text);

	document.body.appendChild(start_button);

	start_button.style.top = window.innerHeight / 2 + 'px';
	start_button.style.left = (window.innerWidth - start_button.clientWidth)/2;

	//click start animate
	start_button.onclick = function(){

		var audio = document.createElement("audio");
		audio.src = "Resource/music/bgm.mp3";
		audio.setAttribute('loop', 'loop');
		audio.play();
		
		/*-----------titlego--------------------*/
		var temp_title = document.getElementById("game_title");
		var title_die_animate = setInterval(function(){
			if(parseInt(temp_title.style.top) > -temp_title.clientHeight + 10){
				temp_title.style.top = parseInt(temp_title.style.top) - 10 + 'px';
				has_game_started = false;
			}
			else{
				temp_title.style.top = -temp_title.clientHeight + 'px';
				clearInterval(title_die_animate);
				has_game_started = true;
			}
		}, 20)

		var temp_button = document.getElementById("start_button");
		var button_die_animate = setInterval(function(){
			if(parseInt(temp_button.style.top) < window.innerHeight - 10){
				temp_button.style.top = parseInt(temp_button.style.top) + 10 + 'px';
				has_game_started = false;
			}
			else{
				temp_button.style.top = window.innerHeight + 'px';
				clearInterval(button_die_animate);
				has_game_started = true;
			}
		},20)

		/*-----------create---------*/
		var temp_section0 = document.getElementById("soldier0_section");
		var temp_money0 = document.getElementById("soldier0_money");
		var soldier0_section_appear_animate = setInterval(function(){
			if(parseInt(temp_section0.style.top) < -30){
				temp_section0.style.top = parseInt(temp_section0.style.top) + 10 + 'px';
				temp_money0.style.top = parseInt(temp_section0.style.top) + 100 +'px';
				has_game_started = false;
			}
			else{
				temp_section0.style.top = '-20px';
				temp_money0.style.top = parseInt(temp_section0.style.top) + 100 +'px';
				has_game_started = true;
				clearInterval(soldier0_section_appear_animate);
			}
			
		},20)

		var temp_section2 = document.getElementById("soldier2_section");
		var temp_money2 = document.getElementById("soldier2_money");
		var soldier2_section_appear_animate = setInterval(function(){
			if(parseInt(temp_section2.style.top) < -30){
				temp_section2.style.top = parseInt(temp_section2.style.top) + 10 + 'px';
				temp_money2.style.top = parseInt(temp_section2.style.top) + 100 +'px';
				has_game_started = false;
			}
			else{
				temp_section2.style.top = '-20px';
				temp_money2.style.top = parseInt(temp_section2.style.top) + 100 +'px';
				has_game_started = true;
				clearInterval(soldier2_section_appear_animate);
			}
			
		},20)

		var temp_section4 = document.getElementById("soldier4_section");
		var temp_money4 = document.getElementById("soldier4_money");
		var soldier4_section_appear_animate = setInterval(function(){
			if(parseInt(temp_section4.style.top) < -30){
				temp_section4.style.top = parseInt(temp_section4.style.top) + 10 + 'px';
				temp_money4.style.top = parseInt(temp_section4.style.top) + 100 +'px';
				has_game_started = false;
			}
			else{
				temp_section4.style.top = '-20px';
				temp_money4.style.top = parseInt(temp_section4.style.top) + 100 +'px';
				has_game_started = true;
				clearInterval(soldier4_section_appear_animate);
			}
		},20)
		/*----------------------------*/
		/*-----------arrow--------------*/
		var temp_up = document.getElementById('arrow_control_up');
		var temp_up_appear_animate = setInterval(function(){
			if(parseInt(temp_up.style.top) < window.innerHeight * 0.02 - 10){
				temp_up.style.top = parseInt(temp_up.style.top) + 10 + 'px';
				has_game_started = false;
			}
			else{
				temp_up.style.top = window.innerHeight * 0.02 + 'px';
				clearInterval(temp_up_appear_animate);
				has_game_started = true;
			}
		}, 50);

		var temp_text = document.getElementById('arrow_text');
		var temp_text_appear_animate = setInterval(function(){
			if(parseInt(temp_text.style.top) < window.innerHeight * 0.02 - 10){
				temp_text.style.top = parseInt(temp_text.style.top) + 10 + 'px';
				has_game_started = false;
			}
			else{
				temp_text.style.top = window.innerHeight * 0.03 + 'px';
				clearInterval(temp_text_appear_animate);
				has_game_started = true;
			}
		}, 50);

		var temp_money = document.getElementById('my_money');
		var temp_money_appear_animate = setInterval(function(){
			if(parseInt(temp_money.style.top) < window.innerHeight * 0.02 - 10){
				temp_money.style.top = parseInt(temp_money.style.top) + 10 + 'px';
				has_game_started = false;
			}
			else{
				temp_money.style.top = window.innerHeight * 0.03 + 'px';
				clearInterval(temp_money_appear_animate);
				has_game_started = true;
			}
		}, 50);

		var temp_arrow_switch = document.getElementById('arrow_switch');
		var temp_arrow_switch_appear_animate = setInterval(function(){
			if(parseInt(temp_arrow_switch.style.left) < 0){
				temp_arrow_switch.style.left = parseInt(temp_arrow_switch.style.left) + 5 + 'px';
				has_game_started = false;
			}
			else{
				temp_arrow_switch.style.left = '0px';
				clearInterval(temp_arrow_switch_appear_animate);
				has_game_started = true;
			}
		}, 5);

		var temp_support_switch = document.getElementById('support_switch');
		var temp_support_switch_appear_animate = setInterval(function(){
			if(parseInt(temp_support_switch.style.left) < 0){
				temp_support_switch.style.left = parseInt(temp_support_switch.style.left) + 5 + 'px';
				has_game_started = false;
			}
			else{
				temp_support_switch.style.left = '0px';
				clearInterval(temp_support_switch_appear_animate);
				has_game_started = true;
			}
		}, 5);

		var temp_down = document.getElementById('arrow_control_down');
		var temp_down_appear_animate = setInterval(function(){
			if(parseInt(temp_down.style.top) < window.innerHeight * 0.02 - 10){
				temp_down.style.top = parseInt(temp_down.style.top) + 10 + 'px';
				has_game_started = false;
			}
			else{
				temp_down.style.top = window.innerHeight * 0.02 + 'px';
				clearInterval(temp_down_appear_animate);
				has_game_started = true;
			}
		}, 50);

		AI.ai_start();

	}
}

function all_image_init(){
	arrow_launcher_image = new Object();
	arrow_launcher_image.ready = false;
	arrow_launcher_image.image = new Image();
	arrow_launcher_image.image.src = 'Resource/image/arrow_launcher.gif';
	arrow_launcher_image.image.onload = function(){
		arrow_launcher_image.ready = true;
		arrow_launcher_image.image.width *= scale;
		arrow_launcher_image.image.height *= scale;
	}

	arrow_man_image = new Object();
	arrow_man_image.ready_spin0 = false;
	arrow_man_image.ready_spin1 = false;
	arrow_man_image.ready_spin2 = false;

	arrow_man_image.image_spin0 = new Image();
	arrow_man_image.image_spin1 = new Image();
	arrow_man_image.image_spin2 = new Image();

	arrow_man_image.image_spin0.src = 'Resource/image/arrow_man_0.gif';
	arrow_man_image.image_spin1.src = 'Resource/image/arrow_man_1.gif';
	arrow_man_image.image_spin2.src = 'Resource/image/arrow_man_2.gif';

	arrow_man_image.image_spin0.onload = function(){
		arrow_man_image.ready_spin0 = true;
		arrow_man_image.image_spin0.width *= scale;
		arrow_man_image.image_spin0.height *= scale;
	}

	arrow_man_image.image_spin1.onload = function(){
		arrow_man_image.ready_spin1 = true;
		arrow_man_image.image_spin1.width *= scale;
		arrow_man_image.image_spin1.height *= scale;
	}

	arrow_man_image.image_spin2.onload = function(){
		arrow_man_image.ready_spin2 = true;
		arrow_man_image.image_spin2.width *= scale;
		arrow_man_image.image_spin2.height *= scale;
	}

	
	//init soldier_image
	for(var i = 0; i < soldier_type; i++)
	{
		var image_element = new Object();
		image_element.run0 = new Image();
		image_element.run1 = new Image();
		image_element.run2 = new Image();
		image_element.attack0 = new Image();
		image_element.attack1 = new Image();
		image_element.attack2 = new Image();

		image_element.run0_ready = false;
		image_element.run1_ready = false;
		image_element.run2_ready = false;
		image_element.attack0_ready = false;
		image_element.attack1_ready = false;
		image_element.attack2_ready = false;

		image_element.run0.src = soldier_image_src[i].run0;
		image_element.run1.src = soldier_image_src[i].run1;
		image_element.run2.src = soldier_image_src[i].run2;
		image_element.attack0.src = soldier_image_src[i].attack0;
		image_element.attack1.src = soldier_image_src[i].attack1;
		image_element.attack2.src = soldier_image_src[i].attack2;

		image_element.run0.onload = function () {
			image_element.run0_ready = true;
		}

		image_element.run1.onload = function () {
			image_element.run1_ready = true;
		}

		image_element.run2.onload = function () {
			// image_element.run2.width *= scale * soldier_scale;
			// image_element.run2.height *= scale * soldier_scale;
			image_element.run2_ready = true;
		}

		image_element.attack0.onload = function () {
			image_element.attack0_ready = true;
		}

		image_element.attack1.onload = function () {
			image_element.attack1_ready = true;
		}

		image_element.attack2.onload = function () {
			image_element.attack2_ready = true;
		}

		soldier_image_array.push(image_element);
	}

	//die
	for(var i = 0; i < 2; i++)
	{
		var die_image = new Object();
		die_image.die0 = new Image();
		die_image.die0.src = soldier_die_src[i].die0;
		die_image.die1 = new Image();
		die_image.die1.src = soldier_die_src[i].die1;

		die_image.die0_ready = false;
		die_image.die1_ready = false;

		die_image.die0.onload = function(){
			die_image.die0_ready = true;
		}

		die_image.die1.onload = function(){
			die_image.die1_ready = true;
		}

		soldier_die_image.push(die_image);
	}
}

/*--------------------xsx------------------------------------*/
function create_arrow(){
	if(arrow_on && arrow_numbers.get_current_value() > 0){
		var new_arrow = new Object();
		new_arrow.init = arrow_init;
		var angle_temp = -my_castle.arrow_tower.current_degree;
		new_arrow.init("arrow_image",
						arrow_width * scale * arrow_scale,
						arrow_height * scale * arrow_scale,
						 arrow_speed, arrow_power,
						 my_castle.arrow_tower.arrow_launcher_pos_x + arrow_launcher_image.image.width / 2, 
						 my_castle.arrow_tower.arrow_launcher_pos_y + arrow_launcher_image.image.height/2, angle_temp, arrow_gradient);
		arrows.push(new_arrow);
		arrow_numbers.value_to(arrow_numbers.get_current_value() - 1);
		if(arrow_numbers.get_current_value() == 0){
			arrow_on = false;
		}
	}
	setTimeout("create_arrow()", arrow_using_speed);
};

function arrow_increasing(){
	if(arrow_numbers.get_current_value() < arrow_total_number){
		arrow_numbers.value_to(arrow_numbers.get_current_value() + 1);
	}
	setTimeout("arrow_increasing()", arrow_increase_speed);
};

function support_energy_increasing(){
	if(support_energy.get_current_value() < support_total_energy){
		support_energy.value_to(support_energy.get_current_value() + 1);
	}
	setTimeout("support_energy_increasing()", support_energy_increase_speed);
};
/*-----------------------------------------------------------*/