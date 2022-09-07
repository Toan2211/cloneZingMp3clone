export const shuffle = (array) => {
    const arrayOri = [...array]
    const arrShuffle = []
    const length = arrayOri.length
    while (arrShuffle.length < length) {
        const index = Math.floor(Math.random() * arrayOri.length)
        arrShuffle.push(arrayOri[index])
        arrayOri.splice(index, 1)
    }
    return arrShuffle
}