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
import { objToArray } from './utils/helper'
import fileHelper from './utils/fileHelper'
import getmenuOptions from './utils/menuOptions'
const path  = window.require('path')
const { ipcRenderer }  = window.require('electron')
const { Menu }  = window.require('electron').remote
const savedLocation = ipcRenderer.sendSync('documents-path');
const isMac = ipcRenderer.sendSync('is-mac');
const saveFilesToStore = (files) => {
	const storeFiles = objToArray(files).reduce((result,file) => {
		const { id, path, title } = file;
		result[id] = {
			id, path, title
		}
		return result;
	},{})
	localStorage.setItem('files', JSON.stringify(storeFiles));
}
function App() {
	const stringFiles = localStorage.getItem('files');
	const localFiles = stringFiles ? JSON.parse(stringFiles) : {};
	const [ files, setFiles ] = useState(localFiles);
	const [ searchfiles, setsearchFiles ] = useState([]);
	const [ activeFileId, setActiveFileId ] = useState('');
	const [ openedFileIds, setOpenedFileIds ] = useState([]);
	const [ unsavedFileIds, setUnsavedFileIds ] = useState([]);
	const filesArr = objToArray(files);
	const openedFiles = openedFileIds.map(id => {
		return files[id]
	})
	const activeFile = files[activeFileId]

	const deleteFile = (id) => {
		if(files[id].isNew) {
			const { [id]: value, ...other } = files;
			setFiles(other);
		}else{
			fileHelper.deleteFile(files[id]['path']).then(() => {
				const { [id]: value, ...other } = files;
				setFiles(other);
				onCloseTab(id);
				saveFilesToStore(files);
			})
		}
	}
	const updateFileName = (id,title, isNew) => {
		const newPath = path.join(savedLocation,`${title}.md`);
		const file = {
			...files[id],
			title,
			isNew: false,
			path: newPath
		}
		const newFiles = {
			...files, [id]:file 
		}
		if(isNew) {
			fileHelper.writeFile(newPath,files[id]['body']).then(() => {
				setFiles(newFiles);
				saveFilesToStore(newFiles);
			})
		} else {
			fileHelper.renameFile(path.join(savedLocation,`${files[id]['title']}.md`),newPath).then(() => {
				setFiles(newFiles);
				saveFilesToStore(newFiles);
			})
		}
	}
	const fileClick = (id) => {
		const file = files[id];
		const openIds = openedFileIds.includes(id) ? openedFileIds : [...openedFileIds,id]
		
		setActiveFileId(id);
		setOpenedFileIds(openIds);
		if(!file.isLoaded) {
			fileHelper.readFile(file.path).then((body) => {
				setFiles({
					...files,
					[id]:{
						...files[id],
						body,
						isLoaded: true
					}
				})
			})
		}
		
	}
	const onSearch = (keyword) => {
		const currentFiles = filesArr.filter(({title}) => title.includes(keyword))
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
		const file = { ...files[id], body: value };
		setFiles({ ...files, [id]:file });
		if(!unsavedFileIds.includes(id)) {
			setUnsavedFileIds([...unsavedFileIds,id])
		}
	}
	const createFile = () => {
		const id = uuidv4();
		setFiles({
			...files,
			[id]:{
				id,
				title: '',
				isNew: true,
				body: '## 请输入文件内容'
			}
		});
	}
	const saveCurrentFile = () => {
		fileHelper.writeFile(path.join(savedLocation,`${activeFile.title}.md`),activeFile['body']).then(() => {
			setUnsavedFileIds(unsavedFileIds.filter(id => id !== activeFile.id))
		})
	}
	const fileList = searchfiles.length > 0 ? searchfiles : filesArr;
	const menus = getmenuOptions(isMac).map(option => {
		let { id, submenu } = option;
		if(id === '2') {
			return {
				...option,
				submenu: [
					{
						label: '保存',
						enabled: !!activeFile,
						accelerator: 'CommandOrControl+S',	
						click() {
							saveCurrentFile()
						}
					},
					...submenu
				]
			}
		}
		return option
	})
	const menuTemplate = Menu.buildFromTemplate(menus);
    Menu.setApplicationMenu(menuTemplate);
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
