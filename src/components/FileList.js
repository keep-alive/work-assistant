import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { FileMarkdownOutlined, EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons'
const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
    return (
        <ul className="files">
            {
                files.map(file => {
                    return <li key={file.id} className="file">
                        <div className="file-detail">
                            <FileMarkdownOutlined/>
                            <span className="file-title">{file.title}</span>
                        </div>
                        <div className="file-operate-btns">
                            <a>
                                <EditOutlined />
                            </a>
                            <span className="pad"></span>
                            <a>
                                <DeleteOutlined />
                            </a>
                        </div>
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