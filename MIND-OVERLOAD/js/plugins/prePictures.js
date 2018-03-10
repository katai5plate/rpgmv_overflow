var prePictures = prePictures || {};
(function () {
    prePictures = {
        baffers: [
            "board",
            "empty",
            "light_cyan",
            "light_grape",
            "light_white",
            "light_yellow",
            "p0-0",
            "p1-1",
            "p1-2",
            "p1-3",
            "p1-4",
            "p2-1",
            "p2-2",
            "p2-3",
            "p2-4",
            "p3-1",
            "p3-2",
            "p3-3",
            "p3-4",
            "p4-1",
            "p4-2",
            "p4-3",
            "p4-4",
            "p5-1",
            "p5-2",
            "p5-3",
            "p5-4",
            "p6-1",
            "p6-2",
            "p6-3",
            "p6-4",
            "p7-1",
            "p7-2",
            "p7-3",
            "p7-4",
            "p8-1",
            "p8-2",
            "p8-3",
            "p8-4",
            "stage00",
            "test01",
            "test02",
            "test03",
        ],
        HERE_WE_GO:function(){
            for(var i=0;i<this.baffers.length;i++){
                var v = this.baffers[i];
                ImageManager.loadPicture(v);
                console.log("Loading:\t"+v);
                Game_Interpreter.prototype.setWaitMode("image");
                console.log("EndWait:\t"+v);
            }
        },
    };
})();