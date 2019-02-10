const baseUrl = process.env.NODE_ENV === 'production' ? 'https://www.captivationsoftware.com' : `http://localhost:${process.env.PORT}`;

module.exports = {
  baseUrl,
  pages: {
    '/': {
      title: 'Captivation Software',
      content: 'main.ejs'
    },
    '/jobs': {
      title: 'Jobs at Captivation Software',
      content: 'jobs.ejs'
    },
    '/news': {
      title: 'Recent Captivation Software Events',
      content: 'news.ejs',
    }
  }
}
