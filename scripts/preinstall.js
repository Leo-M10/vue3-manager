// 统一包管理工具
if (!/npm/.test(process.env.npm_execpath || '')) {
    console.warn(
        `\u001b[33mThis repository must using npm as package manager ` +
        `for scripts to work properly.\u001b[39m\n`,
    )
    process.exit(1)
}