Meteor.methods({

       //syncPosDoc = {
      //  "doc":doc
      //  "sessionId": sessionId,
      //  "component": component,
      //  "operation": operation,
      //}


syncCloverPos: function (syncPosDoc)
{

    console.log(syncPosDoc.sessionId + ": syncCloverPos:doc.orgname:    " + syncPosDoc.doc.orgname);
    console.log(syncPosDoc.sessionId + ": syncCloverPos:doc:            " + JSON.stringify(syncPosDoc, null, 4));
    var response= {};
    
  
    syncPosDoc.cloverApiKey = cloverSystemApiKey(syncPosDoc.doc.orgname);
    syncPosDoc.cloverMerchantId = cloverSystemMerchantId(syncPosDoc.doc.orgname);
    syncPosDoc.cloverUrl = cloverSystemUrl(syncPosDoc.doc.orgname) + '/' + syncPosDoc.cloverMerchantId + '/' + syncPosDoc.component;
    
    
    
    try
    {
        
        switch (syncPosDoc.operation)
        {
            
            case websheets. public.generic.GET:
            {
            
                syncPosDoc.cloverUrl += syncPosDoc.doc.posId;
                console.log(syncPosDoc.sessionId + ": syncCloverPos:syncPosDoc:         " + JSON.stringify(syncPosDoc, null, 4));
                response = HTTP.get(syncPosDoc.cloverUrl, {headers:{'Authorization': 'Bearer ' + syncPosDoc.cloverApiKey}});
            
                break;
            }

            case websheets. public.generic.GET_ALL:
            {
                console.log(syncPosDoc.sessionId + ": syncCloverPos:syncPosDoc:         " + JSON.stringify(syncPosDoc, null, 4));
                response = HTTP.get(syncPosDoc.cloverUrl, { headers:{'Authorization': 'Bearer ' + syncPosDoc.cloverApiKey}});
            
                break;
            }

            case websheets. public.generic.CREATE:
            {
            
                syncPosDoc.posDoc = buildCraeteDataObject(syncPosDoc);

                console.log(syncPosDoc.sessionId + ": syncCloverPos:syncPosDoc:         " + JSON.stringify(syncPosDoc, null, 4));               
                response = HTTP.post(syncPosDoc.cloverUrl,{ data: syncPosDoc.posDoc, headers:{ 'Authorization': 'Bearer ' + syncPosDoc.cloverApiKey}});
                break;
            }

            case websheets. public.generic.UPDATE:
            {
                syncPosDoc.cloverUrl = syncPosDoc.cloverUrl +'/'+ syncPosDoc.doc.posId;
                syncPosDoc.posDoc =  buildUpdateDataObject(syncPosDoc);

                console.log(syncPosDoc.sessionId + ": syncCloverPos:syncPosDoc:         " + JSON.stringify(syncPosDoc, null, 4));
            
                response = HTTP.post(syncPosDoc.cloverUrl,{data: syncPosDoc.posDoc,headers:{'Authorization': 'Bearer ' + syncPosDoc.cloverApiKey}});
                break;
            }
            
            case websheets. public.generic. DELETE:
            {
                syncPosDoc.cloverUrl = syncPosDoc.cloverUrl +'/'+ syncPosDoc.doc.posId;

                console.log(syncPosDoc.sessionId + ": syncCloverPos:syncPosDoc:         " + JSON.stringify(syncPosDoc, null, 4));
            
                response = HTTP.del(syncPosDoc.cloverUrl,
                            {
                                headers:  {
                                              'Authorization': 'Bearer ' + syncPosDoc.cloverApiKey
                                          }
                            });
                break;
            }
            default:
            {
            
                console.log(syncPosDoc.sessionId + ": syncCloverPos: Sorry, Not a valid operation " + syncPosDoc.operation);
                return;
            }
            
        }
        
        if (response.statusCode != 200)
        {
            console.log(syncPosDoc.sessionId + ': syncCloverPos-Failed', 'syncCloverPos failed with http status code [' + response.statusCode + ']', e);
            console.log(syncPosDoc.sessionId + ': syncCloverPos-Failed', 'Jay - TODO have a process email to notifiy the Administrator');
            response.syncPosSucess = false;
            response.syncPosDoc = syncPosDoc;

        } else
        {
            console.log(syncPosDoc.sessionId + ": syncCloverPos:response.content:: " + JSON.stringify(response.content, null, 4));
            response.syncPosSucess = true;
        }
    }
    catch (e)
    {
        console.log(syncPosDoc.sessionId + ': syncCloverPos-Failed ( catch block) ', 'Troble synchronizing  with clover POS', e);
        console.log(syncPosDoc.sessionId + ': syncCloverPos-Failed ( catch block) ', 'Jay - TODO have a process email to notifiy the Administrator');

        response.syncPosError = e;
        response.syncPosSucess = false;
        response.syncPosDoc = syncPosDoc;
    }
    return response;
}
});


buildCraeteDataObject   = function (syncPosDoc)
{
    var posDoc ={}

        switch(syncPosDoc.component)
        {

            case websheets. public.generic.CATEGORIES:
            {

                posDoc =   { 
                                "sortOrder":    syncPosDoc.doc.sheetRowId,
                                "name":         syncPosDoc.doc.Value
                            };
                break;        


            }     
            case websheets. public.generic.ITEMS:
            {
                posDoc =   { 
                                "price":    syncPosDoc.doc.Price,
                                "name":     syncPosDoc.doc.Name,
                                "categories":   [
                                                    {
                                                        "name" : syncPosDoc.doc.Category,
                                                    }
                                                ]
                            };

                break;
            }
            default:
            {
                console.log(syncPosDoc.sessionId + ": buildCraeteDataObject: Sorry, Not a valid component " + syncPosDoc.component);
                return;
                
            }


            
        }

    return posDoc;    


}

buildUpdateDataObject = function (syncPosDoc)
{
    var posDoc ={}

        switch(syncPosDoc.component)
        {

            case websheets. public.generic.CATEGORIES:
            {

                posDoc =    {
                                "sortOrder":    syncPosDoc.doc.sheetRowId,
                                "name":         syncPosDoc.doc.Value,
                                "id":           syncPosDoc.doc.posId
                            };

                break;        



            }   
            case websheets. public.generic.ITEMS:
            {

                break;
            }
            default:
            {

                console.log(syncPosDoc.sessionId + ": buildCraeteDataObject: Sorry, Not a valid component " + syncPosDoc.component);
                return;
                
            }


    return posDoc;         
        }

}






