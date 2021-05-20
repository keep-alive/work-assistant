import { Button } from 'antd'
import { PlusOutlined, ImportOutlined } from '@ant-design/icons'
const FileBtns = function() {
    return <>
        <Button type="primary" icon={<PlusOutlined />}>新建</Button>
        <Button type="primary" danger icon={<ImportOutlined />}>导入</Button>
    </>
}
export default FileBtns;