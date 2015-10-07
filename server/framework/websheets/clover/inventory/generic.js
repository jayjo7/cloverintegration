Meteor.methods({

       //syncCloverPosDoc = {
      //  "doc":doc
      //  "sessionId": sessionId,
      //  "component": component,
      //  "operation": operation,
      //}


syncCloverPos: function (syncCloverPosDoc)
{
    console.log(syncCloverPosDoc.sessionId + ": syncCloverPos:doc.orgname:    " + syncCloverPosDoc.doc.orgname);
    console.log(syncCloverPosDoc.sessionId + ": syncCloverPos:doc:            " + JSON.stringify(syncCloverPosDoc, null, 4));
    var response =
    {
    };
    
    
    
    syncCloverPosDoc.cloverApiKey = cloverSystemApiKey(syncCloverPosDoc.doc.orgname);
    syncCloverPosDoc.cloverMerchantId = cloverSystemMerchantId(syncCloverPosDoc.doc.orgname);
    syncCloverPosDoc.cloverUrl = cloverSystemUrl(syncCloverPosDoc.doc.orgname) + '/' + syncCloverPosDoc.cloverMerchantId + '/' + syncCloverPosDoc.component;
    
    
    
    try
    {
        
        switch (syncCloverPosDoc.operation)
        {
            
            case websheets. public.generic.GET:
            {
            
                syncCloverPosDoc.cloverUrl += syncCloverPosDoc.doc.posId;
                console.log(syncCloverPosDoc.sessionId + ": syncCloverPos:syncCloverPosDoc:         " + JSON.stringify(syncCloverPosDoc, null, 4));
                response = HTTP.get(syncCloverPosDoc.cloverUrl, {headers:{'Authorization': 'Bearer ' + syncCloverPosDoc.cloverApiKey}});
            
                break;
            }

            case websheets. public.generic.GET_ALL:
            {
                console.log(syncCloverPosDoc.sessionId + ": syncCloverPos:syncCloverPosDoc:         " + JSON.stringify(syncCloverPosDoc, null, 4));
                response = HTTP.get(syncCloverPosDoc.cloverUrl, { headers:{'Authorization': 'Bearer ' + syncCloverPosDoc.cloverApiKey}});
            
                break;
            }

            case websheets. public.generic.CREATE:
            {
                console.log(syncCloverPosDoc.sessionId + ": syncCloverPos:syncCloverPosDoc:         " + JSON.stringify(syncCloverPosDoc, null, 4));
            
               syncCloverPosDoc.categoryDoc ={
                                                "sortOrder": syncCloverPosDoc.doc.sheetRowId,
                                                "name": syncCloverPosDoc.doc.Value,
                                                "id": syncCloverPosDoc.doc.UniqueId
                                              };
                response = HTTP.post(syncCloverPosDoc.cloverUrl,{ data: syncCloverPosDoc.categoryDoc, headers:{ 'Authorization': 'Bearer ' + syncCloverPosDoc.cloverApiKey}});
                break;
            }

            case websheets. public.generic.UPDATE:
            {
                syncCloverPosDoc.cloverUrl += syncCloverPosDoc.doc.posId;
                syncCloverPosDoc.categoryDoc ={ "name": syncCloverPosDoc.doc.Value, "id": syncCloverPosDoc.doc.posId};
                console.log(syncCloverPosDoc.sessionId + ": syncCloverPos:syncCloverPosDoc:         " + JSON.stringify(syncCloverPosDoc, null, 4));
            
                response = HTTP.post(cloverUrl,{data: syncCloverPosDoc.categoryDoc,headers:{'Authorization': 'Bearer ' + syncCloverPosDoc.cloverApiKey}});
                break;
            }
            
            case websheets. public.generic. DELETE:
            {
                syncCloverPosDoc.cloverUrl += syncCloverPosDoc.doc.posId;
            
                syncCloverPosDoc.categoryDoc =  {
                                                  "id": syncCloverPosDoc.doc.posId
                                                };

                console.log(syncCloverPosDoc.sessionId + ": syncCloverPos:syncCloverPosDoc:         " + JSON.stringify(syncCloverPosDoc, null, 4));
            
                response = HTTP.del(cloverUrl,
                            {
                                headers:  {
                                              'Authorization': 'Bearer ' + syncCloverPosDoc.cloverApiKey
                                          }
                            });
                break;
            }
            default:
            {
            
                console.log(syncCloverPosDoc.sessionId + ": syncCloverPos: Sorry, Not a valid operation " + operation);
                return;
            }
            
        }
        
        if (response.statusCode != 200)
        {
            console.log(syncCloverPosDoc.sessionId + 'syncCloverPos-Failed', 'syncCloverPos failed with http status code [' + response.statusCode + ']', e);
        } else
        {
            console.log(syncCloverPosDoc.sessionId + ": syncCloverPos:response.content:: " + JSON.stringify(response.content, null, 4));
        }
    }
    catch (e)
    {
        console.log(syncCloverPosDoc.syncCloverPosDoc.sessionId + ': syncCloverPos-Failed', 'Troble synchronizing  with clover POS', e);
        response.cloverError = e;
        response.clover = false;
        response.syncCloverPosDoc = syncCloverPosDoc;
    }
    return response;
}
});






