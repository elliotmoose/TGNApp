import Images from "../helpers/Images";

const ImageLoader = {
    async LoadImage() {

    },
    LoadProfilePicture(username) {
        switch (username) {
            case 'mooselliot':
                return 'https://scontent.fsin8-2.fna.fbcdn.net/v/t1.0-9/64653383_10212685679891511_3318642605947879424_o.jpg?_nc_cat=101&_nc_sid=85a577&_nc_ohc=AcCAq9A6FpMAX_pBWuI&_nc_ht=scontent.fsin8-2.fna&oh=e1159ea8dd38e270a22a9db979617b06&oe=5F62C59B';
        
            default:
                break;
        }
    },
}

export default ImageLoader