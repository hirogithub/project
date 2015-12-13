$(function(){
  $(".text_button").click(function(){
    var name = $('.text_name').val();
    var age = $('.text_age').val();
    var marriaged = $('.text_marriaged').val();
    var address = $('.text_address').val();
    var children = $('.text_children').val();
    var attr = $('.text_attr').val();

    var cond = [9999,9999,9999,9999,9999];
    for(var i = 0;i<5; i++){
      if($('.cond_' + String(i)).val() != ''){
      cond[i] = $('.cond_' + String(i)).attr("name") + $('.cond_' + String(i)).val() + 'm';
      alert(cond[i]);
      }
    }
    var lat = $('.text_lat').val();
alert(lat);
    var lon = $('.text_lon').val();

var jsonData = {};
jsonData['緯度'] = parseInt(lat);
jsonData['経度'] = parseInt(lon);
  alert(jsonData);
  var dumper = new JKL.Dumper();
  // dumper.dump(jsonData);


// $.post("http://localhost:8080/getLocationAttribute",{ dataType: 'jsonp', jsonpCallback: 'callback',data:   dumper.dump(jsonData),   success: function(d) {
// $.post("http://localhost:8080/test",{ dataType: 'jsonp', jsonpCallback: 'callback',data:   dumper.dump(jsonData),   success: function(d) {
//       console.log(d);
//       alert(d);
//     },
//     error: function(XMLHttpRequest, textStatus, errorThrown) {
//   　   console.log(XMLHttpRequest + " " + textStatus);
//     }});



 // var xmlHttp = new XMLHttpRequest();

  // xmlHttp.open("POST", "http://localhost:8080/getLocationAttribute", false);
  // xmlHttp.responseType = "json";
  // xmlHttp.addEventListener("load",function(ev){
  //   getJsonData = xmlHttp.response;
  // });
  // xmlHttp.send(111); //送信データ
  });
// {"foo":1}
// callback({"foo":1})
});






















// ================================================================
//  jkl-dumper.js ---- JavaScript Object Dumper
//  Copyright 2005-2006 Kawasaki Yusuke <u-suke@kawa.net>
//  2005/05/18 - First Release
//  2006/09/04 - http://www.rfc-editor.org/rfc/rfc4627.txt
//  ===============================================================

/******************************************************************

    <script type="text/javascript" src="./jkl-dumper.js" charset="Shift_JIS"></script>
    <script><!--
        var data = {
            string: "string",
            array:  [ 1, 2, 3 ],
            hash:   { key1: "value1", key2: "value2" },
            data1:  null,
            data2:  true,
            data3:  false
        };
        var dumper = new JKL.Dumper();
        document.write( dumper.dump( data ) );
    //--></script>

******************************************************************/

if ( typeof(JKL) == 'undefined' ) JKL = function() {};

//  JKL.Dumper Constructor

JKL.Dumper = function () {
    return this;
};

//  Dump the data into JSON format

JKL.Dumper.prototype.dump = function ( data, offset ) {
    if ( typeof(offset) == "undefined" ) offset = "";
    var nextoff = offset + "  ";
    switch ( typeof(data) ) {
    case "string":
        return '"'+this.escapeString(data)+'"';
        break;
    case "number":
        return data;
        break;
    case "boolean":
        return data ? "true" : "false";
        break;
    case "undefined":
        return "null";
        break;
    case "object":
        if ( data == null ) {
            return "null";
        } else if ( data.constructor == Array ) {
            var array = [];
            for ( var i=0; i<data.length; i++ ) {
                array[i] = this.dump( data[i], nextoff );
            }
            return "[\n"+nextoff+array.join( ",\n"+nextoff )+"\n"+offset+"]";
        } else {
            var array = [];
            for ( var key in data ) {
                var val = this.dump( data[key], nextoff );
//              if ( key.match( /[^A-Za-z0-9_]/ )) {
                    key = '"'+this.escapeString( key )+'"';
//              }
                array[array.length] = key+": "+val;
            }
            if ( array.length == 1 && ! array[0].match( /[\n\{\[]/ ) ) {
                return "{ "+array[0]+" }";
            }
            return "{\n"+nextoff+array.join( ",\n"+nextoff )+"\n"+offset+"}";
        }
        break;
    default:
        return data;
        // unsupported data type
        break;
    }
};

//  escape '\' and '"'

JKL.Dumper.prototype.escapeString = function ( str ) {
    return str.replace( /\\/g, "\\\\" ).replace( /\"/g, "\\\"" );
};

//  ===============================================================






var map = null;
var infowindow = new google.maps.InfoWindow();
var gmarkers = [];
var i = 0;
var latitude = 35.5151318;
var longitude = 134.1718391;
var data = [
  [35.4101042, 134.1993265],
  [35.5059653, 134.2316861],
  [35.4917976, 134.2569704],
];
var name = ["鳥取市河原町鮎ヶ丘1151", "鳥取市西町5丁目353", "鳥取市卯垣5丁目57"];

function inicializar() {
    var option = {
        zoom: 10,
        center: new google.maps.LatLng(data[0][0], data[0][1]),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), option);
    google.maps.event.addListener(map, "click", function() {infowindow.close();});


    for(var i=0;i<3;i++){
      var point = new google.maps.LatLng(data[i][0], data[i][1]);
      var marker = create_maker(point, "空きや");
    }
}

function create_maker(latlng, label, html) {
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        //icon: isNumberPin ? new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+ (i + 1) + "|ff7e73|000000") : null,
        title: label
      });
    gmarkers[i] = marker;
    i++;
    return marker;
}

function map_click(index) {
    google.maps.event.trigger(gmarkers[index], "click");
}

function show_list(){
  //for(var i=0;i<3;i++){
    document.write('<li><a href="' +  "https://www.google.co.jp/?gws_rd=ssl" + '">' + "鳥取市河原町鮎ヶ丘1151" + '</a></li>');
    document.write('<li><a href="' +  "https://www.google.co.jp/?gws_rd=ssl" + '">' + "鳥取市西町5丁目353" + '</a></li>');
    document.write('<li><a href="' +  "https://www.google.co.jp/?gws_rd=ssl" + '">' + "鳥取市卯垣5丁目57" + '</a></li>');
  //}
}

$(function(){
  $(".text_button_temp").click(function(){
    console.log('botton push');
     inicializar();
   });
});
