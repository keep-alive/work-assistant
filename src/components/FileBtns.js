import { Button } from 'antd'
import { PlusOutlined, ImportOutlined } from '@ant-design/icons'
const FileBtns = function({ onCreateFile }) {
    return <>
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreateFile}>新建</Button>
        <Button type="primary" danger icon={<ImportOutlined />}>导入</Button>
    </>
}
export default FileBtns;