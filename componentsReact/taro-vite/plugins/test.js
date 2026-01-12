export default (ctx, options) => {
  // plugin 主体
  ctx.onBuildStart(() => {
    console.log('编译开始！')
  })
  ctx.onBuildFinish(() => {
    console.log('Webpack 编译结束！')
  })
  ctx.onBuildComplete(() => {
    console.log('Taro 构建完成！')
  })
}
