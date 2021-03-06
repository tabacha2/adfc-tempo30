define('tempo30/view/position_dialog', [
    'jquery',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
    'tempo30/view/positionmap',
], function ($, bootstrap, BootstrapDialog, gt, createMap) {

    'use strict';

    function getDialog(data, backCb, nextCb, errorDialog) {
	var lat = data.lat, lon= data.lon;
	var buttons=[
            {
                id: 'btn-err',
	        cssClass: 'btn-link adfc-antrag-btn-err',
                label: gt('Fehler/Problem melden'),
                action: function (dialogRef) {
                    errorDialog('Problem mit dem Tempo30 Antrag 2', '(Schritt 2:'+JSON.stringify(data)+')').open();
                }
            }, {
		id: 'back-btn',
		label: gt('zurück'),
		title: gt('zu Schritt 1'),
		action: function (dialogRef) {
		    dialogRef.close();
		    backCb(data);
		}
	    },
	    {
		id: 'next-btn',
		label: gt('weiter'),
		cssClass: 'btn-primary',
		title: gt('Zeigt den Antragstext in einem neuen Fenster'),
		action: function (dialogRef) {
		    dialogRef.close();
		    data.lat=lat;
		    data.lon=lon;
		    nextCb(data);
		}
	    }];
	
	var dialog = new BootstrapDialog({
            'title': gt('Tempo 30 beantragen, Schritt 2: Bestätigen Sie Ihren Wohnort'),
            'message': gt('Bitte kontrollieren Sie die Position und verschieben Sie ggf. den Marker an Ihren Wohnort durch einen Klick')+
		'<div id="positionmap" style="width:100%; height: 400px;"></div>',
            'buttons': buttons,
	    onshown: function(dialogRef){
		console.log(lat,lon);
		var map=createMap('positionmap', lat, lon);
		map.on('posChange',function (e) {
		    console.log('posChange',e);
		    lat=e.lat;
		    lon=e.lng;
		});
	    },
	    onhide: function(dialogRef){
            },
        });
 
	return dialog;
    }
    return getDialog;
});
