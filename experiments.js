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
        if (experiment_data[experiment][dropdown]["Video"].length > 1){
        $('#video-drop').empty();
        timestep_options = experiment_data[experiment][dropdown]["timestep_options"];
        timestep_options.forEach( (value,index) => {
            $('#video-drop').append(`<option id="timestep_option" value="${index}">${value}</option>`);
        });
        $('#video-drop').attr("hidden", false);
    }
        $('#video').attr("hidden",false);
    
    }

    else{
        $('#video-drop').empty();
        $('#video-drop').attr("hidden", true);
        $('#video').attr("hidden",true);
    }

    ChangeVideo();
}

async function ChangeVideo(){
    $('#video').attr("src"," ");
    experiment = $("#title").text();
    dropdown = $("#experiment-drop option:selected").text();
    $("#graph").attr("src",(experiment_data[experiment][dropdown]["Graph"]));
    videos = await experiment_data[experiment][dropdown]["Video"];
    if (videos.length == 1){
        $('#video').attr("src",videos[0]);
    } else{
        video = $("#video-drop option:selected").val();
        $('#video').attr("src",videos[video]);
    }

}

$('#experiment-drop').change(
    function() { ChangePageContent()}
)

$('#video-drop').change(
    function() { ChangeVideo()}
)

async function StartPageContent(){
    await GetData();
    await GetDropdown();
    ChangePageContent();
}

function GetDropdown(){
    experiment = $("#title").text();
    $('#experiment-drop').empty();
    dropdown_options = Object.keys(experiment_data[experiment]);
    dropdown_options.forEach( (value,index) => {
        $('#experiment-drop').append(`<option id="experiment_option" value="${index}">${value}</option>`);
    });
}

StartPageContent();