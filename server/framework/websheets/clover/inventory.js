Meteor.methods({


	syncPosCategory:function(sessionId, doc, operation)
	{
		console.log(sessionId + ": syncPosCategory:operation: 			" + operation);
    	console.log(sessionId + ": syncPosCategory:doc: 				" + JSON.stringify(doc, null, 4));

    	var syncPosCategoryDoc = {

    		"sessionId": sessionId
    	}

		var response 			= {};
    	syncPosCategoryDoc.cloverUrl 			= cloverSystemUrl(doc.orgname);
    	syncPosCategoryDoc.cloverApiKey    		= cloverSystemApiKey(doc.orgname);
    	syncPosCategoryDoc.cloverMerchantId 	= cloverSystemMerchantId(doc.orgname);
    	console.log(sessionId + ": syncPosCategory:syncPosCategoryDoc: 				" + JSON.stringify(syncPosCategoryDoc, null, 4));
      	switch (operation)
      	{

          case websheets.public.generic.GET:
          		syncPosCategoryDoc.categoryDoc = {"id" : doc.cloverCategoryId};
                response = getOneCategory(syncPosCategoryDoc)
                break;

          case websheets.public.generic.GET_ALL:
          		response = getAllCategory(syncPosCategoryDoc)
                break;

          case websheets.public.generic.CREATE:

          		syncPosCategoryDoc.categoryDoc =  { "name": doc.Value };
          		response = createCategory(syncPosCategoryDoc);

                break;

          case websheets.public.generic.UPDATE:

          		syncPosCategoryDoc.categoryDoc = {"name": doc.Value,"id" : doc.cloverCategoryId };
				response = updateCategory(syncPosCategoryDoc);											
                break;

          case websheets.public.generic.DELETE:
                syncPosCategoryDoc.categoryDoc = {"id" : doc.cloverCategoryId};
               response = deleteCategory(syncPosCategoryDoc);	
                break;                
          default:
            
             console.log(sessionId + ": syncPosCategory: Sorry, Not a valid operation " + operation);

      	}
      	return response;
      }



});


getAllCategory = function(syncPosCategoryDoc )
{
	console.log(syncPosCategoryDoc.sessionId + ": getAllCategory:syncPosCategoryDoc: 				" + JSON.stringify(syncPosCategoryDoc, null, 4));

	var response 			={};
	var cloverUrl = syncPosCategoryDoc.cloverUrl + '/' + syncPosCategoryDoc.cloverMerchantId +'/categories';
	console.log(syncPosCategoryDoc.sessionId + " getAllCategory:cloverUrl = " + cloverUrl);

	try{
  				
  		response = HTTP.get(cloverUrl,
  			  				{
  			  					headers: 
  			  					{
  			  						'Authorization' : 'Bearer ' + syncPosCategoryDoc.cloverApiKey 
  			  					}
							});

        console.log(syncPosCategoryDoc.sessionId +": getAllCategory:response:: " +JSON.stringify(response, null, 4));
		console.log(syncPosCategoryDoc.sessionId +": getAllCategory:Done invoking HTTP.get to clover to get all the categories for merchant id : " + syncPosCategoryDoc.cloverMerchantId );
  		if(response.statusCode != 200)
  		{
  			console.log(syncPosCategoryDoc.sessionId +'getAllCategory-Failed', 'Get All Category failed with http status code [' + response.statusCode  + ']', e);
  		}
        else
        {
            console.log(syncPosCategoryDoc.sessionId +": getAllCategory:response.content:: " +JSON.stringify(response.content, null, 4));

        }

							
		}catch (e)
		{
			console.log(sessionId + ': getAllCategory-Failed', 'Could not GET All category failed', e);
			response.sessionId 				= syncPosCategoryDoc.sessionId;
			response.cloverError 			= e;
      		response.clover  				= false;
      		response.cloverAction 			= 'getAllCategory';
      		response.cloverUrl      		= cloverUrl;
      		response.syncPosCategoryDoc 	= syncPosCategoryDoc;

		}

		return response;

}



getOneCategory = function(syncPosCategoryDoc)
{
	console.log(syncPosCategoryDoc.sessionId + ": getOneCategory:syncPosCategoryDoc: 				" + JSON.stringify(syncPosCategoryDoc, null, 4));

	var response 			={};
	cloverUrl = syncPosCategoryDoc.cloverUrl + '/' + syncPosCategoryDoc.cloverMerchantId +'/categories/'+ syncPosCategoryDoc.categoryDoc.id;
	console.log(syncPosCategoryDoc.sessionId + " getOneCategory:cloverUrl = " + cloverUrl);

	try{
  				
  		response = HTTP.get(cloverUrl,
  			  				{
  			  					headers: 
  			  					{
  			  						'Authorization' : 'Bearer ' + syncPosCategoryDoc.cloverApiKey 
  			  					}
							});

        console.log(syncPosCategoryDoc.sessionId +": getOneCategory:response:: " +JSON.stringify(response, null, 4));
		console.log(syncPosCategoryDoc.sessionId + ": getOneCategory:Done invoking HTTP.get to clover to get one category: " + syncPosCategoryDoc.categoryDoc.id +" for merchant id : " + syncPosCategoryDoc.cloverMerchantId );
  		if(response.statusCode != 200)
  		{
  			console.log(syncPosCategoryDoc.sessionId +'getOneCategory-Failed', 'Get One Category failed with http status code [' + response.statusCode  + ']', e);
  		}
        else
        {
            console.log(syncPosCategoryDoc.sessionId +": getOneCategory:response.content:: " +JSON.stringify(response.content, null, 4));

        }

							
		}catch (e)
		{ 
			console.log(syncPosCategoryDoc.sessionId + ': getOneCategory-Failed', 'Could not GET One category failed', e);
			response.sessionId 				= syncPosCategoryDoc.sessionId;
			response.cloverError 			= e;
      		response.clover  				= false;
      		response.cloverAction 			= 'getOneCategory';
      		response.cloverUrl      		= cloverUrl;
      		response.syncPosCategoryDoc 	= syncPosCategoryDoc;

		}

		return response;

}


createCategory = function(syncPosCategoryDoc)
{
	console.log(syncPosCategoryDoc.sessionId + ": createCategory:syncPosCategoryDoc: 				" + JSON.stringify(syncPosCategoryDoc, null, 4));

	var response 			={};
	var cloverUrl = syncPosCategoryDoc.cloverUrl + '/' + syncPosCategoryDoc.cloverMerchantId +'/categories';
	console.log(syncPosCategoryDoc.sessionId + " createCategory:cloverUrl 			= " + cloverUrl);


	try{

  		response = HTTP.post(cloverUrl,
  			  				{
  			  					data   	: syncPosCategoryDoc.categoryDoc,
  			  					headers	: 
  			  					{
  			  						'Authorization' : 'Bearer ' + syncPosCategoryDoc.cloverApiKey 
  			  					}
							});

        console.log(syncPosCategoryDoc.sessionId +": createCategory:response:: " +JSON.stringify(response, null, 4));
		console.log(syncPosCategoryDoc.sessionId + ": createCategory:Done invoking HTTP.post to clover to create a category: " + syncPosCategoryDoc.categoryDoc.name+ " for merchant id : " + syncPosCategoryDoc.cloverMerchantId );
  		if(response.statusCode != 200)
  		{
  			console.log(syncPosCategoryDoc.sessionId +'createCategory-Failed', 'Get One Category failed with http status code [' + response.statusCode  + ']', e);
  		}
        else
        {
            console.log(syncPosCategoryDoc.sessionId +": createCategory:response.content:: " +JSON.stringify(response.content, null, 4));

        }

							
		}catch (e)
		{
			console.log(syncPosCategoryDoc.sessionId + ': createCategory-Failed', 'Could not create category failed', e);
			response.sessionId 				=syncPosCategoryDoc.sessionId;
			response.cloverError 			= e;
      		response.clover  				= false;
      		response.cloverAction 			= 'createCategory';
      		response.cloverUrl      		= cloverUrl;
      		response.syncPosCategoryDoc 	= syncPosCategoryDoc;

		}

		return response;

}

updateCategory = function(syncPosCategoryDoc )
{
	console.log(syncPosCategoryDoc.sessionId + ": updateCategory:syncPosCategoryDoc: " + JSON.stringify(syncPosCategoryDoc, null, 4));

	var response 			={};
	var cloverUrl = syncPosCategoryDoc.cloverUrl + '/' + syncPosCategoryDoc.cloverMerchantId +'/categories/'+syncPosCategoryDoc.categoryDoc.id;
	console.log(syncPosCategoryDoc.sessionId + " updateCategory:cloverUrl 			= " + cloverUrl);


	try{

		
  		response = HTTP.post(cloverUrl,
  			  				{
  			  					data   	: syncPosCategoryDoc.categoryDoc,
  			  					headers	: 
  			  					{
  			  						'Authorization' : 'Bearer ' + syncPosCategoryDoc.cloverApiKey 
  			  					}
							});

        console.log(syncPosCategoryDoc.sessionId +": updateCategory:response:: " +JSON.stringify(response, null, 4));
		console.log(syncPosCategoryDoc.sessionId + ": updateCategory:Done invoking HTTP.post to clover to update a category: " + syncPosCategoryDoc.categoryDoc.id + " for merchant id : " + syncPosCategoryDoc.cloverMerchantId );
  		if(response.statusCode != 200)
  		{
  			console.log(syncPosCategoryDoc.sessionId +'updateCategory-Failed', 'Update Category failed with http status code [' + response.statusCode  + ']', e);
  		}
        else
        {
            console.log(syncPosCategoryDoc.sessionId +": updateCategory:response.content:: " +JSON.stringify(response.content, null, 4));

        }

							
		}catch (e)
		{
			console.log(syncPosCategoryDoc.sessionId + ': updateCategory-Failed', 'Could not update category, failed', e);
			response.sessionId 				=syncPosCategoryDoc.sessionId;
			response.cloverError 			= e;
      		response.clover  				= false;
      		response.cloverAction 			= 'updateCategory';
      		response.cloverUrl      		= cloverUrl;
      		response.syncPosCategoryDoc 	= syncPosCategoryDoc;

		}

		return response;

}


deleteCategory = function(syncPosCategoryDoc )
{
	console.log(syncPosCategoryDoc.sessionId + ": deleteCategory:syncPosCategoryDoc: " + JSON.stringify(syncPosCategoryDoc, null, 4));

	var response 			={};
	var cloverUrl = syncPosCategoryDoc.cloverUrl + '/' + syncPosCategoryDoc.cloverMerchantId +'/categories/'+syncPosCategoryDoc.categoryDoc.id;
	console.log(syncPosCategoryDoc.sessionId + " deleteCategory:cloverUrl 			= " + cloverUrl);


	try{

		
  		response = HTTP.del(cloverUrl,
  			  				{
  			  					headers	: 
  			  					{
  			  						'Authorization' : 'Bearer ' + syncPosCategoryDoc.cloverApiKey 
  			  					}
							});

        console.log(syncPosCategoryDoc.sessionId + ": deleteCategory:response:: " +JSON.stringify(response, null, 4));
		console.log(syncPosCategoryDoc.sessionId + ": deleteCategory:Done invoking HTTP.post to clover to delete a category: " + syncPosCategoryDoc.categoryDoc.id + " for merchant id : " + syncPosCategoryDoc.cloverMerchantId );
  		if(response.statusCode != 200)
  		{
  			console.log(syncPosCategoryDoc.sessionId +'deleteCategory-Failed', ' Delete Category Category failed with http status code [' + response.statusCode  + ']', e);
  		}
        else
        {
            console.log(syncPosCategoryDoc.sessionId +": deleteCategory:response.content:: " +JSON.stringify(response.content, null, 4));

        }

							
		}catch (e)
		{
			console.log(syncPosCategoryDoc.sessionId + ': deleteCategory-Failed', 'Could not delete category, failed', e);
			response.sessionId 				=syncPosCategoryDoc.sessionId;
			response.cloverError 			= e;
      		response.clover  				= false;
      		response.cloverAction 			= 'deleteCategory';
      		response.cloverUrl      		= cloverUrl;
      		response.syncPosCategoryDoc 	= syncPosCategoryDoc;

		}

		return response;

}