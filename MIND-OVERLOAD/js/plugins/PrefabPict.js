var PP = {};
(function(){
    PP = {
        data:{},
        Setup:function(){
            this.data = {};
        },
        Make:function(groupName,pictureID,x,y,alfa,zoom,centering){
            zoom = zoom==null ? 100 : zoom;
            alfa = alfa==null ? 100 : alfa;
            centering = !!centering ? 1 : 0;
            if(this.data[groupName]==null){
                this.data[groupName]=[pictureID];
            }else{
                this.data[groupName].push(pictureID);
            }
            $gameScreen.showPicture(pictureID,"",centering,x*48,y*48,zoom,zoom,(alfa/100*256)-1,0);
            return $gameScreen._pictures[pictureID];
        },
        MDraw:function(groupName,pictureID,imageName,x,y,alfa,zoom,centering){
            zoom = zoom==null ? 100 : zoom;
            alfa = alfa==null ? 100 : alfa;
            centering = !!centering ? 1 : 0;
            if(this.data[groupName]==null){
                this.data[groupName]=[pictureID];
            }else{
                this.data[groupName].push(pictureID);
            }
            $gameScreen.showPicture(pictureID,imageName,centering,x*48,y*48,zoom,zoom,(alfa/100*256)-1,0);
            return $gameScreen._pictures[pictureID];
        },
        Draw:function(pID_or_gName,imageName){
            var IDs = this.Division(pID_or_gName);
            if(IDs==null)return;
            for(var i=0;i<IDs.length;i++){
                var v = IDs[i];
                $gameScreen._pictures[v]._name = imageName;
            }
            return true;
        },
        Anim:function(pID_or_gName,name,duration){
            var IDs = this.Division(pID_or_gName);
            if(IDs==null)return;
            duration = duration || 1;
            
            for(var i=0;i<IDs.length;i++){
                var v = IDs[i];
                switch (name) {
                    case "flash":
                        $gameScreen._pictures[v]._tone = [255,255,255,0];
                        $gameScreen._pictures[v]._toneTarget = [0,0,0,0];
                        $gameScreen._pictures[v]._toneDuration = duration;
                        break;
                    case "flash-red":
                        $gameScreen._pictures[v]._tone = [255,0,0,0];
                        $gameScreen._pictures[v]._toneTarget = [0,0,0,0];
                        $gameScreen._pictures[v]._toneDuration = duration;
                        break;
                    case "flash-green":
                        $gameScreen._pictures[v]._tone = [0,255,0,0];
                        $gameScreen._pictures[v]._toneTarget = [0,0,0,0];
                        $gameScreen._pictures[v]._toneDuration = duration;
                        break;
                    case "fjump48":
                        $gameScreen._pictures[v]._tone = [255,255,255,0];
                        $gameScreen._pictures[v]._toneTarget = [0,0,0,0];
                        $gameScreen._pictures[v]._toneDuration = duration;
                        $gameScreen._pictures[v]._targetScaleX = $gameScreen._pictures[v]._scaleX;
                        $gameScreen._pictures[v]._targetScaleY = $gameScreen._pictures[v]._scaleY;
                        $gameScreen._pictures[v]._scaleX *= 2;
                        $gameScreen._pictures[v]._scaleY *= 2;
                        $gameScreen._pictures[v]._targetX = $gameScreen._pictures[v]._x;
                        $gameScreen._pictures[v]._targetY = $gameScreen._pictures[v]._y;
                        $gameScreen._pictures[v]._x -= 48/2;
                        $gameScreen._pictures[v]._y -= 48/2;
                        $gameScreen._pictures[v]._duration = duration;
                        break;
                    default:
                        break;
                }
            }
        },
        Move:function(pID_or_gName,duration,setting,adding){
            //setting={x,y,zoom,alfa,tone}
            var IDs = this.Division(pID_or_gName);
            if(IDs==null)return;
            duration = duration || 1;
            for(var i=0;i<IDs.length;i++){
                var v = IDs[i];
                if(adding){
                    $gameScreen._pictures[v]._targetX += setting.x || 0;
                    $gameScreen._pictures[v]._targetY += setting.y || 0;
                    $gameScreen._pictures[v]._targetScaleX += setting.zoom || 0;
                    $gameScreen._pictures[v]._targetScaleY += setting.zoom || 0;
                    $gameScreen._pictures[v]._tone = $gameScreen._pictures[v]._tone || [0,0,0,0];
                    if(!!setting.tone){
                        $gameScreen._pictures[v]._toneTarget = $gameScreen._pictures[v]._tone.map(function(v,i){
                            v += setting.tone[i];
                            return v>255 ? 255 : v<0 ? 0 : v;
                        });
                    }
                    $gameScreen._pictures[v]._targetOpacity += setting.alfa || 0;
                }else{
                    $gameScreen._pictures[v]._targetX = setting.x || $gameScreen._pictures[v]._x;
                    $gameScreen._pictures[v]._targetY = setting.y || $gameScreen._pictures[v]._y;
                    $gameScreen._pictures[v]._targetScaleX = setting.zoom || setting.zoomx || $gameScreen._pictures[v]._scaleX;
                    $gameScreen._pictures[v]._targetScaleY = setting.zoom || setting.zoomy || $gameScreen._pictures[v]._scaleY;
                    $gameScreen._pictures[v]._tone = $gameScreen._pictures[v]._tone || [0,0,0,0];
                    $gameScreen._pictures[v]._toneTarget = setting.tone || $gameScreen._pictures[v]._tone;
                    $gameScreen._pictures[v]._targetOpacity = setting.alfa || $gameScreen._pictures[v]._opacity;
                }
                $gameScreen._pictures[v]._duration = duration;
            }
        },
        Stop:function(pID_or_gName){
            var IDs = this.Division(pID_or_gName);
            if(IDs==null)return;
            for(var i=0;i<IDs.length;i++){
                var v = IDs[i];
                $gameScreen._pictures[v]._duration = 0;
            }
        },
        Erase:function(pID_or_gName){
            var IDs = this.Division(pID_or_gName);
            if(IDs==null)return;
            for(var i=0;i<IDs.length;i++){
                var v = IDs[i];
                $gameScreen.erasePicture(v);
            }
        },
        For:function(max,func){
            for(var i=0;i<max;i++){
                func(i);
            }
        },
        Division:function(pID_or_gName){
            var IDs = [];
            if(typeof(pID_or_gName)=="number"){
                IDs = [pID_or_gName];
            }else if(typeof(pID_or_gName)=="string"){
                if(this.data[pID_or_gName]==null){
                    console.warn("groupName not found.");
                    return null;
                }
                IDs = this.data[pID_or_gName];
            }else{
                console.warn("pID_or_gName is invalid.");
                return null;
            }
            return IDs;
        },
    }
})();