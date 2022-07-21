export class Post {
    showComment: boolean;
    constructor(
        public id: number,
        public userId: number,
        public subject: string,
        public action: string,
        public object: string,
        public image: string,
        public date: number,
        public comment: string,
    ){
        this.showComment=false

    }
    
    
    
    
    
    
    
}