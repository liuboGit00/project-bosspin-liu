export default function (type) {
    let path = '';
    if (type === 'dashen'){
        path += '/dasheninfo'
    }else if (type === 'laoban'){
        path += '/laobaninfo'
    }

    return path
}