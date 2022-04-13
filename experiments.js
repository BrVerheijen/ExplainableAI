let experiment_data;

async function GetData(){
await fetch("experiments.json")
    .then(response => response.json())
    .then(data => experiment_data = data);

}

function ChangePageContent(){
    experiment = $("#title").text();
    dropdown = $("#experiment-drop option:selected").text();
    $("#text").text(experiment_data[experiment][dropdown]["Text"]);
    $("#graph").attr("src",(experiment_data[experiment][dropdown]["Graph"]));

    if (experiment_data[experiment][dropdown]["timesteps"] == true){
        $('#video-drop').empty();
        timestep_options = experiment_data[experiment][dropdown]["timestep_options"];
        timestep_options.forEach( (value,index) => {
            $('#video-drop').append(`<option id="timestep_option" value="${index}">${value}</option>`);
        });
        $('#video-drop').attr("hidden", false);
        $('#video').attr("hidden",false);
        
    }

    else{
        $('#video-drop').empty();
        $('#video-drop').attr("hidden", true);
        $('#video').attr("hidden",true);
    }

    ChangeVideo();
}

function ChangeVideo(){
    $('#video').empty();
    experiment = $("#title").text();
    dropdown = $("#experiment-drop option:selected").text();
    video = $("#video-drop option:selected").val();
    $('#video').append(`<source id="source" src="${experiment_data[experiment][dropdown]["Video"][video]}">`);
    $('#video')[0].load();
}

$('#experiment-drop').change(
    function() { ChangePageContent()}
)

$('#video-drop').change(
    function() { ChangeVideo()}
)

async function StartPageContent(){
    await GetData();
    ChangePageContent();
}

StartPageContent();