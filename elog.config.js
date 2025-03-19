module.exports = {
  write: {
    platform: 'notion',
    notion: {
      token: process.env.NOTION_TOKEN,
      databaseId: process.env.NOTION_DATABASE_ID,
      filter: {
        or: [
          { property: 'status', select: { equals: '已发布' } },
          { property: 'status', select: { equals: '修改中' } }
        ]
      }
    }
  },
  deploy: {
    platform: 'local',
    local: {
      outputDir: './source/_posts',
      filename: 'title',
      format: 'markdown',
      catalog: false,
      frontMatter: {
        enable: true,
        include: [
          'categories',
          'tags',
          'title',
          'date',
          'updated',
          'permalink',
          'cover',
          'description',
          'password'
        ],
        timeFormat: true,
      },
      formatExt: './format-image.js', // 依赖此插件处理删除逻辑
    }
  },
  image: {
    enable: true,
    platform: 'local',
    local: {
      outputDir: './source/images',
      prefixKey: '/images'
    }
  },
};