export const response = {
  data: {
    taxonomimes: {
      categories: [
        {
          id: 1,
          title: 'Administration',
          slug: 'administration'
        },
        {
          id: 2,
          title: 'Advocacy and Campaigns',
          slug: 'advocacy'
        },
      ],
      locations: [
        {
          id: 1,
          title: 'Melbourne',
          slug: 'VIC'
        },
        {
          id: 2,
          title: 'Regional VIC',
          slug: 'REGVIC'
        },
      ],
    },
    enumerables: {
      roles: {
        SUPER_ADMIN: 'Super admin',
        SUPER_USER: 'Super user'
      },
      jobStatus: {
        PENDING: 'Pending approval',
        APPROVED: 'Approved',
        DRAFT: 'Draft'
      },
    },
    creditPacks: [
      {
        id: 1,
        price: 110,
        savings: 0,
        volume: 1,
        total: 121,
        gst: 11,
        service_type: 'REGULAR',
        title: 'One job ad credit'
      },
      {
        id: 2,
        price: 130,
        savings: 0,
        volume: 1,
        total: 143,
        gst: 13,
        service_type: 'MANAGED',
        title: 'One job ad credit'
      },
    ],
  },
};

export const error = new Error('There was some kind of error', {
  message: 'There was some kind of error',
  statusCode: 500,
});
