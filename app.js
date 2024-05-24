require('dotenv').config()
const axios = require('axios');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const PORT = (process.env.PORT || '3000');

const Xebo = require('./api/xebo.api');
const Zendesk = require('./api/zendesk.api')
const Sunshine = require('./api/sunshine.api')


const xeboAPI = new Xebo();
const zendDeskAPI = new Zendesk();
const sunshineAPI = new Sunshine();

app.use(cors());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));


router.get('/',function(req,res){
  res.status(200).json({"message": "path not found"});
});

router.get('/test',function(req,res){
    res.status(200).json({"test": "test"});
});

router.post('/zendDesk', async (req,res) => {    
    console.log(req.body)
    const ticketData = req.body;
    const {ticketID, userEmail, metadata} = ticketData;
    const collectorID = "665018e3739e7860660ab6ce";
    const collectortoken = "P/e0970b57";    
    
    try {
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

app.use('/', router);
app.listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});

module.exports = app;
