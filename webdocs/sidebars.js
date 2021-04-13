module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'index',
    },
    {
      type: 'doc',
      id: 'setup',
    },
    {
      type: 'category',
      label: 'Concepts',
      items: ['concepts/attributes', 'concepts/purposes'],
    },
    {
      type: 'category',
      label: 'Authentication Plugins',
      items: ['auth/overview', 'auth/tech_example', 'auth/api'],
    },
    {
      type: 'category',
      label: 'Communication Plugins',
      items: ['comm/overview', 'comm/tech_example', 'comm/api'],
    },
  ],
};
