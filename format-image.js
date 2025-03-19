
const { matterMarkdownAdapter } = require('@elog/cli')

/**
 * 自定义文档处理器
 * @param {DocDetail} doc doc的类型定义为 DocDetail
 * @param {any} imageClient 图床下载器
 * @return {Promise<DocDetail>} 返回处理后的文档对象
 */
const format = async (doc, imageClient) => {
  const cover = doc.properties.cover
  // 将 cover 字段中的 notion 图片下载到本地
  if (imageClient)  {
    // 只有启用图床平台image.enable=true时，imageClient才能用，否则请自行实现图片上传
    const url = await imageClient.uploadImageFromUrl(cover, doc)
    // cover链接替换为本地图片
    doc.properties.cover = url
  }

  // 检查是否需要加密
  const isEncrypted = doc.properties.encrypt?.checkbox === true;
  if (isEncrypted) {
    // 添加固定的加密属性
    doc.properties.password = '1113'; // 固定密码
    doc.properties.abstract = '有东西被加密了，请输入密码查看'; // 固定摘要
    doc.properties.message = '您好，这里需要密码'; // 固定提示
    doc.properties.theme = 'xray'; // 固定主题
    // 可选：添加更多固定值
    doc.properties.wrong_pass_message = '抱歉，这个密码不对，请再试试';
    doc.properties.wrong_hash_message = '抱歉，校验失败，但可查看内容';
  }

  doc.body = matterMarkdownAdapter(doc);
  return doc;
};

module.exports = {
  format,
};
