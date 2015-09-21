//Note to Jay - Refactor when you get a chance to read the data from settings.json and load the database 
Meteor.startup(function() {


    	if ( !SupportedTabs.findOne({'tabName': 'menu'}))
    	{
    			SupportedTabs.insert({'tabName': 'menu', 	'state': 'enabled'});

    	}

    	if ( !SupportedTabs.findOne({'tabName': 'orders'}))
    	{
			SupportedTabs.insert({'tabName':'orders', 	'state': 'enabled'});
		}


    	if ( !SupportedTabs.findOne({'tabName': 'Content'}))
    	{
			SupportedTabs.insert({'tabName':'Content', 	'state': 'enabled'});
		}


    	if ( !SupportedTabs.findOne({'tabName': 'Settings'}))
    	{
			SupportedTabs.insert({'tabName':'Settings', 'state': 'enabled'});
		}

});