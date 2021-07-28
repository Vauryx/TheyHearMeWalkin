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

});

Hooks.on("sequencer.ready", async () => {
    async function getJSON(path){
        const response = await fetch(path);
        const json = await response.json();
        return json;
      }
    let footstepsAudioFile = game.settings.get("targetreacts","footstepsAudioTest");
    if(footstepsAudioFile != "")
    {
        let footstepsAudioDB = getJSON(footstepsAudioFile);
        console.log(footstepsAudioDB);
        SequencerDatabase.registerEntries("FootStepsAudioDB", footstepsAudioDB);
    }
});
