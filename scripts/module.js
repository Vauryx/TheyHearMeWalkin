Hooks.once('init', async function() {
    console.log("Registering They Hear Me Walkin game settings...");
    game.settings.register("theyhearmewalkin", "footstepsAudioDBFile", {
        name: "Footsteps Audio JSON File",
        hint: "Please provide audio file to footsteps",
        scope: 'world',
        type: String,
        default: "",
        filePicker: true,
        config: true,
        onChange: value => 
        { // A callback function which triggers when the setting is changed
            console.log(value);
            window.location.reload();
            if (value != "")
            {
                async function getJSON(path){
                    const response = await fetch(path);
                    const json = await response.json();
                    return json;
                }
                let footstepsAudioDB = getJSON(value);
                SequencerDatabase.registerEntries("FootStepsAudioDB", footstepsAudioDB);
            }
        }
    });
    game.settings.register("theyhearmewalkin", "footstepsVolume", {  
        name: "Footsteps Volume",                  
        hint: "Set how loudly the footsteps will be heard",               
        scope: "world",                                     
        config: true,                                      
        type: Number,
        range: {
        min: 0,
        max: 1,
        step: 0.05,
        },
        default: 0.5                                  
    });
});

Hooks.on("sequencer.ready", async () => {
    async function getJSON(path){
        const response = await fetch(path);
        const json = await response.json();
        return json;
      }
    let footstepsAudioFile = game.settings.get("theyhearmewalkin","footstepsAudioDBFile");
    if(footstepsAudioFile != "")
    {
        let footstepsAudioDB = await getJSON(footstepsAudioFile);
        console.log(footstepsAudioDB);
        SequencerDatabase.registerEntries("FootStepsAudioDB", footstepsAudioDB);
    }
});
