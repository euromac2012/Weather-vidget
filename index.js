
$(document).ready(function() {
  getWeather();
  var currentId = 3;
  var cityName;

    $(".btn").click(function verifyNameLocation(input) {
      input = $('input').val();
      console.log(input);
      $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/find',
        jsonp: 'callback',
        dataType: 'jsonp',
        data: {
          q: input,
          appid: 'd9db9c9b54cf5bdfca4abacc931c4d98'
        },
        success: function (res) {
          console.log(res);
          if (res.count > 0) {
            cityName = res.list[0].name;
           /* console.log(cityName);
            if (input === cityName) {*/
              $('.error-message').css('display', 'none');
              addNewTab();
         //   } else {
           //   $('.error-message').css('display', 'block');
          //  }
          } else {
            $('.error-message').css('display', 'block');
          }
        },
        error: function(xhr, status, error) {
          $('.error-message').css('display', 'block');
        }
      });

    });

    function addNewTab() {
      var tabCurrentId = 'tab-' + currentId;
      $('<li><div>' + cityName + '</div><img src="image/x.jpg"/></li>').appendTo('ul').attr('data-tab', tabCurrentId);
      $('<div><p></p></div>').appendTo('.tab').attr({
        'id': tabCurrentId,
        'class': 'tab-content'
      });
      $('input').val('').attr('placeholder');

      currentId += 1;
    }

    $('body').on('click', "ul.tabs-menu li", function () {
      var tabId = $(this).attr("data-tab");

      $("ul.tabs-menu li").removeClass("current");
      $(".tab-content").removeClass("current");

      $(this).addClass('current');
      $('#' + tabId).addClass('current');
      getWeather();
    });

  $('body').on('click', 'li img', function(e) {
    e.stopPropagation();
    var removeTabId = $(this).parent().attr("data-tab");
    $(this).closest('li').remove();
    $('div#' + removeTabId).remove();
  });


  function getWeather(location) {
    location = $('li.current div').text();
    $('div .tab .current span').remove();
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/find',
      jsonp: 'callback',
      dataType: 'jsonp',
      data: {
        q: location,
        units: 'metric',
        appid: 'd9db9c9b54cf5bdfca4abacc931c4d98'
      },
      success: function (response) {
        console.log(response);
        var tempMin = response.list[0].main.temp_min;
        var tempMax = response.list[0].main.temp_max;
        var windSpeed = response.list[0].main.wind;
        var cloudIcon = response.list[0].weather[0].icon;
       // $('div .tab .current').append('<p>' + (JSON.stringify(response)) + '</p>');
        $('div .tab .current').append('<div class = "cloud"><img src="http://openweathermap.org/img/w/' + cloudIcon + '.png"/></div>');
        $('div .tab .current').append('<span class = "temp"> t min = ' + tempMin + "°C</br></br>t max = " + tempMax + '°C</span>');


      }
    });
  }
});

