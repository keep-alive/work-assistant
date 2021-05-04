import { useState } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types'
const { Search } = Input;
const FileSearch = function ({title, onSearch}) {
    const [ value, setVlaue ] = useState('')
    
    return <Search
        placeholder={title}
        value={value}
        allowClear
        enterButton="Search"
        size="large"
        onChange={(e) => setVlaue(e.target.value)}
        onSearch={onSearch}
    />
}
FileSearch.propTypes = {
    onSearch: PropTypes.func,
}
export default FileSearch;