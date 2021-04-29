import { Input } from 'antd';
import PropTypes from 'prop-types'
const { Search } = Input;
const FileSearch = function ({onSearch}) {
    return <Search
    placeholder="关键字"
    allowClear
    enterButton="Search"
    size="large"
    onSearch={onSearch}
/>
}
FileSearch.propTypes = {
    onSearch: PropTypes.func,
}
export default FileSearch;