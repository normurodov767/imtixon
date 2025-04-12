export interface User{
    name: any;
    bio:string | undefined;
    company:string;
    date:string;
    githubusername:string;
    location:string;
    
    user:{
        name:string;
        _id:string;
        avatar:string   | undefined;
    };
    skills:string ;
    social?:{
        facebook:string;
        instagram:string;
        linkedin:string;
        twitter:string;
        youtube:string;
    }
    status:string
    website:string;
    _id:string;
}