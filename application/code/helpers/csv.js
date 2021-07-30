const path = require('path')
const readXlsxFile = require('read-excel-file/node')
const _ = require('lodash')
async function parseCategoryPurpose() {
    const purposeXlsxData = await readXlsxFile(path.join(__dirname, '../public/Purpose-GenTool.xlsx'))
    const categoryXlsxData = await readXlsxFile(path.join(__dirname, '../public/Category-GenTool.xlsx'))

    const result = {
        category: createTreeFromExcel(categoryXlsxData),
        purpose: createTreeFromExcel(purposeXlsxData)
    }
    return result
}

function createTreeFromExcel(data) {
    const result = data.reduce((acc, row, i) => {
        if(i === 0) return acc

        const [id, name, level, parentId] = row
        
        let left, right;
        if(level === 1) left = 1, right = 2
        else {
            const parentNode = acc.find(item => item.id === parentId)
            const lastChild = _.last(acc.filter(item => item.parentId === parentNode.id));

            if(lastChild) {
                const {left: leftChild, right: rightChild} = lastChild

                left = leftChild + 2
                right = left + 1
                
                
            } else {
                left = parentNode.left + 1,
                right = left + 1
            }

            // update index 
            acc = acc.map(item => {
                if(item.left >= left && item.right >= left) {
                    item.left += 2; 
                    item.right += 2;
                }
                
                if(item.left < left && item.right >= left) item.right += 2;

                return item
            })
            
        }
        acc.push({
            id,
            name,
            left,
            right,
            parentId,
            level
        })

        return acc
    }, [])

    return result;

}
module.exports = {
    parseCategoryPurpose
}