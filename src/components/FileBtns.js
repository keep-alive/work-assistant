import { Button } from 'antd'
import { DownloadOutlined, ImportOutlined } from '@ant-design/icons'
const FileBtns = function() {
    return <>
        <Button type="primary" icon={<DownloadOutlined />}>导出</Button>
        <Button type="primary" danger icon={<ImportOutlined />}>导入</Button>
    </>
}
export default FileBtns;