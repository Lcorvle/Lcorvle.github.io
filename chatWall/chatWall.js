/*
向首兴 2016/7/7
*/

/*整体设置：隐藏滚动条----------------------------*/
document.documentElement.style.overflow='hidden';


/*获取画布和公告的节点----------------------------*/
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var inform = document.getElementById("marquee4");
inform.innerText = "公告测试：这是一条假的公告~~~";
inform.style.background = "rgb(239,228,176)";
inform.scrollAmount = 10;


/*初始化前四条消息的绘制坐标、获得marquee节点并初始化滚动速度-----*/
var posX = window.innerWidth * 0.05;;
var posY = [];
var marquees = [];
var marqueesVisibleBeginIndex = 0;
var Count;
for(Count = 0;Count < 4;Count++)
{
	posY[Count] = window.innerHeight * (Count + 1.4) * 0.25;
	marquees[Count] = document.getElementById("marquee" + Count);
	marquees[Count].scrollAmount = 15;
}
posY[3] = -1000;


/*自定义的消息队列，包含管理员消息和普通消息，以popBeginFlag分隔。
前三个为正在显示的消息，popBeginFlag之前是管理员消息。
Push添加一条普通消息到末尾，Pop删除第一条普通消息，
adminPush添加一条管理员消息，如果已有管理员消息，覆盖，
否则占据第一个位置，将所有普通消息右移。
busy用于避免pop和push同时进行*/
var messageQueue = {
	popBeginFlag: 0,
	queueLength: 0,
	messages: [],
	busy: false,
	queuePush: function(message){
		while(this.busy){};
		this.busy = true;
		this.messages[this.queueLength] = message;
		this.queueLength++;
		this.busy = false;
	},
	queuePop: function(){
		while(this.busy){};
		this.busy = true;
		this.queueLength--;
		marqueesVisibleBeginIndex = marqueesVisibleBeginIndex + 1;
		marqueesVisibleBeginIndex = marqueesVisibleBeginIndex % 4;
		var queueCount;
		for(queueCount = this.popBeginFlag;queueCount < this.queueLength;queueCount++){
			this.messages[queueCount] = this.messages[queueCount + 1];
		}
		this.busy = false;
	},
	adminPush: function(){
		addAdminMessage();
	}
};


/*管理员的头像，因为保存最新的管理员消息的消息对象*/
var adminHead = new Image();
adminHead.src = "admin.jpg";
var adminMessage = new Object();
adminMessage.headimgurl = adminHead;


/*管理员消息的添加与定时删除，采用的是setTimeout方法。
涉及到busy锁，因此时间会在10s上下浮动，但通过调节函数重调时间，误差不会超过1s
下面两个函数一个是将管理员消息置顶，另一个将管理员消息设置为普通消息
置顶管理员消息考虑可当前存在管理员消息的情况，先取消掉之前的定时，然后覆盖并添加新计时------------*/
var adminDeleteTimer, adminAddTimer;
function addAdminMessage(){
	if(changeFinish && !messageQueue.busy)
	{
		if(messageQueue.popBeginFlag == 0)
		{
			changeFinish = false;
			messageQueue.busy = true;
			messageQueue.popBeginFlag = 1;
			marqueesVisibleBeginIndex = marqueesVisibleBeginIndex + 3;
			marqueesVisibleBeginIndex = marqueesVisibleBeginIndex % 4;
			messageQueue.queueLength++;
			var addAdminCount;
			for(addAdminCount = messageQueue.queueLength;addAdminCount > 0;addAdminCount--){
				messageQueue.messages[addAdminCount] = messageQueue.messages[addAdminCount - 1];
			}
			var newAdminMessage = new Object();
			newAdminMessage.headimgurl = adminMessage.headimgurl;
			newAdminMessage.content = adminMessage.content;
			newAdminMessage.nickname = adminMessage.nickname;
			messageQueue.messages[0] = newAdminMessage;
			adminAddTimer = setTimeout("deleteAdminMessage()", 10000);
			changeFinish = true;
			messageQueue.busy = false;
		}
		else
		{

			changeFinish = false;
			messageQueue.busy = true;
			clearTimeout(adminAddTimer);
			clearTimeout(adminDeleteTimer);
			messageQueue.popBeginFlag = 1;
			var newAdminMessage = new Object();
			newAdminMessage.headimgurl = adminMessage.headimgurl;
			newAdminMessage.content = adminMessage.content;
			newAdminMessage.nickname = adminMessage.nickname;
			messageQueue.messages[0] = newAdminMessage;
			adminAddTimer = setTimeout("deleteAdminMessage()", 10000);
			changeFinish = true;
			messageQueue.busy = false;
		}
	}
	else
	{
		adminAddTimer = setTimeout("addAdminMessage()", 5);
	}
}
function deleteAdminMessage(){
	if(changeFinish)
	{
		changeFinish = false;
		messageQueue.popBeginFlag = 0;
		changeFinish = true;
	}
	else
	{
		setTimeout("deleteAdminMessage()", 5);
	}
}


/*网络接口部分：对普通消息和管理员消息的监听
管理员消息采用的是统一的实现预加载的本地图片
普通消息的图片需要加载，因此通过onload函数保证了其加载正确*/
var socket = io('https://wall.cgcgbcbc.com/');
socket.on("new message", function(data){
	var newMessage = new Object();
	var head = new Image();
	head.src = data['headimgurl'];
	head.onload = (function(data){
		newMessage.headimgurl = head;
		newMessage.content = data['content'];
		newMessage.nickname = data['nickname'];
		messageQueue.queuePush(newMessage);
	    console.log(data);
	})(data);
});
socket.on("admin", function(data){
	adminMessage.content = data['content'];
	adminMessage.nickname = data['nickname'];
	messageQueue.adminPush();
	console.log(data);
});


/*画布的自适应工具函数，作用是使画布与窗口等大、适应--------------*/
function resizeCanvas() {  
	canvas.setAttribute("width", window.innerWidth * 0.98);  
 	canvas.setAttribute("height", window.innerHeight * 0.98);
};


/*公告的自适应工具函数，作用是控制公告的位置，宽度，其高度在CSS文件中已设定*/
function resizeInform() {  
	inform.setAttribute("width", window.innerWidth * 0.98 + "px");  
 	inform.style["margin-left"] = "0px";
};


/*背景图片加载区------------------------------------------------*/
var backgroundImage = new Image();//整个墙背景图片
backgroundImage.src = "background.jpg";

var messageBackgroundImage = new Image();//单条普通信息背景图片
messageBackgroundImage.src = "messageBackground.png";

var adminMessageBackgroundImage = new Image();//管理员信息背景图片
adminMessageBackgroundImage.src = "adminMessageBackground.png";


/*绘制函数，作用是负责按照posX和posY[4]来当前显示的三条消息，若是正处于消息更替，则是绘制四条消息。-------------------------------------------------
在整个工程中维护了一个marqueesVisibleBeginIndex变量，用以避免marquee的频繁无效赋值，保证了整条信息的向上滚动不影响该消息内部内容的滚动--------------*/
function render() {
	context.drawImage(backgroundImage, -10, -10);//绘制背景图片

	//获取当前窗口大小
	var height = window.innerHeight;
	var width = window.innerWidth;
	
	//计算头像的绘制尺寸
	var headSize = Math.min(height * 0.15, width * 0.15);

	//开始绘制
	var renderCount;
	for(renderCount = 3;renderCount >= 0;renderCount--){
		if(renderCount < messageQueue.queueLength){//绘制需要绘制的消息
			context.drawImage(messageBackgroundImage, posX - 0.02 * width, posY[renderCount] - 0.2 * height, width * 0.9, height * 0.23);
			if(renderCount < messageQueue.popBeginFlag){
				context.drawImage(adminMessageBackgroundImage, posX - 0.02 * width, posY[renderCount] - 0.2 * height, width * 0.9, height * 0.23);
			}
			context.drawImage(messageQueue.messages[renderCount]['headimgurl'], posX, posY[renderCount] - 0.15 * height, headSize, headSize);
			context.fillStyle = "rgb(250, 250, 250)";
			context.font = "33px Helvetica";
			context.textAlign = "left";
			context.textBaseline = "bottom";
			var nicknameVisible = messageQueue.messages[renderCount]['nickname'];
			context.fillText(nicknameVisible, posX + 0.15 * width, posY[renderCount] - 0.1 * height, width * 0.7);
			var contentVisible = messageQueue.messages[renderCount]['content'];
			if(width * 0.7 / 45 > contentVisible.length){
				marquees[(marqueesVisibleBeginIndex + renderCount) % 4].innerText = "";
				context.fillStyle = "rgb(0, 0, 0)";
				context.font = "45px Helvetica";
				context.fillText(contentVisible, posX + 0.15 * width, posY[renderCount], width * 0.7);
			}
			else{
				var tem = (marqueesVisibleBeginIndex + renderCount) % 4;
				if(marquees[tem].innerText != contentVisible){
					marquees[tem].innerText = contentVisible;
				}
				marquees[tem].style["margin-left"] = (posX + 0.15 * width) + "px";
				marquees[tem].style["margin-top"] = posY[renderCount] - 0.07 * height + "px";
				marquees[tem].width = width * 0.7;
			}
		}
		else{//不需要绘制的图片对应的内容应置为空
			marquees[(marqueesVisibleBeginIndex + renderCount) % 4].innerText = "";
		}
		marquees[(marqueesVisibleBeginIndex + 3) % 4].innerText = "";
			
	}
};


/*初始化时获取历史信息，其中的架构部分非原创--------------------------*/
var ajax = new XMLHttpRequest();
ajax.onreadystatechange = function(){
	if(ajax.readyState == 4 && ajax.status == 200){
		var history = JSON.parse(ajax.responseText);
		var historyCount;
		for(historyCount = 2;historyCount >= 0;historyCount--)
		{
			var newMessage = new Object();
			var head = new Image();
			head.src = history[historyCount]['headimgurl'];
			newMessage.headimgurl = head;
			newMessage.content = history[historyCount]['content'];
			newMessage.nickname = history[historyCount]['nickname'];
			messageQueue.queuePush(newMessage); 
		}
	}
};
ajax.open("GET","https://wall.cgcgbcbc.com/api/messages?num=3", true);
ajax.send();


/*微信墙的主循环，采用requestAnimationFrame方法，循环执行画布、公告大小调整，画布的绘制函数*/
function main() {

	resizeCanvas();
	resizeInform();
	render();
	if(changeFinish)
	{
		resetPosition();
	}

	// Request to do this again ASAP
	requestAnimationFrame(main);
};


/*该函数的作用是在消息向上移动动画之后的恢复以及对窗口的自适应*/
function resetPosition(){
	var posCount;
	for(posCount = 0;posCount < 4;posCount++)
	{
		posY[posCount] = window.innerHeight * (posCount + 1.4) * 0.25;
	}
	posY[3] = -1000;
	posX = window.innerWidth * 0.05;
}


/*这个变量是用来标识当前是否处于消息上移的消息更替过程，避免多个操作同时进行导致的混乱*/
var changeFinish = true;


/*平滑移动函数，通过setTimeout方法使得四条消息平滑的向上移动特定长度，完成消息更替过程
当目前收到的消息数量较大的时候，会适当加快更替时的移动速度*/
function gradientMove(mode){
	var indexCount;
	for(indexCount = mode;indexCount < messageQueue.queueLength;indexCount++){
		posY[indexCount] = posY[indexCount] - 1;
	}
	if(posY[3] < window.innerHeight * 0.95)
	{
		messageQueue.messages[messageQueue.popBeginFlag].content = "";
	}
	if(posY[3] < window.innerHeight * 0.85){
		posY[3] = window.innerHeight * 0.85;
		resetPosition();
		messageQueue.queuePop();
		changeFinish = true;
	}
	else{
		if(messageQueue.queueLength > 20)
		{
			setTimeout("gradientMove(" + mode + ")", 1);
		}
		else if(messageQueue.queueLength > 10)
		{
			setTimeout("gradientMove(" + mode + ")", 2);
		}
		else
		{
			setTimeout("gradientMove(" + mode + ")", 5);
		}
	}
}


/*该函数的功能是判断是否需要更新当前显示的消息，利用setTimeout方法循环调用该函数，
以保证图片及时的更替。该函数通过调用前面的gradientMove函数完成更替过程，
当目前收到的消息数量较大的时候，会适当加快检查的频率，以配合更快的更替移动速度--------*/
function updateCommonMessagesOnWall(){
	if(messageQueue.queueLength - messageQueue.popBeginFlag > 3 && changeFinish){
		
		if(messageQueue.popBeginFlag < 3)
		{
			changeFinish = false;
			posX = window.innerWidth * 0.05;
			posY[3] = window.innerHeight * 1.1;
			gradientMove(messageQueue.popBeginFlag);
		}		
	}
	if(messageQueue.queueLength - messageQueue.popBeginFlag > 5)
	{
		setTimeout("updateCommonMessagesOnWall()", 500);
	}
	else
	{
		setTimeout("updateCommonMessagesOnWall()", 1000);
	}
}


//requestAnimationFrame方法的支持
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


//开始
main();
updateCommonMessagesOnWall();



