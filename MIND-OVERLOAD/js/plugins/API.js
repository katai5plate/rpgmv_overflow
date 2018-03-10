

var API = {};
var bm = {};


(function () {
	API = {
		getEventById: function(id){
			return $gameMap.events()[id-1];
		},
		getEventsByKey: function(keyName,keyValue){
			return $gameMap.events().filter(function(v){
				return v[keyName]==keyValue;
			});
		},
		getEventsByXY: function(x,y){
			if(y==null){
				y = x.y;
				x = x.x;
			}
			return $gameMap.events().filter(function(v){
				return v._x==x && v._y==y;
			});
		},
		getEventsByName: function(name){
			return $dataMap.events.filter(function(v){
				if(!!v){
					return v.name==name;
				}
			}).map(function(v){return $gameMap.events()[v.id-1]});
		},
		getEventsByNote: function(name){
			return $dataMap.events.filter(function(v){
				if(!!v){
					return v.note==name;
				}
			}).map(function(v){return $gameMap.events()[v.id-1]});
		},
		setEVSpriteByGID: function(event,fname,GID){
			event._characterName=fname;
			if(GID==null){
				const y = Math.floor(GID%4);
				event._characterIndex=Math.floor(GID/4);
				event._direction=y==0?2:y==1?4:y==2?6:y==3?8:null;
			}
		},
		findWordFromCEvent: function(word){
			$dataCommonEvents.filter(function(v){
				try{var list = v.list;}catch(e){return false;}
				for(var i in list){
					if(list[i].code==401){
						var p = list[i].parameters;
						for(var j in p){
							if(p[j].indexOf(word)>-1)return true;
						}
					}
				}
			}).map(function(v){return v.id;})
		},
		getEVsByNote4Macro: function(name){
			return $dataMap.events.filter(function(v){
				if(!!v){
					return v.note.split(" ")[0]==name;
				}
			}).map(function(v){
				return {
					id:v.id,
					event:$gameMap.events()[v.id-1],
					name:$dataMap.events[v.id].name,
					args:$dataMap.events[v.id].note.split(" "),
				}
			});
		},
		getTapedXY: function(){
			this._tapedXY = {
				x: $gameMap.canvasToMapX(TouchInput.x),
				y: $gameMap.canvasToMapY(TouchInput.y)
			};
			if (TouchInput.isTriggered()){
				return this._tapedXY;
			}else{
				return null;
			}
		},
	}
	bm = {
		pg_btn: {
			selected:false,
			init:function(){
				return {
					selected: false
				};
			},
			select:function(f){
				this.selected = !!f;
			},
		}
	}
})();

// GID is this:
// 00	04	08	12
// 01	05	09	13
// 02	06	10	14
// 03	07	11	15
// 16	20	24	28
// 17	21	25	29
// 18	22	26	30
// 19	23	27	31