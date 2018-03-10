var H2APG = H2APG || {};

(function () {
	Sprite_Picture.prototype.updateBitmap = function () {
		var picture = this.picture();
		if (picture) {
			var pictureName = picture.name();
			if (this._pictureName !== pictureName) {
				this._pictureName = pictureName;
				this.loadBitmap();
			}
			picture.width = this.bitmap.width;
			picture.height = this.bitmap.height;
			this.visible = true;
		} else {
			this._pictureName = '';
			this.bitmap = null;
			this.visible = false;
		}
	};

	//引数：画面全体の何パーセントの位置か？
	H2APG.Area = function(x1,y1,x2,y2){
		return {
			p:{
				x:x1,
				y:y1,
			},
			d:{
				x:x2,
				y:y2,
			},
		};
	};

	H2APG.Lerp = function(a,b,t){
		return a + (b - a) * t;
	};

	H2APG.effect = {
		bitmap:null,
		ctx:null,
		width:function(){return SceneManager._screenWidth;},
		height:function(){return SceneManager._screenHeight;},
		ScreenUpdateFunctions:[],
		ScreenUpdate:function(){
			if(!SceneManager._scene.h2aDraw) { 
				SceneManager._scene.h2aDraw = new Sprite(); 
				SceneManager._scene.h2aDraw.bitmap = new Bitmap(this.width(),this.height()); 
				SceneManager._scene.addChild(SceneManager._scene.h2aDraw); 
			} 
			this.bitmap = SceneManager._scene.h2aDraw.bitmap; 
			this.bitmap.clear();  
			this.ctx = this.bitmap.context;
			this.ScreenUpdateFunctions.forEach(function(v){
				if(typeof(v)=="function")v();
			})
		},
		// DrawText:function(mes,x,y,size,line,color){
		// 	if(size==null) size=this.bitmap.fontSize;
		// 	if(line==null) line=0;
		// 	this.ctx.fillStyle = color || "black";
		// 	this.ctx.font = ""+size+"px ''";
		// 	this.ctx.fillText(mes,x,(y+size)+(size*line));
		// },
		// DrawPict:function(name,x,y,size,line,color){
		// 	if(size==null) size=this.bitmap.fontSize;
		// 	if(line==null) line=0;
		// 	this.ctx.fillStyle = color || "black";
		// 	this.ctx.font = ""+size+"px ''";
		// 	this.ctx.fillText(mes,x,(y+size)+(size*line));
		// },
		// GetDefaltFontSize:function(){
		// 	return this.bitmap.fontSize;
		// },
		SetFilter:function(filter){
			SceneManager._scene.h2aDraw.filters = [filter];
		},
		// SetDisplayFilter:function(filter){
		// 	SceneManager._scene.filters = [filter];
		// },
		rgb:function(r,g,b,a){
			if(!a) a=1;
			return "rgba("+r+","+g+","+b+","+a+")";
		},
		
	};
})();