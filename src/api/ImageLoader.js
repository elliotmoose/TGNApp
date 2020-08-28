import Images from "../helpers/Images";

const ImageLoader = {
    async LoadImage() {

    },
    LoadProfilePicture(username) {
        switch (username) {
            case 'mooselliot':
                return 'https://scontent.fsin8-2.fna.fbcdn.net/v/t1.0-9/64653383_10212685679891511_3318642605947879424_o.jpg?_nc_cat=101&_nc_sid=85a577&_nc_ohc=AcCAq9A6FpMAX_pBWuI&_nc_ht=scontent.fsin8-2.fna&oh=e1159ea8dd38e270a22a9db979617b06&oe=5F62C59B';
        
            case 'lywjoel':
                return 'https://scontent.fsin2-1.fna.fbcdn.net/v/t1.0-9/78312326_10216417014319061_3502839120319741952_n.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=c72lPyKg8PMAX8ZzqKW&_nc_ht=scontent.fsin2-1.fna&oh=1b1d724cc74f0f90ff4b6f997bff288e&oe=5F702199'
            case 'llpofwy':
                return 'https://scontent.fsin2-1.fna.fbcdn.net/v/t1.0-9/1468494_514243042015937_131406220_n.jpg?_nc_cat=101&_nc_sid=e007fa&_nc_ohc=VjatVvjfALgAX-wkB32&_nc_ht=scontent.fsin2-1.fna&oh=afcf9a3b94290d91df7383667118fc1b&oe=5F6E4F12'
            default:
                break;
        }
    },
}

export default ImageLoader