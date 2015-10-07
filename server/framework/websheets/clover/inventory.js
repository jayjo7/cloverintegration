Meteor.methods({


	syncCloverPosCategory:function(sessionId, doc, operation)
	{
		console.log(sessionId + ": syncCloverPosCategory:operation: 			" + operation);
		console.log(sessionId + ": syncCloverPosCategory:doc.orgname: 		" + doc.orgname);
    	console.log(sessionId + ": syncCloverPosCategory:doc: 				" + JSON.stringify(doc, null, 4));

    	var syncCloverPosCategoryDoc = {

    		"sessionId": sessionId
    	}

		var response 			= {};
    	syncCloverPosCategoryDoc.cloverUrl 			= cloverSystemUrl(doc.orgname);
    	syncCloverPosCategoryDoc.cloverApiKey    		= cloverSystemApiKey(doc.orgname);
    	syncCloverPosCategoryDoc.cloverMerchantId 	= cloverSystemMerchantId(doc.orgname);
    	console.log(sessionId + ": syncCloverPosCategory:syncCloverPosCategoryDoc: 				" + JSON.stringify(syncCloverPosCategoryDoc, null, 4));
      	switch (operation)
      	{

          case websheets.public.generic.GET:
          		syncCloverPosCategoryDoc.categoryDoc = {"id" : doc.posId};
                response = getOneCategory(syncCloverPosCategoryDoc)
                break;

          case websheets.public.generic.GET_ALL:
          		response = getAllCategory(syncCloverPosCategoryDoc)
                break;

          case websheets.public.generic.CREATE:

          		syncCloverPosCategoryDoc.categoryDoc =  { 
          													"sortOrder" : doc.sheetRowId,
          													"name": doc.Value,
          												  	"id"  : doc.UniqueId
          												};
          		response = createCategory(syncCloverPosCategoryDoc);

                break;

          case websheets.public.generic.UPDATE:

          		syncCloverPosCategoryDoc.categoryDoc = {"name": doc.Value,"id" : doc.posId };
				response = updateCategory(syncCloverPosCategoryDoc);											
                break;

          case websheets.public.generic.DELETE:
                syncCloverPosCategoryDoc.categoryDoc = {"id" : doc.posId};
                response = deleteCategory(syncCloverPosCategoryDoc);	
                break;                
          default:
            
             console.log(sessionId + ": syncCloverPosCategory: Sorry, Not a valid operation " + operation);

      	}
      	return response;
      }



});


getAllCategory = function(syncCloverPosCategoryDoc )
{
	console.log(syncCloverPosCategoryDoc.sessionId + ": getAllCategory:syncCloverPosCategoryDoc: 				" + JSON.stringify(syncCloverPosCategoryDoc, null, 4));

	var response 			={};
	var cloverUrl = syncCloverPosCategoryDoc.cloverUrl + '/' + syncCloverPosCategoryDoc.cloverMerchantId +'/categories';
	console.log(syncCloverPosCategoryDoc.sessionId + " getAllCategory:cloverUrl = " + cloverUrl);

	try{
  				
  		response = HTTP.get(cloverUrl,
  			  				{
  			  					headers: 
  			  					{
  			  						'Authorization' : 'Bearer ' + syncCloverPosCategoryDoc.cloverApiKey 
  			  					}
							});

        console.log(syncCloverPosCategoryDoc.sessionId +": getAllCategory:response:: " +JSON.stringify(response, null, 4));
		console.log(syncCloverPosCategoryDoc.sessionId +": getAllCategory:Done invoking HTTP.get to clover to get all the categories for merchant id : " + syncCloverPosCategoryDoc.cloverMerchantId );
  		if(response.statusCode != 200)
  		{
  			console.log(syncCloverPosCategoryDoc.sessionId +'getAllCategory-Failed', 'Get All Category failed with http status code [' + response.statusCode  + ']', e);
  		}
        else
        {
            console.log(syncCloverPosCategoryDoc.sessionId +": getAllCategory:response.content:: " +JSON.stringify(response.content, null, 4));

        }

							
		}catch (e)
		{
			console.log(sessionId + ': getAllCategory-Failed', 'Could not GET All category failed', e);
			response.sessionId 				= syncCloverPosCategoryDoc.sessionId;
			response.cloverError 			= e;
      		response.clover  				= false;
      		response.cloverAction 			= 'getAllCategory';
      		response.cloverUrl      		= cloverUrl;
      		response.syncCloverPosCategoryDoc 	= syncCloverPosCategoryDoc;

		}

		return response;

}



getOneCategory = function(syncCloverPosCategoryDoc)
{
	console.log(syncCloverPosCategoryDoc.sessionId + ": getOneCategory:syncCloverPosCategoryDoc: 				" + JSON.stringify(syncCloverPosCategoryDoc, null, 4));

	var response 			={};
	cloverUrl = syncCloverPosCategoryDoc.cloverUrl + '/' + syncCloverPosCategoryDoc.cloverMerchantId +'/categories/'+ syncCloverPosCategoryDoc.categoryDoc.id;
	console.log(syncCloverPosCategoryDoc.sessionId + " getOneCategory:cloverUrl = " + cloverUrl);

	try{
  				
  		response = HTTP.get(cloverUrl,
  			  				{
  			  					headers: 
  			  					{
  			  						'Authorization' : 'Bearer ' + syncCloverPosCategoryDoc.cloverApiKey 
  			  					}
							});

        console.log(syncCloverPosCategoryDoc.sessionId +": getOneCategory:response:: " +JSON.stringify(response, null, 4));
		console.log(syncCloverPosCategoryDoc.sessionId + ": getOneCategory:Done invoking HTTP.get to clover to get one category: " + syncCloverPosCategoryDoc.categoryDoc.id +" for merchant id : " + syncCloverPosCategoryDoc.cloverMerchantId );
  		if(response.statusCode != 200)
  		{
  			console.log(syncCloverPosCategoryDoc.sessionId +'getOneCategory-Failed', 'Get One Category failed with http status code [' + response.statusCode  + ']', e);
  		}
        else
        {
            console.log(syncCloverPosCategoryDoc.sessionId +": getOneCategory:response.content:: " +JSON.stringify(response.content, null, 4));

        }

							
		}catch (e)
		{ 
			console.log(syncCloverPosCategoryDoc.sessionId + ': getOneCategory-Failed', 'Could not GET One category failed', e);
			response.sessionId 				= syncCloverPosCategoryDoc.sessionId;
			response.cloverError 			= e;
      		response.clover  				= false;
      		response.cloverAction 			= 'getOneCategory';
      		response.cloverUrl      		= cloverUrl;
      		response.syncCloverPosCategoryDoc 	= syncCloverPosCategoryDoc;

		}

		return response;

}


createCategory = function(syncCloverPosCategoryDoc)
{
	console.log(syncCloverPosCategoryDoc.sessionId + ": createCategory:syncCloverPosCategoryDoc: 				" + JSON.stringify(syncCloverPosCategoryDoc, null, 4));

	var response 			={};
	var cloverUrl = syncCloverPosCategoryDoc.cloverUrl + '/' + syncCloverPosCategoryDoc.cloverMerchantId +'/categories';
	console.log(syncCloverPosCategoryDoc.sessionId + " createCategory:cloverUrl 			= " + cloverUrl);


	try{

  		response = HTTP.post(cloverUrl,
  			  				{
  			  					data   	: syncCloverPosCategoryDoc.categoryDoc,
  			  					headers	: 
  			  					{
  			  						'Authorization' : 'Bearer ' + syncCloverPosCategoryDoc.cloverApiKey 
  			  					}
							});

        console.log(syncCloverPosCategoryDoc.sessionId +": createCategory:response:: " +JSON.stringify(response, null, 4));
		console.log(syncCloverPosCategoryDoc.sessionId + ": createCategory:Done invoking HTTP.post to clover to create a category: " + syncCloverPosCategoryDoc.categoryDoc.name+ " for merchant id : " + syncCloverPosCategoryDoc.cloverMerchantId );
  		if(response.statusCode != 200)
  		{
  			console.log(syncCloverPosCategoryDoc.sessionId +'createCategory-Failed', 'Get One Category failed with http status code [' + response.statusCode  + ']', e);
  		}
        else
        {
            console.log(syncCloverPosCategoryDoc.sessionId +": createCategory:response.content:: " +JSON.stringify(response.content, null, 4));

        }

							
		}catch (e)
		{
			console.log(syncCloverPosCategoryDoc.sessionId + ': createCategory-Failed', 'Could not create category failed', e);
			response.sessionId 				=syncCloverPosCategoryDoc.sessionId;
			response.cloverError 			= e;
      		response.clover  				= false;
      		response.cloverAction 			= 'createCategory';
      		response.cloverUrl      		= cloverUrl;
      		response.syncCloverPosCategoryDoc 	= syncCloverPosCategoryDoc;

		}

		return response;

}

updateCategory = function(syncCloverPosCategoryDoc )
{
	console.log(syncCloverPosCategoryDoc.sessionId + ": updateCategory:syncCloverPosCategoryDoc: " + JSON.stringify(syncCloverPosCategoryDoc, null, 4));

	var response 			={};
	var cloverUrl = syncCloverPosCategoryDoc.cloverUrl + '/' + syncCloverPosCategoryDoc.cloverMerchantId +'/categories/'+syncCloverPosCategoryDoc.categoryDoc.id;
	console.log(syncCloverPosCategoryDoc.sessionId + " updateCategory:cloverUrl 			= " + cloverUrl);


	try{

		
  		response = HTTP.post(cloverUrl,
  			  				{
  			  					data   	: syncCloverPosCategoryDoc.categoryDoc,
  			  					headers	: 
  			  					{
  			  						'Authorization' : 'Bearer ' + syncCloverPosCategoryDoc.cloverApiKey 
  			  					}
							});

        console.log(syncCloverPosCategoryDoc.sessionId +": updateCategory:response:: " +JSON.stringify(response, null, 4));
		console.log(syncCloverPosCategoryDoc.sessionId + ": updateCategory:Done invoking HTTP.post to clover to update a category: " + syncCloverPosCategoryDoc.categoryDoc.id + " for merchant id : " + syncCloverPosCategoryDoc.cloverMerchantId );
  		if(response.statusCode != 200)
  		{
  			console.log(syncCloverPosCategoryDoc.sessionId +'updateCategory-Failed', 'Update Category failed with http status code [' + response.statusCode  + ']', e);
  		}
        else
        {
            console.log(syncCloverPosCategoryDoc.sessionId +": updateCategory:response.content:: " +JSON.stringify(response.content, null, 4));

        }

							
		}catch (e)
		{
			console.log(syncCloverPosCategoryDoc.sessionId + ': updateCategory-Failed', 'Could not update category, failed', e);
			response.sessionId 				=syncCloverPosCategoryDoc.sessionId;
			response.cloverError 			= e;
      		response.clover  				= false;
      		response.cloverAction 			= 'updateCategory';
      		response.cloverUrl      		= cloverUrl;
      		response.syncCloverPosCategoryDoc 	= syncCloverPosCategoryDoc;

		}

		return response;

}


deleteCategory = function(syncCloverPosCategoryDoc )
{
	console.log(syncCloverPosCategoryDoc.sessionId + ": deleteCategory:syncCloverPosCategoryDoc: " + JSON.stringify(syncCloverPosCategoryDoc, null, 4));

	var response 			={};
	var cloverUrl = syncCloverPosCategoryDoc.cloverUrl + '/' + syncCloverPosCategoryDoc.cloverMerchantId +'/categories/'+syncCloverPosCategoryDoc.categoryDoc.id;
	console.log(syncCloverPosCategoryDoc.sessionId + " deleteCategory:cloverUrl 			= " + cloverUrl);


	try{

		
  		response = HTTP.del(cloverUrl,
  			  				{
  			  					headers	: 
  			  					{
  			  						'Authorization' : 'Bearer ' + syncCloverPosCategoryDoc.cloverApiKey 
  			  					}
							});

        console.log(syncCloverPosCategoryDoc.sessionId + ": deleteCategory:response:: " +JSON.stringify(response, null, 4));
		console.log(syncCloverPosCategoryDoc.sessionId + ": deleteCategory:Done invoking HTTP.post to clover to delete a category: " + syncCloverPosCategoryDoc.categoryDoc.id + " for merchant id : " + syncCloverPosCategoryDoc.cloverMerchantId );
  		if(response.statusCode != 200)
  		{
  			console.log(syncCloverPosCategoryDoc.sessionId +'deleteCategory-Failed', ' Delete Category Category failed with http status code [' + response.statusCode  + ']', e);
  		}
        else
        {
            console.log(syncCloverPosCategoryDoc.sessionId +": deleteCategory:response.content:: " +JSON.stringify(response.content, null, 4));

        }

							
		}catch (e)
		{
			console.log(syncCloverPosCategoryDoc.sessionId + ': deleteCategory-Failed', 'Could not delete category, failed', e);
			response.sessionId 				=syncCloverPosCategoryDoc.sessionId;
			response.cloverError 			= e;
      		response.clover  				= false;
      		response.cloverAction 			= 'deleteCategory';
      		response.cloverUrl      		= cloverUrl;
      		response.syncCloverPosCategoryDoc 	= syncCloverPosCategoryDoc;

		}

		return response;

}