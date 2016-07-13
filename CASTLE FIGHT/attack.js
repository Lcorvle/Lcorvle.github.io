
/*
向首兴 2016/7/11
*/

function attack_decision(){
	if(game_end_flag != -1){
		return;
	}

	if(my_castle.castle_health == 0){
		game_end_flag = 0;
		new_game_button_appear();
		return;
	}
	else if(ai_castle.castle_health == 0){
		game_end_flag = 1;
		new_game_button_appear();
		return;
	}
	//去除掉所有已死亡士兵和已落地弓箭
	for(counti_ad = 0; counti_ad < arrows.length; counti_ad++){
		if(arrows[counti_ad].get_pos_y() > window.innerHeight * 0.9){
			arrows.splice(counti_ad, 1);
			counti_ad--;
		}
	}

	for(counti_ad = 0;counti_ad < soldiers.length;counti_ad++){
		if(soldiers[counti_ad].should_delete){
			if(soldiers[counti_ad].side == 1){
				my_castle.money.add_dollars_by(money_value[soldiers[counti_ad].soldier_type]);
				document.getElementById("my_money").innerText = "Money:" + parseInt(my_castle.money.current_dollars);
			}
			/*这里应该执行诚哥的死亡函数，并通过这是哪一方的士兵来给玩家或者电脑增加资源*/
			soldiers.splice(counti_ad, 1);
			counti_ad--;
		}
	}


	//城堡箭和大招飞行物与士兵的判定
	var counti_ad, countj_ad;
	var left1, right1, top1, bottom1, left2, right2, top2, bottom2;
	for(counti_ad = 0;counti_ad < arrows.length;counti_ad++){
		//判定飞行物是否应该消失
		if(arrows[counti_ad].get_pos_y() > window.innerHeight * 0.9){
			arrows.splice(counti_ad, 1);
			counti_ad--;
			continue;
		}
		//获取箭头坐标
		left1 = arrows[counti_ad].get_pos_x();
		right1 = left1;
		top1 = arrows[counti_ad].get_pos_y();
		bottom1 = top1;
		for(countj_ad = 0;countj_ad < soldiers.length;countj_ad++){
			if(soldiers[countj_ad].soldier_status == 2){
				continue;
			}
			//判断是否敌对
			if(soldiers[countj_ad].side + arrows[counti_ad].get_side() == 1){
				//获取士兵框
				left2 = soldiers[countj_ad].pos_x + soldiers[countj_ad].head_x - soldiers[countj_ad].head_width / 0.6;
				right2 = left2 + soldiers[countj_ad].head_width * 3;
				top2 = soldiers[countj_ad].pos_y;
				bottom2 = top2 + soldiers[countj_ad].height;
				//判断是否相遇
				if(overlap(left1, right1, top1, bottom1, left2, right2, top2, bottom2)){
					//判断是否是第一次相遇
					if(in_array(arrows[counti_ad].attack_targets, soldiers[countj_ad].id) != true){
						arrows[counti_ad].attack_targets.push(in_array(soldiers[countj_ad].id));
						soldiers[countj_ad].health -= arrows[counti_ad].get_power();
						arrows[counti_ad].attack_targets.push(soldiers[countj_ad].id);
					}
				}
			}
		}
	}

	var flag;
	//士兵之间的攻击判定
	for(counti_ad = 0;counti_ad < soldiers.length;counti_ad++){
		//判断该单位是否处于死亡状态
		if(soldiers[counti_ad].soldier_status == 2){
			continue;
		}
		//先判断该单位是电脑的还是玩家的
		if(soldiers[counti_ad].side == 0){
			//判断该单位的攻击范围内是否有敌对存活单位
			flag = false;
			for(countj_ad = 0;countj_ad < soldiers.length;countj_ad++){
				if(soldiers[countj_ad].side == 1 
					&& soldiers[countj_ad].soldier_status != 2){
					if(soldiers[counti_ad].pos_x + soldiers[counti_ad].attack_range
						> soldiers[countj_ad].head_x + soldiers[countj_ad].pos_x
						&& soldiers[counti_ad].pos_x < soldiers[countj_ad].head_x + soldiers[countj_ad].pos_x){
						flag = true;
						break;
					}
				}
			}
			if(soldiers[counti_ad].pos_x >= ai_castle.damage_pos_x){
				flag = true;
			}
			if(flag){//攻击范围内有敌人
				if(soldiers[counti_ad].soldier_status == 0){
					clearInterval(soldiers[counti_ad].run_animate);
			 		soldiers[counti_ad].attack();
					soldiers[counti_ad].soldier_status = 1;
				}
				else if(soldiers[counti_ad].attack_status == 2)
				{
					//soldiers[counti_ad].attack_status = 0;
					for(countj_ad = 0;countj_ad < soldiers.length;countj_ad++){
						if(soldiers[countj_ad].side == 1 
							&& soldiers[countj_ad].soldier_status != 2){
							if(soldiers[counti_ad].pos_x + soldiers[counti_ad].attack_range
								> soldiers[countj_ad].head_x + soldiers[countj_ad].pos_x
								&& soldiers[counti_ad].pos_x < soldiers[countj_ad].head_x + soldiers[countj_ad].pos_x){
								soldiers[countj_ad].health -= soldiers[counti_ad].damage;
							}
						}
					}
					if(soldiers[counti_ad].pos_x >= ai_castle.damage_pos_x){
						//这里应该是敌方城堡生命值减少
						ai_castle.castle_health -= soldiers[counti_ad].damage;
						if(ai_castle.castle_health <= 0){
							ai_castle.castle_health = 0;
						}
						
					}
				}
			}
			else if(soldiers[counti_ad].soldier_status == 1){//攻击状态而攻击范围内无敌人
				clearInterval(soldiers[counti_ad].attack_animate);
				soldiers[counti_ad].soldier_status = 0;
		 		soldiers[counti_ad].run();
			}
		}
		else{
			//判断该单位的攻击范围内是否有敌对存活单位
			flag = false;
			for(countj_ad = 0;countj_ad < soldiers.length;countj_ad++){
				if(soldiers[countj_ad].side == 0 
					&& soldiers[countj_ad].soldier_status != 2){
					if(soldiers[counti_ad].pos_x <= soldiers[countj_ad].head_x + soldiers[countj_ad].pos_x
						&& soldiers[counti_ad].pos_x > soldiers[countj_ad].pos_x){
						flag = true;
						break;
					}
				}
			}
			if(soldiers[counti_ad].pos_x <= my_castle.damage_pos_x){
				flag = true;
			}
			if(flag){//攻击范围内有敌人
				if(soldiers[counti_ad].soldier_status == 0){
					clearInterval(soldiers[counti_ad].run_animate);
					soldiers[counti_ad].soldier_status = 1;
			 		soldiers[counti_ad].attack();
				}
				else if(soldiers[counti_ad].attack_status == 2)
				{
					//soldiers[counti_ad].attack_status = 0;
					for(countj_ad = 0;countj_ad < soldiers.length;countj_ad++){
						if(soldiers[countj_ad].side == 0 
							&& soldiers[countj_ad].soldier_status != 2
							&& soldiers[counti_ad].pos_x <= soldiers[countj_ad].head_x + soldiers[countj_ad].pos_x
							&& soldiers[counti_ad].pos_x > soldiers[countj_ad].pos_x){
							soldiers[countj_ad].health -= soldiers[counti_ad].damage;
						}
					}
					if(soldiers[counti_ad].pos_x <= my_castle.damage_pos_x){
						my_castle.castle_health -= soldiers[counti_ad].damage;
						if(my_castle.castle_health <= 0){
							my_castle.castle_health = 0;
						}

					}
				}
			}
			else if(soldiers[counti_ad].soldier_status == 1){//攻击状态而攻击范围内无敌人
				clearInterval(soldiers[counti_ad].attack_animate);
				soldiers[counti_ad].soldier_status = 0;
		 		soldiers[counti_ad].run();
			}
		}
	}

	for(counti_ad = 0;counti_ad < soldiers.length;counti_ad++){
		soldiers[counti_ad].hp.value_to(Math.max(soldiers[counti_ad].health, 0));
		if(soldiers[counti_ad].health <= 0){
			//判断该单位是否已死亡，如果已死亡，该士兵状态变为死亡状态
			clearInterval(soldiers[counti_ad].attack_animate);
			clearInterval(soldiers[counti_ad].run_animate);
			soldiers[counti_ad].die();
		}
	}
	my_castle_hp.value_to(my_castle.castle_health);
	ai_castle_hp.value_to(ai_castle.castle_health);
};

function overlap(left1, right1, top1, bottom1, left2, right2, top2, bottom2){
	return left1 <= right2 && left2 <= right1 && top1 <= bottom2 && top2 <= bottom1;
};

function in_array(a, item){
	var count_ia;
	for(count_ia = 0;count_ia < a.length;count_ia++){
		if(a[count_ia] == item){
			return true;
		}
	}
	return false;
};

