import * as process from 'process';

export class Bot {
    
    private sentences: string[]

    constructor(sentences: string[]) {
        this.sentences = sentences;
    }

    send(msg: string) {
        console.log('bot: ' + msg);
    }   
    recv(): any {
        var msg = this.sentences.pop();
        console.log('user: ' + msg);
        return msg;
    } 
}