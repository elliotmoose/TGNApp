import Images from "../helpers/Images";

const ImageLoader = {
    async LoadImage() {

    },
    LoadProfilePicture(username) {
        switch (username) {
            case 'mooselliot':
                return 'https://scontent.fsin2-1.fna.fbcdn.net/v/t1.0-9/64653383_10212685679891511_3318642605947879424_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=jPXXoeMN13kAX8Mkz3s&_nc_ht=scontent.fsin2-1.fna&oh=c8b5816eeb967d9f6f7ab19debd8e63f&oe=5FB1DF9B';        
            case 'lywjoel':
                return 'https://scontent.fsin2-1.fna.fbcdn.net/v/t1.0-9/78312326_10216417014319061_3502839120319741952_n.jpg?_nc_cat=106&_nc_sid=09cbfe&_nc_ohc=XGI2-IpNUNEAX90y-TO&_nc_ht=scontent.fsin2-1.fna&oh=ae45762a1aac6fb5e3187eea11cc988b&oe=5FB35E19'
            case 'llpofwy':
                return 'https://scontent.fsin2-1.fna.fbcdn.net/v/t1.0-9/1468494_514243042015937_131406220_n.jpg?_nc_cat=101&_nc_sid=cdbe9c&_nc_ohc=AAuyakPJluQAX_RBY9y&_nc_ht=scontent.fsin2-1.fna&oh=47cfa669fbbee6a2017089e3a4c78ba1&oe=5FB18B92'
            case 'john':
                return 'https://thispersondoesnotexist.com/image'
            case 'johnson':
                return 'https://thispersondoesnotexist.com/image'
            default:
                break;
        }
    },
    LoadOrgPicture(handle) {
        return 'https://scontent.fsin2-1.fna.fbcdn.net/v/t1.0-9/78312326_10216417014319061_3502839120319741952_n.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=c72lPyKg8PMAX8ZzqKW&_nc_ht=scontent.fsin2-1.fna&oh=1b1d724cc74f0f90ff4b6f997bff288e&oe=5F702199';
    }
}

export default ImageLoader