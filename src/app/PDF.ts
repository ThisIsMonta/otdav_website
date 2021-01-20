export class PDF{
    link : string;
    title : string;
    description : string;
    cover_image: string;

    constructor(link:string,title:string,description:string,cover_image:string){
        this.link = link;
        this.title = title;
        this.description = description;
        this.cover_image = cover_image;
    }
}