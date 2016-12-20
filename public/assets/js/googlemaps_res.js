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

    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      
      var locations = [
        {lat: -31.563910, lng: 147.154312},
        {lat: -33.718234, lng: 150.363181},
        {lat: -33.727111, lng: 150.371124},
        {lat: -33.848588, lng: 151.209834},
        {lat: -33.851702, lng: 151.216968},
        {lat: -34.671264, lng: 150.863657},
        {lat: -35.304724, lng: 148.662905},
        {lat: -36.817685, lng: 175.699196},
        {lat: -36.828611, lng: 175.790222},
        {lat: -37.750000, lng: 145.116667},
        {lat: -37.759859, lng: 145.128708},
        {lat: -37.765015, lng: 145.133858},
        {lat: -37.770104, lng: 145.143299},
        {lat: -37.773700, lng: 145.145187},
        {lat: -37.774785, lng: 145.137978},
        {lat: -37.819616, lng: 144.968119},
        {lat: -38.330766, lng: 144.695692},
        {lat: -39.927193, lng: 175.053218},
        {lat: -41.330162, lng: 174.865694},
        {lat: -42.734358, lng: 147.439506},
        {lat: -42.734358, lng: 147.501315},
        {lat: -42.735258, lng: 147.438000},
        {lat: -43.999792, lng: 170.463352}
      ]

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
    

    // var markers = locations.map(function(location) {
    //       return new google.maps.Marker({
    //         position: {lat: res_Y, lng: res_X}
           
    //       });
    //     });


    var marker = new google.maps.Marker({
        position: {lat: res_Y, lng: res_X},
        map: map,
                    //icon: image,
                    //shape: shape,
                    //title: restaurant[0],
                    //zIndex: restaurant[3]
    });

    // var markerCluster = new MarkerClusterer(map, markers,
    //         {imagePath: '/public/assets/img'});
      

    // var locations = [
    //     {lat: res_Y, lng: res_X}
        
    //   ];

    var s1 ='<script src="/public/assets/js/markerclusterer.js"></script>';
    var s2 ='<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0SEsueJfTm1q5k7bnAkt1OLTFv1oO2C0&signed_in=true&callback=initMap"></script>'

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
        
        $.post('/collect', {'res_id': res_id,'user_id': user_id}).success(function(data){
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

        $.post('/remove', {'res_id': res_id,'user_id': user_id}).success(function(data){
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

