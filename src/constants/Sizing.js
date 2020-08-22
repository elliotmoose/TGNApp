// import { EventRegister } from 'react-native-event-listeners';
import { AsyncStorage, Dimensions } from 'react-native';

console.log(Dimensions.get('window').width)
console.log(Dimensions.get('window').height)

const SIZING_STORAGE_KEY = 'SIZING_STORAGE_KEY'
export var Screen = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
}
export var Hitslop = (amt)=>{
    return {top: amt, left: amt, right: amt, bottom: amt}
}

export var Sizes = {
    SMALL : 'SMALL',
    MEDIUM : 'MEDIUM',
    LARGE : 'LARGE',
}

export var GetScreenSize = ()=>{
    if(Dimensions.get('window').height > 630)
    {
        return Sizes.LARGE;
    }
    else if (Dimensions.get('window').height > 575)
    {
        return Sizes.MEDIUM;
    }
    else 
    {
        return Sizes.SMALL;
    }
}

export var ScreenSize = GetScreenSize();
export var IsSmall = ScreenSize == Sizes.SMALL;
export var IsLarge = ScreenSize == Sizes.LARGE;

export var VariantSize = (small, medium, large)=>{
    switch (ScreenSize) {
        case Sizes.SMALL:
            return small;            
        case Sizes.MEDIUM:
            return medium;
        case Sizes.LARGE:
            return large;
    }
}

export var multiplier = 0.8;
export var getRowHeight = ()=>{
    return 45 * exports.multiplier 
}

export var load = async ()=>{
    try {
        let sizingstr = await AsyncStorage.getItem(SIZING_STORAGE_KEY);
    
        let sizingobj = JSON.parse(sizingstr);
        
        Sizing = SizingSmall;
        exports.setMultiplier(sizingobj.multipler)            
    } catch (error) {
        
    }
}

export var save = async ()=>{
    try {
        let sizingstr = JSON.stringify({
            multipler : exports.multiplier
        })
        await AsyncStorage.setItem(SIZING_STORAGE_KEY, sizingstr);
        return
    } catch (error) {
        
    }
}


// export var setMultiplier = (multiplier)=>{
//     exports.multiplier = multiplier;
//     exports.save();
//     EventRegister.emit('UPDATE_HOME_UI')    ;
// }


export var Sizing = {}
var SizingSmall = {

}