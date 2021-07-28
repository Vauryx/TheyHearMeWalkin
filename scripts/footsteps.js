Hooks.on('updateToken',async (scene,data,moved)=>{

    function polygonToGlobal(drawing) 
    {
        console.log("Converting polygon points to Global Co-ords...");
        let globalCoords = [];
        if (drawing.data.points.length != 0) 
        {
        drawing.data.points.forEach((point) => {
            globalCoords.push(point[0] + drawing.x, point[1] + drawing.y);
        });
        } 
        else 
        {
        globalCoords = [
            drawing.x,
            drawing.y,
            drawing.x + drawing.width,
            drawing.y,
            drawing.x + drawing.width,
            drawing.y + drawing.height,
            drawing.x,
            drawing.y + drawing.height,
        ];
        }
        return globalCoords;
    }

    if (data.x >0 || data.y > 0)
    {
        let token = canvas.tokens.controlled[0];
        let surfaceMaterialDrawings = canvas.drawings.placeables.filter((d) => d.data.text.includes("Material"));
        let materialName = "Default";
        for (let drawing of surfaceMaterialDrawings) 
        {
          let poly = new PIXI.Polygon(polygonToGlobal(drawing));
          if (poly.contains(token.center.x, token.center.y)) 
          {
              materialName = drawing.data.text;
          }
        }
        console.log(materialName);
        let footstepsSequence = new Sequence()
            .sound()
                .file(`EffectAudioDB.${materialName}`)
        footstepsSequence.play()

    }

});