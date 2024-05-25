require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const Xebo = require('./api/xebo.api');
const Zendesk = require('./api/zendesk.api')
const Sunshine = require('./api/sunshine.api')


const xeboAPI = new Xebo();
const zendDeskAPI = new Zendesk();
const sunshineAPI = new Sunshine();

app.use(cors());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));


app.get('/',function(req,res){
  res.status(200).json({"message": "path not found"});
});

app.get('/test',function(req,res){
    res.status(200).json({"test": "test"});
});

app.post('/zendDesk', async (req,res) => {    
    console.log(req.body)
    const ticketData = req.body;
    const {ticketID, userEmail, metadata} = ticketData;
    const collectorID = "665018e3739e7860660ab6ce";
    const collectortoken = "P/e0970b57";    
    
    try {
      const ticket = await zendDeskAPI.getTicket(ticketID);
      console.log('\n\n\n\n ticket.tags ', ticket.tags)
      const isWebhookPushed = ticket.tags ? ticket.tags.includes('webhook_pushed') : false;
      console.log('\n\n\n\n isWebhookPushed ', isWebhookPushed)
      if(isWebhookPushed) {
        res.status(200).json({message: "This ticket has already been updated"});
      }

      const urlResponse = await xeboAPI.getSurveyURL(collectorID,collectortoken, userEmail, metadata);      
      const surveyURLMessage = urlResponse.data[0].message      
      const ticketAuditData = await zendDeskAPI.getTicketAudit(ticketID);
      const conversationID = ticketAuditData.audits[0].events[0].value.conversation_id;      
      const sunshineData = await sunshineAPI.sendMessage(conversationID, surveyURLMessage);      
      res.status(200).json(sunshineData);
    }catch (error) {
      console.error(error);
      res.status(500).json({"error": error});
    }

});


module.exports = app;
