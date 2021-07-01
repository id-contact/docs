module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'index',
    },
    {
      type: 'category',
      label: 'Concepts',
      items: ['concepts/attributes', 'concepts/purposes'],
    },
    {
      type: 'category',
      label: 'Sessions',
      items: ['sessions/full', 'sessions/auth_during_comm'],
    },
    {
      type: 'doc',
      id: 'core_api',
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
    {
      type: 'category',
      label: 'Sample Plugins',
      items: ['sample_plugins/amazon_connect'],
    },
    {
      type: 'doc',
      id: 'setup',
    },
    {
      type: 'category',
      label: 'ID Contact configuration',
      items: ['configuration/core', 'configuration/auth_test', 'configuration/comm_test'],
    },
  ],
};
