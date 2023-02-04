export class Post {
    constructor(
        public id: number,
        public subject: string,
        public action: string,
        public object: string,
        public owner: string,
        public image: string,
        public date: number,
        public comment: string,
        public follow: string,
        public info: string,
    ){}

    
}