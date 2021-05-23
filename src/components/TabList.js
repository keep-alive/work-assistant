import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { CloseOutlined } from '@ant-design/icons'
import './TabList.css'
export default function TabList({ files, activeId, unsavedIds, onTabClick, onCloseTab }) {
    return (
        <ul className="tabs-nav">
            {
                files.map(file => {
                    const withUnsaveMark = unsavedIds.includes(file.id)
                    const finalClassName = classnames({
                        'nav-tab': true,
                        'nav-tab-active': activeId === file.id,
                        'with-unsaved-mark': withUnsaveMark
                    })
                    return (
                        <li className={finalClassName} key={file.id} onClick={() => onTabClick(file.id)}>
                            <span>{file.title}</span>
                            <span className="pad"></span>
                            <CloseOutlined 
                                className="close-icon" 
                                onClick={(e) => { e.stopPropagation();onCloseTab(file.id)}}
                            />
                            {
                                withUnsaveMark && <span className="unsaved-icon"></span>
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}
TabList.prototypes = {
    files: PropTypes.array,
    activeId: PropTypes.string,
    unsavedIds: PropTypes.array,
    onCloseTab: PropTypes.func,
    onTabClick: PropTypes.func,
}