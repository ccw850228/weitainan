var restaurants=[];
var all=[];
var favorite=[];
var focusInfoWindow;
var map;

  jQuery(document).ready(function($) {
      // $.get('/getJson').success(function(restaurants){
      //   //console.log(restaurants)
  });
  
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 22.999533, lng: 120.203401}
    });

    includeData();
    
    //show_Data();
  }
  function includeData() {

    $.get( "/list", function( data ) {
      for (var i = 0; i < data.length; i++) {
      }
      // console.log(data[293].餐飲店家名稱);
      // console.log(data[293].favorite);
      //  console.log(data[292].餐飲店家名稱);
      // console.log(data[292].favorite);
      //  console.log(data[291].餐飲店家名稱);
      // console.log(data[291].favorite);
      show_Data(data);

    });
  }
  //setMarkers(map);

  function show_Data(restaurants) {
    //console.log(restaurants[0].favorite);
    for (var i = 0 ; i < restaurants.length; i++) {
      // var restaurant = restaurants[i];
      //var dataFavorite = data[i].favorite;
      //console.log(restaurants[115].favorite);
      if (restaurants[i].favorite == false) {
          dataFavoriteHtml = '<img src="https://raw.githubusercontent.com/zitim/Tainan_restaurant/master/public/assets/img/empty-heart.png">';
      } else {
          dataFavoriteHtml = '<img src="https://raw.githubusercontent.com/zitim/Tainan_restaurant/master/public/assets/img/heart.png">';
      }

      createMarker(restaurants[i].id,restaurants[i].餐飲店家名稱,restaurants[i].X坐標,restaurants[i].Y坐標,restaurants[i].店家地址,restaurants[i].店家電話,restaurants[i].營業時間,dataFavoriteHtml);
      //setMarkers(restaurants);
      $('#sidebar-left' ).append(
          '<li><h3>'+restaurants[i].餐飲店家名稱+'</h3></div>'+
          restaurants[i].店家地址+'<br/>'+
          restaurants[i].店家電話+'<br/>'+
          restaurants[i].營業時間+'<br/>'+
          '<button id="favorite" onclick="change_Favorite(\''+restaurants[i].id+'\',\''+restaurants[i].餐飲店家名稱+'\',\''+restaurants[i].店家地址+'\',\''+restaurants[i].店家電話+'\',\''+restaurants[i].營業時間+'\', $(this))">'+dataFavoriteHtml+'</button></li>'+
          '</li>');
      }
    //   console.log(restaurant[2]);
  }

  function createMarker(id,res_name,res_X,res_Y,res_address,res_phone,res_time,favorite) {
    // Adds markers to the map.

    infowindow = new google.maps.InfoWindow();
    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    var image = {
      url: 'assets/img/bitnami.ico',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };

    var shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };
    //console.log(res_X);
    var marker = new google.maps.Marker({
        position: {lat: res_Y, lng: res_X},
        map: map,
                    //icon: image,
                    //shape: shape,
                    //title: restaurant[0],
                    //zIndex: restaurant[3]
    });

    var infowindow = new google.maps.InfoWindow({
        content: 
        '<div class="res_name" ><h3>'+res_name+'</h3></div>'+
        '<ul>'+
        '<li>'+res_address+'</li><br/>'+
        '<li>'+res_phone+'</li><br/>'+
        '<li>'+res_time+'</li><br/>'+
              //'<li>──────────────</li><br>'+
        '<li><button id="favorite" onclick="change_Favorite(\''+id+'\',\''+res_name+'\',\''+res_address+'\',\''+res_phone+'\',\''+res_time+'\', $(this))">'+dataFavoriteHtml+'</button></li>'+
        '</ul>',
              
        maxWidth: 400
    });

         marker.addListener('click', function() {
          infowindow.open(map, marker);
          map.zoom = 25;
          //map.panTo(marker.getPosition());
        });
  }

    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
  

function focusLocation(dataCount,marker){
  console.log(dataCount);
    if (focusInfoWindow != null) {
        focusInfoWindow.close();
    }
    // if (focusList != null) {
    //     focusList.removeClass('selected');
    // }

    var focusMarker = markers[dataCount];
    focusInfoWindow = infoWindows[dataCount];
    var listCount = Number(dataCount) + 1;
    //focusList = $('#sidebar > li:nth-child(' + listCount + ')');

    focusInfoWindow.open(map, focusMarker);
    map.panTo(focusMarker.getPosition());
    map.setZoom(15);

    focusMarker.setAnimation(google.maps.Animation.BOUNCE);
    window.setTimeout(function() {
        focusMarker.setAnimation(null);
    }, 2250);

    //focusList.addClass('selected');

    $('.filter').hide();
}
  function change_Favorite(res_id,res_name,res_address,res_phone,res_time,dataElemet){

      if(dataElemet.html() == '<img src="https://raw.githubusercontent.com/zitim/Tainan_restaurant/master/public/assets/img/empty-heart.png">'){
        dataElemet.html('<img src="https://raw.githubusercontent.com/zitim/Tainan_restaurant/master/public/assets/img/heart.png">');
        
        $.post('/collect', {'res_id': res_id}).success(function(data){
              //console.log(res_id);
              if(data=='success'){
                //window.location.reload(" page.index ");
                //alert('刪除成功');
              }else{
                //alert('刪除失敗');
              }
          });
        
      }else {
        dataElemet.html('<img src="https://raw.githubusercontent.com/zitim/Tainan_restaurant/master/public/assets/img/empty-heart.png">');

        $.post('/remove', {'res_id': res_id}).success(function(data){
              //console.log(res_id);
              if(data=='success'){
                //window.location.reload(" page.index ");
                //alert('刪除成功');
              }else{
                //alert('刪除失敗');
              }
          });
      }
  }


