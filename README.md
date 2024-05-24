# Usage

1. Create a trigger in Zendesk: https://support.zendesk.com/hc/en-us/articles/4408843730458
   
2. Condition for trigger:
   ![image](https://github.com/priyeshghamandi/zendesk-xebo/assets/8115408/4eef1bac-1d01-4f75-86d4-befd846b948e)

3. Set the trigger to invoke a webhook:
   ![image](https://github.com/priyeshghamandi/zendesk-xebo/assets/8115408/8d978eb0-3e36-4ebe-8acd-b61fc88aa66a)

4. JSON Format for webhook:
   ```json
   {
	"userEmail": "{{ticket.requester.email}}",
	"ticketID": "{{ticket.id}}",
	"metadata": {
		"ticketStatus": "{{ticket.status}}",
		"extUniqueId": "{{ticket.requester.external_id}}",
		"customerName": "{{ticket.requester.name}}",
		"customerPhone": "{{ticket.requester.phone}}",
		"agentName": "{{current_user.name}}",
		"agentEmail": "{{current_user.email}}"
	}
}

