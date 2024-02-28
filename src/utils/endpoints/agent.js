const { defaults } = require('./defaults');

export const agent = {
  createAgent: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/user/admin/invite',
    },
  },
  updateAgent: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/user/invite/agent/:agentId',
    },
  },
  getAllAgents: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user/agent/all',
    },
  },
  getAgentDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user/agent/:agentId',
    },
  },
  getAgentStudents: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user/agent/students/all',
    },
  },
  getAgentApplications: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user/agent/applications/all',
    },
  },
  resendInvitation: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/user/agent/resend/invitation',
    },
  },
  changeAgentStatus: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/user/status/agent/:agentId',
    },
  },
};
