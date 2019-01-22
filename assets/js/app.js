var map, featureList, boroughSearch = [], theaterSearch = [], museumSearch = [];

//for load searching
var tbh_citySearch=[];

//how to  load eveything
var sidebarLayers=[];

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  //sidebarClick(parseInt($(this).attr("id"), 10));
  sidebarClick($(this).attr("lat"),$(this).attr("lng"));
});

if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(boroughs.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

//function sidebarClick(id) {
function sidebarClick(lat,lng) {
  //var layer = markerClusters.getLayer(id);
  //map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  map.setView([lat, lng], 21);
  //layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

function syncSidebar() {
  /* Empty sidebar features */
  //$("#feature-list tbody").empty();
  /* Loop through theaters layer and add only features which are in the map bounds */
//  theaters.eachLayer(function (layer) {
//    if (map.hasLayer(theaterLayer)) {
//      if (map.getBounds().contains(layer.getLatLng())) {
//        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
//      }
//    }
//  });
  /* Loop through museums layer and add only features which are in the map bounds */
//  museums.eachLayer(function (layer) {
//    if (map.hasLayer(museumLayer)) {
//      if (map.getBounds().contains(layer.getLatLng())) {
//        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
//      }
//    }
//  });
  /* Update list.js featureList */
//////  featureList = new List("features", {
//////    valueNames: ["feature-name"]
//////  });
//////  featureList.sort("feature-name", {
//////    order: "asc"
//////  });
}

/* Basemap Layers */
var carto_positron_lite_rainbow = L.tileLayer(
  "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png",{
	  subdomains:"abcd",
	  attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	  maxZoom: 18
  });

var carto_label = L.tileLayer(
	"https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_only_labels/{z}/{x}/{y}.png",{
	  subdomains:"abcd",
		maxZoom:18
	});
var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};

//for colour data map
var ruangColors={
  "yes":"rgba(40,96,144,1.0)",
  "school":"rgba(234,137,150,1.0)",
};

function style_ruang(feature) {
  return {
    opacity: 1,
    color: 'rgba(0,0,0,0.1)',
    dashArray: '',
    lineCap: 'butt',
    lineJoin: 'miter',
    weight: 3.0, 
    fillOpacity: 1,
    fillColor: ruangColors[feature.properties['building']]
  };
}

// Building Tembilahan City
var tbh_city = L.geoJson(null, {
  style: style_ruang,
  onEachFeature: function (feature, layer) {
    tbh_citySearch.push({
      name: layer.feature.properties.name,
      source: "Tembilahan City Building",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
	
	//antenttion modal
      var content = "<table class='table table-striped table-bordered table-condensed'>" 
    + "<tr><th>Osm ID</th><td>" + feature.properties.osm_way_id + "</td></tr>" 
    + "<tr><th>Name Building</th><td>" + feature.properties.name + "</td></tr>" 
	  + "<tr><th>Building</th><td>" + feature.properties.type + " </td></tr>" 
	  + "<tr><th>Other</th><td>" + feature.properties.amenity + "</td></tr>" 
	  + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.name);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        }
      });
	
      $("#feature-list tbody").append('<tr class="feature-row" id="' 
		+ L.stamp(layer) 
		+ '" lat="'+feature.geometry.coordinates[0][0][1] 
		+ '" lng="' +feature.geometry.coordinates[0][0][0] 
		+ '" bounds="' +layer.getBounds() 
		+ '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' 
		+ layer.feature.properties.name 
		+ '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');

  }
});
$.getJSON("data/building_tembilahan_city.geojson", function (data) {
  tbh_city.addData(data);
});



/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});

map = L.map("map", {
  zoom: 120,
  center: [-0.31929, 103.15407], // center di 101.35569777220351, 0.468057021493219 
  // default layers on
  layers: [tbh_city],
  zoomControl: false,
  // we have our own attributionControl
  attributionControl: false
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  //if (e.layer === theaterLayer) {
  //  markerClusters.addLayer(theaters);
  //  syncSidebar();
  //}
  //if (e.layer === museumLayer) {
  //  markerClusters.addLayer(museums);
  //  syncSidebar();
  //}
  
  // karena semuanya ditambahkan ... ngga usah pake if if an
  //markerClusters.addLayer(e.layer);
  //syncSidebar();
});

map.on("overlayremove", function(e) {
  //if (e.layer === theaterLayer) {
  //  markerClusters.removeLayer(theaters);
  //  syncSidebar();
  //}
  //if (e.layer === museumLayer) {
  //  markerClusters.removeLayer(museums);
  //  syncSidebar();
  //}
  
  //markerClusters.removeLayer(e.layer);
  //syncSidebar();  
  
});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  //syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by <a href='https://www.github.com/hendriekasaputra'>Hendrieka</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Street Map": cartoLight,
  "Google Streets":googleStreets,
  "Google Hybrid":googleHybrid,
  "Google Satellite":googleSat,
  "Google Terrain":googleTerrain,
  //"Aerial Imagery": usgsImagery,
  "Carto Positron": carto_positron_lite_rainbow
};

var groupedOverlays = {
  "Building": {
  "Labels Name": carto_label,
    "TBH City Building": tbh_city
  }
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  

  /* Fit map to bounds */
  map.fitBounds(tbh_city.getBounds());
  //antenttion
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});

  //untuk searching
  var tbh_cityBH = new Bloodhound({
    name: "Tembilahan City Building",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: tbh_citySearch,
    limit: 10
  });
  tbh_cityBH.initialize();
  
  
  /*
  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  geonamesBH.initialize();
  */

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "fst1",
    displayKey: "name",
    source: tbh_cityBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>FST Lt 1</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    //if (datum.source === "tbh") {
      map.fitBounds(datum.bounds);
    //}
    //if (datum.source === "Theaters") {
    //  if (!map.hasLayer(theaterLayer)) {
    //    map.addLayer(theaterLayer);
    //  }
    //  map.setView([datum.lat, datum.lng], 17);
    //  if (map._layers[datum.id]) {
    //    map._layers[datum.id].fire("click");
    //  }
    //}
    //if (datum.source === "Museums") {
    //  if (!map.hasLayer(museumLayer)) {
    //    map.addLayer(museumLayer);
    //  }
    //  map.setView([datum.lat, datum.lng], 17);
    //  if (map._layers[datum.id]) {
    //    map._layers[datum.id].fire("click");
    //  }
    //}
    //if (datum.source === "GeoNames") {
    //  map.setView([datum.lat, datum.lng], 14);
    //}
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
