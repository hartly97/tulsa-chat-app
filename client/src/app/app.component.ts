import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	inputText = '';
	messages:any = [];
		// {date:new Date(), text:'Hi!', from:'Michelle'}


constructor(private http:HttpClient){
	this.getMessages();
}

getMessages(){
	this.http.get('/api/messages').toPromise().then(messages => {
		console.log('getMessages messages=%o', messages);
		this.messages = messages;
	});
}
	sendInput(){
		console.log('sendInput: %o', this.inputText);
		this.http.post('api/message', {text:this.inputText, from: 'me'})
		.toPromise().then(messages => {
			this.messages = messages
		});
		this.inputText = '';
	 }
}
