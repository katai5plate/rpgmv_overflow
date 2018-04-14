var Minigame = Minigame || {};

(function () {
	var width = SceneManager._screenWidth;
	var height = SceneManager._screenHeight;
	var pos={
		x:240,
		y:144,
	};
	var sound = {
		move:"Cursor2",
		clear:"Decision1",
		reset:"Cancel2",
	}

	var rgb = function(r,g,b,a){
		return `rgba(${r},${g},${b},${a})`
	};
	var drawDial = function(ctx,x,y,scale,num){
		num = Number(num);
		var t = scale/7;
		var pat = [
			[7],[0,1,4,6,7,9,11],[4,10],[4,9],
			[1,2,9,11],[5,9],[5],[6,7,9,11],[],[9],
		][num];
		var arr=[];
		for(var i=0;i<=12;i++){
			if(pat.indexOf(i)==-1)arr.push(i)
		}
		arr.forEach(function(v){
			for(var i=0;i<=12;i++){}
			var a=[
				[1,1,1],[2,1,2],[4,1,1],[5,1,1],[1,2,1],[5,2,1],[1,3,1],
				[2,3,3],[5,3,1],[1,4,1],[5,4,1],[1,5,4],[5,5,1]
			][v];
			ctx.fillRect(x+(t*a[0]-(num==1?t*2:0)),y+(t*a[1]),t*a[2],t);
		})
	}

	Minigame.level = {
		mapdata: {
			start:0,
			goal:9,
		},
		map: [
			["S"," "," "," ","X","3","X"],
			["X"," ","X","2","X"," ","X"],
			["X","1","X"," "," "," ","4"],
			[" "," "," ","5","X"," ","X"],
			["X","X","X","X","X","X","X"],
			["X","6"," "," "," ","8","9"],
			[" ","X","X","7","X","X"," "],
		],
		maplogEmpty:function(){
			return [
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
			]
		},
		maplog: [],
		player: {
			pos:{x:0,y:0},
			next:999,
			left:999,
			max:999,
		}
	}
	
	Minigame.main = {
		isHacked:false,
		start:function(){
			this.isHacked = false;
			var l = Minigame.level;
			l.maplog = l.maplogEmpty();
			l.player.next = 1;
			for(var y=0;y<l.map.length;y++){
				for(var x=0;x<l.map[y].length;x++){
					if(l.map[y][x]=="S") l.player.pos = {x,y};
				}
			}
			l.maplog[l.player.pos.y][l.player.pos.x]=1;
		},
		drawing:function(ctx){
			var l = Minigame.level;

			//BACKGROUND
			var sc = (l.player.left+1) / (l.player.max);
			var time = Number(new Date())/10000;
			ctx.fillStyle=rgb(0,0,0,0.5);
			ctx.fillRect(0,0,width,height);
			ctx.fillStyle=rgb(0,127,255,sc*2);
			// [[1.26,3.10],[2.45,5.39],[5.68,7.35],[3.78,6.09],
			// [2.29,3.62],[7.32,3.01],[2.24,1.39],[5.07,7.13]].forEach(function(v){
			// 	ctx.fillRect(
			// 		((width/2)+(Math.sin(time*v[0])*(width/2)*sc))-(25/sc/2),
			// 		((height/2)+(Math.cos(time*v[1])*(height/2)*sc))-(25/sc/2),
			// 		25/sc,25/sc
			// 	);
			// })

			//PLAYER
			var isWall = function(addx,addy){
				try {
					ret=l.map[l.player.pos.y+addy][l.player.pos.x+addx]==null ||
						l.map[l.player.pos.y+addy][l.player.pos.x+addx]==" " ||
						l.map[l.player.pos.y+addy][l.player.pos.x+addx]=="0" ||
						l.maplog[l.player.pos.y+addy][l.player.pos.x+addx]==1;
					return ret;
				} catch (e) {
					return true;
				}
			}
			var isFill = function(){
				for(var y=0;y<l.maplog.length;y++){
					for(var x=0;x<l.maplog[y].length;x++){
						if(l.maplog[y][x]==0){
							if(
								l.map[y][x]!=" "
							){
								return false;
							}
						}
					}
				}
				return true;
			}
			var reset = function(){
				AudioManager.playSe({"name":sound.reset,"volume":90,"pitch":100,"pan":0});
				Minigame.main.start();
			};
			var common = function(){
				if(!isNaN(l.map[l.player.pos.y][l.player.pos.x])&&l.map[l.player.pos.y][l.player.pos.x]!=" "){
					var n = Number(l.map[l.player.pos.y][l.player.pos.x]);
					if(l.player.next==n){
						l.player.next++;
					}else{
						reset();
					}
				}
				l.maplog[l.player.pos.y][l.player.pos.x]=1;
				if(isFill()){
					AudioManager.playSe({"name":sound.clear,"volume":90,"pitch":100,"pan":0});
					Minigame.main.isHacked = true;
				}else{
					AudioManager.playSe({"name":sound.move,"volume":90,"pitch":100,"pan":0});
				}
			};
			
			if(Input.isTriggered("left")){
				if(!isWall(-1,0)){
					l.player.pos.x--;
					common();
				}else{
					reset();
				}
			}else if(Input.isTriggered("right")){
				if(!isWall(1,0)){
					l.player.pos.x++;
					common();
				}else{
					reset();
				}
			}else if(Input.isTriggered("up")){
				if(!isWall(0,-1)){
					l.player.pos.y--;
					common();
				}else{
					reset();
				}
			}else if(Input.isTriggered("down")){
				if(!isWall(0,1)){
					l.player.pos.y++;
					common();
				}else{
					reset();
				}
			}

			//DRAW
			for(var y=0;y<l.map.length;y++){
				for(var x=0;x<l.map[y].length;x++){
					//TILES
					ctx.fillStyle=rgb(255,0,0,0.5);
					if(l.map[y][x]==" ") ctx.fillStyle=rgb(0,0,0,0);
					//if(l.map[y][x]=="S") ctx.fillStyle=rgb(255,0,0,1);
					if(l.maplog[y][x]==1) ctx.fillStyle=rgb(0,255,0,0.5);
					if(l.player.pos.x==x&&l.player.pos.y==y){
						ctx.fillStyle=rgb(0,255,0,1);
					}
					ctx.beginPath();
					ctx.arc(pos.x+24+x*48, pos.y+24+y*48, 24, 0, Math.PI*2);
					ctx.fill();
					ctx.fillStyle=rgb(255,255,255,1);

					//NUMBERS
					if(!isNaN(l.map[y][x])&&l.map[y][x]!=" "){
						drawDial(ctx,pos.x+x*48,pos.y+y*48,48,l.map[y][x]);
					}else if(l.map[y][x]=="S"){
						drawDial(ctx,pos.x+x*48,pos.y+y*48,48,0);
					}
				}
			}
		},
		ScreenUpdate:function(){
			if(!SceneManager._scene.minigame) { 
				SceneManager._scene.minigame = new Sprite(); 
				SceneManager._scene.minigame.bitmap = new Bitmap(width,height); 
				SceneManager._scene.addChild(SceneManager._scene.minigame); 
			} 
			var bitmap = SceneManager._scene.minigame.bitmap; 
			bitmap.clear();
			var ctx = bitmap.context;
			this.drawing(ctx);
		},
		ScreenCls:function(){
			var bitmap = SceneManager._scene.minigame.bitmap; 
			bitmap.clear();
		}
	};
})();