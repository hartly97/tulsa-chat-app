import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	inputText = '';
	inputName = '';
	messages:any = [];
		// {date:new Date(), text:'Hi!', from:'Michelle'}


constructor(private http:HttpClient){
	this.getMessages();
	setInterval(() => this.getMessages(),500);
}

getMessages(){

	this.http.get('/api/messages').toPromise().then(messages => {
		console.log('getMessages messages=%o', messages);
		this.messages = messages;
	});
}
	sendInput(){
		if(!this.inputText)return;
		console.log('sendInput: %o', this.inputText);
		var msg ={
			text: this.inputText,
			from: this.inputName
		};
		this.http.post('/api/message', msg).toPromise().then(messages=>{

			this.messages = messages
		});
		this.inputText = '';
	 }
}
