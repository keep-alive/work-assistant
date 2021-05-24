import React, { useState, useEffect, useRef } from 'react'
import { Input } from 'antd';
import PropTypes from 'prop-types'
import { FileMarkdownOutlined, EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons'
import useKeyPress from '../hooks/useKeyPress'
const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
    const [ editStatus, setEditStatus ] = useState(false);
    const [ value, setValue ] = useState('');
    const closeSearch = (editItem) => {
        setEditStatus(false);
        setValue('');
        if(editItem.isNew) {
            onFileDelete(editItem.id)
        }
    }
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)
    useEffect(() => {
        const editItem = files.find(file => file.id === editStatus);
        if(enterPressed && editStatus && value.trim()) {
            onSaveEdit(editItem.id,value);
            closeSearch({})
        } else if(escPressed && editStatus) {
            closeSearch(editItem)
        }
    })
    useEffect(() => {
        const newFile = files.find(({isNew}) => isNew);
        if(newFile) {
            setEditStatus(newFile.id);
            setValue(newFile.title)
        }

    },[files])
    return (
        <ul className="files">
            {
                files.map(file => {
                    return <li key={file.id} className="file">
                        {
                            editStatus !== file.id && !file.isNew ?
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
                                    <Input placeholder="请输入文件名称" onChange={(e) => setValue(e.target.value)} value={value} size="middle"/>
                                </div>
                                <div className="file-operate-btns">
                                    <a onClick={() => { closeSearch(file) }}>
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