import React,{ useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Row, Col } from 'antd';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import './App.css';
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import FileBtns from './components/FileBtns' 
import TabList from './components/TabList'
import defaultFiles from './utils/defaultFile'
function App() {
	const [ files, setFiles ] = useState(defaultFiles);
	const [ searchfiles, setsearchFiles ] = useState([]);
	const [ activeFileId, setActiveFileId ] = useState('');
	const [ openedFileIds, setOpenedFileIds ] = useState([]);
	const [ unsavedFileIds, setUnsavedFileIds ] = useState([]);
	const openedFiles = openedFileIds.map(id => {
		return files.find(file => file.id === id)
	})
	const activeFile = files.find(file => file.id === activeFileId)

	const deleteFile = (id) => {
		const currentFiles = files.filter(file => file.id !== id);
		setFiles(currentFiles);
		onCloseTab(id);
	}
	const updateFileName = (id,title) => {
		const currentFiles = files.map(file => {
			if(file.id === id) {
				return {
					...file,
					title,
					isNew:false
				}
			}
			return file
		})
		setFiles(currentFiles);
	}
	const fileClick = (id) => {
		const openIds = openedFileIds.includes(id) ? openedFileIds : [...openedFileIds,id]
		setActiveFileId(id);
		setOpenedFileIds(openIds);
	}
	const onSearch = (keyword) => {
		const currentFiles = files.filter(({title}) => title.includes(keyword))
		setsearchFiles(currentFiles);
	}
	const onTabClick = (id) => {
		setActiveFileId(id);
	}
	const onCloseTab = (id) => {
		const openIds = openedFileIds.filter(fileId => fileId !== id);
		const [ activeId = '' ] = openIds;
		setOpenedFileIds(openIds);
		setActiveFileId(activeId);
	}
	const fileChange = (id,value) => {
		if(!unsavedFileIds.includes(id)) {
			setUnsavedFileIds([...unsavedFileIds, id])
		}
	}
	const createFile = () => {
		setFiles([
			...files,
			{
				id: uuidv4(),
				title: '',
				isNew: true,
				body: '## 请输入文件内容'
			}
		]);
	}
	const fileList = searchfiles.length > 0 ? searchfiles : files;
	return (
		<Row className="app">
			<Col className="left-wrapper" flex="300px">
				<Col className="search" span={24}>
					<FileSearch title="搜索文件名" onSearch={onSearch}/>
				</Col>
				<Col className="file-list" span={24}>
					<FileList 
						files={fileList}
						onFileClick={fileClick}
						onSaveEdit={updateFileName}
						onFileDelete={deleteFile}
					/>
				</Col>
				<Col className="file-btns" span={24}>
					<FileBtns onCreateFile={createFile}/>
				</Col>
			</Col>
			<Col className="right-wrapper"  flex="auto">
				{
					activeFile ? 
					<>
						<TabList files={openedFiles} onTabClick={onTabClick} onCloseTab={onCloseTab} activeId={activeFileId} unsavedIds={unsavedFileIds}/>
						<Col className="edit-area" span={24}>
							<SimpleMDE 
								value={activeFile && activeFile.body}
								onChange={(value) => fileChange(activeFile.id,value)}
							/>
						</Col>
					</> : 
					<div className="start-page">
						选择或者创建 Markdown 文档
					</div>
				}
			</Col>
		</Row>
	);
}

export default App;
