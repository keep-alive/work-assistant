import './App.css';
import { Row, Col } from 'antd'
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import FileBtns from './components/FileBtns' 
import files from './utils/defaultFile'
function App() {
	const onSearch = (v) => {
		console.log(v)
	}
	return (
		<Row className="app">
			<Col className="left-wrapper" flex="300px">
				<Col className="search" span={24}>
					<FileSearch title="搜索文件名" onSearch={onSearch}/>
				</Col>
				<Col className="file-list" span={24}>
					<FileList 
						files={files}
						onFileClick={(id) => console.log(id)}
						onSaveEdit={(id,value) => console.log(id,value)}
						onFileDelete={(id) => console.log(id)}
					/>
				</Col>
				<Col className="file-btns" span={24}>
					<FileBtns />
				</Col>
			</Col>
			<Col className="right-wrapper"  flex="auto"></Col>
		</Row>
	);
}

export default App;
