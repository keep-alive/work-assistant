import React, { useState, useEffect, useRef } from 'react'
import { Input } from 'antd';
import PropTypes from 'prop-types'
import { FileMarkdownOutlined, EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons'
import useKeyPress from '../hooks/useKeyPress'
const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
    const [ editStatus, setEditStatus ] = useState(false);
    const [ value, setValue ] = useState('');
    const closeSearch = () => {
        setEditStatus(false);
        setValue('')
    }
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)
    useEffect(() => {
        if(enterPressed && editStatus) {
            const editItem = files.find(file => file.id === editStatus);
            onSaveEdit(editItem.id,value);
            closeSearch()
        } else if(escPressed && editStatus) {
            closeSearch()
        }
    })
    return (
        <ul className="files">
            {
                files.map(file => {
                    return <li key={file.id} className="file">
                        {
                            editStatus !== file.id ?
                            <>
                                <div className="file-detail">
                                    <FileMarkdownOutlined/>
                                    <span onClick={() => onFileClick(file.id)} className="file-title">{file.title}</span>
                                </div>
                                <div className="file-operate-btns">
                                    <a onClick={() => {setEditStatus(file.id);setValue(file.title)}}>
                                        <EditOutlined />
                                    </a>
                                    <span className="pad"></span>
                                    <a onClick={() => onFileDelete(file.id)}>
                                        <DeleteOutlined />
                                    </a>
                                </div>
                            </>
                            :
                            <>
                                <div className="file-detail">
                                    <Input onChange={(e) => setValue(e.target.value)} value={value} size="middle"/>
                                </div>
                                <div className="file-operate-btns">
                                    <a onClick={closeSearch}>
                                        <CloseOutlined />
                                    </a>
                                </div>
                            </>
                        }
                    </li>
                })
            }
        </ul>
    )
}
FileList.propTypes = {
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onSaveEdit: PropTypes.func,
    onFileDelete: PropTypes.func
}
export default FileList