# Usage

1. Create a trigger in Zendesk: https://support.zendesk.com/hc/en-us/articles/4408843730458
   
2. Conditions for trigger:
   ![image](https://github.com/priyeshghamandi/zendesk-xebo/assets/8115408/890263ca-8a34-4e8e-90b2-c664221a7f64)


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

5. Add another trigger to Remove webhook_pushed tag when ticket is OPENED
   ![image](https://github.com/priyeshghamandi/zendesk-xebo/assets/8115408/8c0e7e89-7426-431e-ae21-326455087c11)


