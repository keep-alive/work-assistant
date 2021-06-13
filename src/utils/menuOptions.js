export default function getMenuOptions(isMac) {
    return [
        { role: 'appMenu', label: '应用' },
        {
            label: '编辑',
            id: '2',
            submenu:[
                {
                    label: '回退',
                    role: 'undo'
                },
                {
                    label: '重置',
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    label: '剪切',
                    role: 'cut'
                },
                {
                    label: '复制',
                    role: 'copy'
                },
                {
                    label: '粘贴',
                    role: 'paste'
                },
            ]
        },
        {
            label: '显示',
            submenu: [
              { role: 'reload',label: '刷新', },
              { role: 'forceReload',label:'强制刷新' },
              { role: 'toggleDevTools',label:'切换调试控制台' },
              { type: 'separator' },
              { role: 'resetZoom',label:'重置缩放' },
              { role: 'zoomIn',label:'放大' },
              { role: 'zoomOut',label:'缩小' },
              { type: 'separator' },
              { role: 'togglefullscreen',label:'全屏切换' },
              ...[
                isMac ? { role: 'close', label: '关闭', } : { role: 'quit', label: '关闭' }
              ]
            ]
          },
    ]
}