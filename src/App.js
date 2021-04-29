import './App.css';
import { Row, Col } from 'antd'
import FileSearch from './components/FileSearch'
import FileBtns from './components/FileBtns' 
function App() {
	return (
		<Row className="app">
			<Col className="left-wrapper" flex="300px">
				<Col className="search" span={24}>
					<FileSearch />
				</Col>
				<Col className="file-list" span={24}>
					123
				</Col>
				<Col className="file-btns" span={24}>
					<FileBtns />
				</Col>
			</Col>
			<Col className="right-wrapper"  flex="auto">col-12</Col>
		</Row>
	);
}

export default App;
