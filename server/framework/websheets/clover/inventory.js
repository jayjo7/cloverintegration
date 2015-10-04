Meteor.methods({


	processCategory:function(sessionId, doc, operation)
	{
		console.log(sessionId + ": processCategory:operation: 			" + operation);
    	console.log(sessionId + ": processCategory:doc: 				" + JSON.stringify(doc, null, 4));

		var response 			={};
    	var cloverUrl 			= orderProcessorUrl(doc.orgname);
    	var cloverApiKey    	= orderProcessorApiKey(doc.orgname);
    	var cloverMerchantId 	= orderProcessorMerchantId(doc.orgname);
    	console.log(sessionId + ": processCategory:cloverUrl: 			" + cloverUrl);
    	console.log(sessionId + ": processCategory:cloverApiKey: 		" + cloverApiKey);
    	console.log(sessionId + ": processCategory:cloverMerchantId: 	" + cloverMerchantId);

      	switch (operation)
      	{

          case websheets.public.generic.GET:
                break;

          case websheets.public.generic.GET_ALL:
          		getAllCategory(sessionId, cloverUrl, cloverMerchantId, cloverApiKey)
                break;

          case websheets.public.generic.CREATE:
                break;

          case websheets.public.generic.UPDATE:
                break;

          default:
            
             console.log(sessionId + ": processCategory: Sorry, Not a valid operation " + operation);

      	}
      }



});


getAllCategory = function(sessionId, cloverUrl, cloverMerchantId, cloverApiKey )
{
	var response 			={};
	cloverUrl = cloverUrl + '/' + cloverMerchantId +'/ccategories';
	console.log(sessionId + " getAllCategory:cloverUrl = " + cloverUrl);

	try{
  				
  		response = HTTP.get(cloverUrl,
  			  				{
  			  					headers: 
  			  					{
  			  						'Authorization' : 'Bearer 1ff7226e-7ba8-a0a8-4389-7df75d013b9f'
  			  					}
							});

        console.log(sessionId +": getAllCategory:response:: " +JSON.stringify(response, null, 4));
		console.log(sessionId + ": getAllCategory:Done invoking HTTP.Post to websheets");
  		if(response.statusCode != 200)
  		{
  			console.log('getAllCategory-Failed', 'Get All Category failed with http status code [' + response.statusCode  + ']', e);
  		}
        else
        {
            console.log(sessionId +": getAllCategory:response.content:: " +JSON.stringify(response.content, null, 4));

        }

							
		}catch (e)
		{
			console.log(sessionId + ': getAllCategory-Failed', 'Could not GET All categoryfailed', e);
			response.websheetsError = e;
      		response.websheets  = false;
		}

		return response;

}