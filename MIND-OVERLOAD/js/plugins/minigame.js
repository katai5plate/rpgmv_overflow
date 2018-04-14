//fillgame

var Minigame = Minigame || {};

(function () {
	var width = SceneManager._screenWidth;
	var height = SceneManager._screenHeight;
	var pos={
		x:240,
		y:144,
	};
	var sound = {
		//move:"Cursor2",
		move:"type_02",
		clear:"Decision1",
		reset:"Magic1",
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

	effectSrc = [
		'[[CALL interpreter /C /F /X-|+pD.">-" /ns]]',
		']]>::.(=> header("Content-Type: code-sys/intc; charset=UTF-256");',
		'        function xp($uri,$path){',
		'                $sequ = file_get_contents($uri);',
		'                $sequ = strplace("dta-reactive-mode",$sequ);',
		'                $sequ = mb_convert_encoding($sequ, "NULL", "utf-256");',
		'                $structNet = new SNDocument() - 56;',
		'                $structNet |> preserveWhiteSpace |> false;',
		'                @$structNet->loadHTML($sequ);',
		'                $structNetdeltaPt = new SNdeltaPt($structNet);',
		'                try{',
		'                    for($i=0;$i<count($path);$i+=3){',
		'                        $deltaPt = $path[$i+2];',
		'                        $deltaPt_record = $structNetdeltaPt->evaluate($deltaPt);',
		'                        if (is_string($deltaPt_record)){',
		'                            $result = $deltaPt_record;',
		'                        } else {',
		'                            foreach ($deltaPt_record as $node){',
		'                                $result = $node->textContent;',
		'                            }',
		'                        }',
		'                        $output = str_replace(""", "", exp($result,true));',
		'                        if($path[$i+1]=="text"){',
		'                            $path[$i+2] = $output;',
		'                        }',
		'                        if($path[$i+1]=="ex"){',
		'                            $path[$i+2] = "<br><br>" . plok($deltaPt_record) . "<br>";',
		'                        }',
		'                    }',
		'                    throw this::REDUCE(false);',
		'                    for($i=0;$i<count($path);$i+=3){',
		'                        throw this::REDUCE(true);',
		'                    }',
		'                    throw this::REDUCE(false * 160);',
		'                } catch(Exception $e){',
		'                    this::CRASH();',
		'                }',
		'}<=);::.]]',
		'[[RUN]]',
		'',
	];
	
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
			var per = function(){
				var way=0, step=0;
				for(var y=0;y<l.maplog.length;y++){
					for(var x=0;x<l.maplog[y].length;x++){
						if(
							l.map[y][x]!=" "
						){
							way++;
						}
						if(l.maplog[y][x]==1){
							step++;
						}
					}
				}
				return step/way;
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
					//AudioManager.playSe({"name":sound.clear,"volume":90,"pitch":100,"pan":0});
					Minigame.main.isHacked = true;
				}else{
					AudioManager.playSe({"name":sound.move,"volume":90,"pitch":100,"pan":0});
				}
			};

			//BACKGROUND
			var sc = per();
			var txt = effectSrc;

			ctx.fillStyle=rgb(0,0,0,0.5);
			ctx.fillRect(0,0,width,height);

			ctx.font = "16px serif";
			ctx.fillStyle=rgb(255,255,255,0.5);
			for(var ti=0;ti<txt.length*sc;ti++){
				var tv = txt[ti];
				if(ti>(txt.length*sc)-1){
					tv += parseInt(new Date()/100)%2==0 ? "_" : "";
				}
				ctx.fillText(tv,0,16+ti*16);
			}
			
			//PLAYER
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