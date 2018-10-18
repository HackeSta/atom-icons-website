$(document).ready(function() {
  let files, series, nonseries;
  getStatistics();
  $.when(
    $.getJSON('https://raw.githubusercontent.com/HackeSta/atom-icons/master/.travis/files.json', function(data) {
      files = data;
    }),
    $.getJSON('https://raw.githubusercontent.com/HackeSta/atom-icons/master/.travis/series.json', function(data) {
      series = data;
    }),
    $.getJSON('https://raw.githubusercontent.com/HackeSta/atom-icons/master/.travis/nonseries.json', function(data) {
      nonseries = data;
    })
  ).then(function(){
    $("#icons-container .progress").addClass('hide');
    for(s of series){
      $("#contents").append("<li class=\"collection-item\"><a href=\"#"+s.name.replace(" ","_")+"\">"+s.name+"</a></li>")
    }
    for(s of series){
      $("#icons-container").append(getTitle(s.name))
      for(file in files){
        if(file.split('_')[0] === s.prefix){
          $("#icons-container").append(getCard("https://raw.githubusercontent.com/HackeSta/atom-icons/master/linux/" + file + ".png", file.split('_')[1],files[file]));
          $("#icons-container img")[$("#icons-container img").length - 1].onload = function(){
            $(this.nextSibling).addClass('hide');
          };
        }
      }
      $("#icons-container").append("<br/>");
    }
    $("#icons-container").append(getTitle("Others"))
    for(file in files){
      if(!file.includes('_')){
        $("#icons-container").append(getCard("https://raw.githubusercontent.com/HackeSta/atom-icons/master/linux/" + file + ".png", file, files[file]));
      }
    }
    data = {};
    for(file in files){
      data[file] = "https://raw.githubusercontent.com/HackeSta/atom-icons/master/linux/" + file + ".png"
    }
    $('input.autocomplete').autocomplete({

      onAutocomplete: function(){
          window.location.hash = "#" + ($('input.autocomplete').val().includes('_') ? $('input.autocomplete').val().split('_')[1] : $('input.autocomplete').val());
        },
      data: data,
    });
    $('.tooltipped').tooltip();

  });


  // $("#icons-container").html(getCard("https://raw.githubusercontent.com/HackeSta/atom-icons/master/linux/social_wordpress.png","Atom Icon"));
});


function getCard(icon_url,icon_title,contributor){
  return "<div id=\""+icon_title+"\" class=\"icon col s12 m6 l4 xl2\">"+
  "<div class=\"card small\">"+
    "<div class=\"card-image waves-effect waves-block waves-light center\" style=\"padding: 7%; height:60%;\">"+
      "<img style=\"display:unset; height:100%; width:auto;\" class=\"activator\" src=\""+icon_url+"\">"+



      "<div class=\"preloader-wrapper big active\">"+
          "<div class=\"spinner-layer spinner-blue\">"+
            "<div class=\"circle-clipper left\">"+
              "<div class=\"circle\">"+"</div>"+
            "</div>"+"<div class=\"gap-patch\">"+
              "<div class=\"circle\">"+"</div>"+
            "</div>"+"<div class=\"circle-clipper right\">"+
              "<div class=\"circle\">"+"</div>"+
            "</div>"+
          "</div>"+

          "<div class=\"spinner-layer spinner-red\">"+
            "<div class=\"circle-clipper left\">"+
              "<div class=\"circle\">"+"</div>"+
            "</div>"+"<div class=\"gap-patch\">"+
              "<div class=\"circle\">"+"</div>"+
            "</div>"+"<div class=\"circle-clipper right\">"+
              "<div class=\"circle\">"+"</div>"+
            "</div>"+
          "</div>"+

          "<div class=\"spinner-layer spinner-yellow\">"+
            "<div class=\"circle-clipper left\">"+
              "<div class=\"circle\">"+"</div>"+
            "</div>"+"<div class=\"gap-patch\">"+
              "<div class=\"circle\">"+"</div>"+
            "</div>"+"<div class=\"circle-clipper right\">"+
              "<div class=\"circle\">"+"</div>"+
            "</div>"+
          "</div>"+

          "<div class=\"spinner-layer spinner-green\">"+
            "<div class=\"circle-clipper left\">"+
              "<div class=\"circle\">"+"</div>"+
            "</div>"+"<div class=\"gap-patch\">"+
              "<div class=\"circle\">"+"</div>"+
            "</div>"+"<div class=\"circle-clipper right\">"+
              "<div class=\"circle\">"+"</div>"+
            "</div>"+
          "</div>"+
        "</div>"+


    "</div>"+

    "<div class=\"card-content\">"+
      "<span class=\"card-title activator center grey-text text-darken-4\">"+icon_title+"</span>"+
      // "<p><a href=\"#\">This is a link</a></p>"+
    "</div>"+

    "<div class=\"card-action\">"+
          "<a href=\""+icon_url.replace("linux","svg").replace(".png",".svg")+"\" class=\"tooltipped\" data-tooltip=\"Right Click and select 'Save As'\">SVG</a>"+
          "<a href=\""+icon_url+"\" class=\"tooltipped\" data-tooltip=\"Right Click and select 'Save As'\">PNG</a>"+
          "<a href=\""+icon_url.replace("linux","windows").replace(".png",".ico")+"\" class=\"tooltipped\" data-tooltip=\"Right Click and select 'Save As'\">ICO</a>"+

        "</div>"+




    "<div class=\"card-reveal\">"+
      "<span class=\"card-title grey-text text-darken-4\">"+icon_title+"<i class=\"material-icons right\">close</i></span>"+
      "<p>Contributed by: <a href=https://github.com/"+contributor+" target=\"_blank\">"+contributor+"</p>"+
    "</div>"+
  "</div>"+
  "</div>"
}

function getTitle(title){
  return "<h3 id=\""+title.replace(' ', '_')+"\" class=\"title col s12\">" + title + "</h3>"
}

function getStatistics(){
  $.getJSON('https://raw.githubusercontent.com/HackeSta/atom-icons/master/.travis/stats.json', function(json) {
      $("#count_icons").html(json.icons);
      $("#count_contributors").html(json.contributors);
      $("#count_stars").html(json.stars);
      $("#count_forks").html(json.forks);
      $("#count_prs").html(json.prs);
  });
}
