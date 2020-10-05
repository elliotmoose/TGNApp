import Images from "../helpers/Images";

const ImageLoader = {
    async LoadImage() {

    },
    LoadProfilePicture(username) {
        switch (username) {
            case 'mooselliot':
                return 'https://scontent.fsin8-2.fna.fbcdn.net/v/t1.0-9/64653383_10212685679891511_3318642605947879424_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=T-qaLpR3IpQAX_xj-an&_nc_ht=scontent.fsin8-2.fna&oh=4a3200d751a70ff35168240ec8091d16&oe=5F9E191B';        
            case 'lywjoel':
                return 'https://scontent.fsin8-2.fna.fbcdn.net/v/t1.0-9/78312326_10216417014319061_3502839120319741952_n.jpg?_nc_cat=106&_nc_sid=09cbfe&_nc_ohc=lp4LvugV0z8AX9uFZP0&_nc_ht=scontent.fsin8-2.fna&oh=a6c8b271b60bdfb7c98569b560e26b23&oe=5F9F9799'
            case 'llpofwy':
                return 'https://scontent.fsin8-2.fna.fbcdn.net/v/t1.0-9/1468494_514243042015937_131406220_n.jpg?_nc_cat=101&_nc_sid=cdbe9c&_nc_ohc=rVTdI_rl9UMAX9-3yXJ&_nc_ht=scontent.fsin8-2.fna&oh=09c0e2571b9007f7fd1b14511d466e20&oe=5F9DC512'
            case 'john':
                return 'https://scontent.fsin8-2.fna.fbcdn.net/v/t1.0-9/32540_393491397953_4789561_n.jpg?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=qOElEPUvxkYAX_xO4Dr&_nc_ht=scontent.fsin8-2.fna&oh=9381b396bafe6fc54d234eac7f98eb25&oe=5F9D7A91'
            case 'johnson':
                return 'https://scontent.fsin8-1.fna.fbcdn.net/v/t1.0-9/60339158_2218852551738154_6685096104935030784_o.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=ofghoAk95jUAX95Efv_&_nc_ht=scontent.fsin8-1.fna&oh=e6edb98e7672db73bc297b774f0baf30&oe=5F9E99AC'
            default:
                break;
        }
    },
    LoadOrgPicture(handle) {
        return 'https://scontent.fsin2-1.fna.fbcdn.net/v/t1.0-9/78312326_10216417014319061_3502839120319741952_n.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=c72lPyKg8PMAX8ZzqKW&_nc_ht=scontent.fsin2-1.fna&oh=1b1d724cc74f0f90ff4b6f997bff288e&oe=5F702199';
    }
}

export default ImageLoader